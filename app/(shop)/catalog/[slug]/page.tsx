import PageTitle from "@/components/page/page-title"
import prisma from "@/lib/prisma"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import About from "./_components/about"
import ProductImages from "./_components/images"

export const metadata: Metadata = {
  title: "通販くらぶ",
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    where: { isActive: true, deletedAt: null },
    select: { slug: true },
  })
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function Page(props: PageProps<"/catalog/[slug]">) {
  const { slug } = await props.params
  const product = await fetchProduct(slug)
  if (!product) notFound()
  return (
    <>
      <PageTitle title="商品詳細" subTitle={product.name} />
      <section className="mx-2 my-10 grid gap-6 @xl:mx-4 @xl:grid-cols-2">
        <ProductImages product={product} />
        <About product={product} />
      </section>
    </>
  )
}

async function fetchProduct(slug: string) {
  "use cache"
  return await prisma.product.findFirst({
    where: { slug, isActive: true, deletedAt: null },
    select: {
      id: true,
      name: true,
      price: true,
      isInStock: true,
      description: true,
      images: { select: { url: true }, orderBy: { order: "asc" } },
    },
  })
}
