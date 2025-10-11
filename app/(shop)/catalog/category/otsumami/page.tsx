import Image from "next/image"
import Link from "next/link"
import { otsumamiItems } from "../items"

export default function Page() {
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-6 p-2 pb-6 @2xl:grid-cols-[repeat(auto-fill,_minmax(16rem,_1fr))] @2xl:gap-x-4">
      {otsumamiItems.map((item) => (
        <Link href={item.url} className="space-y-1.5" key={item.title}>
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
