"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Address, Cart } from "@/lib/cart"
import { cn } from "@/lib/utils"
import { AlertCircleIcon, Gift, Package } from "lucide-react"
import Link from "next/link"
import { useActionState, useState } from "react"
import { updateShippingAction } from "./_action"
import AddressForm from "./_address-form"
import type { AddressWithoutNull } from "./_types"

const normalizeAddress = (addr?: Address): AddressWithoutNull => ({
  postalCode: addr?.postalCode ?? "",
  prefectureCode: addr?.prefectureCode ?? 0,
  prefecture: addr?.prefecture ?? "",
  city: addr?.city ?? "",
  town: addr?.town ?? "",
  streetAddress: addr?.streetAddress ?? "",
  building: addr?.building ?? "",
})

export default function ShippingForm({
  isGiftDefault,
  buyerDefault,
  recipientDefault,
}: {
  isGiftDefault: boolean
  buyerDefault: Omit<NonNullable<Cart["buyer"]>, "email">
  recipientDefault: Cart["recipient"]
}) {
  const [shippingType, setShippingType] = useState(
    isGiftDefault ? "gift" : "self",
  )
  const [buyer, setBuyer] = useState({
    ...buyerDefault,
    address: normalizeAddress(buyerDefault.address),
  })
  const [recipient, setRecipient] = useState(
    recipientDefault
      ? {
          ...recipientDefault,
          address: normalizeAddress(recipientDefault.address),
        }
      : {
          lastName: "",
          firstName: "",
          phone: "",
          address: normalizeAddress(),
        },
  )
  const [state, action, isPending] = useActionState(
    () => updateShippingAction(shippingType === "gift", buyer, recipient),
    {
      type: "PENDING",
    },
  )
  return (
    <>
      <form
        action={action}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault()
        }}
        className="contents"
      >
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <h2 className="text-md font-bold underline underline-offset-2">
              商品の配送先
            </h2>
            <RadioGroup
              value={shippingType}
              onValueChange={setShippingType}
              className="ml-2 border-l py-2 pl-3"
            >
              <div className="space-y-2">
                <div
                  className={cn(
                    "relative flex cursor-pointer items-start rounded-lg border-2 transition-all",
                    shippingType === "self"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 bg-card",
                  )}
                >
                  <RadioGroupItem
                    value="self"
                    id="self"
                    className="mt-4 ml-4"
                  />
                  <Label
                    htmlFor="self"
                    className="-ml-8 flex-1 cursor-pointer p-4 pl-12"
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0">
                        <Package className="text-primary mt-0.5 h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold">
                          自分用に購入する
                        </p>
                        <p className="text-muted-foreground mt-1 text-sm">
                          お買い上げいただくご本人の住まいへ商品をお届けします。
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>
                <div
                  className={cn(
                    "relative flex cursor-pointer items-start rounded-lg border-2 transition-all",
                    shippingType === "gift"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 bg-card",
                  )}
                >
                  <RadioGroupItem
                    value="gift"
                    id="gift"
                    className="mt-4 ml-4"
                  />
                  <Label
                    htmlFor="gift"
                    className="-ml-8 flex-1 cursor-pointer p-4 pl-12"
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0">
                        <Gift className="text-primary mt-0.5 h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold">
                          ギフト・他の住所へ送る
                        </p>
                        <p className="text-muted-foreground mt-1 text-sm">
                          ご自宅以外の住所やギフト先へ商品をお届けします。
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          {shippingType === "self" ? (
            <AddressForm
              title="お届け先"
              person={buyer}
              setPerson={setBuyer}
              state={state}
            />
          ) : (
            <>
              <AddressForm
                title="ご購入者住所"
                person={buyer}
                setPerson={setBuyer}
                state={state}
              />
              <AddressForm
                title="お届け先"
                isGift={true}
                person={recipient}
                setPerson={setRecipient}
                state={state}
              />
            </>
          )}
          {state.type === "ERROR" && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="justify-between">
          <Button asChild variant="secondary">
            <Link href="/checkout/customer">戻る</Link>
          </Button>
          <Button type="submit" disabled={isPending} className="cursor-pointer">
            次へ
          </Button>
        </CardFooter>
      </form>
    </>
  )
}
