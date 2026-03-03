import { PortableTextBlock } from 'sanity'

export interface SiteSettings {
  _id: string
  title: string
  description: string
  genericEnquiriesEmail: string
  officeWhatsappNumber: string
  defaultCurrency: 'USD' | 'GBP' | 'CAD'
  fxMode: 'manual' | 'provider'
  manualRates: {
    usdToGbp: number
    usdToCad: number
  }
  logo: any
  heroVideoUrl: string
  socialLinks: {
    instagram?: string
    facebook?: string
    linkedin?: string
  }
}

export interface Agent {
  _id: string
  name: string
  slug: string
  email: string
  phone?: string
  whatsappNumber?: string
  photo: any
  bio: PortableTextBlock[]
  specialties: string[]
  isFeatured: boolean
  order: number
}

export interface Location {
  _id: string
  name: string
  slug: string
  region?: string
  parish?: string
  order: number
}

export interface Collection {
  _id: string
  name: string
  slug: string
  description?: string
  image?: any
  order: number
}

export interface Amenity {
  _id: string
  name: string
  slug: string
  iconKey: string
  type: 'rental' | 'sale' | 'both'
  order: number
}

export interface MapSettings {
  lat?: number
  lng?: number
  mapDisplayMode: 'exact' | 'approximate' | 'hidden'
}

export interface PropertySEO {
  metaTitle?: string
  metaDescription?: string
  ogImage?: any
}

export interface Property {
  _id: string
  propertyId: string
  title: string
  slug: string
  listingType: 'rental' | 'sale'
  status: string
  location: Location
  collections: Collection[]
  agent?: Agent
  summary?: string
  description: PortableTextBlock[]
  heroImage: any
  gallery: any[]
  videoUrl?: string
  map: MapSettings
  featured: boolean
  
  // Common
  bedrooms?: number
  bathrooms?: number
  propertyCategory?: string
  amenities: Amenity[]
  
  // Rental-specific
  sleeps?: number
  minStayNights: number
  travellingWithChildren?: boolean
  staffing?: string[]
  
  // Sale-specific
  priceUsd?: number
  priceLabel?: string
  showConvertedPrices?: boolean
  floorAreaSqFt?: number
  landAreaSqFt?: number
  
  // SEO
  seo?: PropertySEO
}

export interface Enquiry {
  property: string
  listingType: 'rental' | 'sale'
  dateStart?: string
  dateEnd?: string
  guests?: number
  children?: boolean
  name: string
  email: string
  phone?: string
  message?: string
}

export interface CurrencyRate {
  [key: string]: number
  USD: number
  GBP: number
  CAD: number
}

// Filter state for listings
export interface RentalFilters {
  location?: string
  collection?: string
  category?: string
  minGuests?: number
  maxGuests?: number
  minBedrooms?: number
  maxBedrooms?: number
  amenities: string[]
  travellingWithChildren?: boolean
  dateStart?: Date
  dateEnd?: Date
}

export interface SalesFilters {
  location?: string
  collection?: string
  category?: string
  minBedrooms?: number
  maxBedrooms?: number
  minBathrooms?: number
  maxBathrooms?: number
  minPrice?: number
  maxPrice?: number
  amenities: string[]
}
