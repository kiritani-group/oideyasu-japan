import { getSessionUser } from "@/lib/auth"
import { getCart } from "@/lib/cart"
import { cacheTag } from "next/cache"
import CartDrawerDialog from "./cart-drawer-dialog"
import CartWrapper from "./cart-wrapper"

export async function CartServer() {
  "use cache: private"
  cacheTag("cart")
  const user = await getSessionUser()
  const cart = await getCart(user?.id)
  return (
    <CartWrapper>
      <CartDrawerDialog cart={cart || { items: [], updatedAt: new Date() }} />
    </CartWrapper>
  )
}
