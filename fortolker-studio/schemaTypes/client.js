export default {
  name: 'client',
  title: 'Kunde',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Kundenavn',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },
    {
      name: 'url',
      title: 'Nettside',
      type: 'url',
    },
    {
      name: 'order',
      title: 'Rekkefølge',
      type: 'number',
    },
  ],
  preview: {
    select: { title: 'name', media: 'logo' },
  },
  orderings: [
    {
      title: 'Rekkefølge',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}
