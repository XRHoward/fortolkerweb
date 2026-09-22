export default {
  name: 'author',
  title: 'Forfatter',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    },
    {
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'position',
      title: 'Stilling',
      type: 'string',
    },
    {
      name: 'position_en',
      title: 'Position (EN)',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    },
    {
      name: 'bio_en',
      title: 'Bio (EN)',
      type: 'text',
      rows: 4,
    },
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
}
