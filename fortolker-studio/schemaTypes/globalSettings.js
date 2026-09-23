export default {
  name: 'globalSettings',
  title: 'Globale innstillinger',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Nettstedsnavn',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'contactEmail',
      title: 'Kontakt-e-post',
      type: 'string',
    },
    {
      name: 'contactPhone',
      title: 'Telefonnummer',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Adresse',
      type: 'text',
      rows: 3,
    },
    {
      name: 'socialMedia',
      title: 'Sosiale medier',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Plattform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Globale innstillinger' }
    },
  },
}
