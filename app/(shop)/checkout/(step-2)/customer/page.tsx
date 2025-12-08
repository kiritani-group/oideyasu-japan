import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getSessionUser } from "@/lib/auth"
import { getCart } from "@/lib/cart"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import CustomerForm from "./_form"

export default async function Page() {
  const user = await getSessionUser()
  const cart = await getCart(user?.id)
  if (!user || !cart) redirect("/checkout")

  const lastOrder = user.isAnonymous
    ? null
    : await prisma.order.findFirst({
        where: { userId: user.id, status: "DELIVERED" },
        select: { buyerPhone: true },
        orderBy: { createdAt: "desc" },
      })

  const userEmail = user.isAnonymous ? null : user.email || null
  const userFirstName = user.isAnonymous ? null : user.firstName || null
  const userLastName = user.isAnonymous ? null : user.lastName || null
  const userPhone = lastOrder?.buyerPhone || null
  const buyer = cart.buyer
  return (
    <Card>
      <CardHeader>
        <CardTitle>お客様情報</CardTitle>
        <CardDescription>
          ご購入されるお客様の情報をご入力ください。
        </CardDescription>
      </CardHeader>
      <CustomerForm
        buyer={buyer}
        userEmail={userEmail}
        userFirstName={userFirstName}
        userLastName={userLastName}
        userPhone={userPhone}
      />
    </Card>
  )
}
