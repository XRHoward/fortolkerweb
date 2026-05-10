export function t(obj, field, locale) {
  if (locale === 'en') {
    const enValue = obj?.[`${field}_en`];
    if (enValue !== undefined && enValue !== null && enValue !== '') return enValue;
  }
  return obj?.[field];
}
