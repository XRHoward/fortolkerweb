import Head from 'next/head';
import Link from 'next/link';
import { client } from '../lib/sanity';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home({ globalSettings, homePage }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Fortolker AS - Rådgivning innen teknologi, innovasjon og bærekraft</title>
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
                  Rådgivning for fremtidens utfordringer
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Vi hjelper bedrifter med å navigere i skjæringspunktet mellom teknologi, innovasjon og bærekraft.
                </p>
                <Link href="/kontakt" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300">
                  Kontakt oss
                </Link>
              </div>
              <div className="order-first md:order-last">
                <div className="bg-gray-200 h-64 md:h-80 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Vi hjelper deg å skape verdi gjennom bærekraftig innovasjon
              </h2>
              <p className="text-lg text-gray-600">
                Fortolker AS er et rådgivningsfirma som spesialiserer seg på å hjelpe bedrifter med å utnytte teknologi og innovasjon for å oppnå bærekraftige resultater. Vår ekspertise spenner fra strategisk teknologirådgivning til implementering av innovative løsninger som driver vekst og bærekraft.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Våre tjenester</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Teknologirådgivning
                </h3>
                <p className="text-gray-600 mb-4">
                  Vi hjelper bedrifter med å velge og implementere teknologiske løsninger som gir konkurransefortrinn og effektiviserer drift.
                </p>
                <Link href="/tjenester" className="text-blue-600 hover:text-blue-800 font-medium">
                  Les mer →
                </Link>
              </div>

              {/* Service 2 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Innovasjonsrådgivning
                </h3>
                <p className="text-gray-600 mb-4">
                  Vi bistår med å utvikle og implementere innovasjonsstrategier som skaper nye muligheter og forretningsmodeller.
                </p>
                <Link href="/tjenester" className="text-blue-600 hover:text-blue-800 font-medium">
                  Les mer →
                </Link>
              </div>

              {/* Service 3 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Bærekraftsrådgivning
                </h3>
                <p className="text-gray-600 mb-4">
                  Vi hjelper bedrifter med å integrere bærekraft i forretningsstrategien og utvikle løsninger som er gode for både planeten og bunnlinjen.
                </p>
                <Link href="/tjenester" className="text-blue-600 hover:text-blue-800 font-medium">
                  Les mer →
                </Link>
              </div>
            </div>
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
    // These would normally fetch data from Sanity
    const globalSettings = {};
    const homePage = {};

    return {
      props: {
        globalSettings,
        homePage,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        globalSettings: {},
        homePage: {},
      },
    };
  }
}
