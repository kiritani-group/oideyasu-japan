import PageTitle from "@/components/page/page-title"
import { products } from "@/data/products"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "通販くらぶ",
}

export default async function Page(props: PageProps<"/catalog/[slug]">) {
  const { slug } = await props.params
  const product = products.find((item) => item.slug === slug)
  if (!product) notFound()
  return (
    <>
      <PageTitle title="商品詳細" subTitle={product.title} />
      <section className="mx-2 my-10">
        {/* <ItemsGrid items={products} /> */}
      </section>
    </>
  )
}
