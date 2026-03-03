'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import CurrencyToggle from '@/components/CurrencyToggle'

interface HeaderProps {
  transparent?: boolean
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/holiday-rentals', label: 'Holiday Rentals' },
  { href: '/sales', label: 'Properties For Sale' },
  { href: '/property-management', label: 'Property Management' },
  { href: '/concierge', label: 'Concierge' },
  { href: '/about', label: 'About' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
]

export default function Header({ transparent = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!transparent) return
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [transparent])

  const showSolid = !transparent || scrolled

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showSolid ? 'bg-[#0c7cd5] shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container-max flex items-center justify-between h-28">
          {/* Left: Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2 group z-50"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/logo-white.png"
              alt="Barbados Island Properties"
              width={360}
              height={280}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Right: Currency + Facebook + CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <CurrencyToggle />
            </div>
            <a
              href="https://www.facebook.com/share/189zqTfzdu/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <Link
              href="/contact"
              className="hidden sm:inline-block bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1976D2] transition-colors no-underline"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </header>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Slide-out menu from left */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-80 bg-[#0c7cd5] shadow-2xl transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo at top of menu */}
        <div className="flex items-center justify-center h-28 border-b border-white/10">
          <Image
            src="/logo-white.png"
            alt="Barbados Island Properties"
            width={280}
            height={216}
            className="h-16 w-auto"
          />
        </div>

        {/* Nav links */}
        <nav className="flex flex-col py-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 no-underline hover:bg-white/10 hover:text-white transition-colors px-8 py-4 text-lg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social + Currency + CTA at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-white/10">
          <div className="mb-4">
            <CurrencyToggle />
          </div>
          <div className="flex gap-4 mb-4">
            <a href="https://www.facebook.com/share/189zqTfzdu/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="btn-primary block text-center w-full no-underline"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  )
}
