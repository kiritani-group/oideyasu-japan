import { auth } from "@/lib/auth"
import { ArrowLeft } from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import ProductCreateForm from "./_form"

export default async function Page(props: PageProps<"/admin/product/create">) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session?.user.role !== "ADMIN") {
    redirect("/")
  }
  return (
    <>
      <div className="bg-card border-b">
        <div className="flex items-center gap-4 p-3">
          <Link
            href="/admin/product"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">戻る</span>
          </Link>
          <div>
            <h1 className="text-foreground text-2xl font-bold">商品登録</h1>
          </div>
        </div>
      </div>

      <ProductCreateForm />
    </>
  )
}
