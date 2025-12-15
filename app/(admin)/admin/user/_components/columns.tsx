"use client"

import { Button } from "@/components/ui/button"
import { Role } from "@/lib/generated/prisma/browser"
import { ColumnDef } from "@tanstack/react-table"
import { LinkIcon, UserStar } from "lucide-react"
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
    cell: ({ row }) => {
      const user = row.original
      const isAdmin = user.role === "ADMIN"
      if (isAdmin) {
        return (
          <span className="flex items-center gap-1">
            <UserStar className="size-5 text-yellow-500" />
            {user.name}
          </span>
        )
      }
      return user.name
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell({ cell }) {
      const email = cell.getValue()
      const showEmail =
        typeof email === "string" && email.startsWith("temp@") === false
      return showEmail ? (
        email
      ) : (
        <span className="text-muted-foreground">未登録</span>
      )
    },
  },
]
