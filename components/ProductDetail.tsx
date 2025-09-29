"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, ShoppingCart, Heart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/useCart"
import { useProducts } from "@/hooks/useProducts"
import { formatPrice } from "@/utils/format"
import type { Product } from "@/types"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { favorites, toggleFavorite } = useProducts()
  const isFavorite = favorites.includes(product.id)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    // Reset quantity after adding
    setQuantity(1)
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-400"
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/95 border-b border-red-500/30 shadow-2xl">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-800/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className={`${
                isFavorite 
                  ? "text-red-500 hover:text-red-400" 
                  : "text-gray-400 hover:text-red-500"
              }`}
              onClick={handleToggleFavorite}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-800 shadow-2xl">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.isPopular && (
                  <Badge className="bg-orange-500 text-black font-bold">
                    Popular
                  </Badge>
                )}
                {product.isNew && (
                  <Badge className="bg-green-500 text-black font-bold">
                    Nuevo
                  </Badge>
                )}
                {product.originalPrice && (
                  <Badge className="bg-red-500 text-white font-bold">
                    Oferta
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                  <span className="text-gray-400 text-sm ml-2">
                    {product.rating} ({product.reviews} reseñas)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-orange-400">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Descripción</h3>
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">Cantidad:</span>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 p-0 border-orange-500/50 bg-transparent hover:bg-orange-500/20 rounded-full"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-white font-bold text-lg w-8 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 p-0 border-orange-500/50 bg-transparent hover:bg-orange-500/20 rounded-full"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-200"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Agregar al Carrito - {formatPrice(product.price * quantity)}
              </Button>
            </div>

            {/* Product Details */}
            <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">Detalles del Producto</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Categoría:</span>
                  <p className="text-white font-medium capitalize">{product.category}</p>
                </div>
                <div>
                  <span className="text-gray-400">Disponibilidad:</span>
                  <p className={`font-medium ${product.available ? "text-green-400" : "text-red-400"}`}>
                    {product.available ? "En Stock" : "Agotado"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Calificación:</span>
                  <p className="text-white font-medium">{product.rating}/5</p>
                </div>
                <div>
                  <span className="text-gray-400">Reseñas:</span>
                  <p className="text-white font-medium">{product.reviews}</p>
                </div>
              </div>
            </div>

            {/* Free Shipping Banner */}
            <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🚚</span>
                </div>
                <div>
                  <span className="text-green-300 font-bold">¡Envío GRATIS!</span>
                  <p className="text-green-400 text-sm">Envío sin costo en todos los pedidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
