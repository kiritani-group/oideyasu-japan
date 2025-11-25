"use client"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"

const stripePromise = loadStripe(
  "pk_test_51SV4CM7rW7IpdIYQTEZqljGsiu8hpEUNDMH88ORrhYRdnclLvKAI0FCtaDM7pjUZjEFGiAZUXUgFsgpm7f6lPH5h00QQmIkEmu",
)

export default function StripeFormWrapper({
  clientSecret,
  children,
}: {
  clientSecret: string
  children: React.ReactNode
}) {
  const options: StripeElementsOptions = {
    clientSecret,
    loader: "always",
    appearance: {
      theme: "flat",
      variables: {
        borderRadius: "8px",
      },
    },
  }
  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}
