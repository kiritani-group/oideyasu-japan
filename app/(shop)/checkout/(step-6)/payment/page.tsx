import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getSessionUser } from "@/lib/auth"
import { getCart } from "@/lib/cart"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import Stripe from "stripe"
import CheckoutForm from "./_checkout-form"
import StripeFormWrapper from "./_stripe-form-wrapper"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")

export default async function Page() {
  const user = await getSessionUser()
  if (!user) redirect("/")
  const cart = await getCart(user.id)
  if (!cart || !cart.order) redirect("/")
  const order = await prisma.order.findFirst({
    where: { id: cart.order.id },
    select: { payments: true, totalAmount: true, orderNumber: true },
    orderBy: { createdAt: "desc" },
  })
  if (!order) redirect("/")
  const payment = order.payments.find((p) => p.status === "PENDING")
  if (!payment) redirect("/")
  const providerPaymentId = payment.providerPaymentId
  const paymentIntent = providerPaymentId
    ? await stripe.paymentIntents.retrieve(providerPaymentId)
    : undefined
  if (!paymentIntent || paymentIntent.status === "succeeded") redirect("/")
  console.dir(paymentIntent, { depth: null })
  const clientSecret = paymentIntent.client_secret
  if (!clientSecret) return redirect("/")
  const returnURL = `${process.env.BETTER_AUTH_URL || ""}/checkout/thanks?order_number=${order.orderNumber}`
  return (
    <Card>
      <CardHeader>
        <CardTitle>お支払い</CardTitle>
        <CardDescription>好きなお支払い方法をお選びください。</CardDescription>
      </CardHeader>
      <StripeFormWrapper clientSecret={clientSecret}>
        <CheckoutForm totalAmount={order.totalAmount} returnUrl={returnURL} />
      </StripeFormWrapper>
    </Card>
  )
}
