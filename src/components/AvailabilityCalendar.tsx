'use client'

import { useState, useEffect, useCallback } from 'react'

interface BookedRange {
  start: string
  end: string
}

interface AvailabilityCalendarProps {
  icalUrl: string
  propertyTitle: string
  agentEmail: string
  minStayNights?: number
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function toDateStr(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function parseDate(str: string): Date {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formatDisplayDate(str: string): string {
  const d = parseDate(str)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function isDateInRanges(dateStr: string, ranges: BookedRange[]): boolean {
  const d = parseDate(dateStr)
  for (const range of ranges) {
    const start = parseDate(range.start)
    const end = parseDate(range.end)
    if (d >= start && d < end) return true
  }
  return false
}

function isDateBefore(dateStr: string, refStr: string): boolean {
  return parseDate(dateStr) < parseDate(refStr)
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const DAY_HEADERS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export default function AvailabilityCalendar({
  icalUrl,
  propertyTitle,
  agentEmail,
  minStayNights = 7,
}: AvailabilityCalendarProps) {
  const [bookedRanges, setBookedRanges] = useState<BookedRange[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [checkIn, setCheckIn] = useState<string | null>(null)
  const [checkOut, setCheckOut] = useState<string | null>(null)

  // Calendar starts at current month
  const today = new Date()
  const todayStr = toDateStr(today)
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const res = await fetch(`/api/availability?url=${encodeURIComponent(icalUrl)}`)
        if (!res.ok) throw new Error('fetch failed')
        const data = await res.json()
        setBookedRanges(data.bookedRanges || [])
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchAvailability()
  }, [icalUrl])

  const goNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const goPrev = () => {
    const now = new Date()
    if (viewYear === now.getFullYear() && viewMonth === now.getMonth()) return
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const handleDayClick = useCallback((dateStr: string) => {
    if (isDateInRanges(dateStr, bookedRanges)) return
    if (isDateBefore(dateStr, todayStr)) return

    if (!checkIn || (checkIn && checkOut)) {
      // Start new selection
      setCheckIn(dateStr)
      setCheckOut(null)
    } else {
      // Setting check-out
      if (isDateBefore(dateStr, checkIn)) {
        // Clicked before check-in, reset
        setCheckIn(dateStr)
        setCheckOut(null)
      } else {
        setCheckOut(dateStr)
      }
    }
  }, [checkIn, checkOut, bookedRanges, todayStr])

  const clearSelection = () => {
    setCheckIn(null)
    setCheckOut(null)
  }

  const enquiryUrl = checkIn && checkOut
    ? `mailto:${agentEmail}?subject=${encodeURIComponent(`Booking Enquiry: ${propertyTitle}`)}&body=${encodeURIComponent(
        `Hello,\n\nI would like to enquire about availability for ${propertyTitle}.\n\nCheck-in: ${formatDisplayDate(checkIn)}\nCheck-out: ${formatDisplayDate(checkOut)}\n\nPlease let me know the rates and availability for these dates.\n\nThank you.`
      )}`
    : null

  function renderMonth(year: number, month: number) {
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfWeek(year, month)
    const cells: (number | null)[] = []

    for (let i = 0; i < firstDay; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(d)

    return (
      <div>
        <div className="grid grid-cols-7 gap-0 mb-1">
          {DAY_HEADERS.map((d) => (
            <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0">
          {cells.map((day, i) => {
            if (day === null) {
              return <div key={`empty-${i}`} className="h-9" />
            }

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const isPast = isDateBefore(dateStr, todayStr)
            const isBooked = isDateInRanges(dateStr, bookedRanges)
            const isUnavailable = isPast || isBooked
            const isCheckIn = dateStr === checkIn
            const isCheckOut = dateStr === checkOut
            const isInRange =
              checkIn && checkOut && !isDateBefore(dateStr, checkIn) && isDateBefore(dateStr, checkOut) && !isCheckIn

            let cellClass = 'h-9 w-full flex items-center justify-center text-sm rounded transition-colors '

            if (isCheckIn || isCheckOut) {
              cellClass += 'bg-primary text-white font-medium'
            } else if (isInRange) {
              cellClass += 'bg-primary/10 text-primary'
            } else if (isUnavailable) {
              cellClass += 'text-gray-300 line-through cursor-not-allowed'
            } else {
              cellClass += 'text-gray-700 hover:bg-primary/10 cursor-pointer'
            }

            return (
              <button
                key={dateStr}
                disabled={isUnavailable}
                onClick={() => handleDayClick(dateStr)}
                className={cellClass}
                title={isBooked ? 'Booked' : isPast ? 'Past date' : `Select ${formatDisplayDate(dateStr)}`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Second month
  const nextMonthMonth = viewMonth === 11 ? 0 : viewMonth + 1
  const nextMonthYear = viewMonth === 11 ? viewYear + 1 : viewYear

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-48" />
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="h-9 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-cream rounded-xl p-6 text-center">
        <p className="text-gray-500 text-sm">
          Availability calendar is temporarily unavailable. Please{' '}
          <a href={`mailto:${agentEmail}?subject=Availability Enquiry: ${propertyTitle}`} className="text-primary">
            contact us
          </a>{' '}
          directly.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Selection summary */}
      {(checkIn || checkOut) && (
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Check-in:</span>
            <span className="font-medium text-dark-slate">
              {checkIn ? formatDisplayDate(checkIn) : '—'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Check-out:</span>
            <span className="font-medium text-dark-slate">
              {checkOut ? formatDisplayDate(checkOut) : 'Select a date'}
            </span>
          </div>
          <button
            onClick={clearSelection}
            className="text-xs text-gray-400 hover:text-gray-600 ml-auto"
          >
            Clear
          </button>
        </div>
      )}

      {!checkIn && (
        <p className="text-sm text-gray-500 mb-4">Select your check-in date to start</p>
      )}

      {/* Calendar navigation and months */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goPrev}
          className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          aria-label="Previous month"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="flex gap-8 text-sm font-medium text-dark-slate">
          <span>{MONTH_NAMES[viewMonth]} {viewYear}</span>
          <span>{MONTH_NAMES[nextMonthMonth]} {nextMonthYear}</span>
        </div>
        <button
          onClick={goNext}
          className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          aria-label="Next month"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderMonth(viewYear, viewMonth)}
        {renderMonth(nextMonthYear, nextMonthMonth)}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-primary" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-gray-200 line-through text-[8px] flex items-center justify-center">x</span>
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-white border border-gray-200" />
          <span>Available</span>
        </div>
      </div>

      {/* Enquire button */}
      {enquiryUrl && (
        <a
          href={enquiryUrl}
          className="btn-primary block text-center w-full no-underline mt-6"
        >
          Enquire About {formatDisplayDate(checkIn!)} – {formatDisplayDate(checkOut!)}
        </a>
      )}

      {checkIn && !checkOut && (
        <p className="text-xs text-gray-400 mt-3 text-center">
          Now select your check-out date. Minimum stay: {minStayNights} nights.
        </p>
      )}
    </div>
  )
}
