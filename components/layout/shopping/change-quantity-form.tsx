"use client"

import { Button } from "@/components/ui/button"
import { updateCartItemAction } from "@/lib/actions/cart"
import { Cart } from "@/lib/cart"
import { Minus, Plus } from "lucide-react"
import { useOptimistic } from "react"

export default function ChangeQuantityForm({
  item,
}: {
  item: Cart["items"][number]
}) {
  const [optimisticQuantity, addOptimisticQuantity] = useOptimistic(
    item.quantity,
    (_, newQuantity: number) => newQuantity,
  )

  const handleDecrease = async () => {
    const newQuantity = Math.max(1, optimisticQuantity - 1)
    addOptimisticQuantity(newQuantity)
    await updateCartItemAction(item.product, newQuantity)
  }

  const handleIncrease = async () => {
    const newQuantity = optimisticQuantity + 1
    addOptimisticQuantity(newQuantity)
    await updateCartItemAction(item.product, newQuantity)
  }

  return (
    <div className="flex items-center gap-2">
      <form action={handleDecrease}>
        <Button
          disabled={optimisticQuantity <= 1}
          variant="outline"
          size="icon-sm"
          className="cursor-pointer"
        >
          <Minus />
        </Button>
      </form>
      <span className="w-8 text-center font-medium">{optimisticQuantity}</span>
      <form action={handleIncrease}>
        <Button variant="outline" size="icon-sm" className="cursor-pointer">
          <Plus />
        </Button>
      </form>
    </div>
  )
}
