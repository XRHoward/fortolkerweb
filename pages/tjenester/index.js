import Head from 'next/head';
import Link from 'next/link';
import { client } from '../../lib/sanity';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Tjenester({ services }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Tjenester - Fortolker AS</title>
        <meta name="description" content="Utforsk våre spesialiserte rådgivningstjenester innen teknologi, innovasjon og bærekraft." />
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
              <p className="text-xl text-gray-600">
                Vi tilbyr spesialisert rådgivning innen teknologi, innovasjon og bærekraft for å hjelpe din bedrift med å møte fremtidens utfordringer.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamisk liste over tjenester */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {services.map((service, index) => (
              <div
                key={service.slug.current}
                className={`mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={index % 2 === 1 ? 'order-last md:order-first' : ''}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{service.title}</h2>
                  <p className="text-lg text-gray-600 mb-6">{service.shortDescription}</p>
                  {service.features?.length > 0 && (
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="bg-gray-200 h-64 rounded-lg"></div>
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

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const servicesQuery = `*[_type == "service"] | order(title asc){
      title,
      slug,
      icon,
      shortDescription,
      features
    }`;

    const services = await client.fetch(servicesQuery);

    return {
      props: {
        services,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Feil ved henting av tjenester fra Sanity:', error);
    return {
      props: {
        services: [],
      },
    };
  }
}
