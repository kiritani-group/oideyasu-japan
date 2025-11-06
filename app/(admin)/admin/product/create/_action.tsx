"use server"

import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { z } from "zod"

type ActionState = {
  type: "SUCCESS" | "ERROR" | "IDLE"
  errors?: {
    [key: string]: string[]
  }
  message?: string | null
  prevData: { name: string; price: string | number; description: string }
}

const schema = z.object({
  name: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        // 全角スペースや改行を含む前後の空白を削除
        return val.replace(/^[\s　]+|[\s　]+$/g, "")
      }
      return val
    },
    z
      .string()
      .min(1, { message: "1文字以上で入力してください。" })
      .max(30, { message: "30文字以下で入力してください。" }),
  ),
  price: z.preprocess(
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
      .min(1, { error: "1円以上で設定してください。" }),
  ),
  description: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return val.replace(/^[\s　]+|[\s　]+$/g, "")
      }
      return val
    },
    z.string().min(1, { message: "１文字以上で入力してください。" }),
  ),
})

export async function createProductAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const validatedFields = schema.safeParse({
    name: formData.get("name") ?? undefined,
    price: formData.get("price") ?? undefined,
    description: formData.get("description") ?? undefined,
  })
  if (!validatedFields.success) {
    return {
      type: "ERROR",
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message:
        "少なくとも1つの項目が適切ではありません。各項目を確認して、再度送信してください。",
      prevData: {
        name: formData.get("name")?.toString() ?? "",
        price: formData.get("price")?.toString() ?? "",
        description: formData.get("description")?.toString() ?? "",
      },
    }
  }
  let createdProductId: string = ""
  try {
    const createdProduct = await prisma.product.create({
      data: validatedFields.data,
    })
    createdProductId = createdProduct.id
  } catch {
    return {
      type: "ERROR",
      message:
        "作成時にデータベースでエラーが発生しました。ページを再読み込みをしてから再度試すか、管理者まで問い合わせてください。",
      prevData: validatedFields.data,
    }
  }
  redirect(`/admin/product/${createdProductId}`)
}
