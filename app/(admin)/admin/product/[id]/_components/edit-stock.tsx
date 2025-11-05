"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useState } from "react"
import { updateStockAction } from "../_actions/update-stock"

export default function EditStock({
  product,
}: {
  product: { id: string; name: string; stock: number }
}) {
  const [state, formAction, pending] = useActionState(
    updateStockAction.bind(null, product.id),
    {
      type: "IDLE",
      prevData: { stock: product.stock },
    },
  )
  const [stock, setStock] = useState(state.prevData.stock)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">在庫設定</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          action={formAction}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
              e.preventDefault()
            }
          }}
          className="contents"
        >
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>
              ホームページには在庫が有るか無いかだけ表示されます。
              HPへの「残りわずか」のような表示も可能なので、もしそのようにしたければ教えてね。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="stock">在庫数</Label>
            <Input
              id="stock"
              name="stock"
              aria-invalid={!!state.errors?.stock}
              placeholder="2268"
              inputMode="numeric"
              value={stock}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "")
                setStock(v)
              }}
            />
            {state.errors?.stock ? (
              <p className="text-destructive pl-1 text-xs">
                {state.errors.stock}
              </p>
            ) : (
              <p className="text-muted-foreground pl-1 text-xs">
                在庫切れの場合は「0」を、十分な在庫が有る場合は「101」以上の適当な値を指定。
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">キャンセル</Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              変更を保存
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
