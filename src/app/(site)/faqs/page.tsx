import Link from 'next/link'

export const metadata = {
  title: 'FAQs | Barbados Island Properties',
  description: 'Frequently asked questions about buying, investing, and living in Barbados. Clear answers on the real estate market, legal process, costs, and more.',
}

const sections = [
  {
    heading: 'New Buyer & Legal Questions',
    questions: [
      {
        q: 'How does buying in Barbados differ from buying in the UK?',
        a: (
          <>
            <p className="mb-4">This is really important to know…</p>
            <p className="mb-4">
              Barbados is a multi-listing Real Estate system. Any Real Estate Agency on island can list a property if it is for sale and can introduce a client to another agency selling a property on a <strong>CO-BROKER</strong> basis. Agents across the Island work together on many occasions to get the property sold on behalf of the property owner. Therefore there are often two agencies present at property viewings. The advantage with listing a property with exclusive is that it is in our interest to introduce a buyer for your property.
            </p>
            <p className="mb-4">
              The most important thing is that, when you&rsquo;re happy with your real estate agency, you work with the same agency as they can introduce you to all the properties for sale from their direct property listings or listings from other Agencies.
            </p>
            <p className="mb-4">
              It differs from the UK, as Agencies only list properties for sale if they have a selling agreement with the property owner. If another agency lists a property you are interested in then most clients change agencies, in order to buy that property. This is not the case in Barbados. We&rsquo;re a small Island, we learnt that working together can achieve the best results: the property owner gets their property sold, and the buyer purchases the property of their dreams.
            </p>
            <p className="font-medium text-dark-slate">
              Agents Fees in Barbados: Exclusive Listing 4% of purchase price. Non-exclusive listing 2% to each agent &mdash; if one agent introduces the client and the other has the listing, the two agents share the 4% fee between them.
            </p>
          </>
        ),
      },
      {
        q: 'Can I buy property in Barbados if I\'m not a resident?',
        a: (
          <p>
            Yes. Barbados allows non-residents of any nationality to buy and own property. You do not need residency to purchase real estate. For the practical &ldquo;how-to&rdquo; steps and what to prepare before you start searching, see our <Link href="/contact" className="text-primary underline">Purchase Guide</Link>.
          </p>
        ),
      },
      {
        q: 'What about residency status in Barbados — how long can I stay on island?',
        a: (
          <p>
            As a British and Canadian Passport holder you are able to spend up to 6 months in Barbados on any one visit. Should you wish to consider residency or joint residency status, we recommend you discuss this with your lawyer. They will be able to best advise you on the best outcome for your circumstances. There are different visa options should you wish to stay longer in Barbados.
          </p>
        ),
      },
      {
        q: 'What documents do I need to buy a property as a foreigner?',
        a: (
          <>
            <p className="mb-4">Two forms of ID are required to complete the purchase of a property in Barbados &mdash; a Passport and Driving Licence. Your lawyer will ask for the following documentation:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Passport (for you and, if in joint names, your spouse)</li>
              <li>Driving licence</li>
              <li>Utility bills to confirm your home address</li>
              <li>3 months bank statements or a letter of reference from your bank</li>
              <li>Credit card statement to confirm your home address</li>
              <li>Bank documentation (source of funds, income proof, etc.), especially in the luxury segment &mdash; your lawyer will guide you through what is required for due diligence and compliance</li>
            </ul>
          </>
        ),
      },
      {
        q: 'Do I need a Barbados bank account to buy property?',
        a: (
          <p>
            A Barbados bank account is not legally required to buy, but it is strongly recommended for paying taxes, utilities, community fees, and for secure payments at completion. We can assist in providing an appointment with a banker to help set up your banking requirements.
          </p>
        ),
      },
      {
        q: 'Can I own investment property and rent it out?',
        a: (
          <p>
            Yes. Non-residents can own property and rent it out long-term or short-term. If you plan to operate as a holiday rental, make sure the property complies with current rules and has the correct registration/licence where required. Barbados Island Properties can help you with short or medium term rentals and <Link href="/property-management" className="text-primary underline">property management</Link>, so we have this base covered for you.
          </p>
        ),
      },
    ],
  },
  {
    heading: 'Buying Process & Costs',
    questions: [
      {
        q: 'What is the typical process to buy property in Barbados?',
        a: (
          <p>
            Barbados Island Properties will work hard to get the property of your dreams, at the right price. As your appointed Realtor, the typical purchase process includes preparation, viewings, offer, due diligence (legal / urbanistic / technical), private purchase contract, and notary completion. Our Purchase Guide outlines the full step-by-step process and common timelines. <Link href="/contact" className="text-primary underline">Get in touch</Link> to learn more.
          </p>
        ),
      },
      {
        q: 'What are the buying costs in Barbados?',
        a: (
          <p>
            Plan approximately 2&ndash;3% of your purchase value for solicitors&rsquo; costs on top of the net purchase price. Agents&rsquo; fees are paid by the seller and are typically 4%.
          </p>
        ),
      },
      {
        q: 'What are the running costs associated with owning a property in Barbados?',
        a: (
          <>
            <p className="mb-4">Should you be interested in purchasing a property after your second viewing, the next step is to identify the costs and running expenses of the property. We will provide you with a breakdown of the running costs for your new property.</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>Electricity</strong> &mdash; Barbados Light and Power</li>
              <li><strong>Water</strong> &mdash; Barbados Water Authority</li>
              <li><strong>Sewage</strong> &mdash; Generally a septic tank</li>
              <li><strong>Land Tax</strong> &mdash; Once-a-year land tax invoice</li>
              <li><strong>Gated community fees</strong> &mdash; Service charges or sports membership fees</li>
              <li><strong>Housekeeper / Property management</strong> &mdash; To manage the maintenance and rental</li>
            </ul>
          </>
        ),
      },
      {
        q: 'Are there any tax benefits for owning a property in Barbados?',
        a: (
          <p>
            Yes. In Barbados, there currently is no Inheritance Tax or Capital Gains Tax. Always confirm eligibility with a qualified tax lawyer, as government information can change from time to time.
          </p>
        ),
      },
    ],
  },
  {
    heading: 'Mortgage & Financing',
    questions: [
      {
        q: 'Can non-residents get a mortgage in Barbados?',
        a: (
          <p>
            Yes. Barbados banks can provide mortgages to non-residents, with terms depending on borrower profile and bank policy. Our Purchase Guide and Mortgage Calculator provide practical guidance and assumptions commonly used in the market. <Link href="/contact" className="text-primary underline">Contact us</Link> for more details.
          </p>
        ),
      },
      {
        q: 'What is a typical mortgage down payment?',
        a: (
          <p>
            As a general rule, non-resident buyers should plan for a larger down payment than residents. In the luxury segment, expectations can differ by bank, price level, and borrower profile. The bank will always lend based on the lower of purchase price or its own valuation. <Link href="/contact" className="text-primary underline">Get in touch</Link> for guidance specific to your situation.
          </p>
        ),
      },
    ],
  },
  {
    heading: 'Other Useful Questions',
    questions: [
      {
        q: 'Can I start the buying process remotely?',
        a: (
          <p>
            Yes. Remote purchases are technically possible using video tours and a power of attorney, but Barbados Island Properties recommends at least one in-person visit before committing &mdash; especially in the high-end segment.
          </p>
        ),
      },
      {
        q: 'How long does ownership transfer take after making an offer?',
        a: (
          <>
            <p className="mb-4">
              Firstly, an offer is made to purchase your new property with your agent. A Heads of Agreement is set out with buyer, seller, real estate agents and lawyers&rsquo; contact details and circulated to all parties. The lawyers will draw up a purchase agreement for you to sign &mdash; at this time you will need to pay a 10% deposit to your solicitor. If you are not in Barbados to sign the document, you will need to get it witnessed by a Notary in your country.
            </p>
            <p className="mb-4">
              After signing a sales contract, your lawyer will ensure that all the due diligence is in place in order to legally complete on the purchase. In practice, it is common for a purchase to be 2&ndash;3 months from start to finish.
            </p>
            <p>
              It is common practice to sell a property owned by a BVI registered company &mdash; you can also hold properties in sole or joint names. We strongly recommend you get a Will drawn up (with two witness signatures to make it legal in Barbados), so this can be passed onto your children.
            </p>
          </>
        ),
      },
    ],
  },
]

