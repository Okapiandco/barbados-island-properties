import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import Price from '@/components/Price'

interface PropertyCardProps {
  property: any
  localImageSrc?: string | null
}

export default function PropertyCard({ property, localImageSrc }: PropertyCardProps) {
  const href = property.listingType === 'rental'
    ? `/holiday-rentals/${property.slug?.current}`
    : `/sales/${property.slug?.current}`

  const imageSrc = localImageSrc
    || (property.heroImage ? urlFor(property.heroImage).width(600).height(400).url() : null)

  return (
    <Link href={href} className="card card-hover block overflow-hidden no-underline text-inherit group">
      {/* Hero Image */}
      <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No image
          </div>
        )}
        {/* Status Badge */}
        {property.status && property.status !== 'active' && property.status !== 'for-sale' && (
          <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
            {property.status === 'under-offer' ? 'Under Offer' : property.status === 'sold' ? 'Sold' : property.status}
          </span>
        )}
        {/* Featured Badge */}
        {property.featured && (
          <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-heading mb-1 text-dark-slate">{property.title}</h3>
        {property.location && (
          <p className="text-sm text-gray-500 mb-2">{property.location.name}</p>
        )}

        {/* Key Facts */}
        <div className="flex gap-3 text-sm text-gray-600 mb-3">
          {property.bedrooms != null && (
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          )}
          {property.bathrooms != null && (
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          )}
          {property.sleeps != null && (
            <span>Sleeps {property.sleeps}</span>
          )}
        </div>

        {/* Price */}
        {property.listingType === 'sale' && property.priceUsd && (
          <p className="text-lg font-medium text-primary">
            <Price usd={property.priceUsd} />
          </p>
        )}
        {property.listingType === 'sale' && property.priceLabel && !property.priceUsd && (
          <p className="text-sm text-primary">{property.priceLabel}</p>
        )}

        {/* Summary */}
        {property.summary && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{property.summary}</p>
        )}
      </div>
    </Link>
  )
}
