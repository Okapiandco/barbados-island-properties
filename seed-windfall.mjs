import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'bqq27frk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const toSlug = (name) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

async function seed() {
  console.log('Seeding Windfall rental property...\n')

  // Create any new amenities needed
  const newAmenities = [
    { name: 'Private Pool', iconKey: 'pool', type: 'both', order: 30 },
    { name: 'Gated Community', iconKey: 'security', type: 'both', order: 31 },
    { name: 'Security Services', iconKey: 'security', type: 'both', order: 32 },
    { name: 'Private Parking', iconKey: 'parking', type: 'both', order: 33 },
    { name: 'Air Conditioning', iconKey: 'ac', type: 'both', order: 34 },
    { name: 'Fully Equipped Kitchen', iconKey: 'kitchen', type: 'both', order: 35 },
    { name: 'Beach Club Access', iconKey: 'beach', type: 'rental', order: 36 },
    { name: 'Media Room', iconKey: 'clubhouse', type: 'both', order: 37 },
    { name: 'WiFi', iconKey: null, type: 'both', order: 38 },
  ]

  const amenityRefs = {}
  for (const am of newAmenities) {
    const id = `amenity-${toSlug(am.name)}`
    await client.createOrReplace({
      _id: id,
      _type: 'amenity',
      name: am.name,
      slug: { _type: 'slug', current: toSlug(am.name) },
      iconKey: am.iconKey,
      type: am.type,
      order: am.order,
    })
    amenityRefs[am.name] = id
    console.log(`  ✓ Amenity: ${am.name}`)
  }

  // Collect all amenity refs for the property
  const allAmenityIds = [
    amenityRefs['Private Pool'],
    amenityRefs['Gated Community'],
    amenityRefs['Security Services'],
    amenityRefs['Private Parking'],
    amenityRefs['Air Conditioning'],
    amenityRefs['Fully Equipped Kitchen'],
    amenityRefs['Beach Club Access'],
    amenityRefs['Media Room'],
    amenityRefs['WiFi'],
  ]
  const amenityRefsArray = allAmenityIds.map((id, i) => ({
    _type: 'reference',
    _ref: id,
    _key: `am${i}`,
  }))

  // Internal amenities (features)
  const features = [
    'All bedrooms air-conditioned with ceiling fans, safes & TVs',
    'Master bedrooms include balconies and dressing areas',
    'Ensuite bathrooms equipped with hair dryers',
    'Fully equipped gourmet kitchen',
    'Breakfast bar',
    'Media room',
    'Air conditioning in main areas',
    'Cocktail lounge with ocean views',
    'Wet bars',
    'WiFi access',
    'Bluetooth speaker',
  ]

  // External amenities
  const externalAmenities = [
    'Private indoor/outdoor pool with retractable canopy',
    'Covered pavilion perfect for alfresco dining',
    'Poolside furniture and loungers',
    'Multiple outdoor lounging and dining areas',
    'Private parking',
    'Complimentary access to Fairmont Royal Pavilion Beach Club — includes beach chairs, umbrellas and beach waiter service',
  ]

  // What we love / highlights
  const highlights = [
    'Spectacular indoor-outdoor pool with retractable canopy as the home\'s centerpiece',
    'Two equally luxurious master suites with ocean-view cocktail lounge between them',
    'Fully staffed — private chef, security and housekeeping 7 days a week',
    'Complimentary Fairmont Royal Pavilion Beach Club access for up to 10 guests',
    'Formal dining room, cigar lounge, media room — spaces for every occasion',
    'Gated community with security services, 5 minutes from Holetown',
    'Expansive gardens with covered pavilion for elegant al fresco dining',
  ]

  // Sleeping arrangements
  const sleepingArrangements = [
    'Master Bedroom 1 (First Floor) — King bed, ensuite, balcony & dressing area',
    'Master Bedroom 2 (First Floor) — King bed, ensuite, balcony & dressing area',
    'Bedroom 3 (Ground Floor) — King bed, ensuite',
    'Bedroom 4 (Ground Floor) — Queen bed, ensuite',
    'Bedroom 5 (Ground Floor) — Twin beds, ensuite',
  ]

  // Rates
  const rates = [
    { _key: 'r1', season: '9 Jan 2025 – 30 Apr 2025', nightlyRate: 2200 },
    { _key: 'r2', season: '1 May 2025 – 14 Nov 2025', nightlyRate: 1750 },
    { _key: 'r3', season: '15 Nov 2025 – 14 Dec 2025', nightlyRate: 2200 },
    { _key: 'r4', season: '15 Dec 2025 – 8 Jan 2026', nightlyRate: 3600 },
    { _key: 'r5', season: '9 Jan 2026 – 30 Apr 2026', nightlyRate: 2200 },
    { _key: 'r6', season: '1 May 2026 – 14 Nov 2026', nightlyRate: 1750 },
    { _key: 'r7', season: '15 Nov 2026 – 14 Dec 2026', nightlyRate: 2200 },
    { _key: 'r8', season: '15 Dec 2026 – 8 Jan 2027', nightlyRate: 3600 },
  ]

  const ratesNote = `All prices are excluding tax. A 10% government tax and a 2.5% service charge will be added to every rental price.

Christmas and New Year: Bookings are subject to a 14 night minimum stay (owners may require 3 weeks). A higher deposit of 50% is payable, with balance due 90 days before arrival. Contact us for a firm quotation during December and January.

Late Checkout: Standard checkout at 12 noon. Late checkouts up to 7pm are charged at half the nightly rate. After 7pm, the full nightly rate applies.`

  // Overview
  const overview = `Windfall is an exceptional multi-level villa designed for refined island living and effortless entertaining. At its heart lies a spectacular indoor–outdoor swimming pool, positioned as the home's striking centerpiece and framed by a retractable canopy that allows for full sun, gentle shade, or complete privacy as desired. The pool terrace is thoughtfully appointed with a dedicated guest bathroom, ensuring comfort and convenience.

The upper level is beautifully arranged, featuring two equally spacious master suites set between a private cocktail lounge with sweeping ocean views and an elegant wet bar. Each master suite offers a generous en-suite bathroom, private balcony, and dedicated dressing area, creating twin retreats of equal luxury and privacy.

On the garden level, additional King, Queen, and Twin suites — all fully air-conditioned and complete with en-suite bathrooms. This level also hosts an open-plan living room with a wet bar that flows seamlessly onto the pool terrace and landscaped gardens, an air-conditioned media room for relaxed evenings, and a formal dining room opening onto an outdoor cigar lounge and bar. The spacious kitchen, complete with a breakfast bar, offers a welcoming hub for families, while the expansive garden features a large, covered pavilion designed for elegant al fresco dining.`

  const lifestyleFeatures = `Windfall is fully staffed with a private chef, security, and housekeeping seven days a week, and includes privileged access to The Fairmont Royal Pavilion Beach Club for up to ten guests, with reserved beach chairs and umbrellas, attentive beach waiter service, and preferred dining privileges. Windfall combines striking design, thoughtful amenities, and elevated service to deliver a truly distinguished Caribbean retreat.`

  console.log('\nCreating Windfall property...')
  await client.createOrReplace({
    _id: 'property-windfall-westland-heights',
    _type: 'property',
    propertyId: 'WF-WH-001',
    title: 'Windfall',
    slug: { _type: 'slug', current: 'windfall' },
    listingType: 'rental',
    status: 'active',
    location: { _type: 'reference', _ref: 'location-westland-heights' },
    collections: [
      { _type: 'reference', _ref: 'collection-luxury', _key: 'col1' },
    ],
    agent: { _type: 'reference', _ref: 'agent-natalie-heiling' },
    summary: 'Windfall, Westland Heights, St James — Exclusive 5 bedroom villa, fully staffed',
    bedrooms: 5,
    bathrooms: 6,
    sleeps: 10,
    minStayNights: 7,
    propertyCategory: 'villa',
    featured: true,
    amenities: amenityRefsArray,
    features,
    externalAmenities,
    highlights,
    overview,
    lifestyleFeatures,
    sleepingArrangements,
    rates,
    ratesNote,
    staffing: [
      'House Keeping — 7 days per week',
      'Private Chef — 7 days per week',
      'Security',
    ],
    icalUrl: 'http://p104-caldav.icloud.com/published/2/MjE5NzY2ODc2MjE5NzY2OIZKCIy3upZ-4q4ltpNMdZO3EEqoOa17wqtjnf-cuxqqfMlAto4F_CDGFu41SDkM5nmC-EwwqOmmUQZ9vdGEe_A',
    map: {
      lat: 13.1935,
      lng: -59.6340,
      mapDisplayMode: 'approximate',
    },
  })
  console.log('  ✓ Windfall, Westland Heights\n')

  // Remove the old test property
  try {
    await client.delete('property-test-rental-001')
    console.log('  ✓ Removed old test property\n')
  } catch {
    // Ignore if not found
  }

  console.log('✅ Windfall seeded successfully!')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
