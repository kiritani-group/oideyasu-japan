"use server"

import { getSessionUser } from "@/lib/auth"
import type { Cart } from "@/lib/cart"
import { getCart, getCartKey, refreshCartTTL } from "@/lib/cart"
import { redis } from "@/lib/redis"
import { normalizePhoneNumber } from "@/lib/utils/nomalize-phone-number"
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

const buyerWihtoutAddressSchema: z.ZodType<
  Omit<NonNullable<Cart["buyer"]>, "address">
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
  email: z.email("メールアドレスの形式が正しくありません"),
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

export async function updateCustomerAction(
  buyer: NonNullable<Cart["buyer"]>,
): Promise<ActionState> {
  const user = await getSessionUser()
  const cart: Cart | null = await getCart(user?.id)
  if (!user || !cart) {
    return {
      type: "ERROR",
      message:
        "カート情報の読み取りに失敗しました。ページの再読み込みをお試しいただくか、店舗までお問い合わせください。",
    }
  }
  const validatedFields = buyerWihtoutAddressSchema.safeParse(buyer)
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
      buyer: { ...cart.buyer, ...validatedFields.data },
      updatedAt: new Date(),
    }
    const cartKey = getCartKey(user.id)
    await redis.hset(cartKey, newCart)
    await refreshCartTTL(cartKey)
  } catch {
    return {
      type: "ERROR",
      message:
        "サーバーエラーが発生しました。繰り返し問題が発生する場合は、しばらくたってから再度お試しください。",
    }
  }
  redirect("/checkout/shipping")
}
