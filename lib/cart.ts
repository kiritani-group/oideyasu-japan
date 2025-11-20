import { cookies, headers } from "next/headers"
import { auth } from "./auth"
import { redis } from "./redis"

export type Address = {
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

export async function refreshCartTTL(key: string) {
  // 30日 = 60 * 60 * 24 * 30 秒
  await redis.expire(key, 60 * 60 * 24 * 30)
}

export async function getCartKey(): Promise<string | null> {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user?.id
  const cookieStore = await cookies()
  const guestId = cookieStore.get("guest_id")?.value
  const key = userId
    ? `cart:user:${userId}`
    : guestId
      ? `cart:guest:${guestId}`
      : null
  return key
}

export async function getCart(cartKey?: string): Promise<Cart | null> {
  const key = cartKey || (await getCartKey())
  if (!key) {
    return null
  }
  const data: Cart | null = await redis.hgetall(key)
  if (data) {
    await redis.expire(key, 60 * 60 * 24 * 30)
  }
  return data
}

export async function addToCart(
  product: Cart["items"][number]["product"],
  quantity: number = 1,
): Promise<void> {
  const key = await getCartKey()
  if (!key) return

  const cart = await getCart()
  if (!cart) return

  const exists = cart.items.some((item) => item.productId === product.id)

  let newItems = cart.items.map((item) =>
    item.productId === product.id
      ? {
          ...item,
          product, // product を最新化
          quantity,
        }
      : item,
  )

  // 新規で追加すべきなら push
  if (!exists && quantity > 0) {
    newItems = [
      ...newItems,
      {
        productId: product.id,
        product,
        quantity,
      },
    ]
  }

  // 数量が 0 以下の場合は削除
  newItems = newItems.filter((item) => item.quantity > 0)

  const newCart = {
    ...cart,
    items: newItems,
    updatedAt: new Date(),
  }

  await redis.hset(key, newCart)
  await refreshCartTTL(key)
}

export async function removeFromCart(productId: string): Promise<void> {
  const key = await getCartKey()
  if (!key) return

  const cart = await getCart()
  if (!cart) return

  const newCart = {
    ...cart,
    items: cart.items.filter((item) => item.productId !== productId),
    updatedAt: new Date(),
  }

  await redis.hset(key, newCart)
  await refreshCartTTL(key)
}

export async function changeQuantity(
  productId: string,
  quantity: number,
): Promise<void> {
  if (quantity < 1) return
  const key = await getCartKey()
  if (!key) return

  const cart = await getCart()
  if (!cart) return

  const newItems = cart.items
    .map((item) =>
      item.productId === productId ? { ...item, quantity } : item,
    )
    .filter((item) => item.quantity > 0)

  const newCart = {
    ...cart,
    items: newItems,
    updatedAt: new Date(),
  }

  await redis.hset(key, newCart)
  await refreshCartTTL(key)
}
