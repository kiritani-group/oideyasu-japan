"use cache"

import PageTitle from "@/components/page/page-title"
import type { Metadata } from "next"
import ItemsGrid from "./_components/items-grid"

export const metadata: Metadata = {
  title: "通販くらぶ",
}

export default async function Page() {
  return (
    <>
      <PageTitle title="お取り寄せ - 通販くらぶ" subTitle="商品一覧" />
      <section className="mx-2 my-10 @xl:mx-4">
        <ItemsGrid />
      </section>
    </>
  )
}
