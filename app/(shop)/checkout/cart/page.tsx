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
import { cacheTag } from "next/cache"
import Link from "next/link"

export default async function Page() {
  "use cache: private"
  cacheTag("cart")
  const cart = await getCart()
  const items = cart.items
  const subtotalAmount = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  )
  const shippingFee = subtotalAmount >= 10000 ? 0 : 770
  const totalAmount = subtotalAmount + shippingFee
  return (
    <Card>
      <CardHeader>
        <CardTitle>商品の確認</CardTitle>
        <CardDescription>
          ご購入いただく商品をご確認ください。数量の変更も可能です。
          <br />
          表示している金額はすべて税込み価格です。
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                {shippingFee === 0 ? "-" : `¥${shippingFee.toLocaleString()}`}
              </TableCell>
            </TableRow>
            <TableRow className="text-right font-bold">
              <TableCell colSpan={1}>合計：</TableCell>
              <TableCell colSpan={3}>¥{totalAmount.toLocaleString()}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
      <CardFooter className="justify-end">
        <Button asChild>
          <Link href="/checkout/customer">次へ</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
