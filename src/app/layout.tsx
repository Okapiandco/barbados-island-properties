import { ReactNode } from 'react'
import '../styles/globals.css'
import type { Metadata } from 'next'
import { CurrencyProvider } from '@/context/CurrencyContext'

export const metadata: Metadata = {
  title: 'Barbados Island Properties | Luxury Real Estate',
  description: 'Discover luxury holiday rentals and properties for sale in Barbados.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Avenir&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#fafaf8]">
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  )
}
