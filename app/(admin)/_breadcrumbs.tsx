"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react/jsx-runtime"

export default function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((seg) => seg !== "admin")
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/admin/" + segments.slice(0, index + 1).join("/")
    const label = getReadableLabel(segment)
    return { href, label }
  })

  console.log({ breadcrumbs })
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/admin">ダッシュボード</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map((crumb, i) => {
          const isLast = i === breadcrumbs.length - 1
          return (
            <Fragment key={i}>
              <BreadcrumbSeparator />
              {isLast ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </BreadcrumbLink>
              )}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function getReadableLabel(segment: string): string {
  if (labelMap[segment]) {
    return labelMap[segment]
  }
  const cuidRegex = /^c[a-z0-9]{24,}$/ // "c" + 24文字以上（cuid, cuid2どちらもOK）
  const nanoidRegex = /^[A-Za-z0-9_-]{21,36}$/ // 標準長〜長めのNanoID
  if (cuidRegex.test(segment) || nanoidRegex.test(segment)) {
    return "詳細"
  }
  return segment
}

const labelMap: Record<string, string> = {
  user: "ユーザー管理",
  order: "注文管理",
  product: "商品管理",
}
