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
    <Card className="product-card bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 group shadow-xl hover:shadow-2xl hover:scale-[1.02]">
      <CardContent className="p-0">
        <div className="relative aspect-square bg-white/5 product-image">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 flex flex-col space-y-1">
            {product.isNew && (
              <Badge className="bg-green-500 text-white text-xs px-1 py-0.5 sm:px-2 sm:py-1 font-semibold shadow-lg">NUEVO</Badge>
            )}
            {product.isPopular && (
              <Badge className="bg-orange-500 text-black text-xs px-1 py-0.5 sm:px-2 sm:py-1 font-semibold shadow-lg">POPULAR</Badge>
            )}
            {product.originalPrice && (
              <Badge className="bg-red-500 text-white text-xs px-1 py-0.5 sm:px-2 sm:py-1 font-semibold shadow-lg">OFERTA</Badge>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-1 right-1 sm:top-2 sm:right-2 h-6 w-6 sm:h-8 sm:w-8 p-0 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-full"
            onClick={() => onToggleFavorite(product.id)}
          >
            <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
          </Button>

          {/* Availability Overlay */}
          {!product.available && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
              <span className="text-white text-xs font-medium bg-red-500 px-2 py-1 rounded-full">No disponible</span>
            </div>
          )}
        </div>

        <div className="product-content p-2 sm:p-3 space-y-1 sm:space-y-2">
          <div>
            <h3 className="product-name text-white font-semibold text-xs sm:text-sm line-clamp-2 mb-1">{product.name}</h3>
            <p className="product-description text-gray-400 text-xs line-clamp-1 sm:line-clamp-2">{product.description}</p>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center space-x-1">
                <span className="product-price text-orange-400 font-bold text-sm sm:text-base">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-gray-500 text-xs line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>
            <Button
              size="sm"
              className="product-button bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-6 w-6 sm:h-8 sm:w-8 p-0 rounded-full flex-shrink-0"
              onClick={() => onAddToCart(product)}
              disabled={!product.available}
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
