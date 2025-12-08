import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const userRole = session?.user.role
  return <div>注文リスト</div>
}
