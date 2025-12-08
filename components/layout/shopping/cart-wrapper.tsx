"use client"

import { usePathname } from "next/navigation"

export default function CartWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathName = usePathname()
  const hidePaths = [
    "/checkout/customer",
    "/checkout/shipping",
    "/checkout/delivery",
    "/checkout/confirm",
    "/checkout/payment",
  ]
  const hide = hidePaths.includes(pathName)
  if (hide) return null
  return children
}
