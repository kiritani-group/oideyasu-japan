import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Cart, getCart } from "@/lib/cart"
import { CreditCard, Landmark, Smartphone, Store, Truck } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"

export default async function Page() {
  const cart = await getCart()
  // if (!cart) redirect("/")
  // if (!cart.buyer) redirect("/checkout/customer")
  // if (
  //   cart.isGift === undefined ||
  //   !cart.buyer.address ||
  //   (cart.isGift && !cart.recipient)
  // )
  //   redirect("/checkout/shipping")
  // if (!cart.payment) redirect("/checkout/delivery")

  // const items = cart.items
  // const subtotalAmount = items.reduce(
  //   (acc, item) => acc + item.product.price * item.quantity,
  //   0,
  // )
  // const shippingFee = subtotalAmount >= 10000 ? 0 : 770
  // const totalAmount = subtotalAmount + shippingFee

  // const { address: buyerAdress, ...buyer } = cart.buyer
  // const { recipient: recipientAddress, ...redirect } = cart?.recipient

  // const payment = PAYMENT_OPTIONS.find((o) => o.method === cart.payment?.method)

  // const shippingAddress = isGift ? recipient : buyerWithoutEmail

  return (
    <Card>
      <CardHeader>
        <CardTitle>最終確認</CardTitle>
        <CardDescription>
          ご注文を確定して、お支払いに進んでください。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* <section>
          <h3 className="flex items-center gap-1.5 pb-2 text-2xl font-bold">
            <List />
            注文商品
          </h3>
          <div className="bg-muted divide-y rounded-lg p-2">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 p-2">
                <div className="bg-background relative size-16 shrink-0 overflow-hidden rounded-lg @xl:size-24">
                  <Image
                    src={"/placeholder.svg"}
                    fill
                    alt={item.product.name}
                    sizes="80px"
                    className="object-cover"
                  />
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
                {[shippingAddress.lastName, shippingAddress.firstName, "様"]
                  .filter(Boolean)
                  .join(" ")}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                ご住所
              </p>
              <p className="indent-4 font-medium">{`〒${shippingAddress.postalCode.slice(0, 3)}-${shippingAddress.postalCode.slice(3)}`}</p>
              <p className="indent-4 leading-tight font-medium">
                {[
                  shippingAddress.prefecture,
                  shippingAddress.city,
                  shippingAddress.town,
                  shippingAddress.streetAddress,
                  shippingAddress.building,
                ]
                  .filter(Boolean) // 空文字・null・undefined を除外
                  .join(" ")}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                お電話番号
              </p>
              <p className="indent-4 font-medium">
                {shippingAddress.phoneNumber}
              </p>
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
                {[buyer.lastName, buyer.firstName, "様"]
                  .filter(Boolean)
                  .join(" ")}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                メールアドレス
              </p>
              <p className="indent-4 font-medium">{buyer.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                ご住所
              </p>
              {isGift ? (
                <>
                  <p className="indent-4 font-medium">{`〒${buyer.postalCode.slice(0, 3)}-${buyer.postalCode.slice(3)}`}</p>
                  <p className="indent-4 leading-tight font-medium">
                    {[
                      buyer.prefecture,
                      buyer.city,
                      buyer.town,
                      buyer.streetAddress,
                      buyer.building,
                    ]
                      .filter(Boolean) // 空文字・null・undefined を除外
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
              {isGift ? (
                <p className="indent-4 font-medium">{buyer.phoneNumber}</p>
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
                  <p className="text-foreground/80 indent-4 text-xs">
                    ご注文確定後にお支払い方法をご案内いたします。
                  </p>
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
                    ¥{subtotalAmount.toLocaleString()}
                  </span>
                </p>
                <p className="flex items-end justify-between indent-4 text-sm">
                  配送料
                  <span className="text-base">
                    {shippingFee ? `¥${shippingFee.toLocaleString()}` : "無料"}
                  </span>
                </p>
                <p className="flex items-end justify-between indent-4 text-sm">
                  代引き手数料
                  <span className="text-base">
                    {shippingFee ? `¥${shippingFee.toLocaleString()}` : "無料"}
                  </span>
                </p>
              </div>
              <div className="mt-3 mb-2 ml-4 border-b" />
              <p className="flex items-center justify-between indent-4 font-medium">
                ご請求額
                <span className="items-end text-2xl font-medium">
                  ¥{totalAmount.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </section> */}
      </CardContent>
      <CardFooter className="justify-between">
        <Button asChild variant="secondary">
          <Link href="/checkout/delivery">戻る</Link>
        </Button>
        <Button asChild>
          <Link href="/checkout/payment">注文を確定して支払いへ</Link>
        </Button>
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
