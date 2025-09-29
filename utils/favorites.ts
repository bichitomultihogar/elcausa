// Utility functions for favorites management
export const FAVORITES_STORAGE_KEY = "el-causa-favorites"

export const getFavoritesFromStorage = (): string[] => {
  if (typeof window === "undefined") return []
  
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)
    return savedFavorites ? JSON.parse(savedFavorites) : []
  } catch (error) {
    console.error("Error loading favorites from localStorage:", error)
    return []
  }
}

export const saveFavoritesToStorage = (favorites: string[]): void => {
  if (typeof window === "undefined") return
  
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
  } catch (error) {
    console.error("Error saving favorites to localStorage:", error)
  }
}

export const clearFavoritesFromStorage = (): void => {
  if (typeof window === "undefined") return
  
  try {
    localStorage.removeItem(FAVORITES_STORAGE_KEY)
  } catch (error) {
    console.error("Error clearing favorites from localStorage:", error)
  }
}

// Development helper to log favorites state
export const logFavoritesState = (favorites: string[], context: string = "") => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Favorites${context ? ` - ${context}` : ""}]:`, {
      count: favorites.length,
      items: favorites,
      storage: getFavoritesFromStorage()
    })
  }
}
