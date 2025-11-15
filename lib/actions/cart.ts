"use server"

import { addToCart, Cart, getCartKey } from "@/lib/cart"
import { randomUUID } from "crypto"
import { updateTag } from "next/cache"
import { cookies } from "next/headers"

export async function addCartAction(
  product: Cart["items"][number]["product"],
  quantity: number,
) {
  const cartKey = await getCartKey()
  if (!cartKey) {
    const guestId = randomUUID()
    const cookieStore = await cookies()
    cookieStore.set("guest_id", guestId, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30日
    })
  }
  await new Promise((resolve) => setTimeout(resolve, 500))
  await addToCart(product, quantity)
  updateTag("cart")
  await new Promise((resolve) => setTimeout(resolve, 500))
  return { status: "SUCCESS" }
}
