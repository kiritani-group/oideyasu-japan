import { getCart } from "@/lib/cart"
import { cacheTag } from "next/cache"
import CartDrawerDialog from "./cart-drawer-dialog"
import CartWrapper from "./cart-wrapper"

export async function CartServer() {
  "use cache: private"
  cacheTag("cart")
  const cart = await getCart()
  return (
    <CartWrapper>
      <CartDrawerDialog cart={cart || { items: [], updatedAt: new Date() }} />
    </CartWrapper>
  )
}
