"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

type ActionState = {
  type: "SUCCESS" | "ERROR" | "IDLE"
  errors?: {
    [key: string]: string[]
  }
  message?: string | null
  prevData: { isActive: boolean | string }
}

const schema = z.object({
  isActive: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const trimmed = val.trim().toLowerCase()
        if (trimmed === "true") return true
        if (trimmed === "false") return false
      }
      return val
    },
    z.boolean({ error: "どちらかを選択してください。" }),
  ),
})

export async function updateIsActiveAction(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const validatedFields = schema.safeParse({
    isActive: formData.get("isActive") ?? undefined,
  })
  if (!validatedFields.success) {
    return {
      type: "ERROR",
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "少なくとも1つの項目が適切ではありません。",
      prevData: {
        isActive: formData.get("isActive")?.toString() ?? "",
      },
    }
  }
  try {
    await prisma.product.update({
      where: { id },
      data: {
        isActive: validatedFields.data.isActive,
      },
    })
  } catch {
    return {
      type: "ERROR",
      message:
        "作成時にデータベースでエラーが発生しました。ページを再読み込みをしてから再度試すか、管理者まで問い合わせてください。",
      prevData: validatedFields.data,
    }
  }
  revalidatePath(`/admin/product/${id}`)
  return {
    type: "SUCCESS",
    prevData: { isActive: validatedFields.data.isActive },
  }
}
