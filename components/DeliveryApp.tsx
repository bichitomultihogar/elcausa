"use client"

import { useState } from "react"
import { Header } from "./Header"
import { InfoBanner } from "./InfoBanner"
import { SearchBar } from "./SearchBar"
import { CategoryTabs } from "./CategoryTabs"
import { ProductGrid } from "./ProductGrid"
import { Checkout } from "./Checkout"
import { OrderSuccess } from "./OrderSuccess"
import { Footer } from "./Footer"
import { CartNotification } from "./CartNotification"
import { useCart } from "@/hooks/useCart"
import { useProducts } from "@/hooks/useProducts"
import type { Product } from "@/types"

export function DeliveryApp() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [showOrderSuccess, setShowOrderSuccess] = useState(false)
  const [showCartNotification, setShowCartNotification] = useState(false)
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null)

  const {
    cart,
    addToCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    getDeliveryFee,
    getFinalTotal,
    isLoaded: cartLoaded,
  } = useCart()

  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    favorites,
    toggleFavorite,
    isLoaded: favoritesLoaded,
  } = useProducts()

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    setLastAddedProduct(product)
    setShowCartNotification(true)
  }

  const handleOrderComplete = () => {
    clearCart()
    setShowOrderSuccess(true)
  }

  const handleViewCart = () => {
    setShowCartNotification(false)
    // Aquí podrías abrir el carrito directamente
    // Por ahora solo cerramos la notificación
    // En el futuro se podría implementar para abrir el sheet del carrito
  }

  // Show loading while data is being loaded from localStorage
  if (!cartLoaded || !favoritesLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-white text-lg">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Header
        cart={cart}
        getTotalItems={getTotalItems}
        updateQuantity={updateQuantity}
        getTotalPrice={getTotalPrice}
        getDeliveryFee={getDeliveryFee}
        getFinalTotal={getFinalTotal}
        onCheckout={() => setShowCheckout(true)}
        favoritesCount={favorites.length}
      />

      <InfoBanner />

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <CategoryTabs selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <ProductGrid
        products={filteredProducts}
        favorites={favorites}
        onAddToCart={handleAddToCart}
        onToggleFavorite={toggleFavorite}
      />

      <Checkout
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cart={cart}
        getTotalPrice={getTotalPrice}
        getDeliveryFee={getDeliveryFee}
        getFinalTotal={getFinalTotal}
        onOrderComplete={handleOrderComplete}
      />

      <OrderSuccess isOpen={showOrderSuccess} onClose={() => setShowOrderSuccess(false)} />

      <CartNotification
        isVisible={showCartNotification}
        product={lastAddedProduct}
        onClose={() => setShowCartNotification(false)}
        onViewCart={handleViewCart}
        totalPrice={getTotalPrice()}
      />

      <Footer />
    </div>
  )
}
