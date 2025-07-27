import { Truck, MapPin, Phone } from "lucide-react"

export function InfoBanner() {
  return (
    <div className="bg-gradient-to-r from-red-600/30 to-orange-500/30 backdrop-blur-sm border-b border-red-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center space-x-8 text-sm text-white">
          <div className="flex items-center space-x-2">
            <Truck className="h-4 w-4 text-orange-400" />
            <span className="font-medium">Entrega: 30-45 min</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-orange-400" />
            <span className="font-medium">Zona centro</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-orange-400" />
            <span className="font-medium">WhatsApp</span>
          </div>
        </div>
      </div>
    </div>
  )
}
