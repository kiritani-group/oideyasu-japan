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
  prevData: { stock: string | number }
}

const schema = z.object({
  stock: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() !== "") {
        const num = Number(val)
        return isNaN(num) ? val : num
      }
      return val
    },
    z
      .number("半角数字で入力してください。")
      .int("整数の値を設定してください。")
      .min(0, { error: "負の値は指定できません。" }),
  ),
})

export async function updateStockAction(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  console.log("------------------------")
  const validatedFields = schema.safeParse({
    stock: formData.get("stock") ?? undefined,
  })
  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      type: "ERROR",
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "少なくとも1つの項目が適切ではありません。",
      prevData: {
        stock: formData.get("stock")?.toString() ?? "",
      },
    }
  }
  console.log(validatedFields.data)
  try {
    await prisma.product.update({
      where: { id },
      data: {
        stock: validatedFields.data.stock,
        isInStock: validatedFields.data.stock > 0 ? true : false,
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
    message:
      "作成時にデータベースでエラーが発生しました。ページを再読み込みをしてから再度試すか、管理者まで問い合わせてください。",
    prevData: { stock: "" },
  }
}
