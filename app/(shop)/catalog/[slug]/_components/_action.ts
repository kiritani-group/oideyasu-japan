export async function addCartAction(productId: string, quantity: number) {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return { status: "SUCCESS" }
}
