import { client, propertyBySlugQuery, relatedPropertiesQuery } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AmenityIcon from '@/components/AmenityIcon'
import PropertySlideshow from '@/components/PropertySlideshow'
import { getLocalImages, getFirstLocalImage } from '@/lib/localImages'
import PropertyCard from '@/components/PropertyCard'
import Price from '@/components/Price'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SalesDetailPage({ params }: { params: { slug: string } }) {
  const property = await client.fetch(propertyBySlugQuery(params.slug))
  if (!property) notFound()

  const relatedProperties = await client.fetch(relatedPropertiesQuery(params.slug, 'sale'))

  // Build slides: prefer local images, fall back to Sanity gallery
  const localSlides = getLocalImages(property.slug?.current || params.slug, property.title)
  const sanitySlides = (property.gallery || []).map((img: any, i: number) => ({
    src: urlFor(img).width(1400).height(800).url(),
    alt: `${property.title} photo ${i + 1}`,
  }))
  const slides = localSlides.length > 0 ? localSlides : sanitySlides

  // Build anchor links based on available content
  const sections = [
    { id: 'description', label: 'Description', show: true },
    { id: 'overview', label: 'Overview', show: !!property.overview },
    { id: 'features', label: 'Features', show: property.features?.length > 0 || !!property.lifestyleFeatures || !!property.investmentFeatures },
    { id: 'highlights', label: 'What We Like', show: property.highlights?.length > 0 },
    { id: 'amenities', label: 'Amenities', show: property.amenities?.length > 0 },
  ].filter((s) => s.show)

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-max pt-6 pb-2">
        <div className="text-sm text-gray-500">
          <Link href="/sales" className="hover:text-primary no-underline">Properties For Sale</Link>
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
          </nav>
        </div>
      </div>

      <div className="container-max py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Content Sections */}
          <div className="flex-1">
            {/* Description */}
            <section id="description" className="scroll-mt-44 mb-12">
              <h1 className="text-3xl md:text-4xl font-heading mb-2">{property.title}</h1>
              {property.location && (
                <p className="text-primary text-lg mb-2">{property.location.name}</p>
              )}
              {property.priceUsd && (
                <p className="text-2xl font-heading text-dark-slate mb-6">
                  <Price usd={property.priceUsd} suffix />
                </p>
              )}
              {property.priceLabel && !property.priceUsd && (
                <p className="text-xl text-primary mb-6">{property.priceLabel}</p>
              )}
              {property.summary && (
                <p className="text-gray-600 text-lg leading-relaxed">{property.summary}</p>
              )}
            </section>

            {/* Overview */}
            {property.overview && (
              <section id="overview" className="scroll-mt-44 mb-12">
                <h2 className="text-2xl font-heading mb-4">Residence Overview</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{property.overview}</p>
              </section>
            )}

            {/* Features */}
            {(property.features?.length > 0 || property.lifestyleFeatures || property.investmentFeatures) && (
              <section id="features" className="scroll-mt-44 mb-12">
                <h2 className="text-2xl font-heading mb-6">Features</h2>

                {/* Property Features List */}
                {property.features?.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                    {property.features.map((feature: string) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                )}

                {/* Lifestyle Features */}
                {property.lifestyleFeatures && (
                  <div className="mb-8">
                    <h3 className="text-xl font-heading mb-3">Lifestyle</h3>
                    <p className="text-gray-600 leading-relaxed">{property.lifestyleFeatures}</p>
                  </div>
                )}

                {/* Investment Features */}
                {property.investmentFeatures && (
                  <div>
                    <h3 className="text-xl font-heading mb-3">Investment</h3>
                    <p className="text-gray-600 leading-relaxed">{property.investmentFeatures}</p>
                  </div>
                )}
              </section>
            )}

            {/* What We Like */}
            {property.highlights?.length > 0 && (
              <section id="highlights" className="scroll-mt-44 mb-12">
                <h2 className="text-2xl font-heading mb-6">What We Like</h2>
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

          </div>

          {/* Right: Amenities + Property Details Sidebar */}
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

              {/* Property Details */}
              <div className="card p-6">
              <h3 className="text-xl font-heading mb-4">Property Details</h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
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
                {property.floorAreaSqFt && (
                  <div className="text-center p-3 bg-cream rounded-lg">
                    <p className="text-2xl font-medium text-dark-slate">{property.floorAreaSqFt.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Sq Ft (Floor)</p>
                  </div>
                )}
                {property.landAreaSqFt && (
                  <div className="text-center p-3 bg-cream rounded-lg">
                    <p className="text-2xl font-medium text-dark-slate">{property.landAreaSqFt.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Sq Ft (Land)</p>
                  </div>
                )}
              </div>

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
                Schedule Viewing
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
