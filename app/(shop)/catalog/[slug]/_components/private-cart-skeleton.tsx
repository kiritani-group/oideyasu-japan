import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingCart } from "lucide-react"

export default function PrivateCartSkeleton({
  product,
}: {
  product: { price: number }
}) {
  return (
    <>
      <div>
        <label className="text-foreground mb-2 block text-sm font-medium">
          数量
        </label>
        <div className="flex items-center gap-3">
          <div className="border-border bg-card flex items-center rounded-lg border">
            <Button
              disabled
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-muted h-10 w-10"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-foreground w-12 text-center">1</span>
            <Button
              disabled
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-muted h-10 w-10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-muted-foreground text-sm">
            合計: ¥{product.price.toLocaleString()}
          </span>
        </div>
      </div>
      <Button size="lg" className="w-full cursor-pointer" disabled>
        <ShoppingCart className="mr-2 size-5" />
        カートに追加
      </Button>
    </>
  )
}
