'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Location {
  _id: string
  name: string
  slug: { current: string }
}

export default function SearchBar({ locations }: { locations: Location[] }) {
  const router = useRouter()
  const [listingType, setListingType] = useState<'rental' | 'sale'>('rental')
  const [location, setLocation] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleSearch = () => {
    const basePath = listingType === 'rental' ? '/holiday-rentals' : '/sales'
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (bedrooms) params.set('bedrooms', bedrooms)
    if (listingType === 'sale' && minPrice) params.set('minPrice', minPrice)
    if (listingType === 'sale' && maxPrice) params.set('maxPrice', maxPrice)
    const query = params.toString()
    router.push(query ? `${basePath}?${query}` : basePath)
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-subtle-lg p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        {/* Listing Type Toggle */}
        <div className="w-full md:w-auto">
          <label className="block text-xs font-medium text-gray-500 mb-1">I want to</label>
          <div className="flex rounded-lg overflow-hidden border border-[#E6E6E6]">
            <button
              onClick={() => setListingType('rental')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                listingType === 'rental'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Rent
            </button>
            <button
              onClick={() => setListingType('sale')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                listingType === 'sale'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Buy
            </button>
          </div>
        </div>

        {/* Location */}
        <div className="flex-1 w-full">
          <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-sm text-dark-slate"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc.slug.current}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div className="w-full md:w-32">
          <label className="block text-xs font-medium text-gray-500 mb-1">Bedrooms</label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full text-sm text-dark-slate"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="btn-primary w-full md:w-auto whitespace-nowrap"
        >
          Search Properties
        </button>
      </div>

      {/* Price Range (Buy mode only) */}
      {listingType === 'sale' && (
        <div className="flex flex-col md:flex-row gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Min Price (USD)</label>
            <select
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full text-sm text-dark-slate"
            >
              <option value="">No Min</option>
              <option value="250000">$250,000</option>
              <option value="500000">$500,000</option>
              <option value="750000">$750,000</option>
              <option value="1000000">$1,000,000</option>
              <option value="1500000">$1,500,000</option>
              <option value="2000000">$2,000,000</option>
              <option value="3000000">$3,000,000</option>
              <option value="5000000">$5,000,000</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Max Price (USD)</label>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full text-sm text-dark-slate"
            >
              <option value="">No Max</option>
              <option value="500000">$500,000</option>
              <option value="750000">$750,000</option>
              <option value="1000000">$1,000,000</option>
              <option value="1500000">$1,500,000</option>
              <option value="2000000">$2,000,000</option>
              <option value="3000000">$3,000,000</option>
              <option value="5000000">$5,000,000</option>
              <option value="10000000">$10,000,000</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
