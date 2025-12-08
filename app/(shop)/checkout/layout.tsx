"use client"

import PageTitle from "@/components/page/page-title"
import { Progress } from "@/components/ui/progress"
import { usePathname } from "next/navigation"

const steps = [
  { progress: 10, path: "/checkout", subTitle: "ログイン" },
  { progress: 25, path: "/checkout/cart", subTitle: "商品の確認" },
  { progress: 40, path: "/checkout/customer", subTitle: "お客様情報" },
  { progress: 60, path: "/checkout/shipping", subTitle: "お届け先情報" },
  { progress: 80, path: "/checkout/delivery", subTitle: "配送/支払い方法" },
  { progress: 90, path: "/checkout/confirm", subTitle: "最終確認" },
  { progress: 98, path: "/checkout/payment", subTitle: "お支払い" },
  {
    progress: 98,
    path: "/checkout/thanks",
    title: "ありがとうございます",
    subTitle: "配送の準備を行います",
  },
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
      {step?.path !== "/checkout/thanks" && (
        <PageTitle
          title={step?.title || "購入手続き"}
          subTitle={step?.subTitle || ""}
        />
      )}
      <div className="mx-2 my-10 space-y-5 @xl:mx-4">
        {step?.path !== "/checkout" && step?.path !== "/checkout/thanks" && (
          <Progress value={step?.progress} className="mx-auto w-[60%]" />
        )}
        {children}
      </div>
    </>
  )
}
