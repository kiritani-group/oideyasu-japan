import PageTitle from "@/components/page/page-title"
import Daruma from "@/public/food/daruma.jpg"
import Hinedori from "@/public/food/hinedori.jpg"
import Image from "next/image"

const items = [
  { name: "坊ちゃんかぼちゃバター", price: 600 },
  { name: "ぴんぴんタコ焼き", price: 680 },
  { name: "レバにらもやし炒め", price: 800 },
  { name: "越のルビーやっこナッツサラダ", price: 680 },
  { name: "ひね鳥の黒こしょう焼", price: 680 },
  { name: "せせり炭火焼", price: 630 },
  { name: "厚切りベーコンステーキ", price: 680 },
  { name: "米なすの味噌ピザ", price: 600 },
  { name: "しいたけチーズ焼き", price: 600 },
  { name: "新じゃがバター", price: 580 },
  { name: "さつまいもとチーズのコロッケ", price: 500 },
  { name: "温野菜 自家製ポン酢で", price: 780 },
  { name: "温野菜 豚肉追加", price: 220 },
  { name: "とうふとトマトのチーズ焼き", price: 600 },
]

export default function Page() {
  return (
    <>
      <PageTitle title="お食事" subTitle="特選素材 - 旬の野菜とおいしいお肉" />
      <div className="mx-2 my-10 grid grid-cols-1 gap-8 @2xl:grid-cols-2">
        <div className="grid gap-4">
          <div className="relative aspect-square translate-y-0 overflow-hidden rounded-lg opacity-100 shadow-lg transition-all duration-1000 starting:translate-y-3 starting:opacity-0">
            <Image
              src={Daruma}
              alt="だるま"
              priority
              fill
              className="z-0 object-cover"
            />
            <div className="pointer-events-none absolute bottom-0 z-0 w-full bg-gradient-to-t from-black/100 via-black/80 to-black/0 px-4 pt-18 pb-4 text-white">
              厳選されたお肉や山菜・旬の地野菜などなど、こだわりの炭火焼き、こだわりの料理でおもてなしさせていただきます。お楽しみください
            </div>
          </div>
          <div className="relative hidden aspect-square translate-y-0 overflow-hidden rounded-lg opacity-100 shadow-lg transition-all duration-1000 @2xl:block starting:translate-y-3 starting:opacity-0">
            <Image
              src={Hinedori}
              alt="ひね鳥の炭火黒こしょう焼き"
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
                <tr key={item.name} className="w-full not-last:border-b">
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
