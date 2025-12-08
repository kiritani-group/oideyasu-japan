"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { updateCartItemAction } from "@/lib/actions/cart"
import { Session } from "@/lib/auth"
import { cn } from "@/lib/utils"
import {
  CheckCircle,
  CheckCircle2Icon,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react"
import { useActionState, useState } from "react"
import Login from "./login"

export default function AddForm({
  user,
  product,
  isInCart,
  quantityInCart,
}: {
  user: Session["user"] | undefined
  product: {
    id: string
    name: string
    price: number
    thumbnailUrl: string | null
  }
  isInCart: boolean
  quantityInCart: number
}) {
  const [quantity, setQuantity] = useState(1)
  const [, action, waiting] = useActionState(
    () => updateCartItemAction(product, quantity),
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
              disabled={quantity <= 1 || isInCart}
              onClick={decrementQuantity}
              className="text-foreground hover:bg-muted cursor-pointer"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span
              className={cn(
                "text-foreground w-12 text-center",
                isInCart && "text-muted-foreground",
              )}
            >
              {!isInCart ? quantity : quantityInCart}
            </span>
            <Button
              variant="ghost"
              size="icon"
              disabled={isInCart}
              onClick={incrementQuantity}
              className="text-foreground hover:bg-muted cursor-pointer"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-muted-foreground text-sm">
            合計: ¥
            {(
              product.price *
              (!isInCart ? quantity : Math.max(1, quantityInCart))
            ).toLocaleString()}
          </span>
        </div>
      </div>
      {!user ? (
        <Login product={product} quantity={quantity} />
      ) : !isInCart ? (
        <form action={action}>
          <Button
            size="lg"
            className="w-full cursor-pointer"
            disabled={waiting}
          >
            {waiting ? (
              <Spinner className="mr-2 size-5" />
            ) : (
              <ShoppingCart className="mr-2 size-5" />
            )}
            カートに追加
          </Button>
        </form>
      ) : (
        <div>
          <Button
            size="lg"
            className="w-full cursor-default bg-emerald-500 hover:bg-emerald-500"
            disabled={waiting}
          >
            <CheckCircle className="mr-2 size-5" />
            カートに追加済み
          </Button>
          <div className="pt-2">
            <Alert className="[&>svg]:text-emerald-500">
              <CheckCircle2Icon />
              <AlertTitle>カートに商品を追加しました！</AlertTitle>
              <AlertDescription>
                画面右上のショッピングカートをご確認の上、購入手続きを進めてください。
                <br />
                そのまま他の商品を選ぶことも可能です。引き続きお買い物をお楽しみください！
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
    </>
  )
}
