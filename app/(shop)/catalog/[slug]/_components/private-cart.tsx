"use server"

import { auth } from "@/lib/auth"
import { cookies, headers } from "next/headers"
import AddCart from "./add-cart"

export default async function PrivateCart({
  product,
}: {
  product: { id: string; price: number }
}) {
  let user:
    | {
        id: string
        type: "USER" | "GUEST"
      }
    | undefined = undefined
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session) {
    user = {
      id: session.user.id,
      type: "USER",
    }
  } else {
    const cookieStore = await cookies()
    const guestId = cookieStore.get("guest_id")?.value
    if (guestId) {
      user = {
        id: guestId,
        type: "GUEST",
      }
    }
  }
  return <AddCart product={product} user={user} />
}
