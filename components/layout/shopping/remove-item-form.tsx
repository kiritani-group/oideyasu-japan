"use client"

import { Button } from "@/components/ui/button"
import { updateCartItemAction } from "@/lib/actions/cart"
import { Cart } from "@/lib/cart"
import { Trash2 } from "lucide-react"
import { useActionState } from "react"

export default function RemoveItemForm({
  item,
}: {
  item: Cart["items"][number]
}) {
  const [, action, waiting] = useActionState(
    () => updateCartItemAction(item.product, 0),
    { status: "IDLE" },
  )
  return (
    <form action={action}>
      <Button
        disabled={waiting}
        variant="ghost"
        size="icon-sm"
        className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 w-8 cursor-pointer p-0"
      >
        <Trash2 />
        <span className="sr-only">この商品をカートから削除する</span>
      </Button>
    </form>
  )
}
