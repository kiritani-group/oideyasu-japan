import PageTitle from "@/components/page/page-title"
import Ebi from "@/public/food/ebi.jpg"
import Sakana from "@/public/food/sakana.jpg"
import Image from "next/image"

const items = [
  { name: "地物天然 岩がき １ヶ", price: 580 },
  { name: "鮮鮮 さば刺し", price: 800 },
  { name: "美味 あじ", price: 800 },
  { name: "きも醤油 かわはぎ", price: 800 },
  { name: "甘みの 車鯛", price: 800 },
  { name: "天然 はまち", price: 780 },
  { name: "絶品 きじはた", price: 800 },
  { name: "地物 石たこ", price: 680 },
  { name: "甘～い 真いか", price: 800 },
  { name: "酢じめ 小鯛", price: 780 },
  { name: "本日の刺身５種盛り", price: 1380 },
  { name: "岩もずく 漁師風", price: 480 },
  { name: "ユッケはまち", price: 780 },
  { name: "自家製 さば熟れ寿司", price: 800 },
  { name: "サクサク あじふらい", price: 780 },
  { name: "いか 丸焼き", price: 780 },
  { name: "あじのさんが焼", price: 800 },
  { name: "ぶりかま炭火焼", price: 800 },
  { name: "サクサク あじフライ", price: 800 },
  { name: "はまち３色丼", price: 880 },
]

export default function Page() {
  return (
    <>
      <PageTitle title="お食事" subTitle="獲れたて新鮮なお魚" />
      <div className="mx-2 my-10 grid grid-cols-1 gap-8 @2xl:grid-cols-2">
        <div className="grid gap-4">
          <div className="relative aspect-square translate-y-0 overflow-hidden rounded-lg opacity-100 shadow-lg transition-all duration-1000 starting:translate-y-3 starting:opacity-0">
            <Image src={Ebi} alt="エビ" fill className="z-0 object-cover" />
            <div className="pointer-events-none absolute bottom-0 z-0 w-full bg-gradient-to-t from-black/100 via-black/80 to-black/0 px-4 pt-18 pb-4 text-white">
              福井は越前海岸に面した魚の宝庫です。海の恵みを追い求めて自ら海岸線を奔走し漁師さんから直接厳選仕入れしています。美味しいお魚たちをぜひご賞味あ～れ～！！
            </div>
          </div>
          <div className="relative hidden aspect-square translate-y-0 overflow-hidden rounded-lg opacity-100 shadow-lg transition-all duration-1000 @2xl:block starting:translate-y-3 starting:opacity-0">
            <Image
              src={Sakana}
              alt="新鮮な魚"
              fill
              className="z-0 object-cover"
            />
            <div className="pointer-events-none absolute bottom-0 z-0 w-full bg-gradient-to-t from-black/100 via-black/80 to-black/0 px-4 pt-18 pb-4 text-white">
              直仕入れの鮮魚たちです。
            </div>
          </div>
        </div>
        <section>
          <table className="w-full">
            <tbody>
              {items.map((item) => (
                <tr key={item.name} className="w-full border-b">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2 text-end">
                    &yen;{item.price.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  )
}