export default function FAQsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0c7cd5] text-white py-20">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-heading mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            About the Barbados Real Estate Market
          </p>
          <p className="text-sm text-blue-200 mt-4">
            Last updated: January 2026. Tax and legal rules may change. Always confirm applicability on a case-by-case basis.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 container-max">
        <p className="text-gray-600 text-lg max-w-3xl mx-auto text-center">
          This FAQ provides clear answers to common questions about buying, investing, and living in Barbados. It primarily draws on Barbados Island Properties&rsquo;s market guides, plus a small number of official Barbadian sources where needed.
        </p>
      </section>

      {/* FAQ Sections */}
      {sections.map((section) => (
        <section key={section.heading} className="pb-16 container-max">
          <h2 className="text-2xl md:text-3xl font-heading mb-8 text-center">{section.heading}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {section.questions.map((item) => (
              <details key={item.q} className="group card p-0 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-gray-50 transition-colors">
                  <h3 className="text-lg font-heading pr-4">{item.q}</h3>
                  <svg
                    className="w-5 h-5 text-primary shrink-0 transition-transform duration-200 group-open:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}

      {/* Additional Resources */}
      <section className="py-16 section-cream">
        <div className="container-max text-center">
          <h2 className="text-2xl md:text-3xl font-heading mb-8">Additional Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/sales" className="card p-6 text-center no-underline hover:shadow-lg transition-shadow">
              <h3 className="font-heading text-lg mb-2 text-dark-slate">Properties For Sale</h3>
              <p className="text-sm text-gray-500">Browse available properties</p>
            </Link>
            <Link href="/holiday-rentals" className="card p-6 text-center no-underline hover:shadow-lg transition-shadow">
              <h3 className="font-heading text-lg mb-2 text-dark-slate">Holiday Rentals</h3>
              <p className="text-sm text-gray-500">Luxury villas and apartments</p>
            </Link>
            <Link href="/property-management" className="card p-6 text-center no-underline hover:shadow-lg transition-shadow">
              <h3 className="font-heading text-lg mb-2 text-dark-slate">Property Management</h3>
              <p className="text-sm text-gray-500">We manage your investment</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 container-max text-center">
        <h2 className="mb-4">Still Have Questions?</h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Our team is here to help with any aspect of buying, selling, or investing in Barbados real estate.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-primary text-lg px-8 py-4 no-underline">
            Contact Our Team
          </Link>
          <Link href="/sales" className="btn-secondary text-lg px-8 py-4 no-underline">
            Browse Properties
          </Link>
        </div>
      </section>
    </div>
  )
}
