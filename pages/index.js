import Head from 'next/head';
import Link from 'next/link';
import { client } from '../lib/sanity';
import { urlFor } from '../lib/sanity';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home({ globalSettings, homePage }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{globalSettings?.siteName || 'Fortolker AS'} - Rådgivning innen teknologi, innovasjon og bærekraft</title>
        <meta name="description" content="Fortolker AS tilbyr spesialisert rådgivning innen teknologi, innovasjon og bærekraft for å hjelpe din bedrift med å møte fremtidens utfordringer." />
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
                  {homePage?.heroHeading || 'Rådgivning for fremtidens utfordringer'}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  {homePage?.heroSubheading || 'Vi hjelper bedrifter med å navigere i skjæringspunktet mellom teknologi, innovasjon og bærekraft.'}
                </p>
                <Link href="/kontakt" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300">
                  Kontakt oss
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
                {homePage?.introHeading}
              </h2>
              <p className="text-lg text-gray-600">
                {homePage?.introText}
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        {homePage?.featuredServices?.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Våre tjenester</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {homePage.featuredServices.map((service) => (
                  <Link href={`/tjenester/${service.slug.current}`} key={service.slug.current} passHref>
                    <a className="block bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 h-full min-h-[380px]">
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
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4 flex-grow">
                          {service.shortDescription}
                        </p>
                        <span className="text-blue-600 hover:text-blue-800 font-medium mt-auto">
                          Les mer →
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
                {homePage?.ctaHeading}
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                {homePage?.ctaText}
              </p>
              <Link href="/kontakt" className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-md transition duration-300">
                {homePage?.ctaButtonText || 'Kontakt oss'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
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
        globalSettings,
        homePage,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Feil ved henting av innhold fra Sanity:', error);
    return {
      props: {
        globalSettings: {},
        homePage: {},
      },
    };
  }
}
