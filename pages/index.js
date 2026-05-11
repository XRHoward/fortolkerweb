import Head from 'next/head';
import Link from 'next/link';
import { client } from '../lib/sanity';
import { urlFor } from '../lib/sanity';
import { t } from '../lib/i18n';
import Header from '../components/Header';
import Footer from '../components/Footer';


function ClientLogo({ c }) {
  const inner = c.logo?.asset?.url
    ? <img src={c.logo.asset.url} alt={c.name} className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300" />
    : <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-gray-400 text-sm font-medium">{c.name}</div>;

  const wrapper = "flex items-center justify-center w-full h-10";

  if (c.url) {
    return (
      <a href={c.url} target="_blank" rel="noopener noreferrer" title={c.name} className={`${wrapper} opacity-60 hover:opacity-100 transition-opacity duration-300`}>
        {inner}
      </a>
    );
  }
  return <div className={`${wrapper} opacity-60`}>{inner}</div>;
}

function ClientsSection({ clients }) {
  if (!clients || clients.length === 0) return null;
  const list = clients;
  return (
    <section className="pt-4 pb-16">
      <div className="container mx-auto px-4">
        <div className="p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Noen av våre kunder
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {list.map((c) => <ClientLogo key={c._id} c={c} />)}
        </div>
        </div>
      </div>
    </section>
  );
}

export default function Home({ globalSettings, homePage, locale }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Fortolker AS - Rådgivning innen innovasjon, teknologi og ledelse</title>
        <meta name="description" content="Fortolker tilbyr rådgivning innen innovasjon, teknologi og ledelse for å hjelpe din bedrift med å møte fremtidens utfordringer." />
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
                  {t(homePage, 'heroHeading', locale) || 'Rådgivning for fremtidens utfordringer'}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  {t(homePage, 'heroSubheading', locale) || 'Vi hjelper bedrifter med å navigere i skjæringspunktet mellom teknologi, innovasjon og bærekraft.'}
                </p>
                <Link href="/kontakt" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300">
                  {locale === 'en' ? 'Get in touch' : 'Kontakt oss'}
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
                {t(homePage, 'introHeading', locale)}
              </h2>
              <p className="text-lg text-gray-600">
                {t(homePage, 'introText', locale)}
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        {homePage?.featuredServices?.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{locale === 'en' ? 'Our services' : 'Våre tjenester'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {homePage.featuredServices.map((service) => (
                  <Link href={`/tjenester#${service.slug.current}`} key={service.slug.current} className="block bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 h-full min-h-[360px]">
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
                              Ingen bilde
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {t(service, 'title', locale)}
                        </h3>
                        <p className="text-gray-600 mb-4 flex-grow">
                          {t(service, 'shortDescription', locale)}
                        </p>
                        <span className="text-blue-600 hover:text-blue-800 font-medium mt-auto">
                          {locale === 'en' ? 'Read more →' : 'Les mer →'}
                        </span>
                      </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Clients Section */}
        <ClientsSection clients={homePage?.featuredClients} />

        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-blue-600 rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                {t(homePage, 'ctaHeading', locale)}
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                {t(homePage, 'ctaText', locale)}
              </p>
              <Link href="/kontakt" className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-md transition duration-300">
                {t(homePage, 'ctaButtonText', locale) || (locale === 'en' ? 'Contact us' : 'Kontakt oss')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={globalSettings} />
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
        title, title_en,
        slug,
        shortDescription, shortDescription_en,
        image {
          asset->{
            _id,
            url
          }
        }
      },
      ctaHeading, ctaHeading_en,
      ctaText, ctaText_en,
      ctaButtonText, ctaButtonText_en,
      heroHeading_en, heroSubheading_en,
      introHeading_en, introText_en,
      title_en,
      featuredClients[]->{
        _id,
        name,
        url,
        logo {
          asset->{
            _id,
            url
          }
        }
      }
    }`;

    const globalSettings = await client.fetch(globalSettingsQuery);
    const homePage = await client.fetch(homePageQuery);

    return {
      props: {
        globalSettings,
        homePage,
        locale,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Feil ved henting av innhold fra Sanity:', error);
    return {
      props: {
        globalSettings: {},
        homePage: {},
        locale,
      },
    };
  }
}
