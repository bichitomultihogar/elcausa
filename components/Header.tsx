"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Cart } from "./Cart"

interface HeaderProps {
  cart: any[]
  getTotalItems: () => number
  updateQuantity: (id: string, quantity: number) => void
  getTotalPrice: () => number
  getDeliveryFee: () => number
  getFinalTotal: () => number
  onCheckout: () => void
  favoritesCount?: number
  openCart?: boolean
  onCartOpenChange?: (open: boolean) => void
}

export function Header({
  cart,
  getTotalItems,
  updateQuantity,
  getTotalPrice,
  getDeliveryFee,
  getFinalTotal,
  onCheckout,
  favoritesCount = 0,
  openCart,
  onCartOpenChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/95 border-b border-red-500/30 shadow-2xl">
      <div className=" flex justify-center px-4 py-4 w-full">
        <div className="w-full flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 sm:space-x-4">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="El Causa Logo"
                width={60}
                height={60}
                className="header-logo rounded-full ring-2 ring-orange-500/50 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="header-title text-white font-bold text-lg sm:text-xl tracking-tight truncate">El Causa</h1>
              <p className="header-subtitle text-orange-400 text-xs sm:text-sm flex items-center font-medium">
                <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">Abierto • 30-45 min</span>
              </p>
            </div>
          </Link>

          <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
            {/* Favorites Button */}
            <Link href="/favorites">
              <Button
                variant="outline"
                size="sm"
                className="relative bg-red-600/20 border-red-500/50 text-white hover:bg-red-600/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 h-10 w-10 p-0 sm:h-auto sm:w-auto sm:px-3"
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                {favoritesCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[18px] h-5 sm:min-w-[22px] sm:h-6 flex items-center justify-center rounded-full font-bold shadow-lg">
                    {favoritesCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Cart
              cart={cart}
              getTotalItems={getTotalItems}
              updateQuantity={updateQuantity}
              getTotalPrice={getTotalPrice}
              getDeliveryFee={getDeliveryFee}
              getFinalTotal={getFinalTotal}
              onCheckout={onCheckout}
              openCart={openCart}
              onCartOpenChange={onCartOpenChange}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
