"use cache"

import PageTitle from "@/components/page/page-title"
import { products } from "@/data/products"
import type { Metadata } from "next"
import { cacheLife } from "next/cache"
import { notFound } from "next/navigation"
import About from "./_components/about"
import ProductImages from "./_components/images"

export const metadata: Metadata = {
  title: "通販くらぶ",
}

export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }))
}

export default async function Page(props: PageProps<"/catalog/[slug]">) {
  cacheLife("hours")
  const { slug } = await props.params
  const product = products.find((item) => item.slug === slug)
  if (!product) notFound()
  return (
    <>
      <PageTitle title="商品詳細" subTitle={product.title} />
      <section className="mx-2 my-10 grid gap-6 @xl:grid-cols-2">
        <ProductImages product={product} />
        <About product={product} />
      </section>
    </>
  )
}
