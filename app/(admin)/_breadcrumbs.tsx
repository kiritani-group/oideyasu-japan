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
    const prev = segments[index - 1]
    const label = getReadableLabel(segment, prev)
    return { href, label }
  })
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

function getReadableLabel(segment: string, prev?: string): string {
  // 静的マッピング
  if (labelMap[segment]) return labelMap[segment]

  // 前のセグメントに応じて動的に判断
  if (prev === "user") {
    if (isId(segment)) return "顧客詳細"
  }

  if (prev === "order") {
    if (isId(segment)) return "注文詳細"
  }

  if (prev === "product") {
    if (isId(segment)) return "商品詳細"
  }

  // 長いIDなどは「詳細」とする
  if (segment.length > 20) return "詳細"

  // デフォルトはそのまま
  return segment
}

/**
 * 静的ラベルマップ（第一階層）
 */
const labelMap: Record<string, string> = {
  user: "顧客管理",
  order: "注文管理",
  product: "商品管理",
  setting: "設定",
  create: "新規作成",
}

/**
 * IDかどうかを判定（数字またはUUIDなど）
 */
function isId(value: string): boolean {
  return /^[0-9a-zA-Z_-]+$/.test(value) && !labelMap[value]
}
