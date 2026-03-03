'use client'

import { useCurrency, CURRENCIES, CURRENCY_LABELS } from '@/context/CurrencyContext'

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency()

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as any)}
      className="bg-white/20 text-white text-sm font-medium border border-white/30 rounded-lg px-2 py-1.5 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22white%22%3E%3Cpath%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_4px_center] pr-5"
    >
      {CURRENCIES.map((c) => (
        <option key={c} value={c} className="text-gray-800 bg-white">
          {CURRENCY_LABELS[c]}
        </option>
      ))}
    </select>
  )
}
