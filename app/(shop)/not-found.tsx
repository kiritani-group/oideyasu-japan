import Link from "next/link"

export default function NotFound() {
  return (
    <div className="p-6 text-center">
      <h2>404</h2>
      <p>お探しのページは見つかりませんでした。</p>
      <Link href="/">トップページへ戻る</Link>
    </div>
  )
}
