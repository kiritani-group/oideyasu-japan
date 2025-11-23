"use client"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import CardForm from "./_card-checkout"

const stripePromise = loadStripe(
  "pk_test_51SV4CM7rW7IpdIYQTEZqljGsiu8hpEUNDMH88ORrhYRdnclLvKAI0FCtaDM7pjUZjEFGiAZUXUgFsgpm7f6lPH5h00QQmIkEmu",
)

export default function CheckoutForm({
  clientSecret,
  totalAmount,
}: {
  clientSecret: string
  totalAmount: number
}) {
  const options: StripeElementsOptions = {
    mode: "payment",
    amount: totalAmount,
    currency: "jpy",
    appearance: {},
  }
  return (
    <Elements stripe={stripePromise} options={options}>
      <CardForm />
    </Elements>
  )
}
