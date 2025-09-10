"use client"

import { useState } from "react"
import { Check, AlertCircle, Banknote, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TransferModal } from "@/components/TransferModal"
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
    paymentMethod: "cash",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)

  const handlePaymentMethodChange = (value: "transfer" | "cash") => {
    setCustomerData((prev) => ({ ...prev, paymentMethod: value }))
    if (value === "transfer") {
      setShowTransferModal(true)
    }
  }

  const handleTransferConfirm = () => {
    setShowTransferModal(false)
  }

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
      paymentMethod: "cash",
    })
    setIsLoading(false)
    onClose()
    onOrderComplete()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="checkout-dialog bg-black/95 backdrop-blur-xl border-red-500/30 text-white max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-lg sm:text-xl font-bold">Finalizar Pedido</DialogTitle>
        </DialogHeader>
        <div className="checkout-form space-y-4 sm:space-y-6">
          {/* Order Summary */}
          <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-3 sm:space-y-4 border border-white/10">
            <h3 className="font-bold text-base sm:text-lg">Resumen del pedido</h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span className="flex-1 text-xs sm:text-sm">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-semibold text-xs sm:text-sm">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-white/20 pt-2 sm:pt-3 space-y-1 sm:space-y-2">
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
                <div className="flex justify-between font-bold text-base sm:text-lg border-t border-white/20 pt-2 sm:pt-3">
                  <span>Total:</span>
                  <span className="text-orange-400 text-lg sm:text-xl">{formatPrice(getFinalTotal())}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4 sm:space-y-5">
            <h3 className="font-bold text-base sm:text-lg">Información de entrega</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label htmlFor="name" className="text-white font-medium text-sm">
                  Nombre completo
                </Label>
                <Input
                  id="name"
                  value={customerData.name}
                  onChange={(e) => setCustomerData((prev) => ({ ...prev, name: e.target.value }))}
                  className="checkout-input bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2 text-sm sm:text-base"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white font-medium text-sm">
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="checkout-input bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2 text-sm sm:text-base"
                  placeholder="Tu teléfono"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-white font-medium text-sm">
                Dirección de entrega
              </Label>
              <Input
                id="address"
                value={customerData.address}
                onChange={(e) => setCustomerData((prev) => ({ ...prev, address: e.target.value }))}
                className="checkout-input bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2 text-sm sm:text-base"
                placeholder="Calle, número, barrio"
              />
            </div>

            <div>
              <Label htmlFor="details" className="text-white font-medium text-sm">
                Detalles adicionales (opcional)
              </Label>
              <Textarea
                id="details"
                value={customerData.details}
                onChange={(e) => setCustomerData((prev) => ({ ...prev, details: e.target.value }))}
                className="checkout-input bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2 text-sm sm:text-base"
                placeholder="Referencias, piso, departamento, etc."
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-bold text-base sm:text-lg">Método de pago</h3>
            <RadioGroup
              value={customerData.paymentMethod}
              onValueChange={handlePaymentMethodChange}
              className="space-y-2 sm:space-y-3"
            >
              <div className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 data-[state=checked]:bg-orange-500/20 data-[state=checked]:border-orange-500/50 data-[state=checked]:shadow-lg">
                <RadioGroupItem value="transfer" id="transfer" />
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
                  <Banknote className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 group-data-[state=checked]:text-green-300 transition-colors" />
                  <div>
                    <Label htmlFor="transfer" className="text-white font-semibold text-sm group-data-[state=checked]:text-orange-200 transition-colors">
                      Transferencia Bancaria
                    </Label>
                    <p className="text-gray-400 text-xs group-data-[state=checked]:text-orange-100 transition-colors">Envía comprobante por WhatsApp</p>
                  </div>
                </div>
              </div>

              <div className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 data-[state=checked]:bg-orange-500/20 data-[state=checked]:border-orange-500/50 data-[state=checked]:shadow-lg">
                <RadioGroupItem value="cash" id="cash" />
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
                  <Smartphone className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 group-data-[state=checked]:text-orange-300 transition-colors" />
                  <div>
                    <Label htmlFor="cash" className="text-white font-semibold text-sm group-data-[state=checked]:text-orange-200 transition-colors">
                      Efectivo en entrega
                    </Label>
                    <p className="text-gray-400 text-xs group-data-[state=checked]:text-orange-100 transition-colors">Paga al recibir tu pedido</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Delivery Info */}
          <Alert className="bg-blue-500/20 border-blue-500/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-blue-200 text-xs sm:text-sm">
              Tiempo estimado de entrega: 30-45 minutos. Te contactaremos por WhatsApp para confirmar.
            </AlertDescription>
          </Alert>

          <Button
            className="checkout-button w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-3 sm:py-4 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-200"
            onClick={handleConfirmOrder}
            disabled={!customerData.name || !customerData.phone || !customerData.address || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white"></div>
                <span>Procesando...</span>
              </div>
            ) : (
              <>
                <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Confirmar Pedido
              </>
            )}
          </Button>
        </div>
      </DialogContent>

      {/* Transfer Modal */}
      <TransferModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        onConfirm={handleTransferConfirm}
      />
    </Dialog>
  )
}
