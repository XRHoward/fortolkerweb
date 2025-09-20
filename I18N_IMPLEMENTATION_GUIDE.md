# Flerspråklig implementasjon for Fortolker-nettsiden

## Oversikt
Denne implementasjonen legger til støtte for norsk og engelsk på Fortolker-nettsiden med automatisk språkdeteksjon og manuell språkvelger.

## Implementerte funksjoner

### ✅ Automatisk språkdeteksjon
- Nettleseren detekterer automatisk brukerens foretrukne språk
- Fallback til norsk hvis språket ikke støttes
- Basert på `Accept-Language` header

### ✅ Språkvelger
- Elegant dropdown i headeren (desktop og mobil)
- Flagg og språknavn for enkel identifikasjon
- Smooth overganger og hover-effekter
- Bevarer nåværende side ved språkbytte

### ✅ Next.js i18n-integrasjon
- Innebygd Next.js internasjonalisering
- URL-basert språkruting (`/no/` og `/en/`)
- Server-side rendering med riktig språk

### ✅ Oversettelsessystem
- JSON-baserte oversettelser i `public/locales/`
- Strukturert i `common.json` og `pages.json`
- Fallback-system for manglende oversettelser

## Filstruktur

```
fortolker-project/
├── components/
│   ├── Header.js (oppdatert med språkvelger)
│   └── LanguageSelector.js (ny komponent)
├── lib/
│   └── sanityHelpers.js (hjelpefunksjoner for flerspråklig innhold)
├── pages/
│   ├── _app.js (oppdatert med i18n)
│   ├── index.js (oppdatert med oversettelser)
│   └── om-oss/index.js (oppdatert med oversettelser)
├── public/locales/
│   ├── no/
│   │   ├── common.json
│   │   └── pages.json
│   └── en/
│       ├── common.json
│       └── pages.json
├── next.config.js (oppdatert med i18n-konfigurasjon)
├── next-i18next.config.js (ny konfigurasjonsfil)
└── SANITY_I18N_SETUP.md (guide for Sanity CMS-oppsett)
```

## Tekniske detaljer

### Avhengigheter lagt til:
```json
{
  "next-i18next": "^15.x.x",
  "react-i18next": "^13.x.x"
}
```

### Next.js konfigurasjon:
```javascript
// next.config.js
module.exports = {
  i18n: {
    locales: ['no', 'en'],
    defaultLocale: 'no',
  },
}
```

### Språkvelger-komponent:
- Responsive design (skjuler tekst på små skjermer)
- Klikk utenfor for å lukke dropdown
- Smooth animasjoner med Tailwind CSS
- Tilgjengelig med ARIA-labels

## Sanity CMS-integrasjon

### Nåværende tilstand:
- Eksisterende innhold fungerer som før (norsk)
- Hjelpefunksjoner for å hente flerspråklig innhold
- Fallback til eksisterende felt hvis flerspråklige felt ikke finnes

### For å aktivere full flerspråklig støtte i Sanity:
1. Følg instruksjonene i `SANITY_I18N_SETUP.md`
2. Installer `@sanity/language-filter` plugin
3. Oppdater skjemaer til flerspråklige objekter
4. Migrer eksisterende data

## Oversettelser

### Automatisk genererte engelske oversettelser:
- Profesjonelle konsulenttermer
- Konsistent terminologi
- Kan enkelt justeres i JSON-filene

### Struktur:
```json
{
  "navigation": { "home": "Home", "about": "About Us" },
  "buttons": { "contactUs": "Contact Us", "readMore": "Read More" },
  "common": { "loading": "Loading...", "error": "Something went wrong" },
  "homepage": { "defaultHeroHeading": "Consulting for Tomorrow's Challenges" }
}
```

## Testing og kvalitetssikring

### ✅ Bygger uten feil
- `npm run build` fullført uten kritiske feil
- Alle sider genereres korrekt for begge språk

### ✅ Funksjonalitet testet:
- Språkvelger fungerer på desktop og mobil
- URL-ruting fungerer (`/`, `/en/`, `/no/`)
- Oversettelser lastes korrekt
- Fallback-system fungerer

## Neste steg

### 1. Sanity CMS-oppsett (anbefalt)
```bash
# I Sanity Studio-prosjektet:
npm install @sanity/language-filter
```

### 2. Legg til engelske oversettelser i Sanity
- Følg guiden i `SANITY_I18N_SETUP.md`
- Start med hjemmesiden og "Om oss"-siden
- Test at begge språk vises korrekt

### 3. Utvidelser (valgfritt)
- Legg til flere språk (svensk, dansk)
- Implementer språkspesifikke URL-slugs
- Legg til språkvalg i footer

## Feilsøking

### Vanlige problemer:

**Problem**: "useTranslation: You will need to pass in an i18next instance"
**Løsning**: Sørg for at `appWithTranslation` wrapper er riktig implementert i `_app.js`

**Problem**: Oversettelser vises ikke
**Løsning**: Sjekk at `serverSideTranslations` er inkludert i `getStaticProps`

**Problem**: Språkvelger vises ikke
**Løsning**: Verifiser at `LanguageSelector` er importert og brukt i `Header.js`

## Deployment

### Før deployment:
1. Test alle sider på begge språk
2. Verifiser at alle oversettelser er komplette
3. Sjekk at Sanity CMS har flerspråklig innhold (hvis implementert)

### Etter deployment:
1. Test automatisk språkdeteksjon
2. Verifiser at SEO fungerer for begge språk
3. Sjekk at sosiale medier-deling fungerer korrekt

## Support og vedlikehold

### Legge til nye oversettelser:
1. Oppdater JSON-filene i `public/locales/`
2. Bruk `t('key.path')` i komponenter
3. Test at oversettelsen vises korrekt

### Legge til nytt språk:
1. Oppdater `locales` i `next.config.js`
2. Opprett ny mappe i `public/locales/`
3. Legg til språk i `LanguageSelector.js`
4. Oppdater Sanity-skjemaer hvis nødvendig

---

**Implementert av**: Manus AI Assistant  
**Dato**: September 2025  
**Versjon**: 1.0
