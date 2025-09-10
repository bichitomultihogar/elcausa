"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="search-container relative z-30 container mx-auto px-4 py-4 sm:py-6">
      <div className="relative max-w-md mx-auto">
        <Search className="search-icon absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5 z-10" />
        <Input
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input relative z-20 pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-xl sm:rounded-2xl text-sm sm:text-base w-full"
        />
      </div>
    </div>
  )
}
