import { NextRequest, NextResponse } from 'next/server'

/**
 * Parse an iCal feed and return an array of booked date ranges.
 * Each range is { start: 'YYYY-MM-DD', end: 'YYYY-MM-DD' }.
 */
function parseIcal(text: string): { start: string; end: string }[] {
  const events: { start: string; end: string }[] = []
  const lines = text.replace(/\r\n /g, '').replace(/\r/g, '\n').split('\n')

  let inEvent = false
  let dtstart = ''
  let dtend = ''

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      inEvent = true
      dtstart = ''
      dtend = ''
    } else if (line === 'END:VEVENT') {
      if (dtstart) {
        events.push({
          start: formatDate(dtstart),
          end: dtend ? formatDate(dtend) : formatDate(dtstart),
        })
      }
      inEvent = false
    } else if (inEvent) {
      // Handle DTSTART with various formats
      if (line.startsWith('DTSTART')) {
        dtstart = extractDateValue(line)
      } else if (line.startsWith('DTEND')) {
        dtend = extractDateValue(line)
      }
    }
  }

  return events
}

function extractDateValue(line: string): string {
  // Handles formats like:
  // DTSTART:20250115
  // DTSTART;VALUE=DATE:20250115
  // DTSTART:20250115T120000Z
  const colonIndex = line.indexOf(':')
  if (colonIndex === -1) return ''
  return line.substring(colonIndex + 1).trim()
}

function formatDate(dt: string): string {
  // Convert 20250115 or 20250115T120000Z to 2025-01-15
  const clean = dt.replace(/[^\d]/g, '').substring(0, 8)
  if (clean.length < 8) return ''
  return `${clean.substring(0, 4)}-${clean.substring(4, 6)}-${clean.substring(6, 8)}`
}

export async function GET(request: NextRequest) {
  const icalUrl = request.nextUrl.searchParams.get('url')

  if (!icalUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 })
  }

  try {
    const response = await fetch(icalUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch iCal feed' },
        { status: 502 }
      )
    }

    const text = await response.text()
    const bookedRanges = parseIcal(text)

    return NextResponse.json({ bookedRanges }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to parse iCal feed' },
      { status: 500 }
    )
  }
}
