'use client'

import { useCurrency, formatPriceWithCurrency } from '@/context/CurrencyContext'

interface PriceProps {
  usd: number
  className?: string
  suffix?: boolean
}

export default function Price({ usd, className, suffix = false }: PriceProps) {
  const { currency } = useCurrency()
  const formatted = formatPriceWithCurrency(usd, currency)
  return <span className={className}>{formatted}{suffix ? ` ${currency}` : ''}</span>
}
