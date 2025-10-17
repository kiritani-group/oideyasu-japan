import PageTitle from "@/components/page/page-title"
import { products } from "@/data/products"
import HeadImage from "@/public/catalog/salmon-smoked-jerky/salmon-smoked-jerky_01.jpg"
import type { Metadata } from "next"
import Image from "next/image"
import ItemsGrid from "../../_components/items-grid"

export const metadata: Metadata = {
  title: "おつまみ・珍味 通販くらぶ",
}

export default function Page() {
  const otsumamiItems = products.filter((item) => item.category === "OTSUMAMI")
  return (
    <>
      <PageTitle title="お取り寄せ - 通販くらぶ" subTitle="おつまみ・珍味" />
      <div className="relative mx-2 my-10 translate-y-0 overflow-hidden rounded-lg p-6 opacity-100 shadow-lg transition-all duration-1000 sm:p-8 lg:p-10 starting:translate-y-3 starting:opacity-0">
        <Image
          src={HeadImage}
          alt=""
          priority
          fill
          className="z-0 object-cover"
        />
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/80 to-black/80 @3xl:via-black/75 @3xl:to-black/0" />
        <div className="relative z-10 text-white @3xl:mr-auto @3xl:w-1/2">
          <h2 className="mb-4 text-xl tracking-wide @3xl:text-2xl">
            越前の海 美味しい海の幸
          </h2>
          <div className="space-y-4 @3xl:text-lg">
            <p className="leading-relaxed text-pretty @3xl:leading-loose">
              越前の海でとれた新鮮な魚介類を使ったおつまみ・珍味の数々。
              <br />
              お酒のお供にぴったりな商品を取り揃えております。
              <br />
              本来の旨味をより一層引き出すために、素材選びから製造までこだわり抜いております。
            </p>
            <p className="leading-relaxed text-pretty @3xl:leading-loose">
              お家での晩酌や特別な日の贈り物にぜひご利用ください。
            </p>
          </div>
        </div>
      </div>
      <section className="mx-2 my-10">
        <ItemsGrid items={otsumamiItems} />
      </section>
    </>
  )
}
