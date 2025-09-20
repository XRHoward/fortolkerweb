# Sanity CMS Flerspråklig Oppsett

## Oversikt
Dette dokumentet beskriver hvordan du setter opp flerspråklig støtte i Sanity CMS for Fortolker-nettsiden.

## Metode 1: Enkle flerspråklige felt (Anbefalt for start)

### Steg 1: Installer Sanity Internationalization Plugin
```bash
npm install @sanity/language-filter
```

### Steg 2: Oppdater sanity.config.js
```javascript
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { languageFilter } from '@sanity/language-filter'

const supportedLanguages = [
  { id: 'no', title: 'Norsk', isDefault: true },
  { id: 'en', title: 'English' }
]

export default defineConfig({
  // ... existing config
  plugins: [
    deskTool(),
    visionTool(),
    languageFilter({
      supportedLanguages,
      defaultLanguages: ['no'],
      documentTypes: ['homePage', 'service', 'aboutPage', 'globalSettings']
    })
  ]
})
```

### Steg 3: Oppdater skjemaer med flerspråklige felt

#### Eksempel: homePage.js
```javascript
export default {
  name: 'homePage',
  title: 'Hjemmeside',
  type: 'document',
  fields: [
    {
      name: 'heroHeading',
      title: 'Hero Overskrift',
      type: 'object',
      fields: [
        {
          name: 'no',
          title: 'Norsk',
          type: 'string'
        },
        {
          name: 'en',
          title: 'English',
          type: 'string'
        }
      ]
    },
    {
      name: 'heroSubheading',
      title: 'Hero Undertekst',
      type: 'object',
      fields: [
        {
          name: 'no',
          title: 'Norsk',
          type: 'text'
        },
        {
          name: 'en',
          title: 'English',
          type: 'text'
        }
      ]
    }
    // ... andre felt
  ]
}
```

## Metode 2: Dokumentbasert internasjonalisering

### Alternativ tilnærming med separate dokumenter per språk
```javascript
// I stedet for flerspråklige felt, opprett separate dokumenter:
// - homePage_no
// - homePage_en
// - service_no_[slug]
// - service_en_[slug]
```

## Frontend-integrasjon

### Oppdaterte Sanity-spørringer
```javascript
// I pages/index.js
const homePageQuery = \`*[_type == "homePage"][0]{
  title,
  heroHeading,
  heroSubheading,
  heroImage {
    asset->{
      _id,
      url
    }
  },
  // ... andre felt
}\`;

// Bruk hjelpefunksjoner for å hente riktig språk
import { getLocalizedField } from '../lib/sanityHelpers';

// I komponenten:
const heroHeading = getLocalizedField(homePage?.heroHeading, router.locale);
```

## Implementeringssteg

1. **Velg metode**: Start med Metode 1 (enkle flerspråklige felt)
2. **Installer plugin**: Legg til @sanity/language-filter
3. **Oppdater skjemaer**: Konverter eksisterende felt til flerspråklige objekter
4. **Migrer data**: Flytt eksisterende norsk innhold til 'no'-felt
5. **Legg til engelske oversettelser**: Fyll ut 'en'-feltene
6. **Test**: Verifiser at begge språk fungerer

## Eksempel på migrering av eksisterende data

```javascript
// Sanity Migration Script
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const migrateToMultilingual = async () => {
  const documents = await client.fetch('*[_type == "homePage"]')
  
  for (const doc of documents) {
    const patches = []
    
    // Migrer heroHeading fra string til objekt
    if (typeof doc.heroHeading === 'string') {
      patches.push({
        set: {
          heroHeading: {
            no: doc.heroHeading,
            en: '' // Tom streng som kan fylles ut senere
          }
        }
      })
    }
    
    if (patches.length > 0) {
      await client.patch(doc._id).set(patches[0].set).commit()
    }
  }
}
```

## Neste steg

1. Implementer Metode 1 i Sanity Studio
2. Migrer eksisterende innhold
3. Legg til engelske oversettelser
4. Test flerspråklig funksjonalitet
5. Vurder Metode 2 hvis mer avansert struktur trengs
