import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'
import Header from '@/components/Header'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

      {/* Page Content - offset for fixed header */}
      <div className="pt-28">
        {children}
      </div>

      {/* Footer */}
      <footer className="py-12 bg-[#82c4f8] text-white">
        <div className="container-max">
          <div className="flex flex-col items-center">
            <Image
              src="/logo-white.png"
              alt="Barbados Island Properties"
              width={120}
              height={93}
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm text-white mb-6">Luxury real estate in Barbados</p>
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <Link href="/holiday-rentals" className="text-white hover:text-white/80 no-underline text-sm">Rentals</Link>
              <Link href="/sales" className="text-white hover:text-white/80 no-underline text-sm">Sales</Link>
              <Link href="/property-management" className="text-white hover:text-white/80 no-underline text-sm">Property Management</Link>
              <Link href="/about" className="text-white hover:text-white/80 no-underline text-sm">About</Link>
              <Link href="/concierge" className="text-white hover:text-white/80 no-underline text-sm">Concierge</Link>
              <Link href="/faqs" className="text-white hover:text-white/80 no-underline text-sm">FAQs</Link>
              <Link href="/contact" className="text-white hover:text-white/80 no-underline text-sm">Contact</Link>
            </div>
            {/* Facebook */}
            <a href="https://www.facebook.com/share/189zqTfzdu/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <p className="text-xs text-white/80">&copy; {new Date().getFullYear()} Barbados Island Properties. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
