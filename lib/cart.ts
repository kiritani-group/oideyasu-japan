import { cookies, headers } from "next/headers"
import { auth } from "./auth"
import { redis } from "./redis"

export type Cart = {
  items: {
    productId: string
    product: { id: string; name: string; price: number }
    quantity: number
  }[]
  updatedAt: Date | string
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

export async function getCart(): Promise<Cart> {
  const key = await getCartKey()
  if (!key) {
    return { items: [], updatedAt: new Date() }
  }
  const data: Cart | null = await redis.hgetall(key)
  if (data) {
    await redis.expire(key, 60 * 60 * 24 * 30)
  }
  return data || { items: [], updatedAt: new Date() }
}

export async function addToCart(
  product: Cart["items"][number]["product"],
  quantity: number = 1,
): Promise<void> {
  const key = await getCartKey()
  if (!key) return

  const cart = await getCart()
  const existingItem = cart.items.find((item) => item.productId === product.id)

  if (existingItem) {
    existingItem.quantity += quantity
    existingItem.product = product
  } else {
    cart.items.push({ productId: product.id, product, quantity })
  }
  cart.updatedAt = new Date()

  await redis.hset(key, cart)
  await redis.expire(key, 60 * 60 * 24 * 30)
}

export async function removeFromCart(productId: string): Promise<void> {
  const key = await getCartKey()
  if (!key) return

  const cart = await getCart()
  if (!cart) return

  // 指定の productId を持つアイテムを削除
  cart.items = cart.items.filter((item) => item.productId !== productId)

  cart.updatedAt = new Date()

  await redis.hset(key, cart)
  await redis.expire(key, 60 * 60 * 24 * 30) // 30日
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

  const item = cart.items.find((i) => i.productId === productId)
  if (item) {
    item.quantity = quantity
    cart.updatedAt = new Date()
  }

  await redis.hset(key, cart)
  await redis.expire(key, 60 * 60 * 24 * 30) // 30日
}
