import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: 'bqq27frk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

const props = await client.fetch(`*[_type == "property" && featured == true][0]{ _id, title, heroImage }`)
console.log('Property:', JSON.stringify(props, null, 2))
if (props?.heroImage) {
  const url = builder.image(props.heroImage).width(600).height(400).url()
  console.log('Image URL:', url)
}

const agents = await client.fetch(`*[_type == "agent" && isFeatured == true]{ _id, name, photo }`)
console.log('\nAgents:', JSON.stringify(agents, null, 2))
for (const a of agents) {
  if (a.photo) {
    console.log(`${a.name} photo URL:`, builder.image(a.photo).width(256).height(256).url())
  } else {
    console.log(`${a.name}: NO PHOTO`)
  }
}
