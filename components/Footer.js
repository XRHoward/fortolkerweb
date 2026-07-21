import Link from 'next/link';
import { useRouter } from 'next/router';

const strings = {
  no: {
    tagline: 'Rådgiver innen teknologi, innovasjon og ledelse',
    linksHeading: 'Lenker',
    home: 'Hjem', about: 'Om oss', services: 'Tjenester', contact: 'Kontakt',
    servicesHeading: 'Tjenester',
    service1: 'Teknologirådgivning', service2: 'Innovasjonsrådgivning', service3: 'Innleid ledelse',
    contactHeading: 'Kontakt',
    rights: 'Alle rettigheter forbeholdt.',
  },
  en: {
    tagline: 'Consulting within technology, innovation and management',
    linksHeading: 'Links',
    home: 'Home', about: 'About us', services: 'Services', contact: 'Contact',
    servicesHeading: 'Services',
    service1: 'Technology consulting', service2: 'Innovation consulting', service3: 'Interim management',
    contactHeading: 'Contact',
    rights: 'All rights reserved.',
  },
};

export default function Footer({ settings }) {
  const { locale } = useRouter();
  const s = strings[locale] ?? strings.no;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Fortolker AS</h3>
            <p className="text-gray-400">{s.tagline}</p>
            <p className="text-gray-400 mt-2">Org.nr: 835 770 052</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{s.linksHeading}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white">{s.home}</Link></li>
              <li><Link href="/om-oss" className="text-gray-400 hover:text-white">{s.about}</Link></li>
              <li><Link href="/tjenester" className="text-gray-400 hover:text-white">{s.services}</Link></li>
              <li><Link href="/kontakt" className="text-gray-400 hover:text-white">{s.contact}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{s.servicesHeading}</h3>
            <ul className="space-y-2">
              <li><Link href="/tjenester" className="text-gray-400 hover:text-white">{s.service1}</Link></li>
              <li><Link href="/tjenester" className="text-gray-400 hover:text-white">{s.service2}</Link></li>
              <li><Link href="/tjenester" className="text-gray-400 hover:text-white">{s.service3}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{s.contactHeading}</h3>
            <address className="text-gray-400 not-italic space-y-1">
              {settings?.contactPhone && <p>Tlf: {settings.contactPhone}</p>}
              {settings?.contactEmail && <p>E-post: {settings.contactEmail}</p>}
              {settings?.address && (
                <p>
                  {settings.address.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </p>
              )}
              {settings?.socialMedia?.map((s, i) => (
                <p key={i}><a href={s.url} className="hover:text-white capitalize">{s.platform}</a></p>
              ))}
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col items-center gap-6 text-gray-400 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Fortolker AS. {s.rights}</span>
          <div className="flex flex-col items-center gap-2 sm:items-end">
            <span className="text-sm text-gray-500">Stolt medlem av:</span>
            <a
              href="https://www.digitalinnlandet.no"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Digital Innlandet"
            >
              <img
                src="/digital-innlandet-logo.svg"
                alt="Digital Innlandet"
                className="h-10 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
