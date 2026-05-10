import Head from 'next/head';
import { client, urlFor } from '../../lib/sanity';
import { t } from '../../lib/i18n';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


export default function OmOss({ aboutPage, locale, globalSettings }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{locale === 'en' ? 'About us - Fortolker AS' : 'Om oss - Fortolker AS'}</title>
        <meta name="description" content={locale === 'en' ? 'Learn more about Fortolker AS.' : 'Lær mer om Fortolker AS, vår historie, våre verdier og vårt team.'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t(aboutPage, 'heroHeading', locale)}
              </h1>
              <p className="text-xl text-gray-600">
                {t(aboutPage, 'heroText', locale)}
              </p>
            </div>
          </div>
        </section>

        {/* Company History */}
        {aboutPage?.historyText?.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t(aboutPage, 'historyHeading', locale)}</h2>
                <div className="text-lg text-gray-600 space-y-6">
                  {(t(aboutPage, 'historyText', locale) ?? []).map((block, index) => (
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t(aboutPage, 'valuesHeading', locale)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(t(aboutPage, 'values', locale) ?? []).map((value, index) => (
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t(aboutPage, 'teamHeading', locale)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {aboutPage.teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full bg-gray-200">
                      {member.image && (
                        <img
                          src={urlFor(member.image).width(300).height(300).url()}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-gray-600 mb-2">{t(member, 'position', locale)}</p>
                    <p className="text-gray-600 max-w-xs mx-auto">{t(member, 'bio', locale)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer settings={globalSettings} />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  try {
    const query = `*[_type == "aboutPage"][0]{
      heroHeading, heroHeading_en,
      heroText, heroText_en,
      historyHeading, historyHeading_en,
      historyText, historyText_en,
      valuesHeading, valuesHeading_en,
      values[]{ title, description },
      values_en[]{ title, description },
      teamHeading, teamHeading_en,
      teamMembers[]->{
        name,
        position, position_en,
        bio, bio_en,
        image
      }
    }`;

    const aboutPage = await client.fetch(query);
    const globalSettings = await client.fetch(`*[_type == "globalSettings"][0]`);

    return {
      props: { aboutPage, locale, globalSettings },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Feil ved henting av Om oss-data fra Sanity:', error);
    return {
      props: { aboutPage: {}, locale, globalSettings: {} },
    };
  }
}
