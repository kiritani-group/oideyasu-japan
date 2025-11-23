import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getSessionUser } from "@/lib/auth"
import { Address, getCart } from "@/lib/cart"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import ShippingForm from "./_form"
import { AddressWithoutNull } from "./_types"

export default async function Page() {
  const user = await getSessionUser()
  const cart = await getCart(user?.id)
  if (!user || !cart) redirect("/checkout")
  if (!cart.buyer) redirect("/checkout/customer")

  const addressDefault = user.isAnonymous
    ? null
    : await prisma.address.findFirst({
        where: {
          userId: user.id,
          isDefault: true,
        },
        select: {
          postalCode: true,
          prefectureCode: true,
          prefecture: true,
          city: true,
          town: true,
          streetAddress: true,
          building: true,
        },
      })

  const { email, ...buyer } = cart.buyer
  const buyerDefault = user.isAnonymous
    ? {
        ...buyer,
        address: normalizeAddress(buyer.address),
      }
    : {
        ...buyer,
        address: normalizeAddress(buyer.address || addressDefault || undefined),
      }

  const isGift = Boolean(cart.isGift)
  const recipientDefault = cart.recipient
    ? {
        ...cart.recipient,
        address: normalizeAddress(cart.recipient.address),
      }
    : {
        lastName: "",
        firstName: "",
        phone: "",
        address: normalizeAddress(),
      }
  return (
    <Card>
      <CardHeader>
        <CardTitle>お届け先情報</CardTitle>
        <CardDescription>商品の配送先を指定してください。</CardDescription>
      </CardHeader>
      <ShippingForm
        isGiftDefault={isGift}
        buyerDefault={buyerDefault}
        recipientDefault={recipientDefault}
      />
    </Card>
  )
}

const normalizeAddress = (addr?: Address): AddressWithoutNull => ({
  id: addr?.id,
  postalCode: addr?.postalCode ?? "",
  prefectureCode: addr?.prefectureCode ?? 0,
  prefecture: addr?.prefecture ?? "",
  city: addr?.city ?? "",
  town: addr?.town ?? "",
  streetAddress: addr?.streetAddress ?? "",
  building: addr?.building ?? "",
})
