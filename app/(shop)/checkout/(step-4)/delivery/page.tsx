import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getCart } from "@/lib/cart"
import { redirect } from "next/navigation"
import DeriveryForm from "./_form"

export default async function Page() {
  const cart = await getCart()
  if (!cart) redirect("/")
  if (!cart.buyer) redirect("/checkout/customer")
  if (
    cart.isGift === undefined ||
    !cart.buyer.address ||
    (cart.isGift && !cart.recipient)
  )
    redirect("/checkout/shipping")
  const payment = cart.payment
  return (
    <Card>
      <CardHeader>
        <CardTitle>配送/支払い方法</CardTitle>
        <CardDescription>
          お届け日のご希望や支払方法を選んでください。
        </CardDescription>
      </CardHeader>
      <DeriveryForm paymentDefault={payment} />
    </Card>
  )
}
