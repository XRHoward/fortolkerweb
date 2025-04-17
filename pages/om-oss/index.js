import Head from 'next/head';
import { client } from '../../lib/sanity';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function OmOss({ aboutPage }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{aboutPage?.title || 'Om oss'} - Fortolker AS</title>
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
                {aboutPage?.heroHeading}
              </h1>
              <p className="text-xl text-gray-600">
                {aboutPage?.heroText}
              </p>
            </div>
          </div>
        </section>

        {/* Company History */}
        {aboutPage?.historyText?.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{aboutPage?.historyHeading}</h2>
                <div className="text-lg text-gray-600 space-y-6">
                  {aboutPage.historyText.map((block, index) => (
                    <p key={index}>{block.children?.[0]?.text}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Our Values */}
        {aboutPage?.values?.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{aboutPage?.valuesHeading}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {aboutPage.values.map((value, index) => (
                  <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Team Section */}
        {aboutPage?.teamMembers?.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{aboutPage?.teamHeading}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {aboutPage.teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full bg-gray-200">
                      {/* Bildet vises her hvis ønskelig – krever urlFor */}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-gray-600 mb-2">{member.position}</p>
                    <p className="text-gray-600 max-w-xs mx-auto">{member.bio}</p>
                  </div>
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
    const query = `*[_type == "aboutPage"][0]{
      title,
      heroHeading,
      heroText,
      historyHeading,
      historyText,
      valuesHeading,
      values[] {
        title,
        description
      },
      teamHeading,
      teamMembers[]->{
        name,
        position,
        bio
      }
    }`;

    const aboutPage = await client.fetch(query);

    return {
      props: {
        aboutPage,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Feil ved henting av Om oss-data fra Sanity:', error);
    return {
      props: {
        aboutPage: {},
      },
    };
  }
}
