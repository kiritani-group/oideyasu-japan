"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import EditCategoryForm from "./edit-form-category"
import EditIsActiveForm from "./edit-form-is-active"
import EditStockForm from "./edit-form-stock"

export default function EditDialog({
  mode,
  product,
  label,
  icon,
  categories,
}: {
  mode: "stock" | "isActive" | "category"
  product: {
    id: string
    name: string
    isActive: boolean
    stock: number
    categoryId: string | null
  }
  label: string
  icon: React.ReactNode
  categories?: { id: string; name: string }[]
}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="cursor-pointer">
          {icon}
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {mode === "isActive" ? (
          <EditIsActiveForm product={product} setOpen={setOpen} />
        ) : mode === "stock" ? (
          <EditStockForm product={product} setOpen={setOpen} />
        ) : mode === "category" ? (
          <EditCategoryForm
            product={product}
            setOpen={setOpen}
            categories={categories || []}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
