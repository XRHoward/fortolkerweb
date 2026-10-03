import { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useRouter } from 'next/router';

// Google Ads-taggen lastes først når besøkende har samtykket (ekomloven § 3-15)
const GOOGLE_TAG_ID = 'AW-18491896916';
const STORAGE_KEY = 'fortolker-cookie-consent';
export const OPEN_COOKIE_SETTINGS = 'fortolker:open-cookie-settings';

const strings = {
  no: {
    heading: 'Informasjonskapsler',
    text: 'Vi vil gjerne bruke informasjonskapsler fra Google for å måle effekten av annonsene våre. De settes bare hvis du godtar. Du kan når som helst endre valget ditt.',
    readMore: 'Les mer i personvernerklæringen',
    accept: 'Godta',
    decline: 'Avslå',
  },
  en: {
    heading: 'Cookies',
    text: 'We would like to use cookies from Google to measure the effect of our ads. They are only set if you accept. You can change your choice at any time.',
    readMore: 'Read more in our privacy policy',
    accept: 'Accept',
    decline: 'Decline',
  },
};

function readConsent() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveConsent(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {}
}

// Fjerner Google sine informasjonskapsler når samtykket trekkes tilbake
function removeGoogleCookies() {
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`];
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (/^(_gcl|_ga|_gid|_gac)/.test(name)) {
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
      });
    }
  });
}

export default function CookieConsent() {
  const { locale } = useRouter();
  const s = strings[locale] ?? strings.no;
  const [consent, setConsent] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    setOpen(!stored);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  const choose = (value) => {
    saveConsent(value);
    setOpen(false);
    if (value === 'denied' && consent === 'granted') {
      // Taggen er allerede lastet: stopp den, fjern informasjonskapslene og last siden på nytt
      window.gtag?.('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
      });
      removeGoogleCookies();
      window.location.reload();
      return;
    }
    setConsent(value);
  };

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`} strategy="afterInteractive" />
          <Script id="google-tag" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
gtag('js', new Date());
gtag('config', '${GOOGLE_TAG_ID}');`}
          </Script>
        </>
      )}

      {open && (
        <div
          role="dialog"
          aria-labelledby="cookie-consent-heading"
          className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-3xl rounded-xl bg-white shadow-2xl border border-gray-200 p-5 sm:p-6 sm:flex sm:items-center sm:gap-6">
            <div className="flex-1">
              <h2 id="cookie-consent-heading" className="text-base font-bold text-gray-900 mb-1">{s.heading}</h2>
              <p className="text-sm text-gray-600">
                {s.text}{' '}
                <Link href="/personvern" className="text-blue-600 hover:text-blue-800 underline underline-offset-2">{s.readMore}</Link>.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => choose('denied')}
                className="flex-1 sm:flex-none min-h-[44px] px-5 rounded-md border border-gray-300 text-gray-900 font-medium hover:bg-gray-50 transition"
              >
                {s.decline}
              </button>
              <button
                type="button"
                onClick={() => choose('granted')}
                className="flex-1 sm:flex-none min-h-[44px] px-5 rounded-md border border-blue-600 bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                {s.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
