import { getSessionUser } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"

export default async function Page() {
  const user = await getSessionUser()
  if (user?.role !== "ADMIN") {
    redirect("/")
  }
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      role: true,
      email: true,
      isAnonymous: true,
    },
  })
  const filteredUsers = users.filter(
    (user) =>
      user.isAnonymous === false ||
      (user.isAnonymous === true && user.name !== "Anonymous"),
  )
  return (
    <div className="p-2">
      <DataTable columns={columns} data={filteredUsers} />
    </div>
  )
}
