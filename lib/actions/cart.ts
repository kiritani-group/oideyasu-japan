"use server"

import { Cart, updateCartItem } from "@/lib/cart"
import { updateTag } from "next/cache"
import { getSessionUser } from "../auth"

export async function updateCartItemAction(
  product: Cart["items"][number]["product"],
  quantity: number,
  waitTime: number = 500,
) {
  const user = await getSessionUser()
  if (!user) {
    return { status: "ERROR" }
  }
  await updateCartItem(user.id, product, quantity)
  updateTag("cart")
  if (waitTime) {
    await new Promise((resolve) => setTimeout(resolve, waitTime))
  }
  return { status: "SUCCESS" }
}
