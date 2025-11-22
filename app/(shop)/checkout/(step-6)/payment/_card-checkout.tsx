import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"

export default function CardForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState<string | undefined | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }
    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout/payment",
      },
    })

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      console.log({ error })
      setMessage("An unexpected error occured.")
    }

    setIsLoading(false)
  }
  return (
    <form onSubmit={handleSubmit} className="contents">
      <CardContent>
        <PaymentElement />
      </CardContent>
      <CardFooter className="flex-col items-start">
        {message && <p className="text-destructive">{message}</p>}
        <Button type="submit" disabled={isLoading} className="ml-auto">
          支払いを確定
        </Button>
      </CardFooter>
    </form>
  )
}
