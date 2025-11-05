import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import {
  ArrowLeft,
  Box,
  FolderOpen,
  Globe,
  JapaneseYen,
  Package,
  Star,
} from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import EditStock from "./_components/edit-stock"

export default async function Page(props: PageProps<"/admin/product/[id]">) {
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
  const now = new Date().getTime()
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
              <div className="flex items-start justify-between gap-1.5">
                <h2 className="text-foreground text-2xl font-bold text-wrap">
                  {product.name || "未設定"}
                </h2>
                <Badge
                  variant={
                    product.deletedAt
                      ? "destructive"
                      : product.isActive
                        ? "secondary"
                        : "secondary"
                  }
                  className={
                    product.deletedAt
                      ? ""
                      : product.isActive
                        ? "bg-green-500 text-white"
                        : "secondary"
                  }
                >
                  {product.deletedAt
                    ? "削除済み"
                    : product.isActive
                      ? "HP掲載"
                      : "非公開"}
                </Badge>
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
                    <Globe className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground">
                      {product.deletedAt
                        ? "削除済み"
                        : product.isActive
                          ? "HP掲載"
                          : "非公開"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Box className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground">
                      {product.isInStock ? "在庫あり" : "在庫なし"}
                      {product.isInStock &&
                        product.stock > 0 &&
                        `（${product.stock}）`}
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
              <div className="space-y-3">
                <h3 className="text-foreground font-semibold">各種設定</h3>
                <div className="grid grid-cols-3 gap-2">
                  <EditStock key={now} product={product} />
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

        <Card className="border-destructive/50 mt-20 overflow-hidden pb-0">
          <CardHeader>
            <CardTitle>商品を削除</CardTitle>
            <CardDescription className="border-b pb-3">
              この商品を今後販売する予定がない場合にこの操作を行ってください。
              <br />
              ホームページから一時的に非表示にするだけの場合はこの操作は適していません。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              削除する商品：<span className="font-bold">{product.name}</span>
            </p>
          </CardContent>
          <CardFooter className="bg-destructive/10 justify-end py-3">
            <Button variant="destructive">商品を削除</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
