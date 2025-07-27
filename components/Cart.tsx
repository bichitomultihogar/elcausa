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
}

export function Cart({
  cart,
  getTotalItems,
  updateQuantity,
  getTotalPrice,
  getDeliveryFee,
  getFinalTotal,
  onCheckout,
}: CartProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative bg-red-600/20 border-red-500/50 text-white hover:bg-red-600/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <ShoppingCart className="h-5 w-5" />
          {getTotalItems() > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-orange-500 text-black text-xs min-w-[22px] h-6 flex items-center justify-center rounded-full font-bold shadow-lg animate-pulse">
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-black/95 backdrop-blur-xl border-red-500/30 text-white w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader className="flex-shrink-0 pb-4">
          <SheetTitle className="text-white text-xl font-bold">Tu Carrito</SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
            <ShoppingCart className="h-20 w-20 text-gray-600 mb-6" />
            <p className="text-gray-400 text-xl font-medium mb-2">Tu carrito está vacío</p>
            <p className="text-gray-500 text-sm">Agrega productos para comenzar</p>
          </div>
        ) : (
          <>
            {/* Scrollable Items Area */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 min-h-0">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 bg-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/10 shadow-lg"
                >
                  <div className="relative flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={70}
                      height={70}
                      className="rounded-xl object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-white truncate mb-1">{item.name}</h4>
                    <p className="text-orange-400 text-sm font-bold">{formatPrice(item.price)}</p>
                    <p className="text-gray-400 text-xs">Total: {formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9 w-9 p-0 border-red-500/50 bg-transparent hover:bg-red-500/20 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm w-8 text-center font-bold text-lg">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9 w-9 p-0 border-red-500/50 bg-transparent hover:bg-red-500/20 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Fixed Footer with Totals and Checkout Button */}
            <div className="flex-shrink-0 border-t border-red-500/30 pt-6 space-y-4 bg-black/95 backdrop-blur-xl">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span className={`font-semibold ${getDeliveryFee() === 0 ? "text-green-400" : ""}`}>
                    {getDeliveryFee() === 0 ? "GRATIS" : formatPrice(getDeliveryFee())}
                  </span>
                </div>
                {getDeliveryFee() > 0 && (
                  <p className="text-xs text-orange-400 bg-orange-500/10 p-2 rounded-lg">
                    💡 Envío gratis en compras mayores a $10.000
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center text-lg font-bold border-t border-white/20 pt-4">
                <span>Total:</span>
                <span className="text-orange-400 text-xl">{formatPrice(getFinalTotal())}</span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-200"
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
