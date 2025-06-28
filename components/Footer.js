import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Fortolker AS</h3>
            <p className="text-gray-400">
              Rådgiver innen teknologi, innovasjon og ledelse
            </p>
            <p className="text-gray-400 mt-2">
              Org.nr: 835 770 052
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Lenker</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Hjem
                </Link>
              </li>
              <li>
                <Link href="/om-oss" className="text-gray-400 hover:text-white">
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/tjenester" className="text-gray-400 hover:text-white">
                  Tjenester
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-white">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tjenester</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tjenester" className="text-gray-400 hover:text-white">
                  Teknologirådgivning
                </Link>
              </li>
              <li>
                <Link href="/tjenester" className="text-gray-400 hover:text-white">
                  Innovasjonsrådgivning
                </Link>
              </li>
              <li>
                <Link href="/tjenester" className="text-gray-400 hover:text-white">
                  Innleid ledelse
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <address className="text-gray-400 not-italic">
              Tlf: +47 996 03 611 <br />
              E-post: hei AT fortolker.no <br />
              LinkedIn: <a href="https://www.linkedin.com/company/fortolker/">Fortolker</a>
              </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          © {new Date().getFullYear()} Fortolker AS. Alle rettigheter forbeholdt.
        </div>
      </div>
    </footer>
  );
}
