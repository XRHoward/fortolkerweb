import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

function LanguageSwitcher() {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const toggle = () => {
    const next = locale === 'no' ? 'en' : 'no';
    router.push({ pathname, query }, asPath, { locale: next });
  };

  return (
    <button
      onClick={toggle}
      className="text-sm font-semibold text-gray-600 hover:text-blue-600 border border-gray-300 hover:border-blue-600 rounded px-2 py-1 transition-colors duration-200"
      aria-label="Switch language"
    >
      {locale === 'no' ? 'EN' : 'NO'}
    </button>
  );
}

const navLinks = {
  no: [
    { href: '/', label: 'Hjem' },
    { href: '/om-oss', label: 'Om oss' },
    { href: '/tjenester', label: 'Tjenester' },
    { href: '/blogg', label: 'Blogg' },
    { href: '/kontakt', label: 'Kontakt' },
  ],
  en: [
    { href: '/', label: 'Home' },
    { href: '/om-oss', label: 'About' },
    { href: '/tjenester', label: 'Services' },
    { href: '/blogg', label: 'Blog' },
    { href: '/kontakt', label: 'Contact' },
  ],
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale } = useRouter();
  const logoUrl = 'https://cdn.sanity.io/media-libraries/ml6HycARgLFo/images/415a542549643184cf2e8833c028143348e4e0a9-750x417.webp';
  const links = navLinks[locale] ?? navLinks.no;

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <Image
              src={logoUrl}
              alt="Fortolker logo"
              width={120}
              height={60}
              priority
            />
          </Link>

          {/* Desktop-meny */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className="text-gray-600 hover:text-blue-600">
                {label}
              </Link>
            ))}
            <LanguageSwitcher />
          </nav>

          {/* Hamburger-knapp */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              className="text-gray-600"
              aria-label="Åpne meny"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobilmeny */}
        {menuOpen && (
          <nav className="md:hidden flex flex-col gap-4 pb-4">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className="text-gray-600 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
