import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { Product } from "@/data/products"
import AddCart from "./add-cart"

export default function ProductImages({ product }: { product: Product }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-center gap-2">
          {product.inStock ? (
            <Badge>在庫あり</Badge>
          ) : (
            <Badge variant="outline">在庫なし</Badge>
          )}
        </div>
        <h1 className="text-foreground text-3xl leading-tight font-bold">
          {product.title}
        </h1>
      </div>

      {/* Price */}
      <div className="text-foreground text-2xl font-bold">
        ¥{product.price.toLocaleString()}
        <span className="text-base">（税込み）</span>
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed text-pretty">
        {product.description}
      </p>

      {product.inStock && <AddCart product={product} />}

      {/* Additional Info */}
      <Card className="border-border bg-muted/50 p-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">お届け予定</span>
            <span className="text-foreground font-medium">
              {product.inStock ? "1-3営業日" : "在庫切れ"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              配送料{product.price < 10000 && <sup>※1, ※2</sup>}
            </span>
            <span className="text-foreground font-medium">
              {product.price >= 10000 ? "無料" : "¥770"}
            </span>
          </div>
          {product.price < 10000 && (
            <ul className="list-none space-y-1 pt-2 [counter-reset:note]">
              <li className="relative pl-7 font-medium [counter-increment:note] before:absolute before:left-0 before:content-['※'counter(note)]">
                税込み10,000円以上の購入で送料無料！！
              </li>
              <li className="relative pl-7 [counter-increment:note] before:absolute before:left-0 before:content-['※'counter(note)]">
                地域によっては追加送料がかかる場合があります
              </li>
            </ul>
          )}
        </div>
      </Card>
    </div>
  )
}
