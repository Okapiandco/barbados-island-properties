import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
    }),
    defineField({
      name: 'genericEnquiriesEmail',
      title: 'Generic Enquiries Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'officeWhatsappNumber',
      title: 'Office WhatsApp Number',
      type: 'string',
      description: 'Format: +1-246-XXXXXXX',
    }),
    defineField({
      name: 'defaultCurrency',
      title: 'Default Currency',
      type: 'string',
      options: {
        list: ['USD', 'GBP', 'CAD'],
      },
      initialValue: 'USD',
    }),
    defineField({
      name: 'fxMode',
      title: 'Exchange Rate Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Manual (Fixed Rates)', value: 'manual' },
          { title: 'API Provider (Coming Soon)', value: 'provider' },
        ],
      },
      initialValue: 'manual',
    }),
    defineField({
      name: 'manualRates',
      title: 'Manual Exchange Rates (USD base)',
      type: 'object',
      fields: [
        defineField({
          name: 'usdToGbp',
          title: 'USD to GBP',
          type: 'number',
        }),
        defineField({
          name: 'usdToCad',
          title: 'USD to CAD',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Video URL',
      type: 'url',
      description: 'Full video URL for homepage hero',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        }),
      ],
    }),
  ],
})
