import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Logo from "@/public/logo.jpg"
import { ShoppingCart, Shrimp, User2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const items = [
  {
    title: "注文管理",
    url: "/admin/order",
    icon: ShoppingCart,
  },
  {
    title: "顧客管理",
    url: "/admin/user",
    icon: User2,
  },
  {
    title: "商品管理",
    url: "/admin/product",
    icon: Shrimp,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/admin" className="flex items-center gap-2">
          <div className="relative aspect-square size-10 overflow-hidden rounded-full">
            <Image
              src={Logo}
              alt="おいで康のロゴ"
              fill
              sizes="40px"
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="flex flex-col gap-0.5 pb-0.5 text-center text-xl leading-none font-bold">
            おいで康
            <span className="text-sm leading-none">管理サイト</span>
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>通販くらぶ</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
