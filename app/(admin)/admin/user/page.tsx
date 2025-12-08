import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { columns, type User } from "./_components/columns"
import { DataTable } from "./_components/data-table"

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session?.user.role !== "ADMIN") {
    redirect("/")
  }
  const users: User[] = await prisma.user.findMany()
  return (
    <div className="p-2">
      <DataTable columns={columns} data={users} />
    </div>
  )
}
