"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useActionState, useState } from "react"
import { createProductAction } from "./_action"

export default function ProductCreateForm() {
  const [state, formAction, pending] = useActionState(createProductAction, {
    type: "IDLE",
    prevData: { name: "", price: "", description: "" },
  })
  const [price, setPrice] = useState(state.prevData.price)
  return (
    <form
      action={formAction}
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
          e.preventDefault()
        }
      }}
      className="p-2"
    >
      <Card>
        <CardHeader>
          <CardTitle>新しい商品を登録</CardTitle>
          <CardDescription className="border-b pb-3">
            ネットショッピングで取扱いたい商品、もしくはHPに掲載するだけ（在庫なし）の商品を登録できます。
            <br />
            作成直後はすぐにHPに公開されるわけではないので、下書きの感覚で作成しても大丈夫です。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {state.message && (
            <p className="text-destructive text-sm">{state.message}</p>
          )}
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
              <p className="text-destructive pl-1 text-xs">
                {state.errors.name}
              </p>
            ) : (
              <p className="text-muted-foreground pl-1 text-xs">
                文字間にスペースを置く場合、半角のほうがHPでの表示がきれい。
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">価格（税込み）</Label>
            <Input
              id="price"
              name="price"
              aria-invalid={!!state.errors?.price}
              placeholder="2268"
              inputMode="numeric"
              value={price}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "")
                setPrice(v)
              }}
            />
            {state.errors?.price ? (
              <p className="text-destructive pl-1 text-xs">
                {state.errors.price}
              </p>
            ) : (
              <p className="text-muted-foreground pl-1 text-xs">
                税込み価格で登録してください。半角数字で入力。
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">商品説明</Label>
            <Textarea
              id="description"
              name="description"
              aria-invalid={!!state.errors?.description}
              placeholder={`するめのように食す『かれいのするめ』の登場です。\nかれいの旨みがお口の中にジュッわーっと広がります。骨ごとキッチンハサミで細めに切って電子レンジで60秒。カリッと仕上げてお召し上がりください。\n一味マヨネーズとの相性も抜群です。`}
              defaultValue={state.prevData.description}
              className="min-h-40"
            />
            {state.errors?.description ? (
              <p className="text-destructive pl-1 text-xs">
                {state.errors.description}
              </p>
            ) : (
              <p className="text-muted-foreground pl-1 text-xs">
                商品一覧ページや詳細ページに表示されます。改行も反映されます。
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" disabled={pending}>
            商品を登録
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
