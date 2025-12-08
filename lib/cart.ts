import { cacheTag } from "next/cache"
import { redis } from "./redis"

export type Address = {
  id?: string
  postalCode: string
  prefectureCode: number
  prefecture: string
  city: string
  town: string
  streetAddress: string | null
  building: string | null
}

export type Cart = {
  items: {
    productId: string
    product: {
      id: string
      name: string
      price: number
      thumbnailUrl: string | null
    }
    quantity: number
  }[]
  isGift?: boolean
  buyer?: {
    lastName: string
    firstName: string
    email: string
    phone: string
    address?: Address
  }
  recipient?: {
    lastName: string
    firstName: string
    phone: string
    address: Address
  }
  payment?: {
    type: "deferred" | "immediate"
    method: "cod" | "card" | "convenience" | "wallet" | "bank"
  }
  updatedAt: Date | string
  order?: {
    id?: string
  }
}

export function getCartKey(userId: string) {
  return `cart:${userId}`
}

export async function refreshCartTTL(key: string) {
  // 30日 = 60 * 60 * 24 * 30 秒
  await redis.expire(key, 60 * 60 * 24 * 30)
}

export async function getCart(
  userId: string | undefined,
): Promise<Cart | null> {
  "use cache: private"
  cacheTag("cart")
  if (!userId) {
    return null
  }
  const key = getCartKey(userId)
  const data: Cart | null = await redis.hgetall(key)
  if (data) {
    await redis.expire(key, 60 * 60 * 24 * 30)
    return data
  } else {
    const newCart: Cart = {
      items: [],
      updatedAt: new Date(),
    }

    await redis.hset(key, newCart)
    await refreshCartTTL(key)
    const created: Cart | null = await redis.hgetall(key)
    return created
  }
}

/**
 * カートに商品追加 / 更新 / 削除
 * quantity = null または <1 の場合は削除
 */
export async function updateCartItem(
  userId: string | undefined,
  product: Cart["items"][number]["product"],
  quantity: number | null,
): Promise<void> {
  if (!userId) return

  const key = getCartKey(userId)
  let cart = await getCart(userId)

  // カートが存在しない場合は新規作成
  if (!cart) {
    cart = { items: [], updatedAt: new Date() }
  }

  const exists = cart.items.some((i) => i.productId === product.id)

  let newItems: Cart["items"]

  if (quantity === null || quantity < 1) {
    // 削除
    newItems = cart.items.filter((i) => i.productId !== product.id)
  } else if (exists) {
    // 既存商品の数量更新
    newItems = cart.items.map((i) =>
      i.productId === product.id ? { ...i, product, quantity } : i,
    )
  } else {
    // 新規追加
    newItems = [...cart.items, { productId: product.id, product, quantity }]
  }

  const newCart: Cart = {
    ...cart,
    items: newItems,
    updatedAt: new Date(),
  }

  await redis.hset(key, newCart)
  await refreshCartTTL(key)
}
