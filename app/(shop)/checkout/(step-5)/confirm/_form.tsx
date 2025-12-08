"use client"

import { Button } from "@/components/ui/button"
import { useActionState } from "react"
import { confirmAction } from "./_action"

export default function ConfirmForm() {
  const [state, action, isPending] = useActionState(() => confirmAction(), {
    type: "PENDING",
  })
  return (
    <form action={action} className="contents">
      <Button disabled={isPending} className="cursor-pointer">
        注文を確定して支払いへ
      </Button>
    </form>
  )
}
