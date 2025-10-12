import ItemsGrid from "./_components/items-grid"
import PageTitle from "./_components/page-title"
import { otsumamiItems, sabaItems } from "./category/items"

export default function Page() {
  return (
    <>
      <PageTitle title="商品一覧" />
      <section className="mx-2 my-10">
        <ItemsGrid items={[...otsumamiItems, ...sabaItems]} />
      </section>
    </>
  )
}
