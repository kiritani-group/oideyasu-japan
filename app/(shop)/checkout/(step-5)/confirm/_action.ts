"use server"

import { getSessionUser } from "@/lib/auth"
import { getCartKey, refreshCartTTL } from "@/lib/cart"
import {
  OrderCreateInput,
  PaymentCreateWithoutOrderInput,
} from "@/lib/generated/prisma/models"
import prisma from "@/lib/prisma"
import { redis } from "@/lib/redis"
import { generateOrderNumber } from "@/lib/utils/generate-order-number"
import { updateTag } from "next/cache"
import { redirect } from "next/navigation"
import Stripe from "stripe"
import { getData } from "./_data"

type PendingState = {
  type: "PENDING"
}

type ErrorState = {
  type: "ERROR"
  errors?: {
    [key: string]: string[]
  }
  message: string
}

export type ActionState = PendingState | ErrorState

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")

export async function confirmAction(): Promise<ActionState> {
  const user = await getSessionUser()
  if (!user) {
    return {
      type: "ERROR",
      message: "セッション情報が読み取れませんでした。",
    }
  }
  const cart = await getData()
  let paymentCreateWithoutOrderInput: PaymentCreateWithoutOrderInput
  if (cart.payment.method === "cod") {
    paymentCreateWithoutOrderInput = {
      provider: "CASH_ON_DELIVERY",
      amount: cart.totalAmount,
      status: "PENDING",
    }
  } else {
    const pi = await stripe.paymentIntents.create({
      amount: cart.totalAmount,
      currency: "jpy",
      ...(cart.payment.method === "convenience"
        ? {
            automatic_payment_methods: {
              enabled: true,
            },
          }
        : {
            automatic_payment_methods: {
              enabled: true,
            },
            excluded_payment_method_types: ["konbini"],
          }),
      receipt_email: cart.buyer.email,
    })
    paymentCreateWithoutOrderInput = {
      provider: "STRIPE",
      providerPaymentId: pi.id,
      amount: pi.amount,
      status: "PENDING",
    }
  }
  let order:
    | { id: string; userId: string | null; orderNumber: string }
    | undefined
  try {
    const orderCreateInput: Omit<OrderCreateInput, "orderNumber"> = {
      user: { connect: { id: cart.user.id } },
      status: "PENDING",

      totalAmount: cart.totalAmount,
      subtotalAmount: cart.subtotalAmount,
      shippingFee: cart.shippingFee,
      codFee: cart.codFee,

      buyerLastName: cart.buyer.lastName,
      buyerFirstName: cart.buyer.firstName,
      buyerEmail: cart.buyer.email,
      buyerPhone: cart.buyer.phone,
      ...(cart.buyer.address.id
        ? {
            buyerAddress: { connect: { id: cart.buyer.address.id } },
          }
        : {
            buyerAddress: {
              create: {
                postalCode: cart.buyer.address.postalCode,
                prefectureCode: cart.buyer.address.prefectureCode,
                prefecture: cart.buyer.address.prefecture,
                city: cart.buyer.address.city,
                town: cart.buyer.address.town,
                streetAddress: cart.buyer.address.streetAddress,
                building: cart.buyer.address.building,
                userId: cart.user.id,
              },
            },
          }),

      recipientLastName: cart.recipient.lastName,
      recipientFirstName: cart.recipient.firstName,
      recipientPhone: cart.recipient.phone,
      ...(cart.recipient.address.id
        ? {
            shippingAddress: { connect: { id: cart.recipient.address.id } },
          }
        : {
            shippingAddress: {
              create: {
                postalCode: cart.recipient.address.postalCode,
                prefectureCode: cart.recipient.address.prefectureCode,
                prefecture: cart.recipient.address.prefecture,
                city: cart.recipient.address.city,
                town: cart.recipient.address.town,
                streetAddress: cart.recipient.address.streetAddress,
                building: cart.recipient.address.building,
                userId: cart.user.id,
              },
            },
          }),

      items: {
        create: cart.items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: item.product.price,
          subtotal: item.product.price * item.quantity,
        })),
      },

      payments: {
        create: paymentCreateWithoutOrderInput,
      },
    }
    for (let attempt = 0; attempt < 5; attempt++) {
      const orderNumber = generateOrderNumber()
      try {
        order = await prisma.order.create({
          data: { ...orderCreateInput, orderNumber },
          select: { id: true, userId: true, orderNumber: true },
        })
        break
      } catch (e: any) {
        if (e.code === "P2002") {
          // ユニーク制約違反 → リトライ
          continue
        }
        throw e // 他のエラーはそのまま
      }
    }
    if (order) {
      if (paymentCreateWithoutOrderInput.providerPaymentId) {
        await stripe.paymentIntents.update(
          paymentCreateWithoutOrderInput.providerPaymentId,
          {
            metadata: {
              order_number: order.orderNumber,
              user_id: order.userId,
            },
          },
        )
      }
      const cartKey = getCartKey(user.id)
      await redis.hset(cartKey, { order: { id: order.id } })
      await refreshCartTTL(cartKey)
    } else {
      throw new Error("注文番号生成に失敗しました")
    }
  } catch (e) {
    return {
      type: "ERROR",
      message:
        "サーバーエラーが発生しました。繰り返し問題が発生する場合は、しばらくたってから再度お試しください。",
    }
  }
  if (cart.payment.method === "cod") {
    const cartKey = getCartKey(user.id)
    await redis.hset(cartKey, { items: [] })
    await redis.hdel(cartKey, "recipient", "isGift", "payment", "order")
    updateTag("cart")
    redirect(`/checkout/thanks?cod_mode=true&order_number=${order.orderNumber}`)
  }
  redirect("/checkout/payment")
}
