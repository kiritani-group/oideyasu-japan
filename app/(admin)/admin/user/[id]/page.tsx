import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import {
  ArrowLeft,
  Mail,
  MapPin,
  MoreVertical,
  Package,
  Phone,
  Star,
} from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

interface Order {
  id: string
  date: string
  total: string
  items: number
  status: "completed" | "pending" | "cancelled"
}

const orders: Order[] = [
  {
    id: "ORD-001",
    date: "2024年11月1日",
    total: "¥15,800",
    items: 3,
    status: "completed",
  },
  {
    id: "ORD-002",
    date: "2024年10月28日",
    total: "¥8,900",
    items: 2,
    status: "completed",
  },
  {
    id: "ORD-003",
    date: "2024年10月20日",
    total: "¥22,500",
    items: 5,
    status: "completed",
  },
  {
    id: "ORD-004",
    date: "2024年10月15日",
    total: "¥12,300",
    items: 2,
    status: "pending",
  },
  {
    id: "ORD-005",
    date: "2024年10月10日",
    total: "¥18,600",
    items: 4,
    status: "completed",
  },
]

export default async function Page(props: PageProps<"/admin/user/[id]">) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session?.user.role !== "ADMIN") {
    redirect("/")
  }
  const { id } = await props.params
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) notFound()
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-600"
      case "pending":
        return "bg-yellow-500/20 text-yellow-600"
      case "cancelled":
        return "bg-red-500/20 text-red-600"
      default:
        return "bg-gray-500/20 text-gray-600"
    }
  }

  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "完了"
      case "pending":
        return "処理中"
      case "cancelled":
        return "キャンセル"
      default:
        return status
    }
  }
  return (
    <>
      <div className="bg-card border-b">
        <div className="flex items-center gap-4 p-3">
          <Link
            href="/admin/user"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">戻る</span>
          </Link>
          <div>
            <h1 className="text-foreground text-2xl font-bold">顧客詳細</h1>
            <p className="text-muted-foreground text-sm">
              顧客名: {user.name ? user.name + " 様" : "未設定"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-2">
        {/* Customer Info Grid */}
        <div className="grid grid-cols-1 gap-3 @2xl:grid-cols-3">
          {/* Main Customer Card */}
          <div className="@2xl:col-span-2">
            <Card className="space-y-2 p-6">
              <div className="flex items-start justify-between">
                <h2 className="text-foreground text-2xl font-bold text-wrap">
                  {user.name ? user.name + " 様" : "未設定"}
                </h2>
                <Badge
                  variant={
                    user.role === "USER"
                      ? "outline"
                      : user.role === "ADMIN"
                        ? "default"
                        : "secondary"
                  }
                >
                  {user.role === "USER"
                    ? "会員"
                    : user.role === "ADMIN"
                      ? "管理者"
                      : "ゲスト"}
                </Badge>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="text-foreground font-semibold">連絡先情報</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground">
                      {user.email || "登録なし"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground">070-0000-0000</span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <h3 className="text-foreground font-semibold">配送先住所</h3>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
                  <div className="text-foreground">
                    <p>9100000</p>
                    <p>福井県</p>
                    <p>福井市三郎丸</p>
                    <p>2-1706</p>
                    <p>日本</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="space-y-3">
            <Card className="p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="text-muted-foreground h-4 w-4" />
                  <p className="text-muted-foreground text-sm">総注文数</p>
                </div>
                <p className="text-foreground text-2xl font-bold">3</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <p className="text-muted-foreground text-sm">総購入額</p>
                </div>
                <p className="text-foreground text-2xl font-bold">16000</p>
              </div>
            </Card>
            <div className="space-y-3">
              <Button className="w-full bg-transparent" variant="outline">
                連絡
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                注文を作成
              </Button>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-foreground text-lg font-semibold">注文履歴</h3>
            <Button variant="outline" size="sm">
              すべて表示
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-border border-b">
                  <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                    注文ID
                  </th>
                  <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                    日付
                  </th>
                  <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                    商品数
                  </th>
                  <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                    合計
                  </th>
                  <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                    ステータス
                  </th>
                  <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-border hover:bg-muted/30 border-b transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="text-foreground text-sm font-medium">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-foreground text-sm">
                        {order.date}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-foreground text-sm">
                        {order.items}件
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-foreground text-sm font-medium">
                        {order.total}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded px-2 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  )
}
