import { CurrencyRate } from './types'

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  GBP: '£',
  CAD: 'CA$',
}

export const getCurrencyRates = (): CurrencyRate => {
  const usdToGbp = parseFloat(
    process.env.NEXT_PUBLIC_USD_TO_GBP || '0.79'
  )
  const usdToCad = parseFloat(
    process.env.NEXT_PUBLIC_USD_TO_CAD || '1.36'
  )

  return {
    USD: 1,
    GBP: usdToGbp,
    CAD: usdToCad,
  }
}

export const convertCurrency = (
  usdAmount: number,
  fromCurrency: string = 'USD',
  toCurrency: string = 'USD'
): number => {
  if (fromCurrency !== 'USD') {
    const rates = getCurrencyRates()
    const usdValue = usdAmount / (rates[fromCurrency] || 1)
    return usdValue * (rates[toCurrency] || 1)
  }

  const rates = getCurrencyRates()
  return usdAmount * (rates[toCurrency] || 1)
}

export const formatPrice = (
  amount: number,
  currency: string = 'USD',
  decimals: number = 0
): string => {
  const symbol = CURRENCY_SYMBOLS[currency] || currency

  if (amount >= 1_000_000) {
    return `${symbol}${(amount / 1_000_000).toFixed(1)}M`
  }
  if (amount >= 1_000) {
    return `${symbol}${(amount / 1_000).toFixed(decimals)}K`
  }

  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`
}

export const getPriceInCurrency = (
  priceUsd: number,
  currency: string
): number => {
  return convertCurrency(priceUsd, 'USD', currency)
}
