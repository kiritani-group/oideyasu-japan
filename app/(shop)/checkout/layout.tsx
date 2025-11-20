"use client"

import PageTitle from "@/components/page/page-title"
import { Progress } from "@/components/ui/progress"
import { usePathname } from "next/navigation"

const steps = [
  { progress: 10, path: "/checkout", title: "ログイン" },
  { progress: 25, path: "/checkout/cart", title: "商品の確認" },
  { progress: 40, path: "/checkout/customer", title: "お客様情報" },
  { progress: 60, path: "/checkout/shipping", title: "お届け先情報" },
  { progress: 85, path: "/checkout/delivery", title: "配送/支払い方法" },
  { progress: 95, path: "/checkout/confirm", title: "最終確認" },
  { progress: 100, path: "/checkout/payment", title: "お支払い" },
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
