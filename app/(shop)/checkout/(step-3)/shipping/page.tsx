import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getCart } from "@/lib/cart"
import { redirect } from "next/navigation"
import ShippingForm from "./_form"

export default async function Page() {
  const cart = await getCart()
  if (!cart) redirect("/")
  if (!cart.buyer) redirect("/checkout/customer")
  const isGift = Boolean(cart.isGift)
  const { email, ...buyer } = cart.buyer
  const recipient = cart.recipient
  console.log({ recipient })
  return (
    <Card>
      <CardHeader>
        <CardTitle>お届け先情報</CardTitle>
        <CardDescription>商品の配送先を指定してください。</CardDescription>
      </CardHeader>
      <ShippingForm
        isGiftDefault={isGift}
        buyerDefault={buyer}
        recipientDefault={recipient}
      />
    </Card>
  )
}
