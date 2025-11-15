"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import { Cart } from "@/lib/cart"
import { cn } from "@/lib/utils"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import ChangeQuantityForm from "./change-quantity-form"
import RemoveItemForm from "./remove-item-form"

export default function CartDrawerDialog({ cart }: { cart: Cart }) {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  const count = cart.items.reduce((acc, item) => acc + item.quantity, 0)
  const title = "ショッピングカート"
  const description = "カートの中身を確認・編集できます。"
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="relative size-8">
            <ShoppingCart className="size-6" />
            <CountBadge count={count} />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <List className="px-4" cart={cart} />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">買い物を続ける</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative size-8">
          <ShoppingCart className="size-6" />
          <CountBadge count={count} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <List cart={cart} />
      </DialogContent>
    </Dialog>
  )
}

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null
  return (
    <span className="bg-destructive absolute top-0 right-0 h-4 min-w-4 -translate-y-0.5 rounded-full text-center text-xs text-white">
      {count}
    </span>
  )
}

function List({ cart, className }: { cart: Cart; className?: string }) {
  return (
    <div className={cn("grid items-start gap-6", className)}>
      {cart.items.length > 0 ? (
        <div className="-mr-2 max-h-[35vh] space-y-1 overflow-y-auto pr-2">
          {cart.items.map((item, index) => (
            <div key={index} className="space-y-3 rounded-lg border p-3">
              {/* 商品情報 */}
              <div className="flex justify-between">
                <div>
                  <h3 className="text-foreground font-medium">
                    {item.product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    ¥{item.product.price.toLocaleString()}
                  </p>
                </div>
                <div className="min-w-18 text-right">
                  <p className="text-foreground font-semibold">
                    ¥{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <ChangeQuantityForm item={item} />
                <RemoveItemForm productId={item.productId} />
              </div>

              {/* 小計 */}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground flex h-44 items-center justify-center text-sm">
          現在選択された商品はありません
        </div>
      )}
      <div className="flex items-center justify-between px-2">
        <span className="text-muted-foreground text-sm">
          小計 ({cart.items.reduce((acc, item) => acc + item.quantity, 0)}点)
        </span>
        <span className="text-foreground text-2xl font-bold">
          ¥
          {cart.items
            .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
            .toLocaleString()}
        </span>
      </div>
      {cart.items.length > 0 ? (
        <Button asChild className="w-full">
          <Link href="#">購入手続きへ</Link>
        </Button>
      ) : (
        <Button disabled className="w-full">
          購入手続きへ
        </Button>
      )}
    </div>
  )
}
