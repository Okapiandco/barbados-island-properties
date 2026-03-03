interface AmenityIconProps {
  iconKey: string
  size?: number
  className?: string
}

export default function AmenityIcon({ iconKey, size = 24, className = '' }: AmenityIconProps) {
  const icons: Record<string, JSX.Element> = {
    pool: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 15c6.667-6 13.333 0 20 0" />
        <path d="M2 19c6.667-6 13.333 0 20 0" />
        <path d="M9 3v9" />
        <path d="M15 3v9" />
        <path d="M9 6h6" />
      </svg>
    ),
    beach: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17.553 4.18a10 10 0 0 1 .918 14.786M5.519 4.18A10 10 0 0 0 4.6 18.966" />
        <path d="M12 2v20" />
        <path d="M2 22h20" />
        <circle cx="12" cy="8" r="4" />
      </svg>
    ),
    golf: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 18V2l7 4-7 4" />
        <path d="M7 22a5 5 0 0 1 10 0" />
        <circle cx="12" cy="18" r="1" />
      </svg>
    ),
    tennis: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M18.364 5.636A9 9 0 0 0 6.75 8.1c3.5 2 6.5 5 8.5 8.5a9 9 0 0 0 3.114-10.964z" />
        <path d="M5.636 18.364A9 9 0 0 0 17.25 15.9c-3.5-2-6.5-5-8.5-8.5a9 9 0 0 0-3.114 10.964z" />
      </svg>
    ),
    bbq: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 12h18" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
        <path d="M9 21v-4" />
        <path d="M15 21v-4" />
        <path d="M8 3v3" />
        <path d="M12 3v3" />
        <path d="M16 3v3" />
        <rect x="4" y="8" width="16" height="4" rx="1" />
      </svg>
    ),
    bedroom: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 4v16" />
        <path d="M2 8h18a2 2 0 0 1 2 2v10" />
        <path d="M2 17h20" />
        <path d="M6 8v9" />
      </svg>
    ),
    bathroom: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 12h16" />
        <path d="M6 12V4a2 2 0 0 1 2-2h1" />
        <path d="M4 12v4a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-4" />
        <path d="M8 20v2" />
        <path d="M16 20v2" />
        <circle cx="12" cy="8" r="1" />
      </svg>
    ),
    security: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    clubhouse: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
    restaurant: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    gym: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6.5 6.5h11" />
        <path d="M6.5 17.5h11" />
        <path d="M12 6.5v11" />
        <rect x="2" y="4" width="4" height="16" rx="1" />
        <rect x="18" y="4" width="4" height="16" rx="1" />
      </svg>
    ),
    hiking: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M13 4v16" />
        <path d="M17 4l-4 4-4-4" />
        <path d="M3 20l4-4 4 4 4-4 4 4" />
      </svg>
    ),
    parking: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
      </svg>
    ),
    ac: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 16a4 4 0 0 1-4-4 4 4 0 0 1 4-4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4" />
        <path d="M6 20l2-4" />
        <path d="M12 20v-4" />
        <path d="M18 20l-2-4" />
      </svg>
    ),
    kitchen: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="2" width="18" height="20" rx="2" />
        <path d="M3 10h18" />
        <circle cx="8" cy="6" r="1" />
        <circle cx="12" cy="6" r="1" />
        <path d="M10 15h4" />
      </svg>
    ),
    furnished: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
        <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z" />
        <path d="M4 18v2" />
        <path d="M20 18v2" />
      </svg>
    ),
    seaview: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 12c2-3 6-3 8 0s6 3 8 0" />
        <path d="M2 17c2-3 6-3 8 0s6 3 8 0" />
        <circle cx="12" cy="5" r="3" />
      </svg>
    ),
    garden: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22V12" />
        <path d="M12 12C12 8 8 4 4 4c0 4 4 8 8 8z" />
        <path d="M12 12c0-4 4-8 8-8 0 4-4 8-8 8z" />
        <path d="M8 22h8" />
      </svg>
    ),
    padel: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <ellipse cx="12" cy="8" rx="5" ry="6" />
        <path d="M12 14v8" />
        <circle cx="10" cy="7" r="0.5" fill="currentColor" />
        <circle cx="14" cy="7" r="0.5" fill="currentColor" />
        <circle cx="12" cy="10" r="0.5" fill="currentColor" />
      </svg>
    ),
    'driving-range': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="18" r="3" />
        <path d="M12 15V3" />
        <path d="M8 6l4-3 4 3" />
      </svg>
    ),
  }

  return icons[iconKey] || (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  )
}
