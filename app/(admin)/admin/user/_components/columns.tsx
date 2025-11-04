"use client"

import { Role } from "@/lib/generated/prisma/browser"
import { ColumnDef } from "@tanstack/react-table"

export type User = {
  id: string
  name: string
  role: Role
  email: string | null
}

export const columns: ColumnDef<User>[] = [
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
