import type { Address } from "@/lib/cart"

export type AddressWithoutNull = {
  [K in keyof Address]: Exclude<Address[K], null>
}

export type Person = {
  lastName: string
  firstName: string
  phone: string
  address: AddressWithoutNull
}
