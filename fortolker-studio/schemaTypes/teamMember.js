export default {
  name: 'teamMember',
  title: 'Teammedlem',
  type: 'document',
  groups: [
    { name: 'norwegian', title: 'Norsk' },
    { name: 'english', title: 'English' },
    { name: 'other', title: 'Annet' },
  ],
  fields: [
    {
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'other',
    },
    {
      name: 'position',
      title: 'Stilling',
      type: 'string',
      group: 'norwegian',
    },
    {
      name: 'position_en',
      title: 'Position (EN)',
      type: 'string',
      group: 'english',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      group: 'norwegian',
    },
    {
      name: 'bio_en',
      title: 'Bio (EN)',
      type: 'text',
      rows: 4,
      group: 'english',
    },
    {
      name: 'email',
      title: 'E-post',
      type: 'string',
      group: 'other',
    },
    {
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: { hotspot: true },
      group: 'other',
    },
    {
      name: 'socialMedia',
      title: 'Sosiale medier',
      type: 'array',
      group: 'other',
      of: [{
        type: 'object',
        fields: [
          { name: 'platform', title: 'Platform', type: 'string' },
          { name: 'url', title: 'URL', type: 'url' },
        ],
      }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'position', media: 'image' },
  },
}
