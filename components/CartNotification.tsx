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

  const isFreeShipping = totalPrice >= 10000
  const remainingForFreeShipping = 10000 - totalPrice

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 ease-in-out ${
        isAnimating && !isExiting 
          ? "translate-x-0 opacity-100 scale-100" 
          : "translate-x-full opacity-0 scale-95"
      }`}
    >
      <div className="bg-gradient-to-br from-white via-white to-orange-50/30 backdrop-blur-2xl border border-orange-200/50 rounded-3xl shadow-2xl p-5 max-w-sm w-80 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-3xl"></div>
        
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 p-[1px]">
          <div className="w-full h-full bg-white rounded-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">¡Agregado!</h3>
                <p className="text-xs text-gray-600">Producto en el carrito</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full transition-colors"
              onClick={handleClose}
            >
              <X className="h-4 w-4 text-gray-500" />
            </Button>
          </div>

          {/* Product Card */}
          <div className="bg-gradient-to-r from-gray-50 to-orange-50/50 rounded-2xl p-4 border border-orange-100">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shadow-md">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate mb-1">{product.name}</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-orange-600">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Status */}
          {isFreeShipping ? (
            <div className="mb-4 p-3 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-2xl">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Truck className="h-3 w-3 text-white" />
                </div>
                <div>
                  <span className="text-sm font-bold text-green-800">¡Envío GRATIS!</span>
                  <p className="text-xs text-green-700">Tu pedido califica para envío sin costo</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4 p-3 bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200 rounded-2xl">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <div>
                  <span className="text-sm font-bold text-orange-800">¡Casi tienes envío gratis!</span>
                  <p className="text-xs text-orange-700">
                    Te faltan {formatPrice(remainingForFreeShipping)} para envío sin costo
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-10 border-orange-200 hover:bg-orange-50 hover:border-orange-300 text-orange-700 font-medium rounded-xl transition-all duration-200"
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
