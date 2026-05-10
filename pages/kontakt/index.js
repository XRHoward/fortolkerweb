import Head from 'next/head';
import { useState } from 'react';
import { client } from '../../lib/sanity';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const strings = {
  no: {
    title: 'Kontakt - Fortolker AS',
    meta: 'Kontakt Fortolker AS for rådgivning innen innovasjon, teknologi og ledelse.',
    heading: 'Kontakt oss',
    sub: 'Vi er her for å hjelpe deg. Ta kontakt for en uforpliktende samtale eller kaffeprat:',
    formHeading: 'Send oss en melding',
    name: 'Navn', email: 'E-post', phone: 'Telefon', subject: 'Emne', message: 'Melding',
    send: 'Send melding', sending: 'Sender...', success: 'Takk! Meldingen er sendt.', error: 'Noe gikk galt. Prøv igjen senere.',
    infoHeading: 'Kontaktinformasjon', phoneLabel: 'Telefon', emailLabel: 'E-post', linkedinLabel: 'LinkedIn', addressLabel: 'Adresse',
    followUs: 'Følg oss',
  },
  en: {
    title: 'Contact - Fortolker AS',
    meta: 'Contact Fortolker AS for consulting within innovation, technology and management.',
    heading: 'Contact us',
    sub: 'We are here to help. Get in touch for a no-obligation conversation or coffee chat:',
    formHeading: 'Send us a message',
    name: 'Name', email: 'Email', phone: 'Phone', subject: 'Subject', message: 'Message',
    send: 'Send message', sending: 'Sending...', success: 'Thank you! Your message has been sent.', error: 'Something went wrong. Please try again later.',
    infoHeading: 'Contact information', phoneLabel: 'Phone', emailLabel: 'Email', linkedinLabel: 'LinkedIn', addressLabel: 'Address',
    followUs: 'Follow us',
  },
};

export default function Kontakt({ contactInfo, locale }) {
  const [status, setStatus] = useState(null);
  const s = strings[locale] ?? strings.no;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const data = Object.fromEntries(new FormData(e.target).entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) { setStatus('success'); e.target.reset(); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{s.title}</title>
        <meta name="description" content={s.meta} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{s.heading}</h1>
              <p className="text-xl text-gray-600">{s.sub}</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{s.formHeading}</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{s.name}</label>
                    <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{s.email}</label>
                    <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{s.phone}</label>
                    <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">{s.subject}</label>
                    <input type="text" id="subject" name="subject" required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{s.message}</label>
                    <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 border border-gray-300 rounded-md"></textarea>
                  </div>
                  <div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300">
                      {s.send}
                    </button>
                    {status === 'sending' && <p className="text-gray-600 mt-2">{s.sending}</p>}
                    {status === 'success' && <p className="text-green-600 mt-2">{s.success}</p>}
                    {status === 'error' && <p className="text-red-600 mt-2">{s.error}</p>}
                  </div>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{s.infoHeading}</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.phoneLabel}</h3>
                    <p className="text-gray-600">{contactInfo?.contactPhone}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.emailLabel}</h3>
                    <p className="text-gray-600">{contactInfo?.contactEmail}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.addressLabel}</h3>
                    <p className="text-gray-600">
                      {contactInfo?.address?.split('\n').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </p>
                  </div>
                </div>

                {contactInfo?.socialMedia?.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{s.followUs}</h3>
                    <div className="flex space-x-4">
                      {contactInfo.socialMedia.map((platform, idx) => (
                        <a key={idx} href={platform.url} className="text-gray-600 hover:text-blue-600 capitalize">
                          {platform.platform}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={contactInfo} />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  try {
    const globalSettings = await client.fetch(`*[_type == "globalSettings"][0]`);
    return {
      props: { globalSettings, contactInfo: globalSettings, locale },
      revalidate: 60,
    };
  } catch {
    return { props: { globalSettings: {}, contactInfo: {}, locale } };
  }
}
