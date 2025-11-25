import { getSessionUser } from "@/lib/auth"
import { Cart, getCart } from "@/lib/cart"
import { calculateCodFee } from "@/lib/utils/calculate-cod-fee"
import { redirect } from "next/navigation"

export async function getData() {
  const user = await getSessionUser()
  if (!user) redirect("/checkout")

  const cart: Cart | null = await getCart(user.id)
  if (!cart) redirect("/checkout")

  const items = cart.items
  if (!items || items.length === 0) redirect("/checkout")

  if (!cart.buyer) redirect("/checkout/customer")

  const { address, ...buyer } = cart.buyer
  if (!address) redirect("/checkout/shipping")

  const isGift = cart.isGift
  if (isGift === undefined) redirect("/checkout/shipping")
  if (isGift && !cart.recipient) redirect("/checkout/shipping")

  const payment = cart.payment
  if (!payment) return redirect("/checkout/delivery")

  // 合計金額など
  const subtotalAmount = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  )
  const shippingFee = subtotalAmount >= 10000 ? 0 : 770
  const codFee =
    payment.method === "cod" ? calculateCodFee(subtotalAmount) : null
  const totalAmount = subtotalAmount + shippingFee + (codFee || 0)

  return {
    user,
    cart,
    items,
    buyer: { ...buyer, address },
    isGift,
    recipient:
      isGift && cart.recipient ? cart.recipient : { ...buyer, address },
    payment,
    subtotalAmount,
    shippingFee,
    codFee,
    totalAmount,
  }
}

export type CheckoutData = Awaited<ReturnType<typeof getData>>
