import type { NextConfig } from "next"

const redirectsList = [
  {
    title: "おすすめ日本酒",
    source: "/%E3%81%8A%E3%81%99%E3%81%99%E3%82%81%E6%97%A5%E6%9C%AC%E9%85%92",
    destination: "/drink/umeshu",
  },
  {
    title: "和の果実酒",
    source: "/%E5%92%8C%E3%81%AE%E6%9E%9C%E5%AE%9F%E9%85%92",
    destination: "/drink/kajitushu",
  },
  {
    title: "焼酎ラインナップ",
    source:
      "/%E7%84%BC%E9%85%8E%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%8A%E3%83%83%E3%83%97",
    destination: "/drink/shochu",
  },
  {
    title: "梅酒飲みくらべ",
    source: "/%E6%A2%85%E9%85%92%E9%A3%B2%E3%81%BF%E3%81%8F%E3%82%89%E3%81%B9",
    destination: "/drink/umeshu",
  },
  {
    title: "獲れたてのお魚メニュー",
    source:
      "/%E7%8D%B2%E3%82%8C%E3%81%9F%E3%81%A6%E3%81%AE%E3%81%8A%E9%AD%9A%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC",
    destination: "/food/fish",
  },
  {
    title: "美味しいごはん",
    source: "/%E7%BE%8E%E5%91%B3%E3%81%97%E3%81%84%E3%81%94%E3%81%AF%E3%82%93",
    destination: "/food/gohan",
  },
  {
    title: "厳選お肉と季節の山野菜",
    source:
      "/%E5%8E%B3%E9%81%B8%E3%81%8A%E8%82%89%E3%81%A8%E5%AD%A3%E7%AF%80%E3%81%AE%E5%B1%B1%E9%87%8E%E8%8F%9C",
    destination: "/food/meat-vegetable",
  },
  {
    title: "定番おしながき",
    source: "/%E5%AE%9A%E7%95%AA%E3%81%8A%E3%81%97%E3%81%AA%E3%81%8C%E3%81%8D",
    destination: "/food/teiban",
  },
  {
    title: "越前がに 通販くらぶ",
    source:
      "/%E8%B6%8A%E5%89%8D%E3%81%8C%E3%81%AB/%E3%81%9B%E3%81%84%E3%81%93%E3%81%8C%E3%81%AB/%E3%81%9A%E3%82%8F%E3%81%84%E3%81%8C%E3%81%AB/%E9%80%9A%E8%B2%A9%E3%81%8F%E3%82%89%E3%81%B6",
    destination: "/catalog/category/echizen-gani",
  },
]

const nextConfig: NextConfig = {
  async redirects() {
    return redirectsList.flatMap(({ source, destination }) => [
      {
        source,
        destination,
        permanent: true,
      },
      {
        source: `${source}/`,
        destination,
        permanent: true,
      },
    ])
  },
}

export default nextConfig
