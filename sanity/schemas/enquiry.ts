import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'enquiry',
  title: 'Enquiry',
  type: 'document',
  fields: [
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'property',
      title: 'Property',
      type: 'reference',
      to: [{ type: 'property' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'listingType',
      title: 'Listing Type',
      type: 'string',
      options: {
        list: [
          { title: 'Rental', value: 'rental' },
          { title: 'Sale', value: 'sale' },
        ],
      },
      readOnly: true,
    }),
    defineField({
      name: 'dateStart',
      title: 'Check-in Date (Rentals)',
      type: 'date',
    }),
    defineField({
      name: 'dateEnd',
      title: 'Check-out Date (Rentals)',
      type: 'date',
    }),
    defineField({
      name: 'guests',
      title: 'Number of Guests',
      type: 'number',
    }),
    defineField({
      name: 'children',
      title: 'Travelling with Children',
      type: 'boolean',
    }),
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email().required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'assignedAgentEmail',
      title: 'Assigned Agent Email',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Handled', value: 'handled' },
        ],
      },
      initialValue: 'new',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'createdAt',
      property: 'property.title',
    },
    prepare({ title, subtitle, property }) {
      return {
        title: `Enquiry from ${title}`,
        subtitle: `${property} - ${new Date(subtitle).toLocaleDateString()}`,
      }
    },
  },
})
