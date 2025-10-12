import ItemsGrid from "../../_components/items-grid"
import PageTitle from "../../_components/page-title"
import { otsumamiItems } from "../items"

export default function Page() {
  return (
    <>
      <PageTitle title="おつまみ・珍味" />
      <section className="mx-2 my-10">
        <ItemsGrid items={otsumamiItems} />
      </section>
    </>
  )
}
