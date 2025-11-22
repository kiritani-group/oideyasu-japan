import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getCart } from "@/lib/cart"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import Stripe from "stripe"
import CheckoutForm from "./_form"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")

export default async function Page() {
  const cart = await getCart()
  let providerPaymentId = null
  let order = null
  if (cart?.order?.id) {
    order = await prisma.order.findUnique({
      where: { id: cart.order.id },
      select: { id: true },
    })
    if (order) {
      const payment = await prisma.payment.findFirst({
        where: { orderId: order.id, status: "PENDING", provider: "STRIPE" },
      })
      if (payment) {
        providerPaymentId = payment.providerPaymentId
      }
    }
  }
  console.log({ providerPaymentId, order })
  // テスト固定
  providerPaymentId = "pi_3SV4Lm7rW7IpdIYQ1Xbtgz3y"
  const paymentIntent = providerPaymentId
    ? await stripe.paymentIntents.retrieve(providerPaymentId)
    : await stripe.paymentIntents.create({ amount: 14500, currency: "jpy" })
  const clientSecret = paymentIntent.client_secret
  if (!clientSecret) return redirect("/")
  return (
    <Card>
      <CardHeader>
        <CardTitle>最終確認</CardTitle>
        <CardDescription>
          ご注文を確定して、お支払いに進んでください。
        </CardDescription>
      </CardHeader>
      <CheckoutForm clientSecret={clientSecret} />
    </Card>
  )
}
