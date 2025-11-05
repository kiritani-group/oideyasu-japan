import { Card } from "@/components/ui/card"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import {
  ArrowLeft,
  Box,
  FolderOpen,
  JapaneseYen,
  Package,
  Star,
} from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

export default async function Page(props: PageProps<"/admin/user/[id]">) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session?.user.role !== "ADMIN") {
    redirect("/")
  }
  const { id } = await props.params
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: { select: { name: true } } },
  })
  if (!product) notFound()
  return (
    <>
      <div className="bg-card border-b">
        <div className="flex items-center gap-4 px-6 py-4">
          <Link
            href="/admin/product"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">戻る</span>
          </Link>
          <div>
            <h1 className="text-foreground text-2xl font-bold">商品詳細</h1>
            <p className="text-muted-foreground text-sm">
              商品名: {product.name || "未設定"}
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
                <div>
                  <h2 className="text-foreground text-2xl font-bold">
                    {product.name || "未設定"}
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    商品ID: {product.id}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-foreground font-semibold">商品詳細</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <JapaneseYen className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground">
                      {"￥" + product.price + "-"} (税込み)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Box className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground">
                      {product.isInStock ? "在庫あり" : "在庫なし"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FolderOpen className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground">
                      {product.category
                        ? "カテゴリー: " + product.category.name
                        : "カテゴリー: 指定なし"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 @2xl:grid-cols-1">
            <Card className="p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="text-muted-foreground h-4 w-4" />
                  <p className="text-muted-foreground text-sm">総販売数</p>
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
          </div>
        </div>
      </div>
    </>
  )
}
