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
import { updateIsActiveAction } from "../_actions/update-is-active"

export default function EditIsActiveForm({
  product,
  setOpen,
}: {
  product: { id: string; name: string; isActive: boolean }
  setOpen: (open: boolean) => void
}) {
  const [state, formAction, pending] = useActionState(
    updateIsActiveAction.bind(null, product.id),
    {
      type: "IDLE",
      prevData: { isActive: product.isActive },
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
          在庫の有無にかかわらず、ホームページで公開するかどうかを設定します。
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-2">
        <Label htmlFor="isActive">公開状況</Label>
        <Select
          defaultValue={
            String(state.prevData.isActive) === "true" ? "true" : "false"
          }
          name="isActive"
        >
          <SelectTrigger id="isActive" className="w-full">
            <SelectValue placeholder="HPでの公開状況を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">公開</SelectItem>
            <SelectItem value="false">非公開</SelectItem>
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
