"use client"

import { Search } from "lucide-react"
import { ProductCard } from "./ProductCard"
import type { Product } from "@/types"

interface ProductGridProps {
  products: Product[]
  favorites: string[]
  onAddToCart: (product: Product) => void
  onToggleFavorite: (productId: string) => void
}

export function ProductGrid({ products, favorites, onAddToCart, onToggleFavorite }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 pb-20">
        <div className="text-center py-16">
          <Search className="h-16 w-16 sm:h-20 sm:w-20 text-gray-600 mx-auto mb-6" />
          <p className="text-gray-400 text-lg sm:text-xl font-medium mb-2">No se encontraron productos</p>
          <p className="text-gray-500 text-sm">Intenta con otra búsqueda o categoría</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="product-grid grid grid-cols-2 gap-2 sm:gap-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}
