import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Property Management | Barbados Island Properties',
  description: 'Professional property management services in Barbados. We take care of your investment so you can enjoy the returns.',
}

const services = [
  {
    title: 'Rental Management',
    description: 'We handle everything from guest enquiries and bookings to check-in, housekeeping, and maintenance. Our team ensures your property is presented to the highest standard, maximising occupancy and rental income.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Maintenance & Upkeep',
    description: 'Regular inspections, preventative maintenance, garden care, pool servicing, and emergency repairs. We keep your property in pristine condition year-round with our trusted network of local contractors.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: 'Financial Reporting',
    description: 'Transparent monthly statements with detailed income and expenditure reports. We manage all rental payments, utility bills, insurance, and local taxes on your behalf.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Guest Experience',
    description: 'From airport transfers and welcome packs to restaurant reservations and activity bookings. We provide a seamless, luxury guest experience that drives repeat bookings and five-star reviews.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: 'Marketing & Listings',
    description: 'Professional photography, compelling property descriptions, and listings across premium platforms. We position your property to attract the right guests at the best rates.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: 'Compliance & Insurance',
    description: 'We ensure your property meets all local regulations, licensing requirements, and health and safety standards. We also coordinate comprehensive insurance coverage for your peace of mind.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
]

const steps = [
  { number: '01', title: 'Initial Consultation', description: 'We visit your property, discuss your goals, and tailor a management plan to suit your needs.' },
  { number: '02', title: 'Property Onboarding', description: 'Professional photography, inventory, and listing setup across all channels.' },
  { number: '03', title: 'Active Management', description: 'We handle day-to-day operations, guest communications, and maintenance.' },
  { number: '04', title: 'Regular Reporting', description: 'Monthly statements and quarterly reviews to keep you informed and in control.' },
]

export default function PropertyManagementPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white py-32 overflow-hidden">
        <Image
          src="/Images/Sales Properties/Sugar Cane Ridge/Sugar Cane Ridge 9 Royal Westmoreland - Swimming Pool .jpg"
          alt="Luxury property pool in Barbados"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container-max text-center">
          <h1 className="text-4xl md:text-5xl font-heading mb-4">Property Management</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            We take care of your Barbados property so you can enjoy the returns. From rental management to maintenance, we handle everything.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 container-max">
        <h2 className="text-center mb-4">Our Services</h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
          Comprehensive property management tailored to luxury Barbados real estate
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="card p-8">
              <div className="text-primary mb-4">{service.icon}</div>
              <h3 className="text-xl font-heading mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 section-cream">
        <div className="container-max">
          <h2 className="text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            A simple, transparent process from start to finish
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <span className="text-5xl font-heading text-primary/20">{step.number}</span>
                <h3 className="text-lg font-heading mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 container-max text-center">
        <h2 className="mb-4">Ready to Discuss Your Property?</h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Whether you already own a property in Barbados or are considering an investment, we would love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-primary text-lg px-8 py-4 no-underline">
            Get in Touch
          </Link>
          <Link href="/holiday-rentals" className="btn-secondary text-lg px-8 py-4 no-underline">
            View Our Portfolio
          </Link>
        </div>
      </section>
    </div>
  )
}
