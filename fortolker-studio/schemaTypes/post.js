export default {
  name: 'post',
  title: 'Blogginnlegg',
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
      name: 'publishedAt',
      title: 'Publiseringsdato',
      type: 'datetime',
      group: 'other',
    },
    {
      name: 'excerpt',
      title: 'Ingress',
      type: 'text',
      rows: 3,
      description: 'Kort sammendrag som vises i blogglisten',
      group: 'norwegian',
    },
    {
      name: 'excerpt_en',
      title: 'Excerpt (EN)',
      type: 'text',
      rows: 3,
      group: 'english',
    },
    {
      name: 'mainImage',
      title: 'Hovedbilde',
      type: 'image',
      options: { hotspot: true },
      group: 'other',
      fields: [
        {
          name: 'alt',
          title: 'Alt-tekst',
          type: 'string',
        },
        {
          name: 'alt_en',
          title: 'Alt text (EN)',
          type: 'string',
        },
      ],
    },
    {
      name: 'author',
      title: 'Forfatter',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'other',
    },
    {
      name: 'categories',
      title: 'Kategorier',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      group: 'other',
    },
    {
      name: 'body',
      title: 'Innhold',
      type: 'array',
      group: 'norwegian',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt-tekst', type: 'string' },
            { name: 'caption', title: 'Bildetekst', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'body_en',
      title: 'Innhold (EN)',
      type: 'array',
      group: 'english',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'norwegian',
      fields: [
        { name: 'metaTitle', title: 'Meta-tittel', type: 'string' },
        { name: 'metaDescription', title: 'Meta-beskrivelse', type: 'text', rows: 2 },
      ],
    },
    {
      name: 'seo_en',
      title: 'SEO (EN)',
      type: 'object',
      group: 'english',
      fields: [
        { name: 'metaTitle', title: 'Meta title', type: 'string' },
        { name: 'metaDescription', title: 'Meta description', type: 'text', rows: 2 },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare({ title, author, media }) {
      return { title, subtitle: author ? `av ${author}` : '', media }
    },
  },
}
