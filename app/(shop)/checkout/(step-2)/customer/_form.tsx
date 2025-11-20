"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Cart } from "@/lib/cart"
import { normalizePhoneNumber } from "@/lib/utils/nomalize-phone-number"
import { AlertCircleIcon } from "lucide-react"
import Link from "next/link"
import { useActionState, useState } from "react"
import { updateCustomerAction } from "./_action"

export default function CustomerForm({ buyer }: { buyer: Cart["buyer"] }) {
  const [customerInfo, setCustomerInfo] = useState(
    buyer || {
      lastName: "",
      firstName: "",
      phone: "",
      email: "",
    },
  )
  const [state, action, isPending] = useActionState(
    () => updateCustomerAction(customerInfo),
    {
      type: "PENDING",
    },
  )
  return (
    <form action={action} className="contents">
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">姓(上のお名前)</Label>
            <Input
              id="lastName"
              placeholder="山田"
              value={customerInfo.lastName}
              onChange={(e) =>
                setCustomerInfo((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
            />
            {state.type === "ERROR" && state.errors?.lastName?.[0] && (
              <p className="-mt-1 text-sm text-red-500">
                {state.errors.lastName[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">名(下のお名前)</Label>
            <Input
              id="firstName"
              placeholder="太郎"
              value={customerInfo.firstName}
              onChange={(e) =>
                setCustomerInfo((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
            />
            {state.type === "ERROR" && state.errors?.firstName?.[0] && (
              <p className="-mt-1 text-sm text-red-500">
                {state.errors.firstName[0]}
              </p>
            )}
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            type="string"
            inputMode="email"
            autoComplete="email"
            placeholder="mail@example.jp"
            value={customerInfo.email}
            onChange={(e) =>
              setCustomerInfo((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
          {state.type === "ERROR" && state.errors?.email?.[0] && (
            <p className="-mt-1 text-sm text-red-500">
              {state.errors.email[0]}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">電話番号</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="09012345678"
            value={customerInfo.phone}
            onChange={(e) =>
              setCustomerInfo((prev) => ({
                ...prev,
                phone: normalizePhoneNumber(e.target.value),
              }))
            }
          />
          {state.type === "ERROR" && state.errors?.phone?.[0] && (
            <p className="-mt-1 text-sm text-red-500">
              {state.errors.phone[0]}
            </p>
          )}
        </div>
        {state.type === "ERROR" && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="justify-between">
        <Button asChild variant="secondary">
          <Link href="/checkout/cart">戻る</Link>
        </Button>
        <Button disabled={isPending} className="cursor-pointer">
          次へ
        </Button>
      </CardFooter>
    </form>
  )
}
