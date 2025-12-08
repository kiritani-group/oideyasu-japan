import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function PaymentFailed({
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
      <div className="overflow-hidden rounded-lg border border-red-100 bg-white shadow-lg">
        {/* ヘッダー - エラーメッセージ */}
        <div className="bg-linear-to-r from-red-500/75 to-red-600/75 px-6 py-8 text-center text-white">
          <AlertCircle className="mx-auto mb-3 h-12 w-12" />
          <h1 className="text-2xl font-bold">支払い処理に失敗いたしました</h1>
          <p className="mt-2 text-sm text-red-100">
            お手数ですが、お支払い方法をご確認ください
          </p>
        </div>

        {/* コンテンツ */}
        <div className="space-y-6 p-6">
          {/* ご注文番号 */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="mb-2 text-xs text-gray-600">ご注文番号</p>
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-lg font-bold text-red-700">
                {order.orderNumber}
              </p>
            </div>
            <p className="mt-2 text-xs text-gray-600">
              お問い合わせの際にこちらの番号をご使用ください
            </p>
          </div>

          {/* エラー情報 */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-red-600" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  支払い処理エラー
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  クレジットカード、銀行口座、またはお支払い方法のいずれかに問題が発生しました。
                </p>
              </div>
            </div>
          </div>

          {/* 対応方法 */}
          <div className="border-t border-gray-200 pt-6">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-semibold text-gray-900">
                <RefreshCw className="h-5 w-5 text-red-600" />
                対応方法
              </h3>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                    1
                  </span>
                  <p className="text-sm text-gray-700">
                    お支払い方法を確認し、情報を修正してください
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                    2
                  </span>
                  <p className="text-sm text-gray-700">
                    修正後、もう一度お支払いをお試しください
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                    3
                  </span>
                  <p className="text-sm text-gray-700">
                    それでも失敗する場合は、別のお支払方法をおためしください
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button asChild>
              <Link href="/checkout/payment">お支払いページへ戻る</Link>
            </Button>
          </div>
        </div>

        {/* フッター */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 text-center">
          <p className="text-xs text-gray-600">
            サポート対応時間：9:00 - 18:00（土日祝除く）
          </p>
        </div>
      </div>
    </div>
  )
}
