import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { updateCartItemAction } from "@/lib/actions/cart"
import { authClient } from "@/lib/auth-client"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Login({
  product,
  quantity,
}: {
  product: {
    id: string
    name: string
    price: number
    thumbnailUrl: string | null
  }
  quantity: number
}) {
  const router = useRouter()
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button size="lg" className="w-full cursor-pointer">
            <ShoppingCart className="mr-2 size-5" />
            カートに追加
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>ログインして便利にお買い物！</DialogTitle>
            <DialogDescription>
              ログインすると、購入履歴の確認をしたり、他の端末でお買い物を続けたり、便利にご利用いただけます！
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Button variant="outline">LINEアカウントでログイン</Button>
            <Button variant="outline">Googleアカウントでログイン</Button>
          </div>
          <DialogFooter className="border-t pt-4">
            <DialogClose asChild>
              <Button variant="outline">キャンセル</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={async () => {
                await authClient.signIn.anonymous()
                await updateCartItemAction(product, quantity)
              }}
            >
              ログインせずに続ける
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
