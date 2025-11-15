"use client"

import { Button } from "@/components/ui/button"
import { removeProductAction } from "@/lib/actions/cart"
import { Trash2 } from "lucide-react"
import { useActionState } from "react"

export default function RemoveItemForm({ productId }: { productId: string }) {
  const [, action, waiting] = useActionState(
    removeProductAction.bind(null, productId),
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
