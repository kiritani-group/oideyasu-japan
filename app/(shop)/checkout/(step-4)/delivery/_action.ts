"use server"

import type { Cart } from "@/lib/cart"
import { getCart, getCartKey, refreshCartTTL } from "@/lib/cart"
import { redis } from "@/lib/redis"
import { redirect } from "next/navigation"
import { z } from "zod"

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

const paymentSchema: z.ZodType<NonNullable<Cart["payment"]>> = z.object({
  type: z.enum(["deferred", "immediate"]),
  method: z.enum(["cod", "card", "convenience", "wallet", "bank"]),
})

export async function updateDeliveryAction(
  payment: NonNullable<Cart["payment"]>,
): Promise<ActionState> {
  const cartKey = await getCartKey()
  if (!cartKey) {
    return {
      type: "ERROR",
      message:
        "カート情報の読み取りに失敗しました。ページの再読み込みをお試しいただくか、店舗までお問い合わせください。",
    }
  }
  const cart: Cart | null = await getCart(cartKey)
  if (!cart || !cart.buyer) {
    return {
      type: "ERROR",
      message:
        "カート情報の読み取りに失敗しました。ページの再読み込みをお試しいただくか、店舗までお問い合わせください。",
    }
  }

  const validatedFields = paymentSchema.safeParse(payment)
  if (!validatedFields.success) {
    return {
      type: "ERROR",
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "確認が必要な項目があります。",
    }
  }
  try {
    const newCart: Cart = {
      ...cart,
      payment: validatedFields.data,
      updatedAt: new Date(),
    }
    await redis.hset(cartKey, newCart)
    await refreshCartTTL(cartKey)
  } catch (e) {
    return {
      type: "ERROR",
      message:
        "サーバーエラーが発生しました。繰り返し問題が発生する場合は、しばらくたってから再度お試しください。",
    }
  }
  redirect("/checkout/confirm")
}
