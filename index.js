import Head from 'next/head';
import Link from 'next/link';
import { client } from '../lib/sanity';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home({ globalSettings, homePage }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{globalSettings?.siteName || 'Fortolker AS'} - Rådgivning innen innovasjon, teknologi og ledelse</title>
        <meta
          name="description"
          content="Fortolker AS tilbyr spesialisert rådgivning innen innovasjon, teknologi og ledelse som hjelper din bedrift med å møte fremtidens utfordringer."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header globalSettings={globalSettings} />

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
                  {homePage?.heroSubheading ||
                    'Vi hjelper bedrifter med å navigere i skjæringspunktet mellom innovasjon, teknologi og ledelse.'}
                </p>
                <Link
                  href="/kontakt"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
                >
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

        {/* Featured Services Section */}
        {homePage?.featuredServices && homePage.featuredServices.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Våre tjenester
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {homePage.featuredServices.map((service) => (
                  <Link
                    key={service.slug?.current}
                    href={`/tjenester/${service.slug?.current}`}
                    className="block bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col items-start gap-4">
                      {service.icon && (
                        <img
                          src={service.icon}
                          alt={`${service.title} ikon`}
                          className="h-12 w-12"
                        />
                      )}
                      <h3 className="text-xl font-semibold text-gray-800">
                        {service.title}
                      </h3>
                      <p className="text-gray-600">
                        {service.shortDescription}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  try {
    console.log("🟡 STARTER fetches fra Sanity...");

    const globalSettingsQuery = `*[_type == "globalSettings"][0]{
      siteName,
      logo {
        asset->{
          _id,
          url
        }
      }
    }`;

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
        icon,
        shortDescription
      },
      ctaHeading,
      ctaText,
      ctaButtonText
    }`;

    const [globalSettings, homePage] = await Promise.all([
      client.fetch(globalSettingsQuery),
      client.fetch(homePageQuery)
    ]);

    console.log("✅ FETCHED globalSettings:", globalSettings);
    console.log("✅ FETCHED homePage:", homePage);

    return {
      props: {
        globalSettings,
        homePage,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("💥 FETCH FAILED:", error.message);
    return {
      props: {
        globalSettings: {},
        homePage: {},
      },
    };
  }
}
