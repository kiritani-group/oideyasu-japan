import PageTitle from "@/components/page/page-title"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "アクセス・お問い合わせ",
}

export default function Page() {
  return (
    <>
      <PageTitle
        title="アクセス・お問い合わせ"
        subTitle="お気軽にお問い合わせください"
      />
      <div className="p-6 text-center">
        準備中
        <p>google Map 及び モバイル対応の電話発信ボタンを設置</p>
      </div>
    </>
  )
}
