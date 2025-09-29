"use client"

import { useState, useEffect, useMemo } from "react"
import { products } from "@/data/products"
import { getFavoritesFromStorage, saveFavoritesToStorage, logFavoritesState } from "@/utils/favorites"

export const useProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar favoritos desde localStorage al inicializar
  useEffect(() => {
    const savedFavorites = getFavoritesFromStorage()
    setFavorites(savedFavorites)
    logFavoritesState(savedFavorites, "loaded from storage")
    setIsLoaded(true)
  }, [])

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    if (isLoaded) {
      saveFavoritesToStorage(favorites)
      logFavoritesState(favorites, "saved to storage")
    }
  }, [favorites, isLoaded])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const favoriteProducts = useMemo(() => {
    return products.filter((product) => favorites.includes(product.id))
  }, [favorites])

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const isCurrentlyFavorite = prev.includes(productId)
      const newFavorites = isCurrentlyFavorite 
        ? prev.filter((id) => id !== productId) 
        : [...prev, productId]
      
      logFavoritesState(newFavorites, `toggled product ${productId}`)
      
      return newFavorites
    })
  }

  const addToFavorites = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev : [...prev, productId]))
  }

  const removeFromFavorites = (productId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== productId))
  }

  const isFavorite = (productId: string) => {
    return favorites.includes(productId)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return {
    products,
    filteredProducts,
    favoriteProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    favorites,
    toggleFavorite,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
    isLoaded,
  }
}
