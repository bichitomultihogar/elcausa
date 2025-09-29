"use client"

import Image from "next/image"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { CartItem } from "@/types"
import { formatPrice } from "@/utils/format"

interface CartProps {
  cart: CartItem[]
  getTotalItems: () => number
  updateQuantity: (id: string, quantity: number) => void
  getTotalPrice: () => number
  getDeliveryFee: () => number
  getFinalTotal: () => number
  onCheckout: () => void
  openCart?: boolean
  onCartOpenChange?: (open: boolean) => void
}

export function Cart({
  cart,
  getTotalItems,
  updateQuantity,
  getTotalPrice,
  getDeliveryFee,
  getFinalTotal,
  onCheckout,
  openCart,
  onCartOpenChange,
}: CartProps) {
  return (
    <Sheet open={openCart} onOpenChange={onCartOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative bg-red-600/20 border-red-500/50 text-white hover:bg-red-600/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 h-10 w-10 p-0 sm:h-auto sm:w-auto sm:px-3"
        >
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          {getTotalItems() > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-orange-500 text-black text-xs min-w-[18px] h-5 sm:min-w-[22px] sm:h-6 flex items-center justify-center rounded-full font-bold shadow-lg animate-pulse">
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="cart-sheet bg-black/95 backdrop-blur-xl border-red-500/30 text-white w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader className="cart-header flex-shrink-0 pb-4">
          <SheetTitle className="text-white text-lg sm:text-xl font-bold">Tu Carrito</SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
            <ShoppingCart className="h-16 w-16 sm:h-20 sm:w-20 text-gray-600 mb-6" />
            <p className="text-gray-400 text-lg sm:text-xl font-medium mb-2">Tu carrito está vacío</p>
            <p className="text-gray-500 text-sm">Agrega productos para comenzar</p>
          </div>
        ) : (
          <>
            {/* Scrollable Items Area */}
            <div className="cart-items flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-2 min-h-0">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="cart-item flex items-center space-x-3 sm:space-x-4 bg-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 backdrop-blur-sm border border-white/10 shadow-lg"
                >
                  <div className="relative flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="cart-item-image rounded-lg sm:rounded-xl object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="cart-item-name font-semibold text-xs sm:text-sm text-white truncate mb-1">{item.name}</h4>
                    <p className="cart-item-price text-orange-400 text-xs sm:text-sm font-bold">{formatPrice(item.price)}</p>
                    <p className="text-gray-400 text-xs">Total: {formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0 border-red-500/50 bg-transparent hover:bg-red-500/20 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <span className="text-xs sm:text-sm w-6 sm:w-8 text-center font-bold">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0 border-red-500/50 bg-transparent hover:bg-red-500/20 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Fixed Footer with Totals and Checkout Button */}
            <div className="cart-footer flex-shrink-0 border-t border-red-500/30 pt-4 sm:pt-6 space-y-3 sm:space-y-4 bg-black/95 backdrop-blur-xl">
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span className="font-semibold text-green-400">
                    GRATIS
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-base sm:text-lg font-bold border-t border-white/20 pt-3 sm:pt-4">
                <span>Total:</span>
                <span className="text-orange-400 text-lg sm:text-xl">{formatPrice(getFinalTotal())}</span>
              </div>
              <Button
                className="cart-checkout-button w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-3 sm:py-4 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-200"
                onClick={onCheckout}
              >
                Proceder al Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
