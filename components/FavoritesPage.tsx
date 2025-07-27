"use client"

import { ArrowLeft, Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/hooks/useProducts"
import { useCart } from "@/hooks/useCart"

export function FavoritesPage() {
  const { favoriteProducts, favorites, toggleFavorite, isLoaded } = useProducts()
  const { addToCart } = useCart()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/95 border-b border-red-500/30 shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2 rounded-full">
                  <ArrowLeft className="h-6 w-6" />
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-red-500/20 rounded-full">
                  <Heart className="h-6 w-6 text-red-400 fill-red-400" />
                </div>
                <div>
                  <h1 className="text-white font-bold text-xl">Mis Favoritos</h1>
                  <p className="text-orange-400 text-sm">
                    {favoriteProducts.length} producto{favoriteProducts.length !== 1 ? "s" : ""} guardado
                    {favoriteProducts.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="bg-orange-500/20 border-orange-500/50 text-white hover:bg-orange-500/30"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Seguir comprando
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {favoriteProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-12 w-12 text-red-400" />
            </div>
            <h2 className="text-white text-2xl font-bold mb-4">No tienes favoritos aún</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Agrega productos a tus favoritos tocando el corazón para encontrarlos fácilmente después
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-3 px-8 text-lg">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Explorar productos
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-white text-xl font-semibold mb-2">Tus productos favoritos</h2>
              <p className="text-gray-400">Productos que has marcado como favoritos</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {favoriteProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 group shadow-xl hover:shadow-2xl hover:scale-[1.02] rounded-2xl"
                >
                  <div className="p-0">
                    <div className="relative aspect-square bg-white/5">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Favorite Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-3 right-3 h-10 w-10 p-0 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-full"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                      </Button>

                      {/* Availability Overlay */}
                      {!product.available && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white text-sm font-medium bg-red-500 px-3 py-1 rounded-full">
                            No disponible
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2">{product.name}</h3>
                        <p className="text-gray-400 text-xs line-clamp-2">{product.description}</p>
                      </div>

                      {/* Price and Add Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-2">
                            <span className="text-orange-400 font-bold text-lg">
                              ${product.price.toLocaleString("es-AR")}
                            </span>
                            {product.originalPrice && (
                              <span className="text-gray-500 text-sm line-through">
                                ${product.originalPrice.toLocaleString("es-AR")}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-4 py-2"
                          onClick={() => addToCart(product)}
                          disabled={!product.available}
                        >
                          Agregar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
