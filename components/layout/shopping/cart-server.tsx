import { getCart } from "@/lib/cart"
import { cacheTag } from "next/cache"
import CartDrawerDialog from "./cart-drawer-dialog"

export async function CartServer() {
  "use cache: private"
  cacheTag("cart")
  const cart = await getCart()
  return <CartDrawerDialog cart={cart} />
}
