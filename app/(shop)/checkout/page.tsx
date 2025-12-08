import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getSessionUser } from "@/lib/auth"
import { MapPin, Package } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Page() {
  const user = await getSessionUser()
  const isAnonymous = user ? user?.isAnonymous || false : false
  if (user && !isAnonymous) redirect("/checkout/cart")
  return (
    <Card>
      <CardHeader>
        <CardTitle>アカウントにログインして、もっと便利に</CardTitle>
        <CardDescription>
          次回からのお買い物がもっと快適になります
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 @xl:grid-cols-2">
        {/* メリット1 */}
        <div className="flex gap-3 rounded-lg border border-blue-100 bg-blue-200/10 p-3 backdrop-blur-sm">
          <div className="shrink-0">
            <Package className="h-5 w-5 shrink-0 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-blue-900">
              配送状況をいつでも確認
            </h3>
            <p className="text-xs text-blue-700">
              リアルタイムで配達状況をチェック
            </p>
          </div>
        </div>

        {/* メリット2 */}
        <div className="flex gap-3 rounded-lg border border-blue-100 bg-blue-200/10 p-3 backdrop-blur-sm">
          <div className="shrink-0">
            <MapPin className="h-5 w-5 shrink-0 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-blue-900">
              住所入力が簡単に
            </h3>
            <p className="text-xs text-blue-700">保存済み住所から選択可能</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 @xl:flex-row-reverse">
        <Button className="w-full cursor-pointer @xl:w-fit">
          ログインする
        </Button>
        <Button asChild variant="secondary" className="w-full @xl:w-fit">
          <Link href="/checkout/cart">ログインせずに続ける</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
