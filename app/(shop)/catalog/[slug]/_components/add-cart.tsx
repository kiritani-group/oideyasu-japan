"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useActionState, useState } from "react"
import { addCartAction } from "./_action"

export default function AddCart({
  product,
}: {
  product: { id: string; name: string; price: number }
}) {
  const [quantity, setQuantity] = useState(1)
  const [state, action, waiting] = useActionState(
    addCartAction.bind(null, product, quantity),
    { status: "IDLE" },
  )
  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))
  return (
    <>
      <div>
        <label className="text-foreground mb-2 block text-sm font-medium">
          数量
        </label>
        <div className="flex items-center gap-3">
          <div className="border-border bg-card flex items-center rounded-lg border">
            <Button
              variant="ghost"
              size="icon"
              onClick={decrementQuantity}
              className="text-foreground hover:bg-muted h-10 w-10"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-foreground w-12 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={incrementQuantity}
              className="text-foreground hover:bg-muted h-10 w-10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-muted-foreground text-sm">
            合計: ¥{(product.price * quantity).toLocaleString()}
          </span>
        </div>
      </div>
      <form action={action}>
        <Button size="lg" className="w-full cursor-pointer" disabled={waiting}>
          {waiting ? (
            <Spinner className="mr-2 size-5" />
          ) : (
            <ShoppingCart className="mr-2 size-5" />
          )}
          カートに追加
        </Button>
      </form>
    </>
  )
}
