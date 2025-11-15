import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cacheTag } from "next/cache"
import Link from "next/link"

export default async function Page() {
  "use cache: private"
  cacheTag("cart")
  return (
    <Card>
      <CardHeader>
        <CardTitle>お客様情報・お届け先</CardTitle>
        <CardDescription>
          お客様情報をご入力ください。
          <br />
          お届け先がお客様情報と異なる場合は追加でご入力ください。
        </CardDescription>
      </CardHeader>
      <CardContent>
        お届け先とお客様情報が異なるかどうか選択できるようにしたい
      </CardContent>
      <CardFooter className="justify-end">
        <Button asChild>
          <Link href="/checkout/customer">次へ</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
