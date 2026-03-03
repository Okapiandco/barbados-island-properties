import Link from 'next/link'

export const metadata = {
  title: 'Contact Us | Barbados Island Properties',
  description: 'Get in touch with our team in Barbados. We are here to help with rentals, sales, property management and concierge services.',
}

const team = [
  {
    name: 'Natalie Heiling',
    role: 'Director — Head of Rentals',
    phones: [
      { label: 'UK', number: '+44 7789 227797' },
      { label: 'Barbados', number: '+1 246 850 5656' },
    ],
    email: 'natalie@barbadosislandproperties.com',
  },
  {
    name: 'Tora Porter',
    role: 'Director',
    phones: [
      { label: 'UK', number: '+44 7973 268231' },
      { label: 'Barbados', number: '+1 246 850 6812' },
    ],
    email: 'tora@barbadosislandproperties.com',
  },
  {
    name: 'Rebecca Pitcher',
    role: 'Director of Sales',
    phones: [
      { label: 'Call', number: '+1 246 256 5004' },
    ],
    email: 'rebecca@barbadosislandproperties.com',
  },
]

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-dark-slate text-white py-20">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-heading mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We would love to hear from you. Reach out to any member of our team directly.
          </p>
        </div>
      </section>

      {/* Team Contact Cards */}
      <section className="py-20 container-max">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="card p-8 text-center">
              {/* Avatar initial */}
              <div className="w-20 h-20 rounded-full bg-[#0c7cd5] text-white flex items-center justify-center text-3xl font-heading mx-auto mb-4">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-heading mb-1">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-6">{member.role}</p>

              {/* Phone numbers */}
              <div className="space-y-2 mb-6">
                {member.phones.map((phone) => (
                  <div key={phone.number} className="flex items-center justify-center gap-2 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <a href={`tel:${phone.number.replace(/\s/g, '')}`} className="text-gray-600 hover:text-primary no-underline">
                      {phone.number} <span className="text-gray-400">({phone.label})</span>
                    </a>
                  </div>
                ))}
              </div>

              {/* Email */}
              <a
                href={`mailto:${member.email}`}
                className="btn-primary block text-center w-full no-underline text-sm"
              >
                {member.email}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* General Enquiry + Social */}
      <section className="py-20 section-cream">
        <div className="container-max text-center">
          <h2 className="mb-4">General Enquiries</h2>
          <p className="text-gray-500 mb-6 max-w-lg mx-auto">
            For general questions, you can reach us at:
          </p>
          <a
            href="mailto:info@barbadosislandproperties.com"
            className="text-xl text-primary font-medium hover:underline"
          >
            info@barbadosislandproperties.com
          </a>

          {/* Social */}
          <div className="mt-10">
            <p className="text-sm text-gray-500 mb-3">Follow us</p>
            <div className="flex justify-center">
              <a
                href="https://www.facebook.com/share/189zqTfzdu/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#0c7cd5] transition-colors"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
