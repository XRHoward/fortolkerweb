import Head from 'next/head';
import Link from 'next/link';
import { client } from '../../lib/sanity';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Databehandlere som nevnes i erklæringen. Oppdater listen hvis kontaktskjemaet
// bytter SMTP-tjeneste (se SMTP_HOST i Vercel; per nå Gmail).
const content = {
  no: {
    title: 'Personvernerklæring - Fortolker AS',
    meta: 'Slik behandler Fortolker AS personopplysninger på fortolker.no.',
    heading: 'Personvernerklæring',
    sub: 'Slik behandler vi personopplysninger når du besøker fortolker.no eller tar kontakt med oss.',
    updated: 'Sist oppdatert 24. september 2026',
    sections: [
      {
        heading: 'Behandlingsansvarlig',
        body: [
          'Fortolker AS (org.nr. 835 770 052), c/o PARK gründer- og næringshus, Grønnegata 83, 2317 Hamar, er behandlingsansvarlig for personopplysningene som beskrives her.',
          'Spørsmål om personvern kan sendes til hei@fortolker.no.',
        ],
      },
      {
        heading: 'Hvilke opplysninger vi behandler',
        list: [
          'Kontaktskjema og e-post: navn, e-postadresse, telefonnummer (valgfritt) og innholdet i meldingen du sender oss.',
          'Tekniske opplysninger: når du besøker nettsiden, registrerer serverne som leverer siden IP-adresse, nettlesertype og hvilke sider som ble hentet. Dette er nødvendig for å levere siden og beskytte den mot misbruk.',
        ],
      },
      {
        heading: 'Formål og rettslig grunnlag',
        body: [
          'Vi bruker opplysningene fra kontaktskjemaet og e-post kun til å svare på henvendelsen din og eventuelt følge opp et oppdrag. Grunnlaget er vår berettigede interesse i å besvare henvendelser (personvernforordningen art. 6 nr. 1 bokstav f), eller at behandlingen er nødvendig for å inngå en avtale med deg (art. 6 nr. 1 bokstav b).',
          'Tekniske opplysninger behandles på grunnlag av vår berettigede interesse i å drive en sikker og stabil nettside (art. 6 nr. 1 bokstav f).',
        ],
      },
      {
        heading: 'Hvor lenge vi lagrer opplysningene',
        body: [
          'Henvendelser lagres i inntil 24 måneder og slettes deretter, med mindre de inngår i et kundeforhold eller vi er pålagt å oppbevare dem lenger, for eksempel etter bokføringsloven.',
          'Tekniske logger lagres kortvarig av leverandøren vår og slettes automatisk.',
        ],
      },
      {
        heading: 'Hvem vi deler opplysninger med',
        body: [
          'Vi selger aldri personopplysninger. Vi bruker disse leverandørene (databehandlere), som bare behandler opplysninger på våre vegne:',
        ],
        list: [
          'Vercel Inc. – drift av nettsiden (hosting).',
          'Google (Gmail) – utsending av meldinger fra kontaktskjemaet.',
          'Domeneshop AS – e-post.',
          'Sanity – innholdsstyring og levering av bilder på nettsiden.',
        ],
        after: [
          'Vercel, Google og Sanity kan behandle opplysninger utenfor EØS, blant annet i USA. Overføringen skjer i tråd med personvernforordningen, gjennom EU–US Data Privacy Framework eller EUs standardavtaler (SCC).',
        ],
      },
      {
        heading: 'Informasjonskapsler (cookies)',
        body: [
          'Fortolker.no bruker ikke informasjonskapsler, og vi bruker ikke analyse- eller sporingsverktøy. Derfor ber vi deg heller ikke om samtykke til cookies.',
        ],
      },
      {
        heading: 'Dine rettigheter',
        body: ['Du har rett til å:'],
        list: [
          'be om innsyn i hvilke opplysninger vi har om deg',
          'få uriktige opplysninger rettet',
          'få opplysninger slettet',
          'protestere mot eller be om begrensning av behandlingen',
          'få utlevert opplysningene dine (dataportabilitet)',
        ],
        after: [
          'Send en e-post til hei@fortolker.no, så svarer vi innen 30 dager. Mener du at vi behandler personopplysninger i strid med regelverket, kan du klage til Datatilsynet (datatilsynet.no).',
        ],
      },
    ],
  },
  en: {
    title: 'Privacy policy - Fortolker AS',
    meta: 'How Fortolker AS processes personal data on fortolker.no.',
    heading: 'Privacy policy',
    sub: 'How we process personal data when you visit fortolker.no or get in touch with us.',
    updated: 'Last updated 24 September 2026',
    sections: [
      {
        heading: 'Data controller',
        body: [
          'Fortolker AS (org. no. 835 770 052), c/o PARK gründer- og næringshus, Grønnegata 83, 2317 Hamar, Norway, is the controller of the personal data described here.',
          'Questions about privacy can be sent to hei@fortolker.no.',
        ],
      },
      {
        heading: 'What data we process',
        list: [
          'Contact form and email: name, email address, phone number (optional) and the content of your message.',
          'Technical data: when you visit the website, the servers delivering it record your IP address, browser type and which pages were requested. This is necessary to deliver the site and protect it against abuse.',
        ],
      },
      {
        heading: 'Purpose and legal basis',
        body: [
          'We only use data from the contact form and email to respond to your enquiry and, where relevant, follow up on an assignment. The legal basis is our legitimate interest in responding to enquiries (GDPR Art. 6(1)(f)), or that processing is necessary to enter into a contract with you (Art. 6(1)(b)).',
          'Technical data is processed based on our legitimate interest in running a secure and stable website (Art. 6(1)(f)).',
        ],
      },
      {
        heading: 'How long we keep data',
        body: [
          'Enquiries are kept for up to 24 months and then deleted, unless they form part of a client relationship or we are required to keep them longer, for example under accounting law.',
          'Technical logs are kept briefly by our provider and deleted automatically.',
        ],
      },
      {
        heading: 'Who we share data with',
        body: [
          'We never sell personal data. We use the following providers (data processors), who only process data on our behalf:',
        ],
        list: [
          'Vercel Inc. – website hosting.',
          'Google (Gmail) – delivery of messages from the contact form.',
          'Domeneshop AS – email.',
          'Sanity – content management and delivery of images on the website.',
        ],
        after: [
          'Vercel, Google and Sanity may process data outside the EEA, including in the USA. Such transfers comply with the GDPR through the EU–US Data Privacy Framework or the EU Standard Contractual Clauses (SCCs).',
        ],
      },
      {
        heading: 'Cookies',
        body: [
          'Fortolker.no does not use cookies, and we do not use any analytics or tracking tools. That is why we do not ask for cookie consent.',
        ],
      },
      {
        heading: 'Your rights',
        body: ['You have the right to:'],
        list: [
          'access the data we hold about you',
          'have inaccurate data corrected',
          'have your data deleted',
          'object to or request restriction of processing',
          'receive your data in a portable format',
        ],
        after: [
          'Send an email to hei@fortolker.no and we will respond within 30 days. If you believe we process personal data in breach of the rules, you can complain to the Norwegian Data Protection Authority (datatilsynet.no).',
        ],
      },
    ],
  },
};

export default function Personvern({ globalSettings, locale }) {
  const c = content[locale] ?? content.no;

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{c.title}</title>
        <meta name="description" content={c.meta} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow pt-20">
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{c.heading}</h1>
              <p className="text-xl text-gray-600">{c.sub}</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-sm text-gray-500 mb-10">{c.updated}</p>
              <div className="space-y-10">
                {c.sections.map((section) => (
                  <div key={section.heading}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.heading}</h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      {section.body?.map((p, i) => <p key={i}>{p}</p>)}
                      {section.list && (
                        <ul className="list-disc pl-6 space-y-2">
                          {section.list.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      )}
                      {section.after?.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-12 text-gray-700">
                <Link href="/kontakt" className="text-blue-600 hover:text-blue-800 font-medium">
                  {locale === 'en' ? 'Contact us →' : 'Kontakt oss →'}
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={globalSettings} />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  try {
    const globalSettings = await client.fetch(`*[_type == "globalSettings"][0]`);
    return { props: { globalSettings, locale }, revalidate: 60 };
  } catch (error) {
    console.error('Feil ved henting av innhold fra Sanity:', error);
    return { props: { globalSettings: {}, locale } };
  }
}
