import Head from 'next/head';
import Link from 'next/link';
import { client } from '../../lib/sanity';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function OmOss({ aboutPage }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Om oss - Fortolker AS</title>
        <meta name="description" content="Lær mer om Fortolker AS, vår historie, våre verdier og vårt team." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Om Fortolker AS
              </h1>
              <p className="text-xl text-gray-600">
                Vi er et dedikert team av rådgivere som hjelper bedrifter med å navigere i skjæringspunktet mellom teknologi, innovasjon og bærekraft.
              </p>
            </div>
          </div>
        </section>

        {/* Company History */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Vår historie</h2>
              <div className="text-lg text-gray-600 space-y-6">
                <p>
                  Fortolker AS ble grunnlagt i 2023 av en gruppe erfarne konsulenter med bakgrunn fra teknologi, innovasjon og bærekraft. Vi så et behov for rådgivningstjenester som kunne hjelpe bedrifter med å navigere i det komplekse landskapet der disse tre områdene møtes.
                </p>
                <p>
                  Siden oppstarten har vi vokst til å bli en betrodd partner for bedrifter i ulike bransjer, fra oppstartsbedrifter til etablerte selskaper. Vår tilnærming kombinerer dyp fagkunnskap med praktisk erfaring, og vi er stolte av å ha hjulpet våre kunder med å oppnå målbare resultater.
                </p>
                <p>
                  I dag fortsetter vi å utvikle våre tjenester og kompetanse for å møte fremtidens utfordringer og muligheter. Vi er dedikert til å skape verdi for våre kunder gjennom bærekraftig innovasjon og teknologiutnyttelse.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Våre verdier</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Value 1 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Integritet</h3>
                <p className="text-gray-600">
                  Vi handler alltid med ærlighet og åpenhet. Vi gir ærlige råd, selv når det er utfordrende, og vi står ved våre forpliktelser.
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Innovasjon</h3>
                <p className="text-gray-600">
                  Vi er nysgjerrige og søker kontinuerlig etter nye ideer og løsninger. Vi utfordrer etablerte sannheter og tenker kreativt for å skape verdi.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Bærekraft</h3>
                <p className="text-gray-600">
                  Vi tror på å skape løsninger som er gode for både mennesker, planeten og økonomien. Bærekraft er integrert i alt vi gjør.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Vårt team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full bg-gray-200"></div>
                <h3 className="text-xl font-bold text-gray-900">Håvard Røste</h3>
                <p className="text-gray-600 mb-2">Daglig leder</p>
                <p className="text-gray-600 max-w-xs mx-auto">
                  Med over 25 års erfaring fra teknologibransjen leder Håvard teamet med fokus på strategi og kundesamarbeid.
                </p>
              </div>

              {/* Team Member 2 */}
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full bg-gray-200"></div>
                <h3 className="text-xl font-bold text-gray-900">Roy Both</h3>
                <p className="text-gray-600 mb-2">AI-assistent</p>
                <p className="text-gray-600 max-w-xs mx-auto">
                  Roy har bakgrunn fra ledende teknologiselskaper og spesialiserer seg på digitale transformasjonsprosjekter.
                </p>
              </div>

              {/* Team Member 3 */}
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full bg-gray-200"></div>
                <h3 className="text-xl font-bold text-gray-900">Maria Olsen</h3>
                <p className="text-gray-600 mb-2">Bærekraftsrådgiver</p>
                <p className="text-gray-600 max-w-xs mx-auto">
                  Med sin bakgrunn innen miljøvitenskap hjelper Maria kunder med å integrere bærekraft i forretningsstrategien.
                </p>
              </div>
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
    // This would normally fetch data from Sanity
    const aboutPage = {};

    return {
      props: {
        aboutPage,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        aboutPage: {},
      },
    };
  }
}
