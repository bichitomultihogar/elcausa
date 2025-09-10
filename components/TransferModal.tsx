"use client"

import { useState } from "react"
import { MessageCircle, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TransferModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function TransferModal({ isOpen, onClose, onConfirm }: TransferModalProps) {
  const [copied, setCopied] = useState(false)
  
  const whatsappNumber = "+54 9 11 2345-6789"

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(whatsappNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/95 backdrop-blur-xl border-orange-500/30 text-white max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-bold flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-green-400" />
            Transferencia Bancaria
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Alert */}
          <Alert className="bg-orange-500/20 border-orange-500/50">
            <AlertDescription className="text-orange-200 text-sm">
              <strong>Recuerda:</strong> Una vez que hagas el pedido, realiza el pago mediante transferencia y envía el comprobante por WhatsApp.
            </AlertDescription>
          </Alert>

          {/* WhatsApp Number */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="font-semibold text-white mb-3">Enviar comprobante a:</h3>
            
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-white/10 rounded-lg p-3 border border-white/20">
                <p className="text-white font-mono text-lg">{whatsappNumber}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-green-500/50 hover:bg-green-500/20 text-green-400"
                onClick={handleCopyNumber}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 border-orange-500/50 hover:bg-orange-500/20 text-orange-400"
              onClick={onClose}
            >
              Entendido
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold"
              onClick={onConfirm}
            >
              Continuar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
