import { Property } from './types'

interface PropertyCSVRow {
  propertyId: string
  title: string
  listingType: 'rental' | 'sale'
  status: string
  locationName: string
  collectionNames?: string
  agentName?: string
  summary: string
  bedrooms: string
  bathrooms: string
  sleeps?: string
  minStayNights?: string
  propertyCategory: string
  amenityNames?: string
  priceUsd?: string
  priceLabel?: string
  floorAreaSqFt?: string
  landAreaSqFt?: string
  lat?: string
  lng?: string
}

export const parsePropertyCSV = (csvText: string): PropertyCSVRow[] => {
  const lines = csvText.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim())

  const rows: PropertyCSVRow[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) continue

    const values = parseCSVLine(line)
    const row: any = {}

    headers.forEach((header, index) => {
      row[toCamelCase(header)] = values[index]?.trim() || ''
    })

    rows.push(row as PropertyCSVRow)
  }

  return rows
}

export const validatePropertyRow = (row: PropertyCSVRow): string[] => {
  const errors: string[] = []

  if (!row.propertyId) errors.push('Missing propertyId')
  if (!row.title) errors.push('Missing title')
  if (!row.listingType) errors.push('Missing listingType (rental or sale)')
  if (!row.locationName) errors.push('Missing locationName')
  if (!row.bedrooms) errors.push('Missing bedrooms')
  if (!row.bathrooms) errors.push('Missing bathrooms')

  if (row.listingType === 'rental' && !row.sleeps) {
    errors.push('Missing sleeps (required for rentals)')
  }

  if (row.listingType === 'sale' && !row.priceUsd && !row.priceLabel) {
    errors.push('Sale properties need either priceUsd or priceLabel')
  }

  return errors
}

// Helper functions
const parseCSVLine = (line: string): string[] => {
  const result: string[] = []
  let current = ''
  let insideQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      insideQuotes = !insideQuotes
    } else if (char === ',' && !insideQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }

  result.push(current)
  return result
}

const toCamelCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[\s_-]+(.)/g, (_, char) => char.toUpperCase())
}

// CSV Template
export const getRentalCSVTemplate = (): string => {
  const headers = [
    'propertyId',
    'title',
    'listingType',
    'status',
    'locationName',
    'collectionNames',
    'agentName',
    'summary',
    'bedrooms',
    'bathrooms',
    'sleeps',
    'minStayNights',
    'propertyCategory',
    'amenityNames',
    'lat',
    'lng',
  ]

  const example = [
    'RW-VILLA-001',
    'Royal Villa at Westmoreland',
    'rental',
    'active',
    'Westland Heights',
    'Golf Community',
    'Natalie Heiling',
    'Luxury villa with pool and garden',
    '4',
    '3',
    '8',
    '7',
    'villa',
    'Pool,Beach,Golf',
    '13.1234',
    '-59.5432',
  ]

  return [headers.join(','), example.join(',')].join('\n')
}

export const getSalesCSVTemplate = (): string => {
  const headers = [
    'propertyId',
    'title',
    'listingType',
    'status',
    'locationName',
    'collectionNames',
    'agentName',
    'summary',
    'bedrooms',
    'bathrooms',
    'propertyCategory',
    'amenityNames',
    'priceUsd',
    'priceLabel',
    'floorAreaSqFt',
    'landAreaSqFt',
    'lat',
    'lng',
  ]

  const example = [
    'RW-SALE-001',
    'Beachfront Villa',
    'sale',
    'for-sale',
    'Sugar Hill',
    'Beachfront',
    'Rebecca Pitcher',
    'Premium beachfront property',
    '5',
    '4',
    'villa',
    'Beach,Pool,Tennis',
    '2500000',
    '',
    '5000',
    '15000',
    '13.1567',
    '-59.5123',
  ]

  return [headers.join(','), example.join(',')].join('\n')
}
