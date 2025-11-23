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
import CheckoutForm from "./_form"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")

export default async function Page() {
  const user = await getSessionUser()
  if (!user) redirect("/")
  const cart = await getCart(user.id)
  if (!cart || !cart.order) redirect("/")
  const order = await prisma.order.findFirst({
    where: { id: cart.order.id },
    select: { payments: true, totalAmount: true },
    orderBy: { createdAt: "desc" },
  })
  if (!order) redirect("/")
  const payment = order.payments.find((p) => p.status === "PENDING")
  const providerPaymentId = payment?.providerPaymentId
  const paymentIntent = providerPaymentId
    ? await stripe.paymentIntents.retrieve(providerPaymentId)
    : undefined
  if (!paymentIntent) redirect("/")
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
      <CheckoutForm
        clientSecret={clientSecret}
        totalAmount={order.totalAmount}
      />
    </Card>
  )
}
