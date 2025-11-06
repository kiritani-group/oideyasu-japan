import { Badge } from "@/components/ui/badge"
import prisma from "@/lib/prisma"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default async function ItemsGrid({
  categorySlugs,
}: {
  categorySlugs?: string[]
}) {
  "use cache"
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      deletedAt: null,
      category: categorySlugs ? { slug: { in: categorySlugs } } : {},
    },
    orderBy: [{ categoryId: "asc" }, { displayOrder: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      thumbnailUrl: true,
    },
  })
  const delay = [
    {
      key: 0,
      value: "delay-100",
    },
    {
      key: 1,
      value: "delay-200",
    },
    {
      key: 2,
      value: "delay-300",
    },
    {
      key: 3,
      value: "delay-400",
    },
    {
      key: 4,
      value: "delay-500",
    },
    {
      key: 5,
      value: "delay-600",
    },
    {
      key: 6,
      value: "delay-700",
    },
    {
      key: 7,
      value: "delay-800",
    },
    {
      key: 8,
      value: "delay-900",
    },
    {
      key: 9,
      value: "delay-1000",
    },
  ]
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-3.5 @2xl:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] @2xl:gap-x-4">
      {products.map((product, index) => (
        <Link
          key={product.id}
          href={`/catalog/${product.slug}`}
          className={cn(
            "relative translate-y-0 space-y-1.5 opacity-100 transition-all duration-1000 starting:translate-y-3 starting:opacity-0",
            index < 10 ? delay[index].value : "delay-1000",
            "after:bg-muted-foreground/30 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-1/3 after:rounded-full after:transition-transform after:duration-700 after:content-[''] hover:after:translate-x-[200%] hover:after:delay-200",
          )}
        >
          {product.thumbnailUrl ? (
            <div className="relative aspect-square overflow-hidden rounded-sm">
              <Image
                src={product.thumbnailUrl || ""}
                alt={`「${product.name}」の商品画像`}
                sizes="300px"
                fill
                className="z-10 object-contain"
              />
              <Image
                src={product.thumbnailUrl || ""}
                alt="ぼかし画像"
                quality={5}
                sizes="300px"
                fill
                className="bg-muted-foreground/30 z-0 scale-120 object-cover opacity-60 blur-[2px]"
              />
            </div>
          ) : (
            <div className="bg-muted-foreground/50 flex aspect-square items-center justify-center overflow-hidden rounded-sm">
              <Badge variant="secondary">画像準備中</Badge>
            </div>
          )}
          <div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="line-clamp-3 text-sm opacity-75">
              {product.description}
            </p>
            <p className="px-1.5 pb-2 text-end font-semibold">
              &yen;{product.price.toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
