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
        <meta name="description" content="Se alle tjenestene Fortolker AS tilbyr innen teknologi, innovasjon og bærekraft." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Våre tjenester</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Vi tilbyr spesialisert rådgivning innen teknologi, innovasjon og bærekraft – tilpasset din virksomhets behov.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.slug.current} className="bg-white p-8 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    {/* Her kan du sette inn ikon eller bilde */}
                    <span className="text-blue-600 text-2xl">{/* {service.icon} */}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                  <Link href={`/tjenester/${service.slug.current}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    Les mer →
                  </Link>
                </div>
              ))}
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
      shortDescription
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
