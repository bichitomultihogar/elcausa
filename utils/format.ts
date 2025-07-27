export const formatPrice = (price: number): string => {
  return `$${price.toLocaleString("es-AR")}`
}

export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}min`
}
