import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const logoUrl = 'https://cdn.sanity.io/images/7izj8dsr/production/6403968b9ca8e6a2843933f03d863bd41f9cedb3-750x417.png';

  return (
    <header className="bg-white shadow-sm">
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
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600">Hjem</Link>
            <Link href="/om-oss" className="text-gray-600 hover:text-blue-600">Om oss</Link>
            <Link href="/tjenester" className="text-gray-600 hover:text-blue-600">Tjenester</Link>
            <Link href="/kontakt" className="text-gray-600 hover:text-blue-600">Kontakt</Link>
          </nav>
          <div className="md:hidden">
            <button className="text-gray-600" aria-label="Åpne meny">
              <svg className="w-6 h-6" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
