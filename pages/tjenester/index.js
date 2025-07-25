import Head from 'next/head';
import Link from 'next/link';
import { client } from '../../lib/sanity';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { PortableText } from '@portabletext/react';

export default function Tjenester({ services }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Tjenester - Fortolker AS</title>
        <meta name="description" content="Utforsk våre rådgivningstjenester innen teknologi, innovasjon og ledelse." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Våre tjenester
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Vi tilbyr spesialisert rådgivning innen teknologi, innovasjon og kommunikasjon for å hjelpe din bedrift med å møte fremtidens utfordringer.
              </p>
                          {/* Internmeny */}
              <nav className="flex flex-wrap justify-center gap-4 mt-6">
                {services.map((service) => (
                  <Link key={service.slug.current} href={`#${service.slug.current}`} className="text-blue-600 hover:underline">
                    {service.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </section>

        {/* Dynamisk liste over tjenester */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {services.map((service, index) => (
              <div
                id={service.slug.current}
                key={service.slug.current}
                className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center scroll-mt-24"
              >
                {index % 2 === 1 ? (
                  <>
                    <div className="order-last md:order-first">
                      {service.image?.asset?.url ? (
                        <img
                          src={service.image.asset.url}
                          alt={service.title}
                          className="w-full h-64 object-contain rounded-lg"
                        />
                      ) : (
                        <div className="bg-gray-200 h-64 rounded-lg" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">{service.title}</h2>
                      {service.fullDescription ? (
                        <div className="text-lg text-gray-600 mb-6 prose max-w-none">
                          <PortableText value={service.fullDescription} />
                        </div>
                      ) : (
                        <p className="text-lg text-gray-600 mb-6">{service.shortDescription}</p>
                      )}
                      {service.features?.length > 0 && (
                        <ul className="space-y-3">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">{service.title}</h2>
                      {service.fullDescription ? (
                        <div className="text-lg text-gray-600 mb-6 prose max-w-none">
                          <PortableText value={service.fullDescription} />
                        </div>
                      ) : (
                        <p className="text-lg text-gray-600 mb-6">{service.shortDescription}</p>
                      )}
                      {service.features?.length > 0 && (
                        <ul className="space-y-3">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div>
                      {service.image?.asset?.url ? (
                        <img
                          src={service.image.asset.url}
                          alt={service.title}
                          className="w-full h-64 object-contain rounded-lg"
                        />
                      ) : (
                        <div className="bg-gray-200 h-64 rounded-lg" />
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-blue-600 rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Klar for å ta neste steg?
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Kontakt oss i dag for en uforpliktende samtale om hvordan vi kan hjelpe din bedrift med å møte fremtidens utfordringer.
              </p>
              <Link href="/kontakt" className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-md transition duration-300">
                Kontakt oss
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const servicesQuery = `*[_type == "service"] | order(_createdAt asc) {
      title,
      slug,
      shortDescription,
      fullDescription,
      features,
      image {
        asset->{
          url
        }
      }
    }`;

    const services = await client.fetch(servicesQuery);

    return {
      props: {
        services,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Feil ved henting av tjenester:', error);
    return {
      props: {
        services: [],
      },
    };
  }
}
