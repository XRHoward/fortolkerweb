import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../lib/sanity';

export default function Header({ globalSettings }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            {globalSettings?.logo?.asset && (
              <Image
                src={urlFor(globalSettings.logo).width(80).url()}
                alt="Fortolker logo"
                width={40}
                height={40}
              />
            )}
            <span className="text-2xl font-bold text-gray-900">Fortolker AS</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600">Hjem</Link>
            <Link href="/om-oss" className="text-gray-600 hover:text-blue-600">Om oss</Link>
            <Link href="/tjenester" className="text-gray-600 hover:text-blue-600">Tjenester</Link>
            <Link href="/kontakt" className="text-gray-600 hover:text-blue-600">Kontakt</Link>
          </nav>
          <div className="md:hidden">
            <button className="text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
