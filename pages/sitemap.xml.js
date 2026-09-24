import { client } from '../lib/sanity';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fortolker.no').replace(/\/$/, '');

const staticPaths = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/tjenester', changefreq: 'monthly', priority: '0.9' },
  { path: '/om-oss', changefreq: 'monthly', priority: '0.8' },
  { path: '/innsikt', changefreq: 'weekly', priority: '0.8' },
  { path: '/kontakt', changefreq: 'yearly', priority: '0.7' },
  { path: '/personvern', changefreq: 'yearly', priority: '0.3' },
];

function localizedUrl(path, locale) {
  const prefix = locale === 'en' ? '/en' : '';
  if (path === '/') return `${SITE_URL}${prefix || '/'}`;
  return `${SITE_URL}${prefix}${path}`;
}

function urlEntry({ path, lastmod, changefreq, priority }) {
  const alternates = `
    <xhtml:link rel="alternate" hreflang="no" href="${localizedUrl(path, 'no')}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${localizedUrl(path, 'en')}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrl(path, 'no')}"/>`;

  return ['no', 'en']
    .map(
      (locale) => `
  <url>
    <loc>${localizedUrl(path, locale)}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${alternates}
  </url>`
    )
    .join('');
}

export async function getServerSideProps({ res }) {
  let posts = [];
  try {
    posts = await client.fetch(
      `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc){
        "slug": slug.current,
        _updatedAt
      }`
    );
  } catch (error) {
    console.error('Sitemap: kunne ikke hente blogginnlegg fra Sanity', error);
  }

  const entries = [
    ...staticPaths,
    ...posts.map((post) => ({
      path: `/innsikt/${encodeURIComponent(post.slug)}`,
      lastmod: post._updatedAt ? post._updatedAt.split('T')[0] : undefined,
      changefreq: 'monthly',
      priority: '0.6',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries
    .map(urlEntry)
    .join('')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(xml);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
