"use client"

import { useState, useEffect } from "react"
import { Check, ShoppingCart, X, Truck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { Product } from "@/types"
import { formatPrice } from "@/utils/format"

interface CartNotificationProps {
  isVisible: boolean
  product: Product | null
  onClose: () => void
  onViewCart: () => void
  totalPrice?: number
}

export function CartNotification({ isVisible, product, onClose, onViewCart, totalPrice = 0 }: CartNotificationProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
      setIsExiting(false)
      const timer = setTimeout(() => {
        handleClose()
      }, 5000) // Auto-hide after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [isVisible])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsAnimating(false)
      onClose()
    }, 300) // Wait for exit animation
  }

  if (!isVisible || !product) return null

  const isFreeShipping = true // Always free shipping

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 ease-in-out ${
        isAnimating && !isExiting 
          ? "translate-x-0 opacity-100 scale-100" 
          : "translate-x-full opacity-0 scale-95"
      }`}
    >
      <div className="bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-800/95 backdrop-blur-2xl border border-orange-500/30 rounded-3xl shadow-2xl p-5 max-w-sm w-80 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-3xl"></div>
        
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 p-[1px]">
          <div className="w-full h-full bg-gray-900 rounded-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">¡Agregado!</h3>
                <p className="text-xs text-gray-300">Producto en el carrito</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-700/50 rounded-full transition-colors"
              onClick={handleClose}
            >
              <X className="h-4 w-4 text-gray-300" />
            </Button>
          </div>

          {/* Product Card */}
          <div className="bg-gradient-to-r from-gray-800/50 to-orange-900/30 rounded-2xl p-4 border border-orange-500/20 mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-700 shadow-md">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white truncate mb-1">{product.name}</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-orange-400">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Status - Always Free */}
          <div className="mb-4 p-3 bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/30 rounded-2xl">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Truck className="h-3 w-3 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold text-green-300">¡Envío GRATIS!</span>
                <p className="text-xs text-green-400">Envío sin costo en todos los pedidos</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-10 bg-black/80 border-orange-500/50 hover:bg-orange-500/10 hover:border-orange-400 text-orange-300 font-medium rounded-xl transition-all duration-200"
              onClick={handleClose}
            >
              Continuar
            </Button>
            <Button
              size="sm"
              className="flex-1 h-10 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={onViewCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Ver carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
