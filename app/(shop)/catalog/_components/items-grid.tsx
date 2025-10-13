import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "../category/items"

export default function ItemsGrid({ items }: { items: Product[] }) {
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
    <div className="grid grid-cols-2 gap-x-2 gap-y-6 @2xl:grid-cols-[repeat(auto-fill,_minmax(16rem,_1fr))] @2xl:gap-x-4">
      {items.map((item, index) => (
        <Link
          key={item.id}
          href={item.url}
          className={cn(
            "translate-y-0 space-y-1.5 opacity-100 transition-all duration-1000 starting:translate-y-3 starting:opacity-0",
            index < 10 ? delay[index].value : "delay-1000",
          )}
        >
          <div className="relative aspect-square overflow-hidden rounded-sm">
            <Image
              src={item.imageSrc}
              alt={`「${item.title}」の商品画像`}
              sizes="300px"
              fill
              className="z-10 object-contain"
            />
            <Image
              src={item.imageSrc}
              alt="ぼかし画像"
              quality={5}
              sizes="300px"
              fill
              className="z-0 scale-120 object-cover opacity-60 blur-[2px]"
            />
          </div>
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="line-clamp-3 text-sm opacity-75">
              {item.description}
            </p>
            <p className="px-1.5 text-end font-semibold">
              &yen;{item.price.toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
