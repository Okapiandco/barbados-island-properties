# Remaining Components & Pages to Implement

This guide covers the remaining React components and pages needed for the full MVP. 

## Copy-Ready Component Templates

### 1. Header Component (`src/components/Header.tsx`)
```typescript
// Navigation bar with logo, nav links, currency switcher
// Sticky header with white background
// Mobile hamburger menu (basic - can enhance later)
// Currency selector dropdown (USD/GBP/CAD)
```

### 2. Footer Component (`src/components/Footer.tsx`)
```typescript
// Footer with shell watermark
// Social links
// Quick links
// Contact info
// Copyright
```

### 3. PropertyCard Component (`src/components/PropertyCard.tsx`)
```typescript
// Card showing hero image
// Title, location, beds/baths icons
// Price (if sale) or "From £X per night" (if rental)
// Quick amenities row
// Hover: scale up, shadow increase
```

### 4. RefinementPanel Component (`src/components/RefinementPanel.tsx`)
```typescript
// Sticky left panel on listing pages
// Filters for:
//   - Rental: location, collection, category, guests, bedrooms, amenities
//   - Sales: location, collection, category, beds, baths, price range, amenities
// State management with URL query params
// "Apply Filters" button
```

### 5. EnquiryForm Component (`src/components/EnquiryForm.tsx`)
```typescript
// Form modal/inline on property detail
// Fields: name, email, phone, message
// For rentals: prefilled check-in/check-out dates
// Submit handler: POST to /api/enquiry
// Success message
// Error handling
```

### 6. CurrencySwitcher Component (`src/components/CurrencySwitcher.tsx`)
```typescript
// Dropdown or pill buttons: USD | GBP | CAD
// Store selection in localStorage
// Trigger price refresh across page
```

### 7. DateRangePicker Component (`src/components/DateRangePicker.tsx`)
```typescript
// For rentals: simple check-in/check-out pickers
// No calendar sync needed for MVP
// Just date inputs or simple calendar UI
// Enforce min stay nights validation
```

### 8. AmenityIcon Component (`src/components/AmenityIcon.tsx`)
```typescript
// Render SVG icon based on iconKey (pool, beach, golf, etc.)
// Used in property cards, detail pages, filter toggles
```

### 9. PropertyGallery Component (`src/components/PropertyGallery.tsx`)
```typescript
// Image carousel/gallery
// Support video slide if videoUrl exists
// Thumbnail navigation
// Full-screen lightbox option
```

### 10. GoogleMap Component (`src/components/GoogleMap.tsx`)
```typescript
// Embed Google Maps
// Only render if mapDisplayMode != 'hidden'
// If approximate: apply small random offset
// Single marker on property location
```

## Page Templates

### Homepage (`src/app/page.tsx`)
```typescript
// Hero section with video background
// Transparent overlay with search bar (horizontal)
// "View all rentals" / "View all sales" CTAs
// Featured properties grid (6 cards)
// Collections showcase
// Agent section with featured agents
// Concierge teaser section
// Blog/lifestyle preview
```

### Holiday Rentals Listing (`src/app/(site)/holiday-rentals/page.tsx`)
```typescript
// Header: "Holiday Rentals in Barbados"
// Two-column layout:
//   - Left: Sticky RefinementPanel
//   - Right: Property cards grid (3 cols on desktop)
// Filters affect ?location=slug&collection=slug etc.
// Load properties from query
```

### Holiday Rentals Detail (`src/app/(site)/holiday-rentals/[slug]/page.tsx`)
```typescript
// Hero image + gallery + video
// Title, location breadcrumb
// Two-column:
//   - Left: Description, map, location link
//   - Right: Key facts (beds/baths/sleeps/min stay), amenities grid, staffing, price, enquiry form
// Date range picker
// EnquiryForm at bottom
// Related properties carousel
```

### Sales Listing (`src/app/(site)/sales/page.tsx`)
```typescript
// Similar to rentals but for sales
// Filters: location, collection, beds, baths, price range
// Price display with currency conversion
// No date picker
```

### Sales Detail (`src/app/(site)/sales/[slug]/page.tsx`)
```typescript
// Similar to rental detail
// Price prominent (with GBP/CAD equivalents)
// No availability calendar
// "Schedule Viewing" instead of "Check Availability"
```

### Static Pages

**About** (`src/app/(site)/about/page.tsx`)
- Company story from documents
- Team member bios
- Agent profiles with images

**Concierge** (`src/app/(site)/concierge/page.tsx`)
- Hero image
- Services list (from Executive_Concierge_Services doc)
- CTA buttons

**Property Management** (`src/app/(site)/property-management/page.tsx`)
- Services description
- Process steps
- Testimonials placeholder

**Contact** (`src/app/(site)/contact/page.tsx`)
- Contact form
- Office info
- WhatsApp CTA
- Map

## API Routes

### POST /api/enquiry
```typescript
// Accept form data
// Validate with Zod
// Send email to:
//   - Assigned agent email (from property.agent)
//   - Generic enquiries email (from siteSettings)
// Save enquiry record to Sanity
// Return success/error
```

### POST /api/import-properties
```typescript
// Accept CSV file upload
// Parse with csv-parser.ts
// For each row:
//   - Validate
//   - Lookup location/collection/agent by name
//   - Create/update property in Sanity
// Return report: created X, updated Y, failed Z
```

## Implementation Order

1. Create Header + Footer (used on all pages)
2. Create PropertyCard (reused everywhere)
3. Create Homepage
4. Create Listing pages (rentals + sales)
5. Create Property detail pages
6. Create EnquiryForm + API route
7. Create Admin CSV import
8. Create static pages (About, Concierge, etc.)
9. Style & refine
10. Deploy

## Key Patterns

### Getting Data from Sanity
```typescript
import { client } from '@/lib/sanity'
import { rentalPropertiesQuery } from '@/lib/sanity'

export default async function RentalsPage() {
  const properties = await client.fetch(rentalPropertiesQuery)
  
  return (
    <div>
      {properties.map(prop => <PropertyCard key={prop._id} property={prop} />)}
    </div>
  )
}
```

### URL Query Params (Filters)
```typescript
// From URL: ?location=westland-heights&collection=beachfront&minPrice=500000

const filters = {
  location: searchParams.get('location'),
  collection: searchParams.get('collection'),
  minPrice: searchParams.get('minPrice'),
}

// Build GROQ query based on filters...
```

### Currency Display
```typescript
import { formatPrice, getPriceInCurrency } from '@/lib/currency'

// In component:
const currency = localStorage.getItem('currency') || 'USD'
const priceInCurrency = getPriceInCurrency(property.priceUsd, currency)
const formatted = formatPrice(priceInCurrency, currency)

// Render: £2.1M or $2.9M or CA$3.4M
```

### WhatsApp Links
```typescript
import { generateWhatsAppLink, createEnquiryMessage } from '@/lib/whatsapp'

const message = createEnquiryMessage(
  property.title,
  `https://yoursite.com/sales/${property.slug}`,
  '2024-03-01',
  '2024-03-08',
  4 // guests
)

const whatsappUrl = generateWhatsAppLink(agent.whatsappNumber, message)

// Render: <a href={whatsappUrl}>Chat on WhatsApp</a>
```

This is the remaining work. The above files (schemas, config, lib) are production-ready. These components need careful styling per the design brief (luxury, spacious, minimal).

