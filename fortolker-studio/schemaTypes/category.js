export default {
  name: 'category',
  title: 'Kategori',
  type: 'document',
  groups: [
    { name: 'norwegian', title: 'Norsk' },
    { name: 'english', title: 'English' },
    { name: 'other', title: 'Annet' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'norwegian',
    },
    {
      name: 'title_en',
      title: 'Title (EN)',
      type: 'string',
      group: 'english',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
      group: 'other',
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      rows: 3,
      group: 'norwegian',
    },
    {
      name: 'description_en',
      title: 'Description (EN)',
      type: 'text',
      rows: 3,
      group: 'english',
    },
  ],
}
