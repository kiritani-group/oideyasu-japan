import { getCart } from "@/lib/cart"
import { cacheTag } from "next/cache"
import AddForm from "./add-form"

export default async function AddCart({
  product,
}: {
  product: { id: string; name: string; price: number }
}) {
  "use cache: private"
  cacheTag("cart")
  const cart = await getCart()
  const isInCart = cart.items.some((item) => item.productId === product.id)
  const quantityInCart =
    cart.items.find((item) => item.productId === product.id)?.quantity || 1
  return (
    <AddForm
      product={product}
      isInCart={isInCart}
      quantityInCart={quantityInCart}
    />
  )
}
