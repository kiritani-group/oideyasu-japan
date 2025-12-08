import "@/app/globals.css"
import { AppSidebar } from "@/components/layout/admin/app-sidevar"
import {
  AdminSidebarTrigger,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import { Suspense } from "react"
import Breadcrumbs from "./_breadcrumbs"

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    template: "%s | 管理サイト",
    default: "管理サイト",
  },
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
      <body className={`${notoSansJp.className} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="bg-background/50 sticky top-0 z-50 flex h-14 items-center gap-2 border-b px-2 backdrop-blur-sm">
              <AdminSidebarTrigger className="md:hidden" />
              <Suspense>
                <Breadcrumbs />
              </Suspense>
            </header>
            <main className="@container relative flex-1 bg-sky-200/10">
              <div className="relative z-10 mx-auto max-w-5xl">{children}</div>
            </main>
            <footer className="flex flex-col items-center justify-center border-t p-3">
              <p>© 旬菜鮮魚と炭火焼 おいで康</p>
              <p>管理サイト</p>
            </footer>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
