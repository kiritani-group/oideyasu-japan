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
  prevData: { name: string; slug: string }
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
  slug: z
    .string()
    .regex(/^(?!.*--)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, {
      message:
        "半角英小文字・数字・ハイフンのみ使用可能で、先頭・末尾・連続したハイフンは使えません。",
    })
    .max(24, { message: "スラッグは24文字以内で入力してください。" }),
})

export async function updateNameAction(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // バリデーション
  const validatedFields = schema.safeParse({
    name: formData.get("name") ?? undefined,
    slug: formData.get("slug") ?? undefined,
  })
  if (!validatedFields.success) {
    return {
      type: "ERROR",
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "少なくとも1つの項目が適切ではありません。",
      prevData: {
        name: formData.get("name")?.toString() ?? "",
        slug: formData.get("slug")?.toString() ?? "",
      },
    }
  }

  // 同一スラッグの存在チェック
  try {
    const sameSlug = await prisma.product.findFirst({
      where: { id: { not: id }, slug: validatedFields.data.slug, deletedAt: null },
    })
    const sameName = await prisma.product.findFirst({
      where: { id: { not: id }, name: validatedFields.data.name, deletedAt: null },
    })
    if (sameSlug || sameName) {
      return {
        type: "ERROR",
        errors: {
          ...(sameSlug && {
            slug: [
              "公開中の商品に同一のスラッグが既に使用されています。別のスラッグを指定してください。",
            ],
          }),
          ...(sameName && {
            name: [
              "公開中の商品に同一の名前が既に使用されています。別の名前を指定してください。",
            ],
          }),
        },
        prevData: validatedFields.data,
      }
    }
  } catch {
    return {
      type: "ERROR",
      message:
        "作成時にデータベースでエラーが発生しました。ページを再読み込みをしてから再度試すか、管理者まで問い合わせてください。",
      prevData: validatedFields.data,
    }
  }

  // 更新処理
  try {
    await prisma.product.update({
      where: { id },
      data: validatedFields.data,
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
