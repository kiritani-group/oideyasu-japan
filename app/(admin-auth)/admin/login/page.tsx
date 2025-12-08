import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Metadata } from "next"
import GoogleLogin from "./_google-login"

export const metadata: Metadata = {
  title: "ログイン｜管理サイト",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
}

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-sky-200/10 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>管理サイトにログイン</CardTitle>
          <CardDescription>
            権限のないユーザーがログインを試みると、管理者に通知されます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer">
            メールアドレスでログイン
          </Button>
          <GoogleLogin />
        </CardFooter>
      </Card>
    </main>
  )
}
