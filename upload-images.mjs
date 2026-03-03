import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import path from 'path'

const client = createClient({
  projectId: 'bqq27frk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function uploadImage(filePath) {
  const filename = path.basename(filePath)
  console.log(`  Uploading ${filename}...`)
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename,
  })
  console.log(`  ✓ Uploaded: ${asset._id}`)
  return asset
}

async function main() {
  const imagesDir = 'C:/Users/jim/Downloads/Images'

  // 1. Upload Natalie's photo
  console.log('\n📷 Uploading agent photos...\n')

  const natalieAsset = await uploadImage(
    `${imagesDir}/Natalie Heilling Barbados Island Properties Director of Rentals.jpg`
  )
  await client.patch('agent-natalie-heiling').set({
    photo: {
      _type: 'image',
      asset: { _type: 'reference', _ref: natalieAsset._id },
    },
  }).commit()
  console.log('  ✓ Natalie photo attached\n')

  // 2. Upload Rebecca's photo
  const rebeccaAsset = await uploadImage(
    `${imagesDir}/Rebecca Pitcher Barbados Island Properties Directorof Sales .png`
  )
  await client.patch('agent-rebecca-pitcher').set({
    photo: {
      _type: 'image',
      asset: { _type: 'reference', _ref: rebeccaAsset._id },
    },
  }).commit()
  console.log('  ✓ Rebecca photo attached\n')

  // 3. Upload beach image as hero for the test property
  console.log('📷 Uploading property hero image...\n')
  const beachAsset = await uploadImage(
    `${imagesDir}/Barbados Island Properties.jpg`
  )
  await client.patch('property-test-rental-001').set({
    heroImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: beachAsset._id },
    },
  }).commit()
  console.log('  ✓ Property hero image attached\n')

  // 4. Upload beach image as site logo placeholder too
  await client.patch('siteSettings').set({
    logo: {
      _type: 'image',
      asset: { _type: 'reference', _ref: beachAsset._id },
    },
  }).commit()
  console.log('  ✓ Site logo placeholder set\n')

  console.log('✅ All images uploaded successfully!')
}

main().catch((err) => {
  console.error('❌ Upload failed:', err.message)
  process.exit(1)
})
