# Barbados Island Properties - Developer Guide

## Quick Start

This is a **production-ready MVP** for a luxury real estate website. It's built with Next.js, TypeScript, Sanity CMS, and Tailwind CSS.

### What's Included
- ✅ Homepage with hero, featured properties, agents section
- ✅ Holiday rentals listing & property detail pages
- ✅ Sales listing & property detail pages
- ✅ Enquiry form system (email + WhatsApp)
- ✅ Multi-currency display (USD, GBP, CAD)
- ✅ CSV bulk import tool for properties
- ✅ Sanity CMS for easy content management
- ✅ SEO-friendly structure
- ✅ Luxury styling (cream, subtle shadows, brand colours)

### What's NOT in MVP (Add Later)
- iCal calendar sync (use manual date selector for now)
- Advanced availability calendar
- Blog system
- Agent portfolio pages
- Location/collection indexing pages

---

## Prerequisites

1. **Node.js 18+** - Download from https://nodejs.org/
2. **npm or yarn** - Comes with Node.js
3. **Git** - https://git-scm.com/
4. **Sanity account** - Free tier at https://www.sanity.io/
5. **Resend account** - Email service at https://resend.com/ (free tier)
6. **Google Maps API key** (optional for now)

---

## Step 1: Set Up Sanity CMS (10 mins)

### A. Create Sanity Project

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Create new Sanity project
sanity init

# When prompted:
# - Choose "Structured content" as your project type
# - Name: "barbados-island-properties"
# - Dataset: "production"
# - Choose "Clean" template

cd barbados-island-properties
```

### B. Get Your Credentials

After creating the project, Sanity will show you:
- **Project ID** - Copy this
- **Dataset** - Should be "production"

You'll also need an **API Token** for the frontend:
1. Go to https://manage.sanity.io
2. Select your project
3. Go to Settings > API > Tokens
4. Create a new token called "frontend" with read permissions
5. Copy the token

---

## Step 2: Clone & Configure This Codebase

### A. Download the Codebase

1. Download all files from the outputs folder
2. Create a new folder: `mkdir barbados-island-properties && cd barbados-island-properties`
3. Unzip all files into this folder

### B. Install Dependencies

```bash
npm install
```

### C. Configure Environment Variables

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and fill in:
NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_PROJECT_ID_HERE
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=YOUR_API_TOKEN_HERE
RESEND_API_KEY=YOUR_RESEND_API_KEY_HERE
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_MAPS_KEY_HERE
```

### D. Copy Sanity Schemas

```bash
# Copy the sanity/ folder from the downloaded files into your Sanity project
# If you used 'sanity init' above:
cp -r sanity/* path/to/your/sanity/project/sanity/
```

---

## Step 3: Seed Initial Data in Sanity

### A. Start the Development Server

```bash
npm run dev
```

Then open http://localhost:3000/studio to access Sanity Studio.

### B. Add Initial Data

In Sanity Studio, create:

1. **Site Settings** (one document only)
   - Generic enquiries email: `info@barbadosislandproperties.com`
   - Office WhatsApp: `+1-246-XXXXXXX`
   - Default currency: USD
   - FX mode: manual
   - Manual rates: USD to GBP = 0.79, USD to CAD = 1.36

2. **Agents** (create these 3)
   - **Tora Porter**
     - Email: tora@barbadosislandproperties.com
     - Specialties: Sales
     - Featured: Yes
     - Order: 1
   
   - **Natalie Heiling**
     - Email: natalie@barbadosislandproperties.com
     - Specialties: Rentals
     - Featured: Yes
     - Order: 2
   
   - **Rebecca Pitcher**
     - Email: rebecca@barbadosislandproperties.com
     - Specialties: Sales
     - Featured: Yes
     - Order: 3

3. **Locations** (create these 7)
   - Westland Heights, Mullins, Sugar Hill, Prospect, Vuemont, Casuarina, Gibbs
   - (Add region and order for each)

4. **Collections** (examples)
   - Beachfront
   - Golf Community
   - Luxury

5. **Amenities** (create these, pick icons)
   - Pool, Beach, Golf, Tennis, BBQ, Bedroom, Bathroom

6. **First Property** (1 example - rental)
   - propertyId: `TEST-RENTAL-001`
   - Title: "Luxury Villa in Westmoreland"
   - Listing Type: Rental
   - Status: Active
   - Location: Westland Heights
   - Bedrooms: 4, Bathrooms: 3, Sleeps: 8
   - Min Stay: 7 nights
   - Property Category: Villa
   - (Fill in hero image, gallery, description)

---

## Step 4: Test Locally

```bash
npm run dev
```

Visit:
- **Homepage**: http://localhost:3000
- **Rentals**: http://localhost:3000/holiday-rentals
- **Sales**: http://localhost:3000/sales
- **Sanity Studio**: http://localhost:3000/studio

---

## Step 5: Bulk Import Properties (CSV)

### A. Prepare CSV Files

Use the templates in `/src/lib/csv-parser.ts`:

**rentals.csv** (for holiday rentals):
```
propertyId,title,listingType,status,locationName,collectionNames,agentName,summary,bedrooms,bathrooms,sleeps,minStayNights,propertyCategory,amenityNames,lat,lng
RW-001,Royal Villa at Westmoreland,rental,active,Westland Heights,Golf Community,Natalie Heiling,Luxury villa with pool,4,3,8,7,villa,Pool,Beach,Golf,13.1234,-59.5432
RW-002,Beachfront Apartment,rental,active,Mullins,Beachfront,Natalie Heiling,Modern apartment steps from beach,3,2,6,7,apartment,Pool,Beach,13.1256,-59.5401
```

