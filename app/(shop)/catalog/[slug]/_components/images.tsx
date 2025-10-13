"use client"

import { Card } from "@/components/ui/card"
import type { Product } from "@/data/products"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

export default function ProductImages({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  return (
    <div className="space-y-4">
      <Card className="border-border bg-card overflow-hidden p-2">
        <div className="bg-muted flex aspect-square items-center justify-center overflow-hidden rounded-lg">
          {product.images && product.images[selectedImage] ? (
            <Image
              src={product.images[selectedImage]}
              alt={product.title}
              priority
              fetchPriority="high"
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-muted-foreground text-sm">
              この商品には画像がありません
            </span>
          )}
        </div>
      </Card>
      {product.images && product.images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "aspect-square cursor-pointer overflow-hidden rounded-lg border-2 transition-all",
                selectedImage === index
                  ? "border-accent"
                  : "hover:border-muted-foreground",
              )}
            >
              <Image
                src={image}
                alt={`${product.title} view ${index + 1}`}
                sizes="30vw"
                className={cn(
                  "h-full w-full object-cover",
                  selectedImage !== index && "opacity-50",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
