'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useCallback } from 'react'

interface RefinementPanelProps {
  locations: any[]
  collections: any[]
  amenities: any[]
  listingType: 'rental' | 'sale'
}

export default function RefinementPanel({ locations, collections, amenities, listingType }: RefinementPanelProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [collection, setCollection] = useState(searchParams.get('collection') || '')
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '')
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '')

  const applyFilters = useCallback(() => {
    const basePath = listingType === 'rental' ? '/holiday-rentals' : '/sales'
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (collection) params.set('collection', collection)
    if (bedrooms) params.set('bedrooms', bedrooms)
    if (category) params.set('category', category)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (checkIn) params.set('checkIn', checkIn)
    if (checkOut) params.set('checkOut', checkOut)
    const query = params.toString()
    router.push(query ? `${basePath}?${query}` : basePath)
  }, [location, collection, bedrooms, category, minPrice, maxPrice, checkIn, checkOut, listingType, router])

  const clearFilters = () => {
    setLocation('')
    setCollection('')
    setBedrooms('')
    setCategory('')
    setMinPrice('')
    setMaxPrice('')
    setCheckIn('')
    setCheckOut('')
    const basePath = listingType === 'rental' ? '/holiday-rentals' : '/sales'
    router.push(basePath)
  }

  return (
    <div className="card p-6 sticky top-24">
      <h3 className="text-lg font-heading mb-4">Filter Properties</h3>

      <div className="space-y-4">
        {/* Location */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)} className="text-sm">
            <option value="">All Locations</option>
            {locations.map((loc: any) => (
              <option key={loc._id} value={loc.slug.current}>{loc.name}</option>
            ))}
          </select>
        </div>

        {/* Collection */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Collection</label>
          <select value={collection} onChange={(e) => setCollection(e.target.value)} className="text-sm">
            <option value="">All Collections</option>
            {collections.map((col: any) => (
              <option key={col._id} value={col.slug.current}>{col.name}</option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Bedrooms</label>
          <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="text-sm">
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        {/* Dates (Rentals only) */}
        {listingType === 'rental' && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Check In</label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  setCheckIn(e.target.value)
                  if (checkOut && e.target.value > checkOut) setCheckOut('')
                }}
                className="text-sm w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Check Out</label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                className="text-sm w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
          </>
        )}

        {/* Category */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="text-sm">
            <option value="">All Types</option>
            <option value="villa">Villa</option>
            <option value="apartment">Apartment</option>
            <option value="townhouse">Townhouse</option>
            {listingType === 'sale' && <option value="land">Land</option>}
            {listingType === 'sale' && <option value="commercial">Commercial</option>}
          </select>
        </div>

        {/* Price Range (Sales only) */}
        {listingType === 'sale' && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Min Price (USD)</label>
              <select value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="text-sm">
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
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Max Price (USD)</label>
              <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="text-sm">
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
          </>
        )}

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <button onClick={applyFilters} className="btn-primary flex-1 text-sm py-2">
            Apply
          </button>
          <button onClick={clearFilters} className="btn-secondary flex-1 text-sm py-2">
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}
