import { client, allAgentsQuery } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'About Us | Barbados Island Properties',
  description: 'Meet the team behind Barbados Island Properties — experienced professionals dedicated to luxury property in Barbados.',
}

export const dynamic = 'force-dynamic'

const agentPhotos: Record<string, string> = {
  'natalie-heiling': '/Agents/Natalie Heilling Barbados Island Properties Director of Rentals.jpg',
  'tora-porter': '/Agents/Tora.jpg',
  'rebecca-pitcher': '/Agents/Rebecca.jpg',
}

const teamBios: Record<string, { role: string; paragraphs: string[] }> = {
  'tora-porter': {
    role: 'Director',
    paragraphs: [
      'Tora Porter is Director of Barbados Island Properties, with over 35 years of experience in sales, property management, and development. She started her career at 18 in the family property business and has been passionate about property ever since.',
      'Over the years, Tora has worked across new builds, renovations, and property flips, and has personally designed and built several homes she has lived in. Her hands-on experience gives her a practical understanding of the process from every angle, helping clients make confident, well-informed decisions.',
      'After living and working in Hong Kong and Dubai, she now calls Barbados home — an island she first fell in love with at 15. She lives in Royal Westmoreland with her partner Carl and enjoys an active island lifestyle, from tennis and padel to dogs, dancing, and music — with golf next on the list to master.',
    ],
  },
  'natalie-heiling': {
    role: 'Director — Head of Rentals',
    paragraphs: [
      'Natalie is Head of Rentals at Barbados Island Properties, bringing nearly a decade of hands-on experience in holiday rentals and property management across Barbados. Having worked both operationally and as a property owner herself, she understands villa ownership and guest expectations from every angle.',
      'After first visiting Barbados in 2016, Natalie quickly became immersed in the rental world through a family business, managing a portfolio of luxury villas and holiday homes across the island. What began as practical involvement naturally grew into a long-term career built on real insight into both owner priorities and exceptional guest experiences.',
      'In her role, Natalie balances commercial performance with genuine care and attention to detail, ensuring properties are well managed while guests feel welcomed and supported. She is known for her calm, transparent approach and for anticipating issues before they arise.',
      'Now based on the island full-time, Natalie is a mother of two daughters and values the lifestyle Barbados offers for families. She brings warmth, professionalism, and a relationship-led approach to everything she does.',
    ],
  },
  'rebecca-pitcher': {
    role: 'Director of Sales',
    paragraphs: [
      'Rebecca Pitcher is Director of Sales at Barbados Island Properties, specialising in luxury property sales and acquisitions across Barbados. With over 20 years of experience and a background as a RICS Chartered Quantity Surveyor, she brings a sharp eye for detail, strong negotiation skills, and a natural instinct for value, always focused on helping clients buy well.',
      'After moving from the UK to Barbados, Rebecca embraced island life and new opportunities, launching a luxury charter sailing business and later Butterfly Boutique, now based at the Limegrove Lifestyle Centre. These ventures reflect her entrepreneurial spirit, strong local knowledge, and hands-on approach to business.',
      'In her role, Rebecca works closely with buyers, investors, and families, guiding them through the buying process with clarity, honesty, and care. She\'s known for her calm, friendly style and for going the extra mile to ensure clients feel confident and supported from start to finish.',
      'Rebecca and her husband Ryan have made Barbados home, where they\'ve rescued over seven dogs and actively support local dog charities through fundraising and community involvement. Outside of work, she enjoys time with friends and making the most of everything island life has to offer.',
    ],
  },
}

export default async function AboutPage() {
  const agents = await client.fetch(allAgentsQuery)

  // Order: Tora, Natalie, Rebecca
  const orderedSlugs = ['tora-porter', 'natalie-heiling', 'rebecca-pitcher']
  const orderedTeam = orderedSlugs
    .map((slug) => {
      const agent = agents.find((a: any) => a.slug?.current === slug)
      const bio = teamBios[slug]
      return agent && bio ? { agent, bio } : null
    })
    .filter(Boolean) as { agent: any; bio: { role: string; paragraphs: string[] } }[]

  return (
    <div>
      {/* Hero */}
      <section className="bg-dark-slate text-white py-20">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-heading mb-4">About Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Meet the team behind Barbados Island Properties — experienced professionals with a genuine passion for the island and its property market.
          </p>
        </div>
      </section>

      {/* Team Bios */}
      <section className="py-20">
        <div className="container-max">
          {orderedTeam.map(({ agent, bio }, index) => (
            <div
              key={agent._id}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-start ${
                index < orderedTeam.length - 1 ? 'mb-20 pb-20 border-b border-gray-200' : ''
              }`}
            >
              {/* Photo */}
              <div className="w-full lg:w-96 shrink-0">
                {agentPhotos[agent.slug?.current] ? (
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    <Image
                      src={agentPhotos[agent.slug?.current]}
                      alt={agent.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : agent.photo ? (
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    <Image
                      src={urlFor(agent.photo).width(600).height(800).url()}
                      alt={agent.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-[3/4] rounded-xl bg-cream flex items-center justify-center">
                    <span className="text-6xl font-heading text-primary/30">
                      {agent.name?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Bio */}
              <div className="flex-1">
                <h2 className="text-3xl font-heading mb-1">{agent.name}</h2>
                <p className="text-primary text-lg font-medium mb-6">{bio.role}</p>
                {bio.paragraphs.map((p, i) => (
                  <p key={i} className="text-gray-600 text-lg leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
                {agent.email && (
                  <a
                    href={`mailto:${agent.email}`}
                    className="inline-block btn-primary no-underline mt-2"
                  >
                    Get in Touch
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 section-cream text-center">
        <div className="container-max">
          <h2 className="mb-4">Work With Us</h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Whether you are looking to buy, rent, or have your property professionally managed, our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-lg px-8 py-4 no-underline">
              Contact Us
            </Link>
            <Link href="/holiday-rentals" className="btn-secondary text-lg px-8 py-4 no-underline">
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
