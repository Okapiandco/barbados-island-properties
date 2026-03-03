import { client, propertyBySlugQuery, relatedPropertiesQuery } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AmenityIcon from '@/components/AmenityIcon'
import PropertySlideshow from '@/components/PropertySlideshow'
import AvailabilityCalendar from '@/components/AvailabilityCalendar'
import { getLocalImages, getFirstLocalImage } from '@/lib/localImages'
import PropertyCard from '@/components/PropertyCard'
import Price from '@/components/Price'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function RentalDetailPage({ params }: { params: { slug: string } }) {
  const property = await client.fetch(propertyBySlugQuery(params.slug))
  if (!property) notFound()

  const relatedProperties = await client.fetch(relatedPropertiesQuery(params.slug, 'rental'))

  // Build slides: prefer local images, fall back to Sanity gallery
  const localSlides = getLocalImages(property.slug?.current || params.slug, property.title)
  const sanitySlides = (property.gallery || []).map((img: any, i: number) => ({
    src: urlFor(img).width(1400).height(800).url(),
    alt: `${property.title} photo ${i + 1}`,
  }))
  const slides = localSlides.length > 0 ? localSlides : sanitySlides

  // Build anchor links based on available content
  const sections = [
    { id: 'overview', label: 'Overview', show: true },
    { id: 'pricing', label: 'Pricing', show: property.rates?.length > 0 },
    { id: 'sleeping', label: 'Sleeping', show: property.sleepingArrangements?.length > 0 },
    { id: 'features', label: 'Features', show: property.features?.length > 0 || property.externalAmenities?.length > 0 },
    { id: 'highlights', label: 'What We Love', show: property.highlights?.length > 0 },
    { id: 'amenities', label: 'Amenities', show: property.amenities?.length > 0 },
    { id: 'availability', label: 'Availability', show: !!property.icalUrl },
  ].filter((s) => s.show)

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-max pt-6 pb-2">
        <div className="text-sm text-gray-500">
          <Link href="/holiday-rentals" className="hover:text-primary no-underline">Holiday Rentals</Link>
          <span className="mx-2">/</span>
          <span className="text-dark-slate">{property.title}</span>
        </div>
      </div>

      {/* Image Slideshow / Hero */}
      {slides.length > 0 || property.videoUrl ? (
        <div className="container-max mb-6">
          <PropertySlideshow slides={slides} videoUrl={property.videoUrl} />
        </div>
      ) : property.heroImage ? (
        <div className="container-max mb-6">
          <div className="relative h-[55vh] w-full rounded-xl overflow-hidden">
            <Image
              src={urlFor(property.heroImage).width(1400).height(700).url()}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      ) : null}

      {/* Anchor Nav Menu */}
      <div className="sticky top-28 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container-max">
          <nav className="flex gap-1 overflow-x-auto py-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-cream rounded-lg transition-colors whitespace-nowrap no-underline"
              >
                {section.label}
              </a>
            ))}
            <a
              href={`mailto:${property.agent?.email || 'info@barbadosislandproperties.com'}?subject=Enquiry: ${property.title}`}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg transition-colors whitespace-nowrap no-underline hover:bg-[#0a6ab8] ml-auto"
            >
              Enquire
            </a>
          </nav>
        </div>
      </div>

      <div className="container-max py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Content Sections */}
          <div className="flex-1">
            {/* Overview */}
            <section id="overview" className="scroll-mt-44 mb-12">
              <h1 className="text-3xl md:text-4xl font-heading mb-2">{property.title}</h1>
              {property.location && (
                <p className="text-primary text-lg mb-4">{property.location.name}</p>
              )}

              {/* Quick stats row */}
              <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-600">
                {property.sleeps != null && <span>Sleeps <strong className="text-dark-slate">{property.sleeps}</strong></span>}
                {property.bedrooms != null && <span>Bedrooms <strong className="text-dark-slate">{property.bedrooms}</strong></span>}
                {property.bathrooms != null && <span>Bathrooms <strong className="text-dark-slate">{property.bathrooms}</strong></span>}
              </div>

              {property.summary && (
                <p className="text-gray-600 text-lg leading-relaxed mb-6">{property.summary}</p>
              )}
              {property.overview && (
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">{property.overview}</div>
              )}
              {property.lifestyleFeatures && (
                <p className="text-gray-600 leading-relaxed mt-4">{property.lifestyleFeatures}</p>
              )}
            </section>

            {/* Gallery (if Sanity images exist alongside slideshow) */}
            {slides.length === 0 && property.gallery && property.gallery.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                {property.gallery.map((img: any, i: number) => (
                  <div key={i} className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={urlFor(img).width(400).height(300).url()}
                      alt={`${property.title} photo ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Pricing */}
            {property.rates?.length > 0 && (
              <section id="pricing" className="scroll-mt-44 mb-12">
                <h2 className="text-2xl font-heading mb-6">Rates</h2>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-cream">
                        <th className="text-left px-5 py-3 font-medium text-gray-700">Season</th>
                        {property.rates.some((r: any) => r.minStay) && (
                          <th className="text-center px-5 py-3 font-medium text-gray-700">Min Stay</th>
                        )}
                        <th className="text-right px-5 py-3 font-medium text-gray-700">Nightly Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {property.rates.map((rate: any, i: number) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-5 py-3 text-gray-700">{rate.season}</td>
                          {property.rates.some((r: any) => r.minStay) && (
                            <td className="px-5 py-3 text-center text-gray-600">{rate.minStay || '—'}</td>
                          )}
                          <td className="px-5 py-3 text-right font-medium text-dark-slate">
                            {rate.nightlyRate ? <Price usd={rate.nightlyRate} /> : 'Contact us'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {property.ratesNote && (
                  <div className="mt-4 text-xs text-gray-500 leading-relaxed whitespace-pre-line bg-cream rounded-lg p-4">
                    {property.ratesNote}
                  </div>
                )}
              </section>
            )}

            {/* Sleeping Arrangements */}
            {property.sleepingArrangements?.length > 0 && (
              <section id="sleeping" className="scroll-mt-44 mb-12">
                <h2 className="text-2xl font-heading mb-6">Sleeping Arrangements</h2>
                <div className="space-y-3">
                  {property.sleepingArrangements.map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-cream px-5 py-4 rounded-lg">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
                        <path d="M2 4v16" />
                        <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                        <path d="M2 17h20" />
                        <path d="M6 8v9" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Features */}
            {(property.features?.length > 0 || property.externalAmenities?.length > 0) && (
              <section id="features" className="scroll-mt-44 mb-12">
                <h2 className="text-2xl font-heading mb-6">Features</h2>

                {/* Internal amenities */}
                {property.features?.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-heading mb-4 text-gray-500">Internal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.features.map((feature: string) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* External amenities */}
                {property.externalAmenities?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-heading mb-4 text-gray-500">External</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.externalAmenities.map((item: string) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-gray-700">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0 mt-0.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Villa Staff */}
            {property.staffing?.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-heading mb-4">Villa Staff</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.staffing.map((item: string) => (
                    <div key={item} className="flex items-center gap-3 bg-cream px-5 py-3 rounded-lg text-sm text-gray-700">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What We Love */}
            {property.highlights?.length > 0 && (
              <section id="highlights" className="scroll-mt-44 mb-12">
                <h2 className="text-2xl font-heading mb-6">What We Love</h2>
                <div className="bg-cream rounded-xl p-6">
                  <ul className="space-y-3">
                    {property.highlights.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0 mt-0.5">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Live Availability Calendar */}
            {property.icalUrl && (
              <section id="availability" className="scroll-mt-44 mb-12">
                <h2 className="text-2xl font-heading mb-6">Live Availability</h2>
                <AvailabilityCalendar
                  icalUrl={property.icalUrl}
                  propertyTitle={property.title}
                  agentEmail={property.agent?.email || 'info@barbadosislandproperties.com'}
                  minStayNights={property.minStayNights || 7}
                />
              </section>
            )}
          </div>

          {/* Right: Amenities + Key Facts & Enquiry */}
          <aside className="w-full lg:w-96 shrink-0">
            <div className="sticky top-44 space-y-6">
              {/* Amenities */}
              {property.amenities?.length > 0 && (
                <div id="amenities" className="card p-6 scroll-mt-44">
                  <h3 className="text-xl font-heading mb-4">Amenities</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {property.amenities.map((amenity: any) => (
                      <div key={amenity.slug?.current || amenity.name} className="flex items-center gap-3 bg-cream text-sm text-dark-slate px-4 py-2.5 rounded-lg">
                        <AmenityIcon iconKey={amenity.iconKey} size={18} className="text-primary" />
                        <span>{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Facts */}
              <div className="card p-6">
              <h3 className="text-xl font-heading mb-4">Key Facts</h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {property.sleeps != null && (
                  <div className="text-center p-3 bg-cream rounded-lg">
                    <p className="text-2xl font-medium text-dark-slate">{property.sleeps}</p>
                    <p className="text-xs text-gray-500">Sleeps</p>
                  </div>
                )}
                {property.bedrooms != null && (
                  <div className="text-center p-3 bg-cream rounded-lg">
                    <p className="text-2xl font-medium text-dark-slate">{property.bedrooms}</p>
                    <p className="text-xs text-gray-500">Bedrooms</p>
                  </div>
                )}
                {property.bathrooms != null && (
                  <div className="text-center p-3 bg-cream rounded-lg">
                    <p className="text-2xl font-medium text-dark-slate">{property.bathrooms}</p>
                    <p className="text-xs text-gray-500">Bathrooms</p>
                  </div>
                )}
                {property.minStayNights != null && (
                  <div className="text-center p-3 bg-cream rounded-lg">
                    <p className="text-2xl font-medium text-dark-slate">{property.minStayNights}</p>
                    <p className="text-xs text-gray-500">Min Nights</p>
                  </div>
                )}
              </div>

              {/* In Brief */}
              {property.staffing?.length > 0 && (
                <div className="mb-6 text-sm text-gray-600">
                  <h4 className="text-xs font-medium text-gray-500 mb-2">Included</h4>
                  {property.staffing.map((s: string) => (
                    <p key={s} className="mb-1">{s}</p>
                  ))}
                </div>
              )}

              {/* Agent */}
              {property.agent && (
                <div className="mb-6 p-4 bg-cream rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Your Agent</p>
                  <p className="font-medium text-dark-slate">{property.agent.name}</p>
                  {property.agent.email && (
                    <a href={`mailto:${property.agent.email}`} className="text-sm text-primary">{property.agent.email}</a>
                  )}
                </div>
              )}

              {/* Enquiry CTA */}
              <a
                href={`mailto:${property.agent?.email || 'info@barbadosislandproperties.com'}?subject=Enquiry: ${property.title}`}
                className="btn-primary block text-center w-full no-underline"
              >
                Enquire Now
              </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* You Might Also Like */}
      {relatedProperties.length > 0 && (
        <div className="container-max py-12 border-t border-gray-200">
          <h2 className="text-2xl font-heading mb-6">You Might Also Be Interested In</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProperties.map((p: any) => (
              <PropertyCard
                key={p._id}
                property={p}
                localImageSrc={getFirstLocalImage(p.slug?.current, p.title)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
