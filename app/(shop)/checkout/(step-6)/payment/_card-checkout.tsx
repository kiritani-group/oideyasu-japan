import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { ExpressCheckoutElement } from "@stripe/react-stripe-js"

export default function CardForm() {
  return (
    <form className="contents">
      <CardContent>
        <ExpressCheckoutElement onConfirm={() => {}} />
      </CardContent>
      <CardFooter className="flex-col items-start">
        <Button type="submit" disabled={false} className="ml-auto">
          支払いを確定
        </Button>
      </CardFooter>
    </form>
  )
}
