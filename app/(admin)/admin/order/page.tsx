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
  const orders = await prisma.order.findMany({
    select: {
      id: true,
      orderNumber: true,
      status: true,
      buyerLastName: true,
      buyerFirstName: true,
      buyerPhone: true,
    },
    orderBy: { createdAt: "desc" },
  })
  return (
    <div className="p-2">
      <DataTable columns={columns} data={orders} />
    </div>
  )
}
