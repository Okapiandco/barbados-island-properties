import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'amenity',
  title: 'Amenity / Feature',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconKey',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Bedroom', value: 'bedroom' },
          { title: 'Bathroom', value: 'bathroom' },
          { title: 'Pool', value: 'pool' },
          { title: 'Beach', value: 'beach' },
          { title: 'Golf', value: 'golf' },
          { title: 'Tennis', value: 'tennis' },
          { title: 'BBQ', value: 'bbq' },
          { title: 'Security', value: 'security' },
          { title: 'Clubhouse', value: 'clubhouse' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Gym / Fitness', value: 'gym' },
          { title: 'Hiking', value: 'hiking' },
          { title: 'Parking', value: 'parking' },
          { title: 'Air Conditioning', value: 'ac' },
          { title: 'Kitchen', value: 'kitchen' },
          { title: 'Furnished', value: 'furnished' },
          { title: 'Sea View', value: 'seaview' },
          { title: 'Garden', value: 'garden' },
          { title: 'Padel', value: 'padel' },
          { title: 'Driving Range', value: 'driving-range' },
        ],
      },
    }),
    defineField({
      name: 'type',
      title: 'Available for',
      type: 'string',
      options: {
        list: [
          { title: 'Rentals Only', value: 'rental' },
          { title: 'Sales Only', value: 'sale' },
          { title: 'Both', value: 'both' },
        ],
      },
      initialValue: 'both',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'iconKey',
    },
  },
})
