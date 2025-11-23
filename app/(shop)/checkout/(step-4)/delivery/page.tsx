import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getSessionUser } from "@/lib/auth"
import { getCart } from "@/lib/cart"
import { redirect } from "next/navigation"
import DeriveryForm from "./_form"

export default async function Page() {
  const user = await getSessionUser()
  const cart = await getCart(user?.id)
  if (!user || !cart) redirect("/checkout")
  if (!cart.buyer) redirect("/checkout/customer")
  if (
    cart.isGift === undefined ||
    !cart.buyer.address ||
    (cart.isGift && !cart.recipient)
  )
    redirect("/checkout/shipping")
  const subtotalAmount = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  )
  const payment =
    cart.payment?.method === "convenience" && subtotalAmount <= 3300
      ? undefined
      : cart.payment
  return (
    <Card>
      <CardHeader>
        <CardTitle>配送/支払い方法</CardTitle>
        <CardDescription>
          お届け日のご希望や支払方法を選んでください。
        </CardDescription>
      </CardHeader>
      <DeriveryForm paymentDefault={payment} subtotalAmount={subtotalAmount} />
    </Card>
  )
}
