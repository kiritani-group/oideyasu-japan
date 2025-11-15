"use client"

import PageTitle from "@/components/page/page-title"
import { Progress } from "@/components/ui/progress"
import { usePathname } from "next/navigation"

const steps = [
  { progress: 10, path: "/checkout", title: "ログイン" },
  { progress: 25, path: "/checkout/cart", title: "商品の確認" },
  { progress: 40, path: "/checkout/customer", title: "お客様情報・お届け先" },
]

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathName = usePathname()
  const step = steps.find((step) => step.path === pathName)
  return (
    <>
      <PageTitle title="購入手続き" subTitle={step?.title || ""} />
      <div className="mx-2 my-10 space-y-5 @xl:mx-4">
        <Progress value={step?.progress} className="mx-auto w-[60%]" />
        {children}
      </div>
    </>
  )
}
