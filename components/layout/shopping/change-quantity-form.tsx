"use client"

import { Button } from "@/components/ui/button"
import { changeQuantityAction } from "@/lib/actions/cart"
import { Minus, Plus } from "lucide-react"
import { useOptimistic } from "react"

export default function ChangeQuantityForm({
  item,
}: {
  item: {
    productId: string
    quantity: number
  }
}) {
  const [optimisticQuantity, addOptimisticQuantity] = useOptimistic(
    item.quantity,
    (state, newQuantity: number) => newQuantity,
  )

  const handleDecrease = async () => {
    const newQuantity = Math.max(1, optimisticQuantity - 1)
    addOptimisticQuantity(newQuantity)
    await changeQuantityAction(item.productId, newQuantity)
  }

  const handleIncrease = async () => {
    const newQuantity = optimisticQuantity + 1
    addOptimisticQuantity(newQuantity)
    await changeQuantityAction(item.productId, newQuantity)
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
