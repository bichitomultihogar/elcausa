"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { products } from "@/data/products"
import { ProductDetail } from "@/components/ProductDetail"
import type { Product } from "@/types"

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.slug) {
      const foundProduct = products.find(p => p.slug === params.slug)
      setProduct(foundProduct || null)
      setLoading(false)
    }
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-white text-lg">Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-white text-2xl font-bold">Producto no encontrado</h1>
          <p className="text-gray-400">El producto que buscas no existe o ha sido removido.</p>
        </div>
      </div>
    )
  }

  return <ProductDetail product={product} />
}
