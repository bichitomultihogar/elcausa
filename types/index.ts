export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  available: boolean
  description: string
  rating: number
  reviews: number
  isPopular?: boolean
  isNew?: boolean
}

export interface CartItem extends Product {
  quantity: number
}

export interface CustomerData {
  name: string
  phone: string
  address: string
  details: string
  paymentMethod: "mercadopago" | "transfer" | "cash"
}

export interface Category {
  id: string
  name: string
  icon: string
}
