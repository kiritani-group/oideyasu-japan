import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Cart } from "@/lib/cart"
import {
  BadgeJapaneseYen,
  Box,
  CircleUser,
  CreditCard,
  Landmark,
  List,
  MapPin,
  Smartphone,
  Store,
  Truck,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
import { getData } from "./_data"
import ConfirmForm from "./_form"

export default async function Page() {
  const cart = await getData()
  const payment = PAYMENT_OPTIONS.find((o) => o.method === cart.payment.method)
  return (
    <Card>
      <CardHeader>
        <CardTitle>最終確認</CardTitle>
        <CardDescription>
          ご注文を確定して、お支払いに進んでください。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <section>
          <h3 className="flex items-center gap-1.5 pb-2 text-2xl font-bold">
            <List />
            注文商品
          </h3>
          <div className="bg-muted divide-y rounded-lg p-2">
            {cart.items.map((item) => (
              <div key={item.productId} className="flex gap-4 p-2">
                <div className="bg-background relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg @xl:size-24">
                  {item.product.thumbnailUrl ? (
                    <Image
                      src={"/placeholder.svg"}
                      fill
                      alt={item.product.name}
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <Box className="size-10" />
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="mb-1 font-semibold">{item.product.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      数量: <span className="font-medium">{item.quantity}</span>
                    </p>
                  </div>
                  <p className="text-right font-semibold">
                    ¥{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3 className="flex items-center gap-1.5 pb-2 text-2xl font-bold">
            <MapPin />
            お届け先
          </h3>
          <div className="bg-muted space-y-2 rounded-lg p-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                お名前
              </p>
              <p className="indent-4 font-medium">
                {[cart.recipient.lastName, cart.recipient.firstName, "様"]
                  .filter(Boolean)
                  .join(" ")}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                ご住所
              </p>
              <p className="indent-4 font-medium">{`〒${cart.recipient.address.postalCode.slice(0, 3)}-${cart.recipient.address.postalCode.slice(3)}`}</p>
              <p className="indent-4 leading-tight font-medium">
                {[
                  cart.recipient.address.prefecture,
                  cart.recipient.address.city,
                  cart.recipient.address.town,
                  cart.recipient.address.streetAddress,
                  cart.recipient.address.building,
                ]
                  .filter(Boolean)
                  .join(" ")}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                お電話番号
              </p>
              <p className="indent-4 font-medium">{cart.recipient.phone}</p>
            </div>
          </div>
        </section>
        <section>
          <h3 className="flex items-center gap-1.5 pb-2 text-2xl font-bold">
            <CircleUser />
            ご購入者情報
          </h3>
          <div className="bg-muted space-y-2 rounded-lg p-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                お名前
              </p>
              <p className="indent-4 font-medium">
                {[cart.buyer.lastName, cart.buyer.firstName, "様"]
                  .filter(Boolean)
                  .join(" ")}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                メールアドレス
              </p>
              <p className="indent-4 font-medium">{cart.buyer.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                ご住所
              </p>
              {cart.isGift ? (
                <>
                  <p className="indent-4 font-medium">{`〒${cart.buyer.address.postalCode.slice(0, 3)}-${cart.buyer.address.postalCode.slice(3)}`}</p>
                  <p className="indent-4 leading-tight font-medium">
                    {[
                      cart.buyer.address.prefecture,
                      cart.buyer.address.city,
                      cart.buyer.address.town,
                      cart.buyer.address.streetAddress,
                      cart.buyer.address.building,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  </p>
                </>
              ) : (
                <p className="indent-4 font-medium">- お届け先と同じ -</p>
              )}
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                お電話番号
              </p>
              {cart.isGift ? (
                <p className="indent-4 font-medium">{cart.buyer.phone}</p>
              ) : (
                <p className="indent-4 font-medium">- お届け先と同じ -</p>
              )}
            </div>
          </div>
        </section>
        <section>
          <h3 className="flex items-center gap-1.5 pb-2 text-2xl font-bold">
            <BadgeJapaneseYen />
            ご料金・お支払方法
          </h3>
          <div className="bg-muted space-y-6 rounded-lg p-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                お支払い方法
              </p>
              {payment ? (
                <div>
                  <p className="indent-4 font-medium">{payment.name}</p>
                </div>
              ) : (
                <p>不明</p>
              )}
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                ご請求
              </p>
              <div className="space-y-1">
                <p className="flex items-end justify-between indent-4 text-sm">
                  小計
                  <span className="text-base">
                    ¥{cart.subtotalAmount.toLocaleString()}
                  </span>
                </p>
                <p className="flex items-end justify-between indent-4 text-sm">
                  配送料
                  <span className="text-base">
                    {cart.shippingFee
                      ? `¥${cart.shippingFee.toLocaleString()}`
                      : "無料"}
                  </span>
                </p>
                {cart.payment.method === "cod" && cart.codFee && (
                  <p className="flex items-end justify-between indent-4 text-sm">
                    代引き手数料
                    <span className="text-base">
                      ¥{cart.codFee.toLocaleString()}
                    </span>
                  </p>
                )}
              </div>
              <div className="mt-3 mb-2 ml-4 border-b" />
              <p className="flex items-center justify-between indent-4 font-medium">
                ご請求額
                <span className="items-end text-2xl font-medium">
                  ¥{cart.totalAmount.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </section>
      </CardContent>
      <CardFooter className="justify-between">
        <Button asChild variant="secondary">
          <Link href="/checkout/delivery">戻る</Link>
        </Button>
        <ConfirmForm />
      </CardFooter>
    </Card>
  )
}

const PAYMENT_OPTIONS: (NonNullable<Cart["payment"]> & {
  name: ReactNode
  description: ReactNode
  icon: ReactNode
})[] = [
  {
    method: "card",
    name: "クレジット決済",
    description: "Visa, JCB, Mastercard, AMEX などのカードで即時決済。",
    icon: <CreditCard className="size-full" />,
    type: "immediate",
  },
  {
    method: "convenience",
    name: "コンビニ払い",
    description:
      "コンビニで現金支払い。¥3,300以下のお買い上げの場合は、ご利用いただけません。",
    icon: <Store className="size-full" />,
    type: "immediate",
  },
  {
    method: "wallet",
    name: "デジタルウォレット決済",
    description: "Apple Pay / Google Pay / PayPay で即時決済。",
    icon: <Smartphone className="size-full" />,
    type: "immediate",
  },
  {
    method: "bank",
    name: "銀行振込",
    description:
      "指定の口座にお振込み。振込手数料はお客様にご負担いただきます。",
    icon: <Landmark className="size-full" />,
    type: "immediate",
  },
  {
    method: "cod",
    name: "代金引換（代引き）",
    description:
      "商品受け取り時に配達員に現金でお支払い。購入金額に応じた代引き手数料がかかります。",
    icon: <Truck className="size-full" />,
    type: "deferred",
  },
]
