import { useState, useEffect } from 'react';
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
      className="text-sm font-semibold text-white/90 hover:text-white border border-white/30 hover:border-white/60 rounded px-2 py-1 transition-colors duration-200"
      aria-label="Switch language"
    >
      {locale === 'no'
        ? <><span className="fi fi-gb mr-1"></span>EN</>
        : <><span className="fi fi-no mr-1"></span>NO</>
      }
    </button>
  );
}

const navLinks = {
  no: [
    { href: '/', label: 'Hjem' },
    { href: '/om-oss', label: 'Om oss' },
    { href: '/tjenester', label: 'Tjenester' },
    { href: '/innsikt', label: 'Innsikt' },
    { href: '/kontakt', label: 'Kontakt' },
  ],
  en: [
    { href: '/', label: 'Home' },
    { href: '/om-oss', label: 'About' },
    { href: '/tjenester', label: 'Services' },
    { href: '/innsikt', label: 'Insights' },
    { href: '/kontakt', label: 'Contact' },
  ],
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale, pathname } = useRouter();
  const isHome = pathname === '/';
  const logoUrl = 'https://cdn.sanity.io/images/7izj8dsr/production/5cdcc1ff1954c4eaa65ae3f9fbf257ca62aeaae1-750x417.png';
  const links = navLinks[locale] ?? navLinks.no;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const bgClass = isHome
    ? (scrolled ? 'bg-slate-950/55' : 'bg-transparent')
    : (scrolled ? 'bg-slate-950/55' : 'bg-slate-950/30');
  const blurClass = isHome ? 'backdrop-blur-none' : 'backdrop-blur-lg';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${blurClass} ${bgClass}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <Image
              src={logoUrl}
              alt="Fortolker logo"
              width={120}
              height={60}
              priority
              unoptimized
            />
          </Link>

          {/* Desktop-meny */}
          <nav className="hidden md:flex items-center gap-10 flex-1 justify-center">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className="text-white/90 hover:text-blue-400 transition-colors duration-200">
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <LanguageSwitcher />
          </div>

          {/* Hamburger-knapp */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              className="text-white"
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
              <Link key={href} href={href} className="text-white/90 hover:text-blue-400 transition-colors duration-200" onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