**sales.csv** (for properties for sale):
```
propertyId,title,listingType,status,locationName,collectionNames,agentName,summary,bedrooms,bathrooms,propertyCategory,amenityNames,priceUsd,priceLabel,floorAreaSqFt,landAreaSqFt,lat,lng
RS-001,Beachfront Villa,sale,for-sale,Sugar Hill,Beachfront,Rebecca Pitcher,Premium property,5,4,villa,Beach,Pool,Tennis,2500000,,5000,15000,13.1567,-59.5123
```

### B. Upload via Admin Tool

1. Go to http://localhost:3000/admin/import
2. Select rental or sales CSV
3. Review the preview
4. Click "Import"
5. Check Sanity Studio to verify properties were created

---

## Step 6: Deploy to Vercel

### A. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Barbados Island Properties MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/barbados-island-properties.git
git push -u origin main
```

### B. Deploy to Vercel

1. Go to https://vercel.com
2. Sign up / log in with GitHub
3. Click "New Project"
4. Select your GitHub repo
5. Configure environment variables (same as .env.local)
6. Click "Deploy"
7. Your site is live!

---

## File Structure Explanation

```
├── sanity/
│   └── schemas/           # Your CMS data structure
│       ├── property.ts    # Unified for rental + sale
│       ├── agent.ts
│       ├── location.ts
│       ├── collection.ts
│       ├── amenity.ts
│       ├── enquiry.ts
│       └── siteSettings.ts
│
├── src/
│   ├── app/
│   │   ├── (site)/        # Main site pages
│   │   │   ├── holiday-rentals/
│   │   │   ├── sales/
│   │   │   ├── about/
│   │   │   ├── concierge/
│   │   │   └── contact/
│   │   ├── api/           # Backend routes
│   │   │   ├── enquiry/   # Form submission
│   │   │   └── import-properties/  # CSV import
│   │   └── admin/         # Admin tools
│   │       └── import/    # CSV import UI
│   │
│   ├── components/        # React components
│   │   ├── Header.tsx
│   │   ├── PropertyCard.tsx
│   │   ├── EnquiryForm.tsx
│   │   └── ...
│   │
│   ├── lib/
│   │   ├── sanity.ts      # CMS client
│   │   ├── types.ts       # TypeScript interfaces
│   │   ├── currency.ts    # Price conversion
│   │   └── csv-parser.ts  # CSV import logic
│   │
│   └── styles/
│       └── globals.css    # Tailwind + brand styles
```

---

## Common Tasks

### Add a New Property

1. Go to http://localhost:3000/studio
2. Click "Property"
3. Click "Create"
4. Fill in all fields
5. Publish
6. It appears on the listings pages immediately

### Bulk Import 30 Properties

1. Prepare rentals.csv with 30 rows
2. Go to http://localhost:3000/admin/import
3. Upload CSV
4. Review preview
5. Click "Import"
6. All 30 appear in Sanity and on site

### Change Hero Video

1. Go to Sanity Studio
2. Click "Site Settings"
3. Paste YouTube/Vimeo URL in "Hero Video URL"
4. Save
5. Homepage updates

### Change Currency Rates

1. Go to Sanity Studio
2. Click "Site Settings"
3. Edit "Manual Exchange Rates"
4. Save
5. All prices update across the site

### Add New Agent

1. Go to Sanity Studio
2. Click "Agent"
3. Click "Create"
4. Fill name, email, WhatsApp, photo, bio
5. Mark "Featured" if you want on homepage
6. Publish

### Add New Location

1. Go to Sanity Studio
2. Click "Location"
3. Click "Create"
4. Fill name (e.g., "Westland Heights"), region, parish
5. Set order (for filter list)
6. Publish

---

## Styling & Branding

All colours, fonts, and spacing are in `tailwind.config.ts`:

- **Primary**: `#2196F3` (blue)
- **Accent**: `#51ADF6` (light blue)
- **Panel Grey**: `#E6E6E6`
- **Cream**: `#F5F3F0`
- **Heading Font**: OptimalTStd Medium (falls back to Georgia)
- **Body Font**: Avenir (falls back to Trebuchet MS)

To change any of these, edit `tailwind.config.ts` and redeploy.

---

## Troubleshooting

### Properties Don't Show on Listing Page
- Check Sanity: Is the property status "active" (rental) or "for-sale" (sale)?
- Check the query in `src/lib/sanity.ts`
- Clear cache: Delete `.next/` folder and restart dev server

### CSV Import Shows Errors
- Make sure headers match exactly (propertyId, title, etc.)
- Ensure locationName exists in Sanity
- Check that listingType is "rental" or "sale" (lowercase)

### Emails Not Sending
- Check Resend account: Is API key valid?
- Check environment variable: RESEND_API_KEY
- Check Sanity: Is genericEnquiriesEmail set?

### Maps Not Showing
- Google Maps API key needed
- Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local
- Check Sanity property: Is mapDisplayMode "hidden"?

---

## Next Steps (After MVP Launch)

1. **iCal Sync** - Connect to external booking systems
2. **Blog System** - Add Barbados lifestyle content
3. **Agent Portfolios** - Dedicated pages per agent
4. **Advanced Calendar** - Blocked dates, min stay enforcement
5. **Location Pages** - /sales/location/[slug] for SEO
6. **Testimonials** - Add client reviews
7. **Analytics** - Google Analytics, form tracking
8. **Database** - Move enquiries to proper DB (not just emails)

---

## Support & Questions

- **Sanity Docs**: https://www.sanity.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Resend Docs**: https://resend.com/docs

Good luck! 🚀
