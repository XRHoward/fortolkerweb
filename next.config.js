module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  async redirects() {
    return [
      { source: '/blogg', destination: '/innsikt', permanent: true },
      { source: '/blogg/:slug', destination: '/innsikt/:slug', permanent: true },
    ];
  },
  i18n: {
    locales: ['no', 'en'],
    defaultLocale: 'no',
  },
};
