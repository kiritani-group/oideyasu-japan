import { NextResponse } from "next/server"

type ZipcloudItem = {
  prefcode: string // 都道府県コード
  address1: string // 都道府県
  address2: string // 市区町村
  address3: string // 町域
  [key: string]: string // その他
}

type ZipcloudResponse = {
  status: number
  message: string | null
  results: ZipcloudItem[] | null
}

export type ZipAddress = {
  prefectureCode: number
  prefecture: string
  city: string
  town: string
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const zipcode = searchParams.get("zipcode")
  if (!zipcode) {
    return NextResponse.json(
      { error: "zipcode パラメータは必須です" },
      { status: 400 },
    )
  }
  const cleanedZip = zipcode.replace(/-/g, "")
  if (!/^\d{7}$/.test(cleanedZip)) {
    return NextResponse.json(
      { error: "zipcode は 7 桁の数字で指定してください（ハイフン可）" },
      { status: 400 },
    )
  }
  const apiUrl = "https://zipcloud.ibsnet.co.jp/api/search"
  try {
    const res = await fetch(`${apiUrl}?zipcode=${cleanedZip}`)

    if (!res.ok) {
      return NextResponse.json(
        { error: `zipcloud 側エラー: HTTP ${res.status}` },
        { status: res.status },
      )
    }
    const data: ZipcloudResponse = await res.json()
    // zipcloud API のステータスチェック
    if (data.status !== 200) {
      if (data.status === 400) {
        return NextResponse.json(
          { error: data.message ?? "入力エラー" },
          { status: 400 },
        )
      }

      // zipcloud の障害
      return NextResponse.json({ error: "zipcloud API 障害" }, { status: 502 })
    }
    const results = data.results
    if (!results || results.length === 0) {
      return NextResponse.json(
        { error: "該当する住所はありません" },
        { status: 400 },
      )
    }
    const simplified: ZipAddress[] = results.map((item) => ({
      prefectureCode: Number(item.prefcode),
      prefecture: item.address1,
      city: item.address2,
      town: item.address3,
    }))
    console.log({ simplified })
    return NextResponse.json(simplified)
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
