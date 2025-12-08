import { getSessionUser } from "@/lib/auth"
import { getCart, getCartKey } from "@/lib/cart"
import prisma from "@/lib/prisma"
import { redis } from "@/lib/redis"
import { CheckCircle, Truck } from "lucide-react"
import { redirect } from "next/navigation"
import { Stripe } from "stripe"
import Cod from "./_cod"
import PaymentFailed from "./_payment-failed"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { payment_intent, cod_mode, order_number } = await searchParams

  const user = await getSessionUser()
  if (!user) redirect("/")

  const orderNumber =
    typeof order_number === "string" ? order_number || null : null
  if (!orderNumber) return redirect("/")
  const order = await prisma.order.findFirst({
    where: { orderNumber, userId: user.id },
  })
  if (!order) return redirect("/")

  const isCodOrder = cod_mode === "true"
  if (isCodOrder) return <Cod order={order} />

  const paymentIntentId =
    typeof payment_intent === "string" ? payment_intent || null : null
  if (!paymentIntentId) return redirect("/")

  const pi = await stripe.paymentIntents.retrieve(paymentIntentId)

  if (!pi) redirect("/")

  if (pi.status !== "succeeded") {
    return <PaymentFailed order={order} />
  }

  const cartKey = getCartKey(user.id)
  const cart = await getCart(user.id)
  console.dir(cart, { depth: null })
  if (cart?.items && cart?.items.length > 0) {
    await redis.hset(cartKey, { items: [] })
    await redis.hdel(cartKey, "recipient", "isGift", "payment", "order")
    redirect(
      `/checkout/thanks?payment_intent=${paymentIntentId}&order_number=${orderNumber}`,
    )
  }
  return (
    <div>
      {/* メインカード */}
      <div className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-lg">
        {/* ヘッダー - 成功メッセージ */}
        <div className="bg-linear-to-r from-blue-500 to-blue-600 px-6 py-8 text-center text-white">
          <CheckCircle className="mx-auto mb-3 h-12 w-12" />
          <h1 className="text-2xl font-bold">ご注文ありがとうございます</h1>
        </div>

        {/* コンテンツ */}
        <div className="space-y-6 p-6">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="mb-2 text-xs text-gray-600">ご注文番号</p>
            <p className="font-mono text-lg font-bold text-blue-700">
              {order.orderNumber}
            </p>
            <p className="mt-2 text-xs text-gray-600">
              お問い合わせの際にこちらの番号をご使用ください
            </p>
          </div>

          {/* 配送状況 */}
          <div className="rounded-lg bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <Truck className="mt-1 h-5 w-5 shrink-0 text-blue-600" />
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">配送について</h3>
                <div>
                  <p className="text-sm text-gray-700">
                    店舗側で内容の確認を行い、できる限り早く発送いたします。
                  </p>
                  <p className="text-sm text-gray-700">
                    ご到着までしばらくお待ちくださいませ。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 text-center">
          <p className="text-xs text-gray-600">
            ご注文内容はご入力いただいたメールアドレスに送信されますが、念のため、ご注文番号をお手元にお控えくださいませ。
          </p>
        </div>
      </div>

      {/* サポート情報 */}
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>ご不明な点やお問い合わせは</p>
        <p className="font-medium text-blue-600">0776-28-0828</p>
      </div>
    </div>
  )
}
