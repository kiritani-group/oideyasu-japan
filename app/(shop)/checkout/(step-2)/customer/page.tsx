import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getCart } from "@/lib/cart"
import { redirect } from "next/navigation"
import CustomerForm from "./_form"

export default async function Page() {
  const cart = await getCart()
  if (!cart) redirect("/")
  const buyer = cart.buyer
  return (
    <Card>
      <CardHeader>
        <CardTitle>お客様情報</CardTitle>
        <CardDescription>
          ご購入されるお客様の情報をご入力ください。
        </CardDescription>
      </CardHeader>
      <CustomerForm buyer={buyer}/>
    </Card>
  )
}
