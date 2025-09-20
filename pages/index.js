import Head from 'next/head';
import Link from 'next/link';
import { client } from '../lib/sanity';
import { urlFor } from '../lib/sanity';
import { getLocalizedField } from '../lib/sanityHelpers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

export default function Home({ globalSettings, homePage }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = router.locale || 'no';

  // Hent lokaliserte verdier med fallback til oversettelser
  const heroHeading = getLocalizedField(homePage?.heroHeading, locale) || t('homepage.defaultHeroHeading');
  const heroSubheading = getLocalizedField(homePage?.heroSubheading, locale) || t('homepage.defaultHeroSubheading');
  const ctaButtonText = getLocalizedField(homePage?.ctaButtonText, locale) || t('homepage.defaultCtaButton');

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{t('meta.defaultTitle')}</title>
        <meta name="description" content={t('meta.defaultDescription')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {heroHeading}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  {heroSubheading}
                </p>
                <Link href="/kontakt" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300">
                  {t('buttons.contactUs')}
                </Link>
              </div>
              <div className="order-first md:order-last">
                {homePage?.heroImage?.asset?.url ? (
                  <img
                    src={homePage.heroImage.asset.url}
                    alt={homePage.heroHeading || 'Illustrasjonsbilde'}
                    className="w-full h-64 md:h-80 object-cover rounded-lg"
                  />
                ) : (
                  <div className="bg-gray-200 h-64 md:h-80 rounded-lg"></div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {getLocalizedField(homePage?.introHeading, locale)}
              </h2>
              <p className="text-lg text-gray-600">
                {getLocalizedField(homePage?.introText, locale)}
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        {homePage?.featuredServices?.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t('homepage.ourServices')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {homePage.featuredServices.map((service) => (
                  <Link href={`/tjenester#${service.slug.current}`} key={service.slug.current} passHref>
                    <a className="block bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 h-full min-h-[360px]">
                      <div className="flex flex-col h-full items-center text-center">
                        <div className="w-20 h-20 mb-6">
                          {service.image?.asset?.url ? (
                            <img
                              src={service.image.asset.url}
                              alt={service.title}
                              className="w-full h-full object-contain rounded"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                              {t('common.noImage')}
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {getLocalizedField(service.title, locale) || service.title}
                        </h3>
                        <p className="text-gray-600 mb-4 flex-grow">
                          {getLocalizedField(service.shortDescription, locale) || service.shortDescription}
                        </p>
                        <span className="text-blue-600 hover:text-blue-800 font-medium mt-auto">
                          {t('buttons.readMore')} →
                        </span>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-blue-600 rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                {getLocalizedField(homePage?.ctaHeading, locale)}
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                {getLocalizedField(homePage?.ctaText, locale)}
              </p>
              <Link href="/kontakt" className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-md transition duration-300">
                {ctaButtonText}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  try {
    const globalSettingsQuery = `*[_type == "globalSettings"][0]`;

    const homePageQuery = `*[_type == "homePage"][0]{
      title,
      heroHeading,
      heroSubheading,
      heroImage {
        asset->{
          _id,
          url
        }
      },
      introHeading,
      introText,
      featuredServices[]->{
        title,
        slug,
        shortDescription,
        image {
          asset->{
            _id,
            url
          }
        }
      },
      ctaHeading,
      ctaText,
      ctaButtonText
    }`;

    const globalSettings = await client.fetch(globalSettingsQuery);
    const homePage = await client.fetch(homePageQuery);

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        globalSettings,
        homePage,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Feil ved henting av innhold fra Sanity:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        globalSettings: {},
        homePage: {},
      },
    };
  }
}
