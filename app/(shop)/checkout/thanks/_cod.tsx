import { CheckCircle, Clock, CreditCard, Truck } from "lucide-react"

export default async function Cod({
  order,
}: {
  order: {
    orderNumber: string
    totalAmount: number
    buyerLastName: string
    buyerFirstName: string
    buyerPhone: string
    buyerEmail: string
  }
}) {
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

          {/* 支払い情報 */}
          <div className="border-t border-gray-200 pt-6">
            <div className="space-y-4">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">お支払い方法</h3>
                </div>
                <p className="text-sm text-gray-700">代金引換（代引き）</p>
              </div>

              {/* 支払い金額 */}
              <div className="rounded-lg border border-amber-100 bg-linear-to-r from-amber-50 to-orange-50 p-4">
                <p className="mb-1 text-sm text-gray-600">
                  お届け時にお支払いください
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  ¥{order.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* 注意事項 */}
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  ご用意のほどよろしくお願いいたします
                </p>
                <p className="mt-1 text-xs text-gray-700">
                  お届け時にドライバーにお支払いください。
                </p>
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
