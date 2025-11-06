"use server"

import { randomUUID } from "crypto"
import { cookies } from "next/headers"

export async function addCartAction(productId: string, quantity: number) {
  const cookieStore = await cookies()
  let guestId = cookieStore.get("guest_id")?.value

  if (!guestId) {
    guestId = randomUUID()
    cookieStore.set("guest_id", guestId, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30日
    })
  }
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return { status: "SUCCESS" }
}
