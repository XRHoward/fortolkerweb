export default {
  name: 'aboutPage',
  title: 'Om oss',
  type: 'document',
  groups: [
    { name: 'norwegian', title: 'Norsk' },
    { name: 'english', title: 'English' },
    { name: 'other', title: 'Annet' },
  ],
  fields: [
    { name: 'heroHeading', title: 'Hero-overskrift', type: 'string', group: 'norwegian' },
    { name: 'heroHeading_en', title: 'Hero heading (EN)', type: 'string', group: 'english' },
    { name: 'heroText', title: 'Hero-tekst', type: 'text', rows: 3, group: 'norwegian' },
    { name: 'heroText_en', title: 'Hero text (EN)', type: 'text', rows: 3, group: 'english' },
    { name: 'historyHeading', title: 'Historikk-overskrift', type: 'string', group: 'norwegian' },
    { name: 'historyHeading_en', title: 'History heading (EN)', type: 'string', group: 'english' },
    {
      name: 'historyText',
      title: 'Historikk-tekst',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'norwegian',
    },
    {
      name: 'historyText_en',
      title: 'History text (EN)',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'english',
    },
    { name: 'valuesHeading', title: 'Verdier-overskrift', type: 'string', group: 'norwegian' },
    { name: 'valuesHeading_en', title: 'Values heading (EN)', type: 'string', group: 'english' },
    {
      name: 'values',
      title: 'Verdier',
      type: 'array',
      group: 'norwegian',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Tittel', type: 'string' },
          { name: 'description', title: 'Beskrivelse', type: 'text' },
        ],
      }],
    },
    {
      name: 'values_en',
      title: 'Values (EN)',
      type: 'array',
      group: 'english',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ],
      }],
    },
    { name: 'title', title: 'Sidetittel', type: 'string', group: 'other' },
    { name: 'teamHeading', title: 'Team-overskrift', type: 'string', group: 'norwegian' },
    { name: 'teamHeading_en', title: 'Team heading (EN)', type: 'string', group: 'english' },
    {
      name: 'teamMembers',
      title: 'Teammedlemmer',
      type: 'array',
      group: 'other',
      of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
    },
  ],
  preview: {
    prepare() { return { title: 'Om oss' } },
  },
}
