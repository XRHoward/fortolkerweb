module.exports = {
  i18n: {
    defaultLocale: 'no',
    locales: ['no', 'en'],
    localeDetection: true,
  },
  fallbackLng: {
    default: ['no'],
  },
  debug: false,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
