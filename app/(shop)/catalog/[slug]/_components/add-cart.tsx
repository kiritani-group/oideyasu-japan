import { getSessionUser } from "@/lib/auth"
import { getCart } from "@/lib/cart"
import { cacheTag } from "next/cache"
import AddForm from "./add-form"

export default async function AddCart({
  product,
}: {
  product: {
    id: string
    name: string
    price: number
    thumbnailUrl: string | null
  }
}) {
  "use cache: private"
  cacheTag("cart")
  const user = await getSessionUser()
  const cart = await getCart(user?.id)
  const isInCart =
    !!cart && cart.items.some((item) => item.productId === product.id)
  const quantityInCart =
    cart?.items.find((item) => item.productId === product.id)?.quantity || 0
  return (
    <AddForm
      user={user}
      product={product}
      isInCart={isInCart}
      quantityInCart={quantityInCart}
    />
  )
}
