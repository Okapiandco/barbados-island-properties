import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({
      name: 'propertyId',
      title: 'Property ID (for CSV sync)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Unique identifier used for bulk imports. Cannot be changed.',
    }),
    defineField({
      name: 'title',
      title: 'Property Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'listingType',
      title: 'Listing Type',
      type: 'string',
      options: {
        list: [
          { title: 'Holiday Rental', value: 'rental' },
          { title: 'For Sale', value: 'sale' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Draft', value: 'draft' },
          { title: 'For Sale', value: 'for-sale' },
          { title: 'Under Offer', value: 'under-offer' },
          { title: 'Sold', value: 'sold' },
        ],
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: 'location' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collection' }] }],
    }),
    defineField({
      name: 'agent',
      title: 'Assigned Agent',
      type: 'reference',
      to: [{ type: 'agent' }],
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'string',
      description: 'One-line summary of the property',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo URL for property video',
    }),
    defineField({
      name: 'map',
      title: 'Map Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'lat',
          title: 'Latitude',
          type: 'number',
        }),
        defineField({
          name: 'lng',
          title: 'Longitude',
          type: 'number',
        }),
        defineField({
          name: 'mapDisplayMode',
          title: 'Map Display',
          type: 'string',
          options: {
            list: [
              { title: 'Exact Location', value: 'exact' },
              { title: 'Approximate (Randomised)', value: 'approximate' },
              { title: 'Hidden', value: 'hidden' },
            ],
          },
          initialValue: 'exact',
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Property',
      type: 'boolean',
      initialValue: false,
    }),

    // RENTAL-ONLY FIELDS
    defineField({
      name: 'sleeps',
      title: 'Sleeps (Rentals)',
      type: 'number',
      hidden: ({ parent }) => parent?.listingType !== 'rental',
    }),
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      validation: (Rule) =>
        Rule.min(0).warning('Bedrooms should be 0 or more'),
    }),
    defineField({
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      validation: (Rule) =>
        Rule.min(0).warning('Bathrooms should be 0 or more'),
    }),
    defineField({
      name: 'minStayNights',
      title: 'Minimum Stay (nights, Rentals)',
      type: 'number',
      initialValue: 7,
      hidden: ({ parent }) => parent?.listingType !== 'rental',
    }),
    defineField({
      name: 'travellingWithChildren',
      title: 'Suitable for Children (Rentals)',
      type: 'boolean',
      hidden: ({ parent }) => parent?.listingType !== 'rental',
    }),
    defineField({
      name: 'propertyCategory',
      title: 'Property Category',
      type: 'string',
      options: {
        list: [
          { title: 'Villa', value: 'villa' },
          { title: 'Apartment', value: 'apartment' },
          { title: 'Townhouse', value: 'townhouse' },
          { title: 'Land', value: 'land' },
          { title: 'Commercial', value: 'commercial' },
        ],
      },
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities / Features',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'amenity' }] }],
    }),
    defineField({
      name: 'features',
      title: 'Property Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Air conditioned, Ensuite bathrooms, Sea view',
    }),
    defineField({
      name: 'highlights',
      title: 'What We Like',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points for the "What We Like" section',
    }),
    defineField({
      name: 'overview',
      title: 'Residence Overview',
      type: 'text',
      description: 'Detailed residence overview text',
    }),
    defineField({
      name: 'lifestyleFeatures',
      title: 'Lifestyle Features',
      type: 'text',
      description: 'Description of lifestyle and community features',
    }),
    defineField({
      name: 'investmentFeatures',
      title: 'Investment Features',
      type: 'text',
      description: 'Investment appeal and rental potential',
    }),
    defineField({
      name: 'staffing',
      title: 'Staffing Available (Rentals)',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ parent }) => parent?.listingType !== 'rental',
    }),
    defineField({
      name: 'rates',
      title: 'Seasonal Rates (Rentals)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'season', title: 'Season / Date Range', type: 'string' }),
            defineField({ name: 'nightlyRate', title: 'Nightly Rate (USD)', type: 'number' }),
            defineField({ name: 'minStay', title: 'Minimum Stay', type: 'string', description: 'e.g. "5 nights", "7 nights"' }),
          ],
          preview: {
            select: { title: 'season', subtitle: 'nightlyRate' },
            prepare({ title, subtitle }) {
              return { title, subtitle: subtitle ? `$${subtitle}/night` : '' }
            },
          },
        },
      ],
      hidden: ({ parent }) => parent?.listingType !== 'rental',
    }),
    defineField({
      name: 'ratesNote',
      title: 'Rates Note',
      type: 'text',
      description: 'Additional pricing info (tax, Christmas terms, checkout policy etc.)',
      hidden: ({ parent }) => parent?.listingType !== 'rental',
    }),
    defineField({
      name: 'sleepingArrangements',
      title: 'Sleeping Arrangements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. "Master Bedroom 1 - King bed", "Bedroom 3 - Twin beds"',
      hidden: ({ parent }) => parent?.listingType !== 'rental',
    }),
    defineField({
      name: 'externalAmenities',
      title: 'External / Outdoor Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Private pool, covered pavilion, beach club access',
    }),
    defineField({
      name: 'icalUrl',
      title: 'iCal Availability URL',
      type: 'url',
      description: 'iCal feed URL for live availability calendar',
      hidden: ({ parent }) => parent?.listingType !== 'rental',
    }),

    // SALES-ONLY FIELDS
    defineField({
      name: 'floorAreaSqFt',
      title: 'Floor Area (sq ft, Sales)',
      type: 'number',
      hidden: ({ parent }) => parent?.listingType !== 'sale',
    }),
    defineField({
      name: 'landAreaSqFt',
      title: 'Land Area (sq ft, Sales)',
      type: 'number',
      hidden: ({ parent }) => parent?.listingType !== 'sale',
    }),
    defineField({
      name: 'priceUsd',
      title: 'Price (USD, Sales)',
      type: 'number',
      hidden: ({ parent }) => parent?.listingType !== 'sale',
    }),
    defineField({
      name: 'priceLabel',
      title: 'Price Label',
      type: 'string',
      description: 'e.g., "Upon Enquiry" or "Price On Application"',
      hidden: ({ parent }) => parent?.listingType !== 'sale',
    }),
    defineField({
      name: 'showConvertedPrices',
      title: 'Show Converted Prices (GBP, CAD)',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => parent?.listingType !== 'sale',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
        }),
        defineField({
          name: 'ogImage',
          title: 'OG Image',
          type: 'image',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      listingType: 'listingType',
      status: 'status',
    },
    prepare({ title, media, listingType, status }) {
      return {
        title,
        media,
        subtitle: `${listingType?.charAt(0)?.toUpperCase() + listingType?.slice(1) || 'Unknown'} - ${status}`,
      }
    },
  },
})
