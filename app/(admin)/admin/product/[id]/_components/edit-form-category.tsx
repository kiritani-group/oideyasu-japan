"use client"

import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useActionState, useEffect } from "react"
import { updateCategoryAction } from "../_actions/update-category"

export default function EditCategoryForm({
  product,
  setOpen,
  categories,
}: {
  product: { id: string; name: string; categoryId: string | null }
  setOpen: (open: boolean) => void
  categories: { id: string; name: string }[]
}) {
  const [state, formAction, pending] = useActionState(
    updateCategoryAction.bind(null, product.id),
    {
      type: "IDLE",
      prevData: { categoryId: product.categoryId },
    },
  )
  useEffect(() => {
    if (state.type === "SUCCESS") {
      setOpen(false)
    }
  }, [state.type, setOpen])
  return (
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
          商品が属するカテゴリーを設定します。カテゴリーは商品一覧やホームページでの表示に影響します。
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-2">
        <Label htmlFor="categoryId">カテゴリー</Label>
        <Select
          defaultValue={state.prevData.categoryId || "none"}
          name="categoryId"
        >
          <SelectTrigger id="categoryId" className="w-full">
            <SelectValue placeholder="商品が属するカテゴリーを選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">カテゴリー無し</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state.errors?.isActive && (
          <p className="text-destructive pl-1 text-xs">
            {state.errors.isActive}
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
  )
}
