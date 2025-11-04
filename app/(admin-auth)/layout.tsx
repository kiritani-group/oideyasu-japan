import "@/app/globals.css"
import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ログイン | 管理サイト",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJp.className} antialiased`}>{children}</body>
    </html>
  )
}
