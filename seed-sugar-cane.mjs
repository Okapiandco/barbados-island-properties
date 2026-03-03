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
  console.log('Creating amenities for Sugar Cane Ridge 9...\n')

  // Create all the amenities from the CSV (many are new)
  const amenityData = [
    // Existing ones (will be updated)
    { name: 'Swimming Pool', iconKey: 'pool', type: 'both', order: 1 },
    { name: 'Beach Access', iconKey: 'beach', type: 'both', order: 2 },
    { name: 'Golf Course', iconKey: 'golf', type: 'both', order: 3 },
    { name: 'Tennis Courts', iconKey: 'tennis', type: 'both', order: 4 },
    { name: 'BBQ Area', iconKey: 'bbq', type: 'both', order: 5 },
    // New amenities from CSV
    { name: '24 Hour Security', iconKey: 'security', type: 'both', order: 10 },
    { name: 'Clubhouse', iconKey: 'clubhouse', type: 'both', order: 11 },
    { name: 'On Site Restaurant', iconKey: 'restaurant', type: 'both', order: 12 },
    { name: 'Golf Pro Shop & Training Facility', iconKey: 'golf', type: 'both', order: 13 },
    { name: 'Padel Courts', iconKey: 'padel', type: 'both', order: 14 },
    { name: 'Pickle Ball Courts', iconKey: 'tennis', type: 'both', order: 15 },
    { name: '18 Hole Golf Course', iconKey: 'golf', type: 'both', order: 16 },
    { name: '9 Hole Golf Course', iconKey: 'golf', type: 'both', order: 17 },
    { name: 'Driving Range', iconKey: 'driving-range', type: 'both', order: 18 },
    { name: 'Hiking Trails', iconKey: 'hiking', type: 'both', order: 19 },
    { name: 'Beach Club', iconKey: 'beach', type: 'both', order: 20 },
    { name: 'Beach Shuttle', iconKey: 'beach', type: 'both', order: 21 },
    { name: 'Communal Swimming Pool', iconKey: 'pool', type: 'both', order: 22 },
    { name: 'Gym / Fitness Centre', iconKey: 'gym', type: 'both', order: 23 },
  ]

  const amenityRefs = {}
  for (const am of amenityData) {
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
    console.log(`  ✓ ${am.name}`)
  }

  // Create Royal Westmoreland location if it doesn't exist
  const rwLocationId = 'location-royal-westmoreland'
  await client.createOrReplace({
    _id: rwLocationId,
    _type: 'location',
    name: 'Royal Westmoreland',
    slug: { _type: 'slug', current: 'royal-westmoreland' },
    region: 'West Coast',
    parish: 'St James',
    order: 8,
  })
  console.log('\n  ✓ Location: Royal Westmoreland')

  // Build amenity references for the property
  const propertyAmenityRefs = Object.entries(amenityRefs).map(([name, id], i) => ({
    _type: 'reference',
    _ref: id,
    _key: `am${i}`,
  }))

  // Features from CSV
  const features = [
    'Air conditioned',
    'Ensuite bathrooms',
    'Fully equipped kitchen',
    'Private swimming pool',
    'Fully furnished',
    'Ceiling fans',
    'Resort amenities',
    'Assigned car parking',
    'Sea view',
    'Landscaped gardens',
    'Covered balcony',
    'Multiple storey',
    'Reverse living',
    'Open plan layout',
    'Traditional design',
  ]

  // What We Like
  const highlights = [
    'Prime corner townhouse with sea views',
    'Private pool steps from principal + guest bedroom',
    'Fully furnished – move in or rent tomorrow',
    'Club initiation fee included – instant Royal Westmoreland membership',
    '4 bedrooms (2 king), 3 bathrooms, open-plan living to sea-view balcony',
    'Full membership: championship golf, tennis, gym, pools, concierge',
    'Top West Coast letting potential – high demand, high yields',
    'Effortless luxury in manicured resort grounds',
  ]

  console.log('\nCreating Sugar Cane Ridge 9 property...')
  await client.createOrReplace({
    _id: 'property-sugar-cane-ridge-9',
    _type: 'property',
    propertyId: 'SCR-009',
    title: 'Sugar Cane Ridge 9, Royal Westmoreland',
    slug: { _type: 'slug', current: 'sugar-cane-ridge-9-royal-westmoreland' },
    listingType: 'sale',
    status: 'for-sale',
    location: { _type: 'reference', _ref: rwLocationId },
    collections: [
      { _type: 'reference', _ref: 'collection-golf-community', _key: 'col1' },
      { _type: 'reference', _ref: 'collection-luxury', _key: 'col2' },
    ],
    agent: { _type: 'reference', _ref: 'agent-rebecca-pitcher' },
    summary: 'Sugar Cane Ridge 9 is a beautifully presented townhouse in the prestigious Royal Westmoreland Resort, St James, on Barbados\' sought-after West Coast.',
    bedrooms: 4,
    bathrooms: 3,
    floorAreaSqFt: 2300,
    priceUsd: 1295000,
    propertyCategory: 'townhouse',
    featured: true,
    showConvertedPrices: true,
    amenities: propertyAmenityRefs,
    features,
    highlights,
    overview: 'The thoughtfully designed split-level floor plan offers generous, well-flowing living spaces. On the entry level: one spacious bedroom with a king-sized bed, air conditioning, ceiling fans, and a private en-suite bathroom. The main/upper level comprises an open-plan living and dining area that flows seamlessly onto a private covered balcony, ideal for entertaining whilst enjoying panoramic sea views, together with a modern kitchen fitted with high-quality appliances and a concealed laundry cupboard. On the lower level: the principal (master) bedroom with a king-sized bed, air conditioning, ceiling fans, and en-suite bathroom, plus two generously proportioned guest bedrooms sharing a well-appointed bathroom—all bedrooms benefit from air conditioning and ceiling fans for year-round comfort. The principal bedroom and one guest bedroom open directly onto the private pool deck, affording effortless indoor-outdoor access for swimming and relaxation.',
    lifestyleFeatures: 'This home affords an exceptional Caribbean lifestyle with a private pool accessible directly from the principal and one guest bedroom—perfect for morning swims, cooling off, or evening relaxation whilst taking in stunning elevated sea views and West Coast sunsets. The corner position provides added privacy and a greater sense of space. With the included Royal Westmoreland Club initiation fee, owners may immediately enjoy full membership privileges, encompassing the championship 18-hole golf course, tennis courts, state-of-the-art fitness centre, communal pools, concierge services, and nearby restaurants and shops—creating an ideal setting for family holidays, golf enthusiasts, or anyone seeking a sophisticated, secure, amenity-rich tropical retreat.',
    investmentFeatures: 'Sugar Cane Ridge 9 offers strong investment appeal in one of Barbados\' most desirable luxury communities, where Royal Westmoreland properties consistently demonstrate sound capital appreciation and sustained demand. Fully furnished and with the Club initiation fee included (a substantial cost usually borne by the buyer), it provides immediate added value and savings. The townhouse enjoys excellent short-term holiday letting potential—enhanced by the rare direct pool-deck access from multiple bedrooms—appealing to discerning international visitors drawn to the West Coast\'s beaches, golf, and exclusivity. Membership eligibility further enhances both personal enjoyment and letting yields, positioning this as a solid, appreciating asset in a stable, globally sought-after Caribbean market.',
    map: {
      lat: 13.1725,
      lng: -59.6267,
      mapDisplayMode: 'approximate',
    },
  })
  console.log('  ✓ Sugar Cane Ridge 9, Royal Westmoreland\n')

  console.log('✅ Property seeded successfully!')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
