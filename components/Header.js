import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const logoUrl = 'https://cdn.sanity.io/media-libraries/ml6HycARgLFo/images/415a542549643184cf2e8833c028143348e4e0a9-750x417.webp';

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
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600">Hjem</Link>
            <Link href="/om-oss" className="text-gray-600 hover:text-blue-600">Om oss</Link>
            <Link href="/tjenester" className="text-gray-600 hover:text-blue-600">Tjenester</Link>
            <Link href="/kontakt" className="text-gray-600 hover:text-blue-600">Kontakt</Link>
          </nav>

          {/* Hamburger-knapp */}
          <div className="md:hidden">
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
            <Link href="/" className="text-gray-600 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Hjem</Link>
            <Link href="/om-oss" className="text-gray-600 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Om oss</Link>
            <Link href="/tjenester" className="text-gray-600 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Tjenester</Link>
            <Link href="/kontakt" className="text-gray-600 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Kontakt</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
