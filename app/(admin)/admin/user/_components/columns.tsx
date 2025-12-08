"use client"

import { Button } from "@/components/ui/button"
import { Role } from "@/lib/generated/prisma/browser"
import { ColumnDef } from "@tanstack/react-table"
import { LinkIcon } from "lucide-react"
import Link from "next/link"

export type User = {
  id: string
  name: string
  role: Role
  email: string | null
}

export const columns: ColumnDef<User>[] = [
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      return (
        <Button
          asChild
          size="icon-sm"
          variant="outline"
          className="hover:-translate-y-0.5"
        >
          <Link href={`/admin/user/${user.id}`} prefetch={false}>
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "権限",
    cell({ cell }) {
      const role = cell.getValue()
      const roleJP =
        role === "ADMIN" ? "管理者" : role === "USER" ? "一般" : "ゲスト"
      return roleJP
    },
  },
]
