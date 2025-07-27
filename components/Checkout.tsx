"use client"

import { useState } from "react"
import { Check, AlertCircle, CreditCard, Banknote, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { CartItem, CustomerData } from "@/types"
import { formatPrice } from "@/utils/format"
import { generateWhatsAppMessage, sendWhatsAppMessage } from "@/utils/whatsapp"

interface CheckoutProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  getTotalPrice: () => number
  getDeliveryFee: () => number
  getFinalTotal: () => number
  onOrderComplete: () => void
}

export function Checkout({
  isOpen,
  onClose,
  cart,
  getTotalPrice,
  getDeliveryFee,
  getFinalTotal,
  onOrderComplete,
}: CheckoutProps) {
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    phone: "",
    address: "",
    details: "",
    paymentMethod: "mercadopago",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirmOrder = async () => {
    setIsLoading(true)

    // Simular procesamiento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const message = generateWhatsAppMessage(cart, customerData, getTotalPrice(), getDeliveryFee(), getFinalTotal())
    sendWhatsAppMessage(message)

    setCustomerData({
      name: "",
      phone: "",
      address: "",
      details: "",
      paymentMethod: "mercadopago",
    })
    setIsLoading(false)
    onClose()
    onOrderComplete()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/95 backdrop-blur-xl border-red-500/30 text-white max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-bold">Finalizar Pedido</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white/5 rounded-2xl p-5 space-y-4 border border-white/10">
            <h3 className="font-bold text-lg">Resumen del pedido</h3>
            <div className="space-y-3 text-sm">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span className="flex-1">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-white/20 pt-3 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span className={`font-semibold ${getDeliveryFee() === 0 ? "text-green-400" : ""}`}>
                    {getDeliveryFee() === 0 ? "GRATIS" : formatPrice(getDeliveryFee())}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-white/20 pt-3">
                  <span>Total:</span>
                  <span className="text-orange-400 text-xl">{formatPrice(getFinalTotal())}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-5">
            <h3 className="font-bold text-lg">Información de entrega</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-white font-medium">
                  Nombre completo
                </Label>
                <Input
                  id="name"
                  value={customerData.name}
                  onChange={(e) => setCustomerData((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white font-medium">
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2"
                  placeholder="Tu teléfono"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-white font-medium">
                Dirección de entrega
              </Label>
              <Input
                id="address"
                value={customerData.address}
                onChange={(e) => setCustomerData((prev) => ({ ...prev, address: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2"
                placeholder="Calle, número, barrio"
              />
            </div>

            <div>
              <Label htmlFor="details" className="text-white font-medium">
                Detalles adicionales (opcional)
              </Label>
              <Textarea
                id="details"
                value={customerData.details}
                onChange={(e) => setCustomerData((prev) => ({ ...prev, details: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2"
                placeholder="Referencias, piso, departamento, etc."
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Método de pago</h3>
            <RadioGroup
              value={customerData.paymentMethod}
              onValueChange={(value: "mercadopago" | "transfer" | "cash") =>
                setCustomerData((prev) => ({ ...prev, paymentMethod: value }))
              }
              className="space-y-3"
            >
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <RadioGroupItem value="mercadopago" id="mercadopago" />
                <div className="flex items-center space-x-3 flex-1">
                  <CreditCard className="h-6 w-6 text-blue-400" />
                  <div>
                    <Label htmlFor="mercadopago" className="text-white font-semibold">
                      MercadoPago
                    </Label>
                    <p className="text-gray-400 text-xs">Pago seguro con tarjeta</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <RadioGroupItem value="transfer" id="transfer" />
                <div className="flex items-center space-x-3 flex-1">
                  <Banknote className="h-6 w-6 text-green-400" />
                  <div>
                    <Label htmlFor="transfer" className="text-white font-semibold">
                      Transferencia Bancaria
                    </Label>
                    <p className="text-gray-400 text-xs">Envía comprobante por WhatsApp</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <RadioGroupItem value="cash" id="cash" />
                <div className="flex items-center space-x-3 flex-1">
                  <Smartphone className="h-6 w-6 text-orange-400" />
                  <div>
                    <Label htmlFor="cash" className="text-white font-semibold">
                      Efectivo en entrega
                    </Label>
                    <p className="text-gray-400 text-xs">Paga al recibir tu pedido</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Delivery Info */}
          <Alert className="bg-blue-500/20 border-blue-500/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-blue-200">
              Tiempo estimado de entrega: 30-45 minutos. Te contactaremos por WhatsApp para confirmar.
            </AlertDescription>
          </Alert>

          <Button
            className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-200"
            onClick={handleConfirmOrder}
            disabled={!customerData.name || !customerData.phone || !customerData.address || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Procesando...</span>
              </div>
            ) : (
              <>
                <Check className="h-5 w-5 mr-2" />
                Confirmar Pedido
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
