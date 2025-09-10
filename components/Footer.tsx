import Image from "next/image"
import { Phone, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="footer bg-black/90 backdrop-blur-xl border-t border-red-500/30 mt-12 sm:mt-16">
      <div className="container mx-auto px-4 py-8 sm:py-10">
        <div className="footer-content text-center space-y-4 sm:space-y-6">
          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
            <Image src="/images/logo.png" alt="El Causa Logo" width={40} height={40} className="footer-logo rounded-full sm:w-12 sm:h-12" />
            <div>
              <h3 className="footer-title text-white font-bold text-lg sm:text-xl">El Causa</h3>
              <p className="footer-subtitle text-orange-400 text-xs sm:text-sm font-medium">Delivery de Bebidas</p>
            </div>
          </div>
          <div className="footer-info flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>WhatsApp: +54 9 11 2345-6789</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Lun-Dom: 18:00 - 02:00</span>
            </div>
          </div>
          <p className="footer-copyright text-gray-500 text-xs">© 2024 El Causa Delivery. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
