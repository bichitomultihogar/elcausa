"use client"

import Image from "next/image"
import { Plus, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/types"
import { formatPrice } from "@/utils/format"

interface ProductCardProps {
  product: Product
  isFavorite: boolean
  onAddToCart: (product: Product) => void
  onToggleFavorite: (productId: string) => void
}

export function ProductCard({ product, isFavorite, onAddToCart, onToggleFavorite }: ProductCardProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 group shadow-xl hover:shadow-2xl hover:scale-[1.02]">
      <CardContent className="p-0">
        <div className="relative aspect-square bg-white/5">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.isNew && (
              <Badge className="bg-green-500 text-white text-xs px-2 py-1 font-semibold shadow-lg">NUEVO</Badge>
            )}
            {product.isPopular && (
              <Badge className="bg-orange-500 text-black text-xs px-2 py-1 font-semibold shadow-lg">POPULAR</Badge>
            )}
            {product.originalPrice && (
              <Badge className="bg-red-500 text-white text-xs px-2 py-1 font-semibold shadow-lg">OFERTA</Badge>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-3 right-3 h-10 w-10 p-0 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-full"
            onClick={() => onToggleFavorite(product.id)}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
          </Button>

          {/* Availability Overlay */}
          {!product.available && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
              <span className="text-white text-sm font-medium bg-red-500 px-3 py-1 rounded-full">No disponible</span>
            </div>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2">{product.name}</h3>
            <p className="text-gray-400 text-xs line-clamp-2">{product.description}</p>
          </div>

          {/* Rating */}
          {/* <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">{product.rating}</span>
            <span className="text-gray-500 text-xs">({product.reviews})</span>
          </div> */}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-orange-400 font-bold text-lg">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-gray-500 text-sm line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>
            <Button
              size="sm"
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-10 w-10 p-0 rounded-full"
              onClick={() => onAddToCart(product)}
              disabled={!product.available}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
