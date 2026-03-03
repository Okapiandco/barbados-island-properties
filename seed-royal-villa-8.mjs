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
  console.log('Seeding Royal Villa 8 rental property...\n')

  // Create any new amenities needed
  const newAmenities = [
    { name: 'Communal Pool', iconKey: 'pool', type: 'both', order: 39 },
    { name: 'BBQ Grill', iconKey: null, type: 'both', order: 40 },
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

  // Reference existing amenities from previous seeds
  const existingAmenityIds = [
    'amenity-gated-community',
    'amenity-security-services',
    'amenity-air-conditioning',
    'amenity-fully-equipped-kitchen',
    'amenity-wifi',
  ]

  const allAmenityIds = [
    ...existingAmenityIds,
    amenityRefs['Communal Pool'],
    amenityRefs['BBQ Grill'],
  ]
  const amenityRefsArray = allAmenityIds.map((id, i) => ({
    _type: 'reference',
    _ref: id,
    _key: `am${i}`,
  }))

  // Create collections: Golf Villa and Family Villa
  await client.createOrReplace({
    _id: 'collection-golf-villa',
    _type: 'collection',
    name: 'Golf Villa',
    slug: { _type: 'slug', current: 'golf-villa' },
    order: 10,
  })
  console.log('  ✓ Collection: Golf Villa')

  await client.createOrReplace({
    _id: 'collection-family-villa',
    _type: 'collection',
    name: 'Family Villa',
    slug: { _type: 'slug', current: 'family-villa' },
    order: 11,
  })
  console.log('  ✓ Collection: Family Villa')

  // Internal amenities (features)
  const features = [
    'All bedrooms air conditioned with ceiling fans and cable TV',
    'Flexible bed configurations',
    'Walk-in dressing rooms',
    'Ensuite bathrooms equipped with hair dryers',
    'Fully equipped gourmet kitchen',
    'Telephone and WiFi access',
  ]

  // External amenities
  const externalAmenities = [
    'Private outdoor balcony with panoramic views',
    'Outdoor lounging areas',
    'Big Green Egg BBQ grill',
    'Enclosed, established gardens',
    'Covered terrace',
    'Access to communal pools within the Estate',
    'Watersports nearby',
  ]

  // What we love / highlights
  const highlights = [
    'Absolutely stunning interiors — perfect for romantic escapes, family vacations, or serene retreats with friends',
    'Beautiful views overlooking a large pond with fountains and the Caribbean Sea beyond',
    'Elegant bedrooms with walk-through dressing rooms and en-suite bathrooms',
    'Big Green Egg BBQ on the balcony — cook up a storm with panoramic views',
    'Gated Royal Westmoreland community with 24-hour security',
    '5 minutes from Holetown beaches, shops, bars and restaurants',
    'Access to communal pools, nearby tennis courts at Sugar Hill and fitness facilities',
  ]

  // Sleeping arrangements
  const sleepingArrangements = [
    'Master Bedroom (Ground Floor) — Emperor bed, ensuite, walk-in dressing room',
    'Bedroom 2 (Ground Floor) — Twin beds (can be joined for a King bed), ensuite',
    'Bedroom 3 (First Floor) — Twin beds (can be joined), ensuite',
  ]

  // Rates — no nightly prices provided yet, contact for pricing
  const rates = [
    { _key: 'r1', season: '11 Jan 2026 – 14 Apr 2026', minStay: '5 nights' },
    { _key: 'r2', season: '15 Apr 2026 – 14 Dec 2026', minStay: '5 nights' },
    { _key: 'r3', season: '15 Dec 2026 – 19 Dec 2026', minStay: '7 nights' },
    { _key: 'r4', season: '20 Dec 2026 – 10 Jan 2027', minStay: '7 nights' },
    { _key: 'r5', season: '11 Jan 2027 – 14 Apr 2027', minStay: '5 nights' },
    { _key: 'r6', season: '15 Apr 2027 – 14 Dec 2027', minStay: '5 nights' },
  ]

  const ratesNote = `All prices are excluding tax. A 10% government tax and a 2.5% service charge will be added to every rental price.

Christmas and New Year: Bookings are subject to a 14 night minimum stay (owners may require 3 weeks). A higher deposit of 50% is payable, with balance due 90 days before arrival. Contact us for a firm quotation during December and January.

Late Checkout: Standard checkout at 12 noon. Late checkouts up to 7pm are charged at half the nightly rate. After 7pm, the full nightly rate applies.`

  // Overview
  const overview = `Welcome to Royal Villa 8, a charming 3-bedroom, 3.5 bathroom villa nestled within the prestigious Royal Westmoreland Resort. This villa provides the perfect setting for an unforgettable getaway. Set amidst lush landscapes and overlooking a beautiful large pond and fountains, Royal Villa 8 promises tranquility and an abundance of wildlife with the Caribbean Sea beyond.

The villa offers three elegantly appointed, spacious bedrooms, each designed with comfort and style in mind. Each have walk-through dressing rooms and en-suite bathrooms. One bedroom offers an emperor bed while the other two are both super-kings, with one able to be made into twin beds if required.

There is a fully equipped kitchen, large round dining table seating eight guests, spacious living areas, air-conditioning in all bedrooms and fans throughout the house to keep you cool. The balcony overlooking the pond and the sea is equipped with patio furniture and a further dining table for 6/8 guests where you can cook up a storm on the Big Green Egg BBQ where food cooked over natural charcoal brings out the best flavours.

Royal Villa 8 is within the Royal Villa development of Royal Westmoreland, which offers 24-hour security. Golf enthusiasts can play at Royal Westmoreland or nearby at Sandy Lane Golf course which boasts the Old Nine, the main golf course and the famous 'Green Monkey' courses. Guests also have access to the communal swimming pools. Tennis courts are very nearby at Sugar Hill, where lessons are available with a professional tennis coach. Quantum fitness is a ten minute walk away where you will find a very well equipped gym.`

  const lifestyleFeatures = `Please note that Royal Villa 8 does not have the golf/social membership hence the significantly cheaper rates. The golf membership makes no difference as guests staying in a property belonging to golf members are still required to pay the normal rate for a round of golf, and times are limited for all non-home-owning/member golfers. We recommend Sandy Lane golf course nearby where you can pay to play on any of their three golf courses and can buy a short term membership for 7, 14, 21 rounds of golf. As part of their service they provide buggies and bring a drinks trolley around the course regularly. The welcome, service and helpfulness of the staff is exceptional.`

  console.log('\nCreating Royal Villa 8 property...')
  await client.createOrReplace({
    _id: 'property-royal-villa-8-royal-westmoreland',
    _type: 'property',
    propertyId: 'RV8-RW-001',
    title: 'Royal Villa 8',
    slug: { _type: 'slug', current: 'royal-villa-8' },
    listingType: 'rental',
    status: 'active',
    location: { _type: 'reference', _ref: 'location-royal-westmoreland' },
    collections: [
      { _type: 'reference', _ref: 'collection-golf-villa', _key: 'col1' },
      { _type: 'reference', _ref: 'collection-family-villa', _key: 'col2' },
    ],
    agent: { _type: 'reference', _ref: 'agent-natalie-heiling' },
    summary: 'Royal Villa 8, Royal Westmoreland, St James — Charming 3 bedroom villa with stunning interiors and panoramic views',
    bedrooms: 3,
    bathrooms: 3.5,
    sleeps: 6,
    minStayNights: 5,
    travellingWithChildren: true,
    propertyCategory: 'villa',
    featured: false,
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
      'Housekeeper — 2 days per week',
    ],
    icalUrl: 'https://www.worldwidedreamvillas.com/calendar/ical/72445',
    map: {
      lat: 13.1889,
      lng: -59.6292,
      mapDisplayMode: 'approximate',
    },
  })
  console.log('  ✓ Royal Villa 8, Royal Westmoreland\n')

  console.log('✅ Royal Villa 8 seeded successfully!')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
