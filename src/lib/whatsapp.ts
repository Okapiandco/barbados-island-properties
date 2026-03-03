export const generateWhatsAppLink = (
  phoneNumber: string,
  message?: string
): string => {
  // Remove all non-digit characters from phone number
  const cleanPhone = phoneNumber.replace(/\D/g, '')
  
  // Ensure it starts with country code (should be 1 for Barbados/Caribbean)
  let formattedPhone = cleanPhone
  if (!cleanPhone.startsWith('1')) {
    formattedPhone = `1${cleanPhone}`
  }

  const encodedMessage = message
    ? encodeURIComponent(message)
    : ''

  return `https://wa.me/${formattedPhone}${message ? `?text=${encodedMessage}` : ''}`
}

export const createEnquiryMessage = (
  propertyTitle: string,
  propertyUrl: string,
  dateStart?: string,
  dateEnd?: string,
  guests?: number
): string => {
  let message = `Hi, I'm interested in ${propertyTitle}\n`
  message += `${propertyUrl}\n\n`

  if (dateStart && dateEnd) {
    message += `Dates: ${dateStart} to ${dateEnd}\n`
  }

  if (guests) {
    message += `Guests: ${guests}\n`
  }

  message += `\nCould you please provide more information?`

  return message
}
