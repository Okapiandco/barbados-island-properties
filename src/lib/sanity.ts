import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const baseClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Wrap the client to always pass cache: 'no-store' via stega-free fetch
export const client = {
  fetch: <T = any>(query: string, params?: any): Promise<T> =>
    baseClient.fetch(query, params || {}, { cache: 'no-store' as const, next: { revalidate: 0 } }),
}

const builder = imageUrlBuilder(baseClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// GROQ Queries
export const siteSettingsQuery = `*[_type == "siteSettings"][0]`

export const agentsQuery = `*[_type == "agent" && isFeatured == true] | order(order asc) {
  _id,
  name,
  slug,
  email,
  phone,
  whatsappNumber,
  photo,
  bio,
  specialties,
  order
}`

export const allAgentsQuery = `*[_type == "agent"] | order(order asc) {
  _id,
  name,
  slug,
  email,
  phone,
  whatsappNumber,
  photo,
  bio,
  specialties,
  order
}`

export const locationsQuery = `*[_type == "location"] | order(order asc) {
  _id,
  name,
  slug,
  region,
  parish,
  order
}`

export const collectionsQuery = `*[_type == "collection"] | order(order asc) {
  _id,
  name,
  slug,
  description,
  image,
  order
}`

export const amenitiesQuery = `*[_type == "amenity"] | order(order asc) {
  _id,
  name,
  slug,
  iconKey,
  type,
  order
}`

export const propertiesBaseQuery = `{
  _id,
  propertyId,
  title,
  slug,
  listingType,
  status,
  location->{name, slug},
  collections[]->{name, slug},
  agent->{name, slug, email, whatsappNumber},
  summary,
  description,
  heroImage,
  gallery,
  videoUrl,
  map,
  featured,
  bedrooms,
  bathrooms,
  sleeps,
  minStayNights,
  propertyCategory,
  amenities[]->{name, slug, iconKey, type},
  features,
  highlights,
  overview,
  lifestyleFeatures,
  investmentFeatures,
  staffing,
  rates,
  ratesNote,
  sleepingArrangements,
  externalAmenities,
  icalUrl,
  priceUsd,
  priceLabel,
  showConvertedPrices,
  floorAreaSqFt,
  landAreaSqFt,
  seo
}`

export const rentalPropertiesQuery = `*[_type == "property" && listingType == "rental" && status == "active"] | order(_createdAt desc) ${propertiesBaseQuery}`

export const salesPropertiesQuery = `*[_type == "property" && listingType == "sale" && (status == "for-sale" || status == "under-offer")] | order(_createdAt desc) ${propertiesBaseQuery}`

export const featuredPropertiesQuery = `*[_type == "property" && featured == true] | order(_createdAt desc) [0...6] ${propertiesBaseQuery}`

export const featuredRentalsQuery = `*[_type == "property" && listingType == "rental" && status == "active"] | order(featured desc, _createdAt desc) [0...3] ${propertiesBaseQuery}`

export const featuredSalesQuery = `*[_type == "property" && listingType == "sale" && (status == "for-sale" || status == "under-offer")] | order(featured desc, _createdAt desc) [0...3] ${propertiesBaseQuery}`

export const propertyBySlugQuery = (slug: string) =>
  `*[_type == "property" && slug.current == "${slug}"][0] ${propertiesBaseQuery}`

export const propertiesByAgentQuery = (agentSlug: string) =>
  `*[_type == "property" && agent->slug.current == "${agentSlug}"] | order(_createdAt desc) ${propertiesBaseQuery}`

export const propertiesByLocationQuery = (listingType: string, locationSlug: string) =>
  `*[_type == "property" && listingType == "${listingType}" && location->slug.current == "${locationSlug}"] | order(_createdAt desc) ${propertiesBaseQuery}`

export const propertiesByCollectionQuery = (listingType: string, collectionSlug: string) =>
  `*[_type == "property" && listingType == "${listingType}" && "${collectionSlug}" in collections[]->.slug.current] | order(_createdAt desc) ${propertiesBaseQuery}`

export const relatedPropertiesQuery = (slug: string, listingType: string) =>
  `*[_type == "property" && slug.current != "${slug}" && listingType == "${listingType}" && status in ["active", "for-sale", "under-offer"]] | order(featured desc, _createdAt desc) [0...3] ${propertiesBaseQuery}`
