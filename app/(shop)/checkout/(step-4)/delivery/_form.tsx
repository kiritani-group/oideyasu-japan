"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Cart } from "@/lib/cart"
import { cn } from "@/lib/utils"
import {
  AlertCircleIcon,
  CircleQuestionMark,
  CreditCard,
  Landmark,
  Smartphone,
  Store,
  Truck,
} from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"
import { useActionState, useState } from "react"
import { updateDeliveryAction } from "./_action"

const PAYMENT_OPTIONS: (NonNullable<Cart["payment"]> & {
  name: ReactNode
  description: ReactNode
  icon: ReactNode
})[] = [
  {
    method: "card",
    name: "クレジット決済",
    description: "Visa, JCB, Mastercard, AMEX などのカードで即時決済。",
    icon: <CreditCard className="size-8" />,
    type: "immediate",
  },
  {
    method: "convenience",
    name: "コンビニ払い",
    description:
      "コンビニで現金支払い。¥3,300以下のお買い上げの場合は、ご利用いただけません。",
    icon: <Store className="size-8" />,
    type: "immediate",
  },
  {
    method: "wallet",
    name: "デジタルウォレット決済",
    description: "Apple Pay / Google Pay / PayPay で即時決済。",
    icon: <Smartphone className="size-8" />,
    type: "immediate",
  },
  {
    method: "bank",
    name: "銀行振込",
    description:
      "指定の口座にお振込み。振込手数料はお客様にご負担いただきます。",
    icon: <Landmark className="size-8" />,
    type: "immediate",
  },
  {
    method: "cod",
    name: "代金引換（代引き）",
    description:
      "商品受け取り時に配達員に現金でお支払い。購入金額に応じた代引き手数料がかかります。",
    icon: <Truck className="size-8" />,
    type: "deferred",
  },
]

export default function DeriveryForm({
  paymentDefault,
}: {
  paymentDefault: Cart["payment"]
}) {
  const [payment, setPayment] = useState<NonNullable<Cart["payment"]>>(
    paymentDefault || { type: "immediate", method: "card" },
  )
  const [state, action, isPending] = useActionState(
    () => updateDeliveryAction(payment),
    {
      type: "PENDING",
    },
  )
  return (
    <form action={action} className="contents">
      <CardContent className="space-y-5">
        <section>
          <div className="mb-3 flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full font-bold">
              2
            </div>
            <h2 className="text-foreground text-xl font-bold">
              支払い方法を選択
            </h2>
          </div>

          <RadioGroup
            className="grid gap-3 @xl:grid-cols-2 @4xl:grid-cols-3"
            value={payment.method}
            onValueChange={(m) => {
              const newPayment = PAYMENT_OPTIONS.find((o) => o.method === m)
              if (!newPayment) return
              const { type, method } = newPayment
              setPayment({ type, method })
            }}
          >
            {PAYMENT_OPTIONS.map((option) => (
              <div
                key={option.method}
                className={cn(
                  "relative flex cursor-pointer items-start rounded-lg border-2 transition-all",
                  option.method === payment.method
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 bg-card",
                )}
              >
                <RadioGroupItem
                  value={option.method}
                  id={option.method}
                  className="mt-4 ml-4"
                />
                <Label
                  htmlFor={option.method}
                  className="-ml-8 flex-1 cursor-pointer p-4 pl-12"
                >
                  <div>
                    <div className="mb-3 flex items-center justify-between text-4xl">
                      {option.icon}
                      {option.method === "cod" && (
                        <Popover>
                          <PopoverTrigger className="text-muted-foreground flex text-xs underline">
                            <CircleQuestionMark className="mx-1 size-4" />
                            手数料
                          </PopoverTrigger>
                          <PopoverContent className="w-fit space-y-2.5 text-base">
                            <div className="font-bold">
                              代引き手数料
                              <span className="text-muted-foreground ml-1 text-sm">
                                (税込み)
                              </span>
                            </div>
                            <ul className="space-y-1 text-sm">
                              <li>
                                <div>
                                  <div>・商品購入金額 10,000円未満</div>
                                  <p className="pl-8">→ 330円</p>
                                </div>
                              </li>
                              <li>
                                <div>
                                  <div>・10,000円以上 30,000円未満</div>
                                  <p className="pl-8">→ 440円</p>
                                </div>
                              </li>
                              <li>
                                <div>
                                  <div>・30,000円以上 100,000円未満</div>
                                  <p className="pl-8">→ 660円</p>
                                </div>
                              </li>
                              <li>
                                <div>
                                  <div>・30,000円以上 100,000円未満</div>
                                  <p className="pl-8">→ 660円</p>
                                </div>
                              </li>
                              <li>
                                <div>
                                  <div>・100,000円以上 300,000円未満</div>
                                  <p className="pl-8">→ 1,100円</p>
                                </div>
                              </li>
                            </ul>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                    <p className="text-foreground font-semibold">
                      {option.name}
                    </p>
                    <p className="text-muted-foreground mt-2 text-xs">
                      {option.description}
                    </p>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </section>
        {state.type === "ERROR" && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="justify-between">
        <Button asChild variant="secondary">
          <Link href="/checkout/shipping">戻る</Link>
        </Button>
        <Button type="submit" disabled={isPending} className="cursor-pointer">
          次へ
        </Button>
      </CardFooter>
    </form>
  )
}
