import Amaebi from "@/public/catalog-thumbnails/amaebi.jpg"
import Hatahata from "@/public/catalog-thumbnails/hatahata.jpg"
import Kani3 from "@/public/catalog-thumbnails/kani-3.jpg"
import Kani5 from "@/public/catalog-thumbnails/kani-5.jpg"
import KaniL from "@/public/catalog-thumbnails/kani-L.jpg"
import KareiSurume1 from "@/public/catalog-thumbnails/karei-no-surume-1.jpg"
import KareiSurume3 from "@/public/catalog-thumbnails/karei-no-surume-3.jpg"
import SabaL from "@/public/catalog-thumbnails/saba-no-narezushi-L.jpg"
import SabaM from "@/public/catalog-thumbnails/saba-no-narezushi-M.jpg"
import SabaS from "@/public/catalog-thumbnails/saba-no-narezushi-S.jpg"
import SmokedSalmon from "@/public/catalog-thumbnails/smoked-salmon.jpg"
import type { StaticImageData } from "next/image"

export type Product = {
  id: string
  title: string
  description: string
  imageSrc: StaticImageData
  price: number
  url: string
  category: "SABA" | "OTSUMAMI" | "KANI"
}

const sabaItems: Product[] = [
  {
    id: "clu26n06e0000y60fa7j1b0z3",
    title: "鯖なれずし スライス",
    description:
      "すぐに召し上がれるスライス済みの商品です。150グラム入りの食べ切りサイズ。",
    imageSrc: SabaS,
    price: 1100,
    url: "#",
    category: "SABA",
  },
  {
    id: "clu26n3ep0001y60f7nmq9wrv",
    title: "鯖なれずし 丸大１尾",
    description:
      "甘みと旨みが絶妙な味わいに仕上がっています。くせの無い自慢のなれずしです。価値のある大丸１尾入り。背骨は外してありますのでお好みのサイズに切ってお召し上がりください。",
    imageSrc: SabaM,
    price: 2160,
    url: "#",
    category: "SABA",
  },
  {
    id: "clu26n5q10002y60f3v0wh11d",
    title: "限定品 鯖のなれずし 特上特大（化粧箱入り）",
    description:
      "限定品。厳選された特上特大物の鯖を使用し甘みと旨みが絶妙な味わいの自慢のなれずしです。化粧箱入りでお届けします。特別感が味わえる逸品です。特上特大１尾化粧箱入り。",
    imageSrc: SabaL,
    price: 3240,
    url: "#",
    category: "SABA",
  },
]

const otsumamiItems: Product[] = [
  {
    id: "clu274l9u0000y60f2rvm9b0o",
    title: "福井サーモンのスモークジャーキー",
    description:
      "福井で生まれ育った『福井サーモン』は身質が良く、あっさりとした脂がのった絶品サーモン。りんごの木の燻煙で燻された身はクセがなくマイルド。香りはほのかに甘く柔らかでとても上品な仕上がりです。ジャーキーながら柔らかな食感。旨味が凝縮された『福井サーモン』の美味しさをご堪能ください",
    imageSrc: SmokedSalmon,
    price: 1080,
    url: "#",
    category: "OTSUMAMI",
  },
  {
    id: "clu274r7k0001y60f0z6q0mlg",
    title: "かれいのするめ",
    description:
      "するめのように食す『かれいのするめ』の登場です。かれいの旨みがお口の中にジュッわーっと広がります。骨ごとキッチンハサミで細めに切って電子レンジで60秒。カリッと仕上げてお召し上がりください。一味マヨネーズとの相性も抜群です。",
    imageSrc: KareiSurume1,
    price: 756,
    url: "#",
    category: "OTSUMAMI",
  },
  {
    id: "clu274w000002y60f7vyl7bjw",
    title: "かれいのするめ 3袋セット",
    description: "『かれいのするめ』3枚入りを3袋セットでたっぷりお届けします。",
    imageSrc: KareiSurume3,
    price: 2268,
    url: "#",
    category: "OTSUMAMI",
  },
  {
    id: "clu2752k40003y60f04eebcd3",
    title: "はたはた燻くん",
    description:
      "はたはた（福井県産）をりんごの木で本格的な燻製に仕上げています。骨まで柔らかくそのまま召し上がれます。袋のまま湯煎で温めてもＯＫ！5尾入りです。",
    imageSrc: Hatahata,
    price: 756,
    url: "#",
    category: "OTSUMAMI",
  },
  {
    id: "clu27567u0004y60f55r9fx99",
    title: "甘海老 熱風あま干し",
    description:
      "甘い甘い越前の海の甘海老です。熱風乾燥にて美味しさを閉じ込めました。そのまま殻ごと召し上がれ！甘みと香ばしさがお口いっぱいにひろがります。20グラム入りです。",
    imageSrc: Amaebi,
    price: 648,
    url: "#",
    category: "OTSUMAMI",
  },
]

const kaniItems: Product[] = [
  {
    id: "clu27f1sv0000y60fdjw9v7zk",
    title: "越前がに 大",
    description: "海の状況により、お待ちいただく場合があります。",
    imageSrc: KaniL,
    price: 30000,
    url: "#",
    category: "KANI",
  },
  {
    id: "clu27f4bl0001y60f1k6f8ioy",
    title: "越前がに 中",
    description: "海の状況により、お待ちいただく場合があります。",
    imageSrc: KaniL,
    price: 18000,
    url: "#",
    category: "KANI",
  },
  {
    id: "clu27f70g0002y60f2l7rbuhk",
    title: "越前がに メス せいこがに 5はいセット",
    description:
      "大サイズ5はいセットのメスの『せいこがに』です。甲羅の内子と外子の味わいは『せいこがに』にしかない味わいです。海の状況により、お待ちいただく場合があります。",
    imageSrc: Kani5,
    price: 15000,
    url: "#",
    category: "KANI",
  },
  {
    id: "clu27f9fe0003y60f0ph4gsw2",
    title: "越前がに 抱き合わせセット",
    description:
      "越前がにのオス1ぱいとメス2はいの抱き合わせセットです。海の状況により、お待ちいただく場合があります。",
    imageSrc: Kani3,
    price: 22000,
    url: "#",
    category: "KANI",
  },
]

export const products: Product[] = [
  ...sabaItems,
  ...otsumamiItems,
  ...kaniItems,
]
