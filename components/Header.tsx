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
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/95 border-b border-red-500/30 shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="El Causa Logo"
                width={60}
                height={60}
                className="rounded-full ring-2 ring-orange-500/50 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl tracking-tight">El Causa</h1>
              <p className="text-orange-400 text-sm flex items-center font-medium">
                <Clock className="w-3 h-3 mr-1" />
                Abierto • 30-45 min
              </p>
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            {/* Favorites Button */}
            <Link href="/favorites">
              <Button
                variant="outline"
                size="sm"
                className="relative bg-red-600/20 border-red-500/50 text-white hover:bg-red-600/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Heart className="h-5 w-5" />
                {favoritesCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[22px] h-6 flex items-center justify-center rounded-full font-bold shadow-lg">
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
            />
          </div>
        </div>
      </div>
    </header>
  )
}
