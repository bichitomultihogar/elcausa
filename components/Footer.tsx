import Image from "next/image"
import { Phone, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black/90 backdrop-blur-xl border-t border-red-500/30 mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <Image src="/images/logo.png" alt="El Causa Logo" width={50} height={50} className="rounded-full" />
            <div>
              <h3 className="text-white font-bold text-xl">El Causa</h3>
              <p className="text-orange-400 text-sm font-medium">Delivery de Bebidas</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>WhatsApp: +54 9 11 2345-6789</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Lun-Dom: 18:00 - 02:00</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs">© 2024 El Causa Delivery. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
