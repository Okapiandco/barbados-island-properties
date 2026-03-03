import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'bqq27frk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Helper to create a slug
const toSlug = (name) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

async function seed() {
  console.log('🌱 Seeding Sanity data...\n')

  // ──────────────── SITE SETTINGS ────────────────
  console.log('Creating Site Settings...')
  const siteSettings = await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'Barbados Island Properties',
    description: 'Discover luxury holiday rentals and properties for sale in Barbados. Expert local agents, stunning beachfront villas, and exclusive golf community homes.',
    genericEnquiriesEmail: 'info@barbadosislandproperties.com',
    officeWhatsappNumber: '+1-246-XXXXXXX',
    defaultCurrency: 'USD',
    fxMode: 'manual',
    manualRates: {
      usdToGbp: 0.79,
      usdToCad: 1.36,
    },
    heroVideoUrl: 'https://www.youtube.com/embed/22iC4BFtKDM?autoplay=1&mute=1&controls=0&loop=1&playlist=22iC4BFtKDM',
  })
  console.log('  ✓ Site Settings created\n')

  // ──────────────── LOCATIONS ────────────────
  console.log('Creating Locations...')
  const locationData = [
    { name: 'Westland Heights', region: 'West Coast', parish: 'St James', order: 1 },
    { name: 'Mullins', region: 'West Coast', parish: 'St Peter', order: 2 },
    { name: 'Sugar Hill', region: 'West Coast', parish: 'St Peter', order: 3 },
    { name: 'Prospect', region: 'West Coast', parish: 'St James', order: 4 },
    { name: 'Vuemont', region: 'South Coast', parish: 'St Michael', order: 5 },
    { name: 'Casuarina', region: 'West Coast', parish: 'St Peter', order: 6 },
    { name: 'Gibbs', region: 'East Coast', parish: 'St Andrew', order: 7 },
  ]

  const locations = {}
  for (const loc of locationData) {
    const id = `location-${toSlug(loc.name)}`
    const doc = await client.createOrReplace({
      _id: id,
      _type: 'location',
      name: loc.name,
      slug: { _type: 'slug', current: toSlug(loc.name) },
      region: loc.region,
      parish: loc.parish,
      order: loc.order,
    })
    locations[loc.name] = doc._id
    console.log(`  ✓ ${loc.name}`)
  }
  console.log('')

  // ──────────────── COLLECTIONS ────────────────
  console.log('Creating Collections...')
  const collectionData = [
    { name: 'Beachfront', description: 'Properties with direct beach access and stunning ocean views', order: 1 },
    { name: 'Golf Community', description: 'Properties in prestigious golf communities with world-class courses', order: 2 },
    { name: 'Luxury', description: 'Ultra-luxury properties with premium finishes and exclusive amenities', order: 3 },
  ]

  const collections = {}
  for (const col of collectionData) {
    const id = `collection-${toSlug(col.name)}`
    const doc = await client.createOrReplace({
      _id: id,
      _type: 'collection',
      name: col.name,
      slug: { _type: 'slug', current: toSlug(col.name) },
      description: col.description,
      order: col.order,
    })
    collections[col.name] = doc._id
    console.log(`  ✓ ${col.name}`)
  }
  console.log('')

  // ──────────────── AMENITIES ────────────────
  console.log('Creating Amenities...')
  const amenityData = [
    { name: 'Swimming Pool', iconKey: 'pool', type: 'both', order: 1 },
    { name: 'Beach Access', iconKey: 'beach', type: 'both', order: 2 },
    { name: 'Golf Course', iconKey: 'golf', type: 'both', order: 3 },
    { name: 'Tennis Courts', iconKey: 'tennis', type: 'both', order: 4 },
    { name: 'BBQ Area', iconKey: 'bbq', type: 'both', order: 5 },
    { name: 'Bedroom', iconKey: 'bedroom', type: 'both', order: 6 },
    { name: 'Bathroom', iconKey: 'bathroom', type: 'both', order: 7 },
  ]

  const amenities = {}
  for (const am of amenityData) {
    const id = `amenity-${toSlug(am.name)}`
    const doc = await client.createOrReplace({
      _id: id,
      _type: 'amenity',
      name: am.name,
      slug: { _type: 'slug', current: toSlug(am.name) },
      iconKey: am.iconKey,
      type: am.type,
      order: am.order,
    })
    amenities[am.name] = doc._id
    console.log(`  ✓ ${am.name}`)
  }
  console.log('')

  // ──────────────── AGENTS ────────────────
  console.log('Creating Agents...')
  const agentData = [
    {
      name: 'Tora Porter',
      email: 'tora@barbadosislandproperties.com',
      specialties: ['Sales'],
      order: 1,
    },
    {
      name: 'Natalie Heiling',
      email: 'natalie@barbadosislandproperties.com',
      specialties: ['Rentals'],
      order: 2,
    },
    {
      name: 'Rebecca Pitcher',
      email: 'rebecca@barbadosislandproperties.com',
      specialties: ['Sales'],
      order: 3,
    },
  ]

  const agents = {}
  for (const ag of agentData) {
    const id = `agent-${toSlug(ag.name)}`
    const doc = await client.createOrReplace({
      _id: id,
      _type: 'agent',
      name: ag.name,
      slug: { _type: 'slug', current: toSlug(ag.name) },
      email: ag.email,
      specialties: ag.specialties,
      isFeatured: true,
      order: ag.order,
    })
    agents[ag.name] = doc._id
    console.log(`  ✓ ${ag.name}`)
  }
  console.log('')

  // ──────────────── TEST PROPERTY ────────────────
  console.log('Creating Test Property...')
  const testProperty = await client.createOrReplace({
    _id: 'property-test-rental-001',
    _type: 'property',
    propertyId: 'TEST-RENTAL-001',
    title: 'Luxury Villa at Westmoreland',
    slug: { _type: 'slug', current: 'luxury-villa-westmoreland' },
    listingType: 'rental',
    status: 'active',
    location: { _type: 'reference', _ref: locations['Westland Heights'] },
    collections: [
      { _type: 'reference', _ref: collections['Golf Community'], _key: 'col1' },
    ],
    agent: { _type: 'reference', _ref: agents['Natalie Heiling'] },
    summary: 'A beautiful luxury villa with pool and tropical gardens, nestled in the prestigious Westland Heights community.',
    bedrooms: 4,
    bathrooms: 3,
    sleeps: 8,
    minStayNights: 7,
    propertyCategory: 'villa',
    featured: true,
    amenities: [
      { _type: 'reference', _ref: amenities['Swimming Pool'], _key: 'am1' },
      { _type: 'reference', _ref: amenities['Beach Access'], _key: 'am2' },
      { _type: 'reference', _ref: amenities['Golf Course'], _key: 'am3' },
    ],
    map: {
      lat: 13.1939,
      lng: -59.6285,
      mapDisplayMode: 'approximate',
    },
  })
  console.log(`  ✓ ${testProperty.title}\n`)

  console.log('✅ All seed data created successfully!')
  console.log('\nYou can now view your data at:')
  console.log('  - Sanity Studio: http://localhost:3001/studio')
  console.log('  - Frontend: http://localhost:3001')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
