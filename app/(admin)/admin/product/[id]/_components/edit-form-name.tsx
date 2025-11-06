"use client"

import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useEffect } from "react"
import { updateNameAction } from "../_actions/update-name"

export default function EditNameForm({
  product,
  setOpen,
}: {
  product: { id: string; name: string; slug: string }
  setOpen: (open: boolean) => void
}) {
  const [state, formAction, pending] = useActionState(
    updateNameAction.bind(null, product.id),
    {
      type: "IDLE",
      prevData: { name: product.name, slug: product.slug },
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
          ホームページには在庫が有るか無いかだけ表示されます。
          HPへの「残りわずか」のような表示も可能なので、もしそのようにしたければ教えてね。
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-2">
        <Label htmlFor="name">商品名</Label>
        <Input
          id="name"
          name="name"
          aria-invalid={!!state.errors?.name}
          placeholder="かれいのするめ"
          defaultValue={state.prevData.name}
        />
        {state.errors?.name ? (
          <p className="text-destructive pl-1 text-xs">{state.errors.name}</p>
        ) : (
          <p className="text-muted-foreground pl-1 text-xs">
            文字間にスペースを置く場合、半角のほうがHPでの表示がきれい。
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="slug">URL用スラッグ</Label>
        <Input
          id="slug"
          name="slug"
          aria-invalid={!!state.errors?.slug}
          placeholder="karei-no-surume"
          defaultValue={state.prevData.slug}
        />
        {state.errors?.slug ? (
          <p className="text-destructive pl-1 text-xs">{state.errors.slug}</p>
        ) : (
          <p className="text-muted-foreground pl-1 text-xs">
            商品個別ページのURLに使われます。半角英小文字・数字・ハイフンのみ使用可能です。
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
