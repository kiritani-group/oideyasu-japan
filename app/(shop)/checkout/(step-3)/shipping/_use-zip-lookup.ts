import type { ZipAddress } from "@/app/api/zip-lookup/route"
import { useState } from "react"

export function useZipLookup(onAddressFound: (addr: ZipAddress) => void) {
  const [addressOptions, setAddressOptions] = useState<ZipAddress[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)

  const lookupAddress = async (postalCode: string) => {
    if (postalCode.length !== 7) return

    const res = await fetch(`/api/zip-lookup?zipcode=${postalCode}`)
    if (!res.ok) return

    const list: ZipAddress[] = await res.json()

    if (list.length === 1) {
      onAddressFound(list[0])
    } else if (list.length > 1) {
      setAddressOptions(list)
      setDialogOpen(true)
    }
  }

  return {
    addressOptions,
    dialogOpen,
    setDialogOpen,
    lookupAddress,
  }
}
