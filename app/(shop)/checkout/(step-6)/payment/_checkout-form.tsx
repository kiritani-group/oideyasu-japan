"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { StripePaymentElementOptions } from "@stripe/stripe-js"
import { useState } from "react"

export default function CheckoutForm({
  totalAmount,
  returnUrl,
}: {
  totalAmount: number
  returnUrl: string
}) {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: returnUrl,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || null)
    } else {
      console.log(error)
      setMessage("予期しないエラーが発生しました。")
    }

    setIsLoading(false)
  }

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: "accordion",
      radios: true,
    },
  }

  return (
    <form className="contents" onSubmit={handleSubmit}>
      <CardContent className="min-h-40">
        <PaymentElement options={paymentElementOptions} />
      </CardContent>
      <CardFooter className="flex-col items-start space-y-6">
        {message && <div className="text-destructive text-sm">{message}</div>}
        <Button
          type="submit"
          disabled={isLoading}
          className="ml-auto cursor-pointer"
        >
          支払いを確定
        </Button>
      </CardFooter>
    </form>
  )
}
