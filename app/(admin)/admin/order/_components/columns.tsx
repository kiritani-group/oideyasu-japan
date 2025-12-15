"use client"

import { Badge, badgeVariants } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { OrderStatus } from "@/lib/generated/prisma/enums"
import { ColumnDef } from "@tanstack/react-table"
import type { VariantProps } from "class-variance-authority"
import { LinkIcon } from "lucide-react"
import Link from "next/link"

export type Order = {
  id: string
  orderNumber: string
  status: OrderStatus
  buyerLastName: String
  buyerFirstName: String
  buyerPhone: String
}

export const columns: ColumnDef<Order>[] = [
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original
      return (
        <Button
          asChild
          size="icon-sm"
          variant="outline"
          className="hover:-translate-y-0.5"
        >
          <Link href={`/admin/order/${order.id}`} prefetch={false}>
            <LinkIcon />
            <span className="sr-only">詳細ページ</span>
          </Link>
        </Button>
      )
    },
  },
  {
    accessorKey: "orderNumber",
    header: "注文番号",
  },
  {
    accessorKey: "status",
    header: "ステータス",
    cell: ({ row }) => {
      const status = row.original.status
      const statusMap: Record<OrderStatus, string> = {
        PENDING: "入金待ち",
        READY_TO_SHIP: "発送待ち(代引き)",
        PAID: "発送待ち(入金済)",
        SHIPPED_PENDING_PAYMENT: "発送済み(代引き)",
        SHIPPED: "発送済み",
        DELIVERED: "配達完了",
        CANCELED: "キャンセル",
      }
      const statusVariantMap: Record<
        OrderStatus,
        VariantProps<typeof badgeVariants>["variant"]
      > = {
        PENDING: "secondary",
        READY_TO_SHIP: "destructive",
        PAID: "destructive",
        SHIPPED_PENDING_PAYMENT: "destructive",
        SHIPPED: "outline",
        DELIVERED: "outline",
        CANCELED: "secondary",
      }
      return (
        <Badge variant={statusVariantMap[status]}>{statusMap[status]}</Badge>
      )
    },
  },
  {
    id: "buyerName",
    header: "購入者",
    cell: ({ row }) => {
      const order = row.original
      const buyerName = `${order.buyerLastName} ${order.buyerFirstName}`

      return buyerName
    },
  },
  { accessorKey: "buyerPhone", header: "電話番号" },
]
