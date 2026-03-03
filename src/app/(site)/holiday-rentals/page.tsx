import { client, rentalPropertiesQuery, locationsQuery, collectionsQuery, amenitiesQuery } from '@/lib/sanity'
import { getFirstLocalImage } from '@/lib/localImages'
import PropertyCard from '@/components/PropertyCard'
import RefinementPanel from '@/components/RefinementPanel'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Holiday Rentals in Barbados | Barbados Island Properties',
  description: 'Browse luxury holiday rental villas and apartments in Barbados.',
}

export default async function HolidayRentalsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const [allProperties, locations, collections, amenities] = await Promise.all([
    client.fetch(rentalPropertiesQuery),
    client.fetch(locationsQuery),
    client.fetch(collectionsQuery),
    client.fetch(amenitiesQuery),
  ])

  // Apply filters
  let properties = allProperties
  if (searchParams.location) {
    properties = properties.filter((p: any) => p.location?.slug?.current === searchParams.location)
  }
  if (searchParams.collection) {
    properties = properties.filter((p: any) =>
      p.collections?.some((c: any) => c.slug?.current === searchParams.collection)
    )
  }
  if (searchParams.bedrooms) {
    const minBeds = parseInt(searchParams.bedrooms)
    properties = properties.filter((p: any) => p.bedrooms >= minBeds)
  }
  if (searchParams.category) {
    properties = properties.filter((p: any) => p.propertyCategory === searchParams.category)
  }

  return (
    <div className="container-max py-10">
      <h1 className="text-3xl md:text-4xl font-heading mb-2">Holiday Rentals in Barbados</h1>
      <p className="text-gray-500 mb-8">{properties.length} {properties.length === 1 ? 'property' : 'properties'} available</p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <aside className="w-full md:w-72 shrink-0">
          <Suspense fallback={<div>Loading filters...</div>}>
            <RefinementPanel
              locations={locations}
              collections={collections}
              amenities={amenities}
              listingType="rental"
            />
          </Suspense>
        </aside>

        {/* Property Grid */}
        <div className="flex-1">
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property: any) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  localImageSrc={getFirstLocalImage(property.slug?.current, property.title)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl text-gray-500 mb-2">No properties found</h3>
              <p className="text-gray-400">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
