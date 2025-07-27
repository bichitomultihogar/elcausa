import type { CartItem, CustomerData } from "@/types"
import { formatPrice } from "./format"

export const generateWhatsAppMessage = (
  cart: CartItem[],
  customerData: CustomerData,
  subtotal: number,
  deliveryFee: number,
  total: number,
): string => {
  const orderDetails = cart
    .map((item) => `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`)
    .join("\n")

  const paymentMethodText = {
    mercadopago: "💳 MercadoPago (Pago realizado)",
    transfer: "🏦 Transferencia Bancaria (Comprobante pendiente)",
    cash: "💵 Efectivo en entrega",
  }

  return `🛒 *NUEVO PEDIDO - EL CAUSA DELIVERY*

👤 *Cliente:* ${customerData.name}
📱 *Teléfono:* ${customerData.phone}
📍 *Dirección:* ${customerData.address}
📝 *Detalles:* ${customerData.details || "Sin detalles adicionales"}

🛍️ *PRODUCTOS:*
${orderDetails}

💰 *RESUMEN:*
Subtotal: ${formatPrice(subtotal)}
Envío: ${deliveryFee === 0 ? "GRATIS" : formatPrice(deliveryFee)}
*TOTAL: ${formatPrice(total)}*

${paymentMethodText[customerData.paymentMethod]}

${customerData.paymentMethod === "transfer" ? "⚠️ *Esperando comprobante de transferencia*" : ""}
${customerData.paymentMethod === "cash" ? "💵 *Cobrar en efectivo al entregar*" : ""}

🚚 *Tiempo estimado de entrega: 30-45 minutos*

¡Gracias por tu pedido! 🙏`
}

export const sendWhatsAppMessage = (message: string, phoneNumber = "543521539991") => {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  window.open(whatsappUrl, "_blank")
}
