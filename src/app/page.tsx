import Link from 'next/link'
import Image from 'next/image'
import { client, featuredRentalsQuery, featuredSalesQuery, agentsQuery, collectionsQuery, locationsQuery, siteSettingsQuery, urlFor } from '@/lib/sanity'
import { getFirstLocalImage } from '@/lib/localImages'
import SearchBar from '@/components/SearchBar'
import Header from '@/components/Header'
import Price from '@/components/Price'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Map agent slugs to local photo paths
const agentPhotos: Record<string, string> = {
  'natalie-heiling': '/Agents/Natalie Heilling Barbados Island Properties Director of Rentals.jpg',
  'tora-porter': '/Agents/Tora.jpg',
  'rebecca-pitcher': '/Agents/Rebecca.jpg',
}

export default async function HomePage() {
  const [rentals, sales, agents, collections, locations, settings] = await Promise.all([
    client.fetch(featuredRentalsQuery).catch((e: any) => { console.error('Rentals fetch error:', e.message); return [] }),
    client.fetch(featuredSalesQuery).catch((e: any) => { console.error('Sales fetch error:', e.message); return [] }),
    client.fetch(agentsQuery).catch((e: any) => { console.error('Agents fetch error:', e.message); return [] }),
    client.fetch(collectionsQuery).catch((e: any) => { console.error('Collections fetch error:', e.message); return [] }),
    client.fetch(locationsQuery).catch((e: any) => { console.error('Locations fetch error:', e.message); return [] }),
    client.fetch(siteSettingsQuery).catch((e: any) => { console.error('Settings fetch error:', e.message); return null }),
  ])

  const heroVideoUrl = settings?.heroVideoUrl

  return (
    <main>
      <Header transparent />

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center bg-dark-slate text-white overflow-hidden">
        {heroVideoUrl ? (
          <iframe
            src={heroVideoUrl}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ width: '100vw', height: '56.25vw', minHeight: '100vh', minWidth: '177.78vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Hero video"
          />
        ) : null}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-heading mb-6">
            Barbados Island Properties
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90">
            Luxury Holiday Rentals &amp; Properties For Sale
          </p>
          <div className="mt-10 w-full px-4">
            <SearchBar locations={locations} />
          </div>
        </div>
      </section>

      {/* Holiday Rentals Row */}
      {rentals.length > 0 && (
        <section className="py-20 container-max">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-heading mb-2">Holiday Rentals</h2>
              <p className="text-gray-500">Luxury villas and apartments for your perfect getaway</p>
            </div>
            <Link
              href="/holiday-rentals"
              className="hidden sm:inline-flex items-center gap-2 text-primary font-medium no-underline hover:gap-3 transition-all"
            >
              View All Rentals
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rentals.map((property: any) => (
              <Link
                key={property._id}
                href={`/holiday-rentals/${property.slug?.current}`}
                className="card overflow-hidden group no-underline"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  {(() => {
                    const imgSrc = getFirstLocalImage(property.slug?.current, property.title)
                      || (property.heroImage ? urlFor(property.heroImage).width(600).height(400).url() : null)
                    return imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )
                  })()}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-heading mb-1 text-dark-slate">{property.title}</h3>
                  {property.location && (
                    <p className="text-primary text-sm mb-2">{property.location.name}</p>
                  )}
                  <div className="flex gap-4 text-sm text-gray-500">
                    {property.bedrooms != null && <span>{property.bedrooms} Beds</span>}
                    {property.bathrooms != null && <span>{property.bathrooms} Baths</span>}
                    {property.sleeps != null && <span>Sleeps {property.sleeps}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="sm:hidden mt-8 text-center">
            <Link href="/holiday-rentals" className="btn-primary no-underline inline-block">
              View All Rentals
            </Link>
          </div>
        </section>
      )}

      {/* Properties For Sale Row */}
      {sales.length > 0 && (
        <section className="py-20 section-cream">
          <div className="container-max">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-heading mb-2">Properties For Sale</h2>
                <p className="text-gray-500">Exclusive homes and investments in Barbados</p>
              </div>
              <Link
                href="/sales"
                className="hidden sm:inline-flex items-center gap-2 text-primary font-medium no-underline hover:gap-3 transition-all"
              >
                View All Sales
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sales.map((property: any) => (
                <Link
                  key={property._id}
                  href={`/sales/${property.slug?.current}`}
                  className="card overflow-hidden group no-underline"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    {(() => {
                      const imgSrc = getFirstLocalImage(property.slug?.current, property.title)
                        || (property.heroImage ? urlFor(property.heroImage).width(600).height(400).url() : null)
                      return imgSrc ? (
                        <Image
                          src={imgSrc}
                          alt={property.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )
                    })()}
                    {property.priceUsd && (
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium text-dark-slate">
                        <Price usd={property.priceUsd} suffix />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-heading mb-1 text-dark-slate">{property.title}</h3>
                    {property.location && (
                      <p className="text-primary text-sm mb-2">{property.location.name}</p>
                    )}
                    <div className="flex gap-4 text-sm text-gray-500">
                      {property.bedrooms != null && <span>{property.bedrooms} Beds</span>}
                      {property.bathrooms != null && <span>{property.bathrooms} Baths</span>}
                      {property.floorAreaSqFt && <span>{property.floorAreaSqFt.toLocaleString()} sq ft</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="sm:hidden mt-8 text-center">
              <Link href="/sales" className="btn-primary no-underline inline-block">
                View All Sales
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Meet Our Team */}
      <section className="py-20 container-max">
        <h2 className="text-3xl font-heading text-center mb-4">Meet Our Team</h2>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          Our experienced team of property specialists are dedicated to helping you find your perfect property in Barbados
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {agents.map((agent: any) => {
            const localPhoto = agentPhotos[agent.slug?.current]
            return (
              <Link
                key={agent._id}
                href="/about"
                className="group text-center no-underline"
              >
                <div className="relative w-48 h-48 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-transparent group-hover:ring-primary/20 transition-all">
                  {localPhoto ? (
                    <Image
                      src={localPhoto}
                      alt={agent.name}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  ) : agent.photo ? (
                    <Image
                      src={urlFor(agent.photo).width(384).height(384).url()}
                      alt={agent.name}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  ) : (
                    <div className="w-full h-full bg-cream flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-300">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-heading mb-1 text-dark-slate">{agent.name}</h3>
                {agent.specialties && (
                  <p className="text-primary text-sm">{agent.specialties.join(' · ')}</p>
                )}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Collections */}
      {collections.length > 0 && (
        <section className="py-20 section-cream">
          <div className="container-max">
            <h2 className="text-3xl font-heading text-center mb-12">Browse by Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {collections.map((collection: any) => (
                <div key={collection._id} className="card p-6 text-center">
                  <h3 className="text-xl font-heading mb-2">{collection.name}</h3>
                  <p className="text-gray-600 text-sm">{collection.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-[#0c7cd5] text-white text-center">
        <div className="container-max">
          <h2 className="mb-6">Ready to Find Your Dream Property?</h2>
          <p className="text-lg mb-8 opacity-80">
            Browse our exclusive collection of luxury properties in Barbados
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/holiday-rentals" className="bg-white text-[#0c7cd5] px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition-all no-underline">
              View Rentals
            </Link>
            <Link href="/sales" className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white/10 transition-all no-underline">
              View Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container-max">
          <div className="flex flex-col items-center">
            <Image
              src="/logo-white.png"
              alt="Barbados Island Properties"
              width={120}
              height={93}
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm text-gray-400 mb-6">Luxury real estate in Barbados</p>
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <Link href="/holiday-rentals" className="text-gray-400 hover:text-white no-underline text-sm">Rentals</Link>
              <Link href="/sales" className="text-gray-400 hover:text-white no-underline text-sm">Sales</Link>
              <Link href="/property-management" className="text-gray-400 hover:text-white no-underline text-sm">Property Management</Link>
              <Link href="/about" className="text-gray-400 hover:text-white no-underline text-sm">About</Link>
              <Link href="/concierge" className="text-gray-400 hover:text-white no-underline text-sm">Concierge</Link>
              <Link href="/faqs" className="text-gray-400 hover:text-white no-underline text-sm">FAQs</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white no-underline text-sm">Contact</Link>
            </div>
            <a href="https://www.facebook.com/share/189zqTfzdu/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Barbados Island Properties. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
