import PageTitle from "@/components/page/page-title"
import Bento from "@/public/food/bento.jpg"
import Panf from "@/public/food/panf.jpg"
import Image from "next/image"

const items = [
  { name: "はまち三色丼", price: 880 },
  { name: "タコライス", price: 680 },
  { name: "海鮮丼", price: 880 },
  { name: "おろしそば", price: 480 },
  { name: "じゃこにぎり １ヶ", price: 200 },
  { name: "へしこちゃーはん", price: 780 },
  { name: "なっとうチャーハン", price: 680 },
  { name: "めんたい焼うどん", price: 680 },
  { name: "スタミナ焼おにぎり", price: 500 },
  { name: "へしこ茶漬け", price: 580 },
  { name: "お茶漬け（梅・のり・明太子）", price: 480 },
  { name: "おにぎり", price: 400 },
  { name: "焼おにぎり", price: 400 },
]

export default function Page() {
  return (
    <>
      <PageTitle title="お食事" subTitle="〆の一品" />
      <div className="mx-2 my-10 grid grid-cols-1 gap-8 @2xl:grid-cols-2">
        <div className="grid gap-4">
          <div className="relative aspect-square translate-y-0 overflow-hidden rounded-lg opacity-100 shadow-lg transition-all duration-1000 starting:translate-y-3 starting:opacity-0">
            <Image
              src={Panf}
              alt="パンフレット"
              priority
              fill
              placeholder="blur"
              className="z-0 object-cover"
            />
            <div className="pointer-events-none absolute bottom-0 z-0 w-full bg-gradient-to-t from-black/100 via-black/80 to-black/0 px-4 pt-18 pb-4 text-white">
              〆の一品にガッツリいきたい時鯖のへしこを使ったゴハンなどなどさまざまなシーンに応えます！海鮮丼やタコライス、押し寿司などなど目白押しです！
            </div>
          </div>
          <div className="relative hidden aspect-square translate-y-0 overflow-hidden rounded-lg opacity-100 shadow-lg transition-all duration-1000 @2xl:block starting:translate-y-3 starting:opacity-0">
            <Image src={Bento} alt="弁当" fill className="z-0 object-cover" />
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
