// Hjelpefunksjon for å hente flerspråklig innhold fra Sanity
export function getLocalizedField(field, locale = 'no') {
  if (!field) return null;
  
  // Hvis feltet er et objekt med språkkoder som nøkler
  if (typeof field === 'object' && field[locale]) {
    return field[locale];
  }
  
  // Hvis feltet er et objekt med _type: 'localeString' eller lignende
  if (typeof field === 'object' && field.no) {
    return field[locale] || field.no; // Fallback til norsk
  }
  
  // Hvis feltet er en vanlig streng (bakoverkompatibilitet)
  if (typeof field === 'string') {
    return field;
  }
  
  return null;
}

// Funksjon for å bygge flerspråklige Sanity-spørringer
export function buildLocalizedQuery(baseQuery, locale = 'no') {
  // For nå returnerer vi bare base query, men dette kan utvides
  // når Sanity-skjemaet oppdateres for flerspråklig støtte
  return baseQuery;
}

// Funksjon for å transformere Sanity-data til riktig språk
export function transformSanityData(data, locale = 'no') {
  if (!data) return data;
  
  if (Array.isArray(data)) {
    return data.map(item => transformSanityData(item, locale));
  }
  
  if (typeof data === 'object') {
    const transformed = {};
    
    for (const [key, value] of Object.entries(data)) {
      // Håndter spesielle flerspråklige felt
      if (key.endsWith('_localized') || key.includes('localized')) {
        transformed[key.replace('_localized', '')] = getLocalizedField(value, locale);
      } else if (typeof value === 'object' && value !== null) {
        transformed[key] = transformSanityData(value, locale);
      } else {
        transformed[key] = value;
      }
    }
    
    return transformed;
  }
  
  return data;
}
