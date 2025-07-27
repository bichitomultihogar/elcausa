"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface OrderSuccessProps {
  isOpen: boolean
  onClose: () => void
}

export function OrderSuccess({ isOpen, onClose }: OrderSuccessProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/95 backdrop-blur-xl border-green-500/30 text-white max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl text-center font-bold">¡Pedido Confirmado!</DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-6 py-4">
          <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
            <Check className="h-10 w-10 text-green-400" />
          </div>
          <div>
            <p className="text-xl font-bold mb-3">¡Gracias por tu pedido!</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Hemos enviado los detalles por WhatsApp. Te contactaremos pronto para confirmar la entrega.
            </p>
          </div>
          <Button
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 font-bold py-3"
            onClick={onClose}
          >
            Continuar comprando
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
