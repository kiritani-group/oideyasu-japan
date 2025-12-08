"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { LinkIcon } from "lucide-react"
import Link from "next/link"

export type Product = {
  id: string
  name: string
  isActive: boolean
  price: number
  stock: number
  deletedAt: Date | null
}

export const columns: ColumnDef<Product>[] = [
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original
      return (
        <Button
          asChild
          size="icon-sm"
          variant="outline"
          className="hover:-translate-y-0.5"
        >
          <Link href={`/admin/product/${product.id}`} prefetch={false}>
            <LinkIcon />
            <span className="sr-only">詳細ページ</span>
          </Link>
        </Button>
      )
    },
  },
  {
    accessorKey: "name",
    header: "名前",
  },
  {
    accessorKey: "isActive",
    header: "掲載状況",
    cell: ({ row }) => {
      const product = row.original
      return (
        <Badge
          variant={
            product.deletedAt
              ? "secondary"
              : product.isActive
                ? "secondary"
                : "destructive"
          }
          className={
            product.deletedAt
              ? ""
              : product.isActive
                ? "bg-green-500 text-white"
                : ""
          }
        >
          {product.deletedAt
            ? "削除済み"
            : product.isActive
              ? "掲載中"
              : "非公開"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "price",
    header: "税込価格",
    cell: ({ row }) => {
      const product = row.original
      const price = product.price
      return (
        <span className="flex w-16 justify-end">
          {"￥" + price.toLocaleString() + "-"}
        </span>
      )
    },
  },
  {
    accessorKey: "stock",
    header: "在庫数",
    cell: ({ row }) => {
      const product = row.original
      const stock = product.stock
      return stock === 0 ? (
        <span className="text-destructive flex w-12 justify-end">品切れ</span>
      ) : stock < 100 ? (
        <span className="flex w-12 justify-end">{stock}</span>
      ) : (
        <span className="flex w-12 justify-end text-green-700">≧100</span>
      )
    },
  },
]
