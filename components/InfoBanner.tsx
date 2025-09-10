import { Truck, MapPin, Phone } from "lucide-react"

export function InfoBanner() {
  return (
    <div className="info-banner bg-gradient-to-r from-red-600/30 to-orange-500/30 backdrop-blur-sm border-b border-red-500/20">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="info-banner-content flex items-center justify-center space-x-4 sm:space-x-8 text-xs sm:text-sm text-white">
          <div className="info-banner-item flex items-center space-x-1 sm:space-x-2">
            <Truck className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400" />
            <span className="font-medium">Entrega: 15-20 min</span>
          </div>
          <div className="info-banner-item flex items-center space-x-1 sm:space-x-2">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400" />
            <span className="font-medium">San José De La Dormida</span>
          </div>
          <div className="info-banner-item flex items-center space-x-1 sm:space-x-2">
            <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400" />
            <span className="font-medium">WhatsApp</span>
          </div>
        </div>
      </div>
    </div>
  )
}
