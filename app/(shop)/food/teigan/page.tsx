import PageTitle from "@/components/page/page-title"

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
      <PageTitle title="お食事" subTitle="定番" />
      <div className="p-6 text-center">
        他ページとのメニュー重複多数
        <br />
        要リファクタ
      </div>
    </>
  )
}
