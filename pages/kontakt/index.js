import Head from 'next/head';
import { useState } from 'react';
import { client } from '../../lib/sanity';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Kontakt({ contactInfo }) {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Kontakt - Fortolker AS</title>
        <meta name="description" content="Kontakt Fortolker AS for rådgivning innen teknologi, innovasjon og bærekraft." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {contactInfo?.title || 'Kontakt oss'}
              </h1>
              <p className="text-xl text-gray-600">
                Vi er her for å hjelpe deg. Ta kontakt med oss for en uforpliktende samtale.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Kontakt-skjema */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send oss en melding</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Navn</label>
                    <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
                    <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Emne</label>
                    <input type="text" id="subject" name="subject" required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Melding</label>
                    <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 border border-gray-300 rounded-md"></textarea>
                  </div>
                  <div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300">
                      Send melding
                    </button>
                    {status === 'sending' && <p className="text-gray-600 mt-2">Sender...</p>}
                    {status === 'success' && <p className="text-green-600 mt-2">Takk! Meldingen er sendt.</p>}
                    {status === 'error' && <p className="text-red-600 mt-2">Noe gikk galt. Prøv igjen senere.</p>}
                  </div>
                </form>
              </div>

              {/* Kontaktinformasjon */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Kontaktinformasjon</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Adresse</h3>
                    <p className="text-gray-600">
                      {contactInfo?.address?.split('\n').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefon</h3>
                    <p className="text-gray-600">{contactInfo?.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">E-post</h3>
                    <p className="text-gray-600">{contactInfo?.email}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Åpningstider</h3>
                    <p className="text-gray-600">
                      {contactInfo?.openingHours?.split('\n').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Sosiale medier */}
                {contactInfo?.socialMedia?.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Følg oss</h3>
                    <div className="flex space-x-4">
                      {contactInfo.socialMedia.map((platform, idx) => (
                        <a key={idx} href={platform.url} className="text-gray-600 hover:text-blue-600">
                          <span className="sr-only">{platform.platform}</span>
                          <span className="capitalize">{platform.platform}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Kart */}
        {contactInfo?.mapLocation?.lat && contactInfo?.mapLocation?.lng && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="rounded-lg overflow-hidden aspect-w-16 aspect-h-9">
                <iframe
                  title="Kart"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={`https://www.google.com/maps?q=${contactInfo.mapLocation.lat},${contactInfo.mapLocation.lng}&z=15&output=embed`}
                  allowFullScreen
                />
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
    const query = `*[_type == "contactInfo"][0]`;
    const contactInfo = await client.fetch(query);

    return {
      props: {
        contactInfo,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Feil ved henting av kontaktinfo fra Sanity:', error);
    return {
      props: {
        contactInfo: {},
      },
    };
  }
}
