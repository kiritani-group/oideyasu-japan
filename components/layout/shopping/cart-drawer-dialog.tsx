"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
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
import ChangeQuantityForm from "./change-quantity-form"
import RemoveItemForm from "./remove-item-form"

export default function CartDrawerDialog({ cart }: { cart: Cart }) {
  const isMobile = useIsMobile()

  const count = cart
    ? cart.items.reduce((acc, item) => acc + item.quantity, 0)
    : 0
  const subtotal = cart
    ? cart.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0,
      )
    : 0
  const title = "ショッピングカート"
  const description = "カートの中身を確認・編集できます。"
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="relative size-8">
            <ShoppingCart className="size-6" />
            <CountBadge count={count} />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <List className="mr-2 pr-2 pl-4" cart={cart} />
          <DrawerFooter>
            <Subtotal count={count} subtotal={subtotal} />
            <DrawerClose asChild>
              {cart.items.length === 0 ? (
                <Button disabled>購入手続きへ</Button>
              ) : (
                <Button asChild>
                  <Link href="/checkout">購入手続きへ</Link>
                </Button>
              )}
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">買い物を続ける</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative size-8">
          <ShoppingCart className="size-6" />
          <CountBadge count={count} />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-11/12 flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <List cart={cart} className="-mr-2 pr-2" />
        <Subtotal count={count} subtotal={subtotal} />
        <DialogClose asChild>
          {cart.items.length === 0 ? (
            <Button disabled>購入手続きへ</Button>
          ) : (
            <Button asChild>
              <Link href="/checkout">購入手続きへ</Link>
            </Button>
          )}
        </DialogClose>
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

function Subtotal({ count, subtotal }: { count: number; subtotal: number }) {
  return (
    <div className="flex items-center justify-between px-2">
      <span className="text-muted-foreground text-sm">小計 ({count}点)</span>
      <span className="text-foreground text-2xl font-bold">
        ¥{subtotal.toLocaleString()}
      </span>
    </div>
  )
}

function List({ cart, className }: { cart: Cart; className?: string }) {
  return (
    <div className={cn("min-h-0 flex-1 overflow-auto", className)}>
      {cart.items.length > 0 ? (
        <div className="space-y-1">
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
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground flex h-44 items-center justify-center text-sm">
          現在選択された商品はありません
        </div>
      )}
    </div>
  )
}
