import PageTitle from "@/components/page/page-title"
import ItemsGrid from "./_components/items-grid"
import { kaniItems, otsumamiItems, sabaItems } from "./category/items"

export default function Page() {
  return (
    <>
      <PageTitle title="お取り寄せ - 通販くらぶ" subTitle="商品一覧" />
      <section className="mx-2 my-10">
        <ItemsGrid items={[...otsumamiItems, ...sabaItems, ...kaniItems]} />
      </section>
    </>
  )
}
