import PageTitle from "@/components/page/page-title"
import Echizengani from "@/public/echizen-gani.jpg"
import Image from "next/image"

export default function Page() {
  return (
    <>
      <PageTitle title="お取り寄せ - 通販くらぶ" subTitle="越前がに" />
      <div className="relative mx-2 my-10 translate-y-0 overflow-hidden rounded-lg p-6 opacity-100 shadow-lg transition-all duration-1000 sm:p-8 lg:p-10 starting:translate-y-3 starting:opacity-0">
        <Image
          src={Echizengani}
          alt="越前がに"
          priority
          fill
          className="z-0 object-cover"
        />
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/80 to-black/80 @3xl:via-black/75 @3xl:to-black/0" />
        <div className="relative z-10 text-white @3xl:mr-auto @3xl:w-1/2">
          <h2 className="mb-4 text-xl tracking-wide @3xl:text-2xl">越前がに</h2>
          <div className="space-y-4 @3xl:text-lg">
            <p className="leading-relaxed text-pretty @3xl:leading-loose">
              冬の味覚本場の『越前がに』
              <br />
              １１月初旬の解禁日よりしばらくの間しか楽しめないホントに美味しい越前ブランドです。
              <br />
              オスの越前ずわいがにメスの越前せいこがにどちらもくらべもののない素晴らしい味わいです。
              <br />
              一度食べたら味の違いにビックリ！！一年に一度は召し上がって頂きたい絶品の味です。
            </p>
            <p className="leading-relaxed text-pretty @3xl:leading-loose">
              当店では産地直送にて新鮮なうちに塩ゆでして美味しいうちにお届けします。
            </p>
          </div>
        </div>
      </div>
      {/* <section className="mx-2 my-10">
        <ItemsGrid items={sabaItems} />
      </section> */}
      <div className="p-6 pb-12 text-center">準備中</div>
    </>
  )
}
