import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'bqq27frk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function updateAgents() {
  console.log('Updating agent data...\n')

  // Tora Porter
  await client.patch('agent-tora-porter')
    .set({
      email: 'tora@barbadosislandproperties.com',
      phone: '+44 7973 268231',
      specialties: ['Sales', 'Property Management', 'Development'],
      bio: 'Director of Barbados Island Properties, with over 35 years of experience in sales, property management, and development.',
      order: 1,
    })
    .commit()
  console.log('  ✓ Tora Porter updated')

  // Natalie Heiling
  await client.patch('agent-natalie-heiling')
    .set({
      email: 'natalie@barbadosislandproperties.com',
      phone: '+44 7789 227797',
      specialties: ['Holiday Rentals', 'Property Management'],
      bio: 'Head of Rentals at Barbados Island Properties, bringing nearly a decade of hands-on experience in holiday rentals and property management across Barbados.',
      order: 2,
    })
    .commit()
  console.log('  ✓ Natalie Heiling updated')

  // Rebecca Pitcher
  await client.patch('agent-rebecca-pitcher')
    .set({
      email: 'rebecca@barbadosislandproperties.com',
      phone: '+1 246 256 5004',
      specialties: ['Luxury Sales', 'Acquisitions'],
      bio: 'Director of Sales at Barbados Island Properties, specialising in luxury property sales and acquisitions across Barbados.',
      order: 3,
    })
    .commit()
  console.log('  ✓ Rebecca Pitcher updated')

  console.log('\n✅ All agents updated!')
}

updateAgents().catch((err) => {
  console.error('❌ Update failed:', err.message)
  process.exit(1)
})
