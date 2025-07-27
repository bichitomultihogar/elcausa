import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "El Causa - Delivery de Bebidas",
  description: "Delivery de bebidas y productos de kiosco. Pedí desde tu celular y recibilo en tu casa.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
