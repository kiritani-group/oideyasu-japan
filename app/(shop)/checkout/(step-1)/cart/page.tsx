import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCart } from "@/lib/cart"
import { AlertCircleIcon } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Page() {
  const cart = await getCart()
  if (!cart) redirect("/")
  const items = cart.items
  const subtotalAmount = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  )
  const shippingFee =
    subtotalAmount === 0 ? null : subtotalAmount < 10000 ? 770 : 0
  const totalAmount = subtotalAmount + (shippingFee || 0)
  return (
    <Card>
      <CardHeader>
        <CardTitle>商品の確認</CardTitle>
        <CardDescription>
          ご購入いただく商品をご確認ください。画面右上のショッピングカートから数量の変更が可能です。
          <br />
          表示している金額はすべて税込み価格です。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Table className="overflow-hidden rounded">
          <TableHeader className="border-b-2">
            <TableRow>
              <TableHead className="w-[100px]">商品</TableHead>
              <TableHead className="text-right">数量</TableHead>
              <TableHead className="text-right">単価</TableHead>
              <TableHead className="text-right">価格</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b-2">
            {items.map((item) => (
              <TableRow key={item.productId}>
                <TableCell className="font-bold whitespace-normal">
                  {item.product.name}
                </TableCell>
                <TableCell className="w-0 text-right whitespace-nowrap">
                  {item.quantity}
                </TableCell>
                <TableCell className="w-0 text-right whitespace-nowrap">
                  ¥{item.product.price.toLocaleString()}
                </TableCell>
                <TableCell className="w-0 text-right whitespace-nowrap">
                  ¥{(item.product.price * item.quantity).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="text-right">
              <TableCell colSpan={1}>小計：</TableCell>
              <TableCell colSpan={3}>
                ¥{subtotalAmount.toLocaleString()}
              </TableCell>
            </TableRow>
            <TableRow className="border-b-4 text-right">
              <TableCell colSpan={1}>配送料：</TableCell>
              <TableCell colSpan={3}>
                {shippingFee === 0 ? (
                  "無料"
                ) : shippingFee === null ? (
                  "-"
                ) : (
                  <div>
                    <p>¥{shippingFee.toLocaleString()}</p>
                    <p>¥10,000以上のご購入で送料は当店が負担！</p>
                  </div>
                )}
              </TableCell>
            </TableRow>
            <TableRow className="text-right font-bold">
              <TableCell colSpan={1}>合計：</TableCell>
              <TableCell colSpan={3}>¥{totalAmount.toLocaleString()}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        {subtotalAmount < 10000 && (
          <Alert>
            <AlertCircleIcon />
            <AlertTitle>送料に関して</AlertTitle>
            <AlertDescription>
              ¥10,000円以上のご購入を頂くと、送料無料！
              <br />
              プレゼント用など、まとめてお得にお買い物はいかがですか？
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        {totalAmount ? (
          <Button asChild>
            <Link href="/checkout/customer">次へ</Link>
          </Button>
        ) : (
          <Button disabled>次へ</Button>
        )}
      </CardFooter>
    </Card>
  )
}
