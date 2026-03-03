'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Currency = 'USD' | 'GBP' | 'CAD'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (c: Currency) => void
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  setCurrency: () => {},
})

const RATES: Record<Currency, number> = {
  USD: 1,
  GBP: parseFloat(process.env.NEXT_PUBLIC_USD_TO_GBP || '0.79'),
  CAD: parseFloat(process.env.NEXT_PUBLIC_USD_TO_CAD || '1.36'),
}

const SYMBOLS: Record<Currency, string> = {
  USD: '$',
  GBP: '£',
  CAD: 'CA$',
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD')
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}

export function formatPriceWithCurrency(priceUsd: number, currency: Currency): string {
  const converted = priceUsd * RATES[currency]
  const symbol = SYMBOLS[currency]
  return `${symbol}${Math.round(converted).toLocaleString()}`
}

export const CURRENCIES: Currency[] = ['USD', 'GBP', 'CAD']
export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: 'USD $',
  GBP: 'GBP £',
  CAD: 'CAD $',
}
