import PageTitle from "@/components/page/page-title"
import type { Metadata } from "next"
import ItemsGrid from "../../_components/items-grid"
import { otsumamiItems } from "../items"

export const metadata: Metadata = {
  title: "おつまみ・珍味 通販くらぶ",
}

export default function Page() {
  return (
    <>
      <PageTitle title="お取り寄せ - 通販くらぶ" subTitle="おつまみ・珍味" />
      <section className="mx-2 my-10">
        <ItemsGrid items={otsumamiItems} />
      </section>
    </>
  )
}
