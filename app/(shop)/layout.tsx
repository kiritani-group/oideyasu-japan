import "@/app/globals.css"
import { AppSidebar } from "@/components/layout/app-sidevar"
import ShoppingCartDrawerDialog from "@/components/layout/shopping/header-drawer-dialog"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Logo from "@/public/logo.jpg"
import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    template: "%s | おいで康 福井 居酒屋 魚 かに 宴会",
    default: "おいで康 旬菜鮮魚と炭火焼き - 福井 居酒屋 魚 かに 宴会",
  },
  description:
    "魚が美味しい福井の居酒屋 おいで康。女子会 宴会 歓送迎会 忘新年会 飲み放題など、様々なシーンにお応えします。",
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
    <html lang="en">
      <body className={`${notoSansJp.className} antialiased`}>
        <SidebarProvider>
          <SidebarInset>
            <header className="bg-background/50 sticky top-0 z-50 flex h-14 items-center justify-between border-b px-2 backdrop-blur-sm">
              <Link href="/" className="flex items-center gap-1.5">
                <div className="relative aspect-square size-12 overflow-hidden rounded-full">
                  <Image
                    src={Logo}
                    alt="おいで康のロゴ"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h1 className="flex flex-col pb-0.5 text-center text-2xl leading-none font-bold">
                  <span className="text-base">旬菜鮮魚と炭火焼</span>
                  おいで康
                </h1>
              </Link>
              <div className="gap- flex items-center gap-2">
                <ShoppingCartDrawerDialog />
                <SidebarTrigger className="mr-2" />
              </div>
            </header>
            <main className="@container relative flex-1">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/traditional-japanese-ocean-waves-water-surface-tex.jpg"
                  alt="背景画像"
                  fill
                  className="object-cover opacity-20 transition-opacity delay-500 duration-1000 starting:opacity-0"
                  priority
                />
                <div className="from-background/80 via-background/60 to-background/90 absolute inset-0 bg-gradient-to-b" />
              </div>
              <div className="relative z-10 mx-auto max-w-5xl">{children}</div>
            </main>
            <footer className="flex flex-col items-center justify-center border-t p-6">
              <p>© 旬菜鮮魚と炭火焼 おいで康</p>
              <Link href="tel:0776280828">0776-28-0828</Link>
              <p>福井県福井市堀ノ宮1-325</p>
            </footer>
          </SidebarInset>
          <AppSidebar />
        </SidebarProvider>
      </body>
    </html>
  )
}
