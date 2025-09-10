"use client"

import { categories } from "@/data/products"

interface CategoryTabsProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export function CategoryTabs({ selectedCategory, setSelectedCategory }: CategoryTabsProps) {
  return (
    <div className="category-container container mx-auto px-4 pb-8">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 shadow-xl">
        <div className="category-grid grid grid-cols-5 gap-2 sm:gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                category-button flex flex-col items-center justify-center space-y-1 sm:space-y-2 py-3 px-1 sm:py-4 sm:px-2 rounded-xl transition-all duration-300 min-h-[75px] sm:min-h-[90px]
                ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-br from-red-600 to-orange-500 text-white shadow-lg transform scale-105"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              <span className="category-icon text-xl sm:text-2xl mb-1">{category.icon}</span>
              <span className="category-text font-medium text-xs leading-tight text-center px-1">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
