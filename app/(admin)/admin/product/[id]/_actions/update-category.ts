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
  prevData: { categoryId: string | null }
}

const schema = z.object({
  categoryId: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const trimmed = val.trim()
        if (trimmed === "" || trimmed === "none") return null
      }
      return val
    },
    z.string({ error: "カテゴリを選択してください。" }).nullable(),
  ),
})

export async function updateCategoryAction(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const validatedFields = schema.safeParse({
    categoryId: formData.get("categoryId") ?? "",
  })
  if (!validatedFields.success) {
    return {
      type: "ERROR",
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "少なくとも1つの項目が適切ではありません。",
      prevData: {
        categoryId: formData.get("categoryId")?.toString() || null,
      },
    }
  }
  try {
    await prisma.product.update({
      where: { id },
      data: {
        categoryId: validatedFields.data.categoryId,
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
    prevData: validatedFields.data,
  }
}
