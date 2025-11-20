"use server"

import type { Cart } from "@/lib/cart"
import { Address, getCart, getCartKey, refreshCartTTL } from "@/lib/cart"
import { redis } from "@/lib/redis"
import { normalizePhoneNumber } from "@/lib/utils/nomalize-phone-number"
import { redirect } from "next/navigation"
import { z } from "zod"
import type { Person } from "./_types"
import { normalizeString } from "./_util"

type PendingState = {
  type: "PENDING"
}

type ErrorState = {
  type: "ERROR"
  errors?: {
    buyerAddress?: {
      [key: string]: string[]
    }
    recipientAddress?: {
      [key: string]: string[]
    }
    recipient?: {
      [key: string]: string[]
    }
  }
  message: string
}

export type ActionState = PendingState | ErrorState

const recipientSchema: z.ZodType<
  Omit<NonNullable<Cart["recipient"]>, "address">
> = z.object({
  lastName: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return val.trim()
      }
      return val
    },
    z
      .string("入力してください")
      .min(1, "入力してください")
      .max(15, "15文字以内で指定してください"),
  ),
  firstName: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return val.trim()
      }
      return val
    },
    z
      .string("入力してください")
      .min(1, "入力してください")
      .max(15, "15文字以内で指定してください"),
  ),
  phone: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return normalizePhoneNumber(val)
      }
      return val
    },
    z
      .string("入力してください")
      .min(1, "入力してください")
      .regex(/^\d{10,11}$/, {
        message: "10桁もしくは11桁の数字で入力してください",
      }),
  ),
})

const addressSchema: z.ZodType<Address> = z.object({
  postalCode: z.preprocess(
    normalizeString,
    z.string("入力してください").length(7, "7文字で入力してください"),
  ),
  prefectureCode: z
    .int("整数値で入力してください")
    .min(1, "1以上の値を入力してください")
    .max(99, "99以下の値を入力してください"),
  prefecture: z.preprocess(
    normalizeString,
    z
      .string("入力してください")
      .min(1, "入力してください")
      .max(10, "10文字以内で入力してください"),
  ),
  city: z.preprocess(
    normalizeString,
    z
      .string("入力してください")
      .min(1, "入力してください")
      .max(15, "15文字以内で入力してください"),
  ),
  town: z.preprocess(
    normalizeString,
    z
      .string("入力してください")
      .min(1, "入力してください")
      .max(15, "15文字以内で入力してください"),
  ),
  streetAddress: z.preprocess(
    normalizeString,
    z
      .string("入力してください")
      .max(30, "30文字以内で入力してください")
      .nullable(),
  ),
  building: z.preprocess(
    normalizeString,
    z
      .string("入力してください")
      .max(30, "30文字以内で入力してください")
      .nullable(),
  ),
})

export async function updateShippingAction(
  isGift: boolean,
  buyer: Person,
  recipient: Person,
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

  const validatedBuyerAddressFields = addressSchema.safeParse(buyer.address)
  const validatedRecipientAddressFields = isGift
    ? addressSchema.safeParse(recipient.address)
    : undefined
  const validatedRecipientFields = isGift
    ? recipientSchema.safeParse(recipient)
    : undefined

  const hasError =
    !validatedBuyerAddressFields.success ||
    (isGift &&
      validatedRecipientAddressFields &&
      !validatedRecipientAddressFields.success) ||
    (isGift && validatedRecipientFields && !validatedRecipientFields.success)

  if (hasError) {
    return {
      type: "ERROR",
      errors: {
        buyerAddress:
          isGift &&
          validatedBuyerAddressFields &&
          !validatedBuyerAddressFields.success
            ? z.flattenError(validatedBuyerAddressFields.error).fieldErrors
            : undefined,
        recipientAddress:
          isGift &&
          validatedRecipientAddressFields &&
          !validatedRecipientAddressFields.success
            ? z.flattenError(validatedRecipientAddressFields.error).fieldErrors
            : undefined,
        recipient:
          isGift &&
          validatedRecipientFields &&
          !validatedRecipientFields.success
            ? z.flattenError(validatedRecipientFields.error).fieldErrors
            : undefined,
      },
      message: "確認が必要な項目があります。",
    }
  }

  try {
    const newCart: Cart =
      isGift &&
      validatedRecipientFields?.success &&
      validatedRecipientAddressFields?.success
        ? {
            ...cart,
            buyer: { ...cart.buyer, address: validatedBuyerAddressFields.data },
            isGift: true,
            recipient: {
              ...validatedRecipientFields.data,
              address: validatedRecipientAddressFields.data,
            },
            updatedAt: new Date(),
          }
        : {
            ...cart,
            buyer: { ...cart.buyer, address: validatedBuyerAddressFields.data },
            isGift: false,
            updatedAt: new Date(),
          }
    await redis.hset(cartKey, newCart)
    if (!isGift) {
      await redis.hdel(cartKey, "recipient")
    }
    await refreshCartTTL(cartKey)
  } catch (e) {
    return {
      type: "ERROR",
      message:
        "サーバーエラーが発生しました。繰り返し問題が発生する場合は、しばらくたってから再度お試しください。",
    }
  }
  redirect("/checkout/delivery")
}
