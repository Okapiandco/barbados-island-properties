import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Executive Concierge | Barbados Island Properties',
  description: 'Our Executive Concierge service enhances every moment of your stay — quietly, effortlessly and with attention to the smallest detail.',
}

const arrangements = [
  'Private airport transfers',
  'Pre-arrival grocery provisioning',
  'Private chefs and in-villa dining experiences',
  'Nanny and childcare services',
  'Catamaran charters and private yacht excursions',
  'Island tours and curated cultural experiences',
  'Restaurant, golf and activity reservations',
  '24-hour on-call assistance',
]

export default function ConciergePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white py-32 overflow-hidden">
        <Image
          src="/Images/Rental Properties/Windfall/Westland Heights- Windfall Pool_ deck view drone shot.jpg"
          alt="Luxury villa pool in Barbados"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container-max text-center">
          <h1 className="text-4xl md:text-5xl font-heading mb-4">Executive Concierge</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            At Barbados Island Properties, our Executive Concierge service is designed to enhance every moment of your stay — quietly, effortlessly and with attention to the smallest detail.
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-4">
            From the moment you arrive on island to the day of your departure, we ensure your time in Barbados feels relaxed, refined and entirely your own.
          </p>
        </div>
      </section>

      {/* A Personal Welcome */}
      <section className="py-20 container-max">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading mb-6">A Personal Welcome</h2>
          <p className="text-gray-600 text-lg mb-4">
            Every owner and guest is personally welcomed at the residence by a dedicated member of our team.
          </p>
          <p className="text-gray-600 text-lg mb-4">
            We provide a warm introduction to the home, guide you through its features and amenities, and ensure every detail has been carefully prepared in advance. Where applicable, we introduce household staff and remain available should anything further be required.
          </p>
          <p className="text-primary text-lg font-medium italic">
            You arrive to settle in — not to organise.
          </p>
        </div>
      </section>

      {/* A Boutique Concierge Experience */}
      <section className="py-20 section-cream">
        <div className="container-max">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-heading mb-6">A Boutique Concierge Experience</h2>
            <p className="text-gray-600 text-lg mb-8">
              Our service is discreet, responsive and entirely tailored to individual preferences. We can arrange:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {arrangements.map((item) => (
              <div key={item} className="card p-6 text-center">
                <p className="text-dark-slate font-medium">{item}</p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-12">
            <p className="text-gray-600 text-lg">
              Whether planning a celebratory gathering, a family holiday, or a quiet escape, we ensure arrangements are handled seamlessly and professionally.
            </p>
          </div>
        </div>
      </section>

      {/* Private Hospitality */}
      <section className="py-20 container-max">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading mb-6">Private Hospitality, Within Your Home</h2>
          <p className="text-gray-600 text-lg mb-4">
            Our concierge service is entirely relationship-led and personally managed.
          </p>
          <p className="text-gray-600 text-lg mb-4">
            We work closely with trusted, long-standing local partners to deliver five-star service within the privacy of your residence, while preserving comfort, discretion and ease at all times.
          </p>
          <p className="text-gray-600 text-lg mb-8">
            Every arrangement is thoughtfully handled, allowing you to relax and enjoy Barbados exactly as you intended.
          </p>
          <div className="bg-cream rounded-xl p-8 text-center">
            <p className="text-xl font-heading text-dark-slate mb-1">You enjoy the island.</p>
            <p className="text-xl font-heading text-primary">We take care of the details.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 section-cream text-center">
        <div className="container-max">
          <h2 className="mb-4">Experience Our Concierge Service</h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Get in touch to discuss how we can personalise your Barbados experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-lg px-8 py-4 no-underline">
              Get in Touch
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
