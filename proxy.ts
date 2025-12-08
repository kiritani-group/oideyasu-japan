import { headers } from "next/headers"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { auth } from "./lib/auth"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next()
  }
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
  const user = session.user
  if (user.role !== "ADMIN") {
    console.warn(`Unauthorized access attempt by ${user.name} → ${pathname}`)
    console.warn("user:", user)
    return NextResponse.redirect(new URL("/", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}
