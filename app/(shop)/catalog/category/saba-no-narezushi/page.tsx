import PageTitle from "@/components/page/page-title"
import Narezushi from "@/public/saba-no-narezushi.jpg"
import type { Metadata } from "next"
import Image from "next/image"
import ItemsGrid from "../../_components/items-grid"
import { sabaItems } from "../items"

export const metadata: Metadata = {
  title: "鯖なれずし 通販くらぶ",
}

export default function Page() {
  return (
    <>
      <PageTitle title="お取り寄せ - 通販くらぶ" subTitle="鯖なれずし" />
      <div className="relative mx-2 my-10 translate-y-0 overflow-hidden rounded-lg p-6 opacity-100 shadow-lg transition-all duration-1000 sm:p-8 lg:p-10 starting:translate-y-3 starting:opacity-0">
        <Image
          src={Narezushi}
          alt="鯖のなれずし"
          priority
          fill
          className="z-0 object-cover"
        />
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-l from-black/80 via-black/80 to-black/80 @3xl:via-black/75 @3xl:to-black/0" />{" "}
        <div className="relative z-10 text-white @3xl:ml-auto @3xl:w-1/2">
          <h2 className="mb-4 text-xl tracking-wide @3xl:text-2xl">
            鯖なれずし
          </h2>
          <div className="space-y-4 @3xl:text-lg">
            <p className="leading-relaxed text-pretty @3xl:leading-loose">
              鯖なれずしは、越前福井では昔から作られてきた伝統食品です。
              <br />
              乳酸菌が発酵の過程で豊富になります。
              <br />
              ヨーグルトの様な爽やかな酸味と麹がお米から引き出す優しい甘味。
              <br />
              それとさばの旨みがあいまってとっても美味しい『なれずし』に仕上げています。
            </p>
            <p className="leading-relaxed text-pretty @3xl:leading-loose">
              歴史と伝統が生んだ雪国ならではの味をぜひとも味わいください。
              <br />
              材料選びから、仕込み・発酵・製品化までを一貫し行っておりますので安心してお求めください。
              <br />
              適当な大きさに切って、米糀と共にどうぞ。
              <br />
              皮の面を軽く焼いても美味です。
            </p>
            <div className="flex gap-2">
              <p>主な材料</p>
              <ul className="pl-6">
                <li>さば（国産）</li>
                <li>麹（国嶋清平商店）</li>
                <li>米（福井県産こしひかり）</li>
              </ul>
            </div>
            <p className="leading-relaxed text-pretty @3xl:leading-loose">
              麹と鯖が生み出す自然な甘みと旨みは絶品です。
              <br />
              多くの皆様に当店のなれずしの美味しさを味わっていただければ幸いです。
              <br />
              真空パック（賞味期限包装日より3週間）にてお届けしますので贈答用などにもご利用ください。
            </p>
          </div>
        </div>
      </div>
      <section className="mx-2 my-10">
        <ItemsGrid items={sabaItems} />
      </section>
    </>
  )
}
