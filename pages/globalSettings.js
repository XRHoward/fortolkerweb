import Head from 'next/head';
import Image from 'next/image';
import { client, urlFor } from '../lib/sanity';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function GlobalSettingsPage({ globalSettings }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{globalSettings?.siteName || 'Globale innstillinger'} - Fortolker AS</title>
      </Head>

      <Header />

      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">Globale innstillinger</h1>

          {/* Logo */}
          {globalSettings.logo && (
            <div className="mb-8 text-center">
              <Image
                src={urlFor(globalSettings.logo).url()}
                alt="Logo"
                width={150}
                height={150}
                className="mx-auto"
              />
            </div>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-800">
            <div>
              <h2 className="text-xl font-semibold mb-2">Nettsidenavn</h2>
              <p>{globalSettings.siteName}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Kontakt e-post</h2>
              <p>{globalSettings.contactEmail}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Kontakt telefon</h2>
              <p>{globalSettings.contactPhone}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Adresse</h2>
              <p>{globalSettings.address}</p>
            </div>
          </div>

          {/* Sosiale medier */}
          {globalSettings.socialMedia?.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-4">Sosiale medier</h2>
              <ul className="space-y-3">
                {globalSettings.socialMedia.map((social, idx) => (
                  <li key={idx}>
                    <strong>{social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}:</strong>{' '}
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      {social.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const query = `*[_type == "globalSettings"][0]{
      siteName,
      logo,
      contactEmail,
      contactPhone,
      address,
      socialMedia
    }`;

    const globalSettings = await client.fetch(query);

    return {
      props: {
        globalSettings,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Feil ved henting av globalSettings:', error);
    return {
      props: {
        globalSettings: {},
      },
    };
  }
}
