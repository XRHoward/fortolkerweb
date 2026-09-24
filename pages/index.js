import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { client } from '../lib/sanity';
import { urlFor } from '../lib/sanity';
import { t } from '../lib/i18n';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { format } from 'date-fns';
import { nb, enGB } from 'date-fns/locale';


function ClientLogo({ c }) {
  const inner = c.logo?.asset?.url
    ? <img src={c.logo.asset.url} alt={c.name} className="w-full h-full object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
    : <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-gray-400 text-sm font-medium">{c.name}</div>;

  const wrapper = "flex items-center justify-center w-full h-12";

  if (c.url) {
    return (
      <a href={c.url} target="_blank" rel="noopener noreferrer" title={c.name} className={wrapper}>
        {inner}
      </a>
    );
  }
  return <div className={wrapper}>{inner}</div>;
}

function ChevronIcon({ direction }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === 'left' ? 'm15 6-6 6 6 6' : 'm9 6 6 6-6 6'} />
    </svg>
  );
}

function ClientsSection({ clients, locale }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [clients]);

  // Blar én «side» (inntil 5 logoer) om gangen
  const scrollByPage = (direction) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth, behavior: 'smooth' });
  };

  if (!clients || clients.length === 0) return null;

  const arrowClass = 'absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full border border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:text-gray-900 transition disabled:opacity-30 disabled:cursor-default';

  return (
    <section className="pt-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          {locale === 'en' ? 'Some of the people we have worked with' : 'Noen av dem vi har jobbet med'}
        </h2>
        <div className="relative px-12 md:px-14">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            aria-label={locale === 'en' ? 'Previous clients' : 'Forrige kunder'}
            className={`${arrowClass} left-0`}
          >
            <ChevronIcon direction="left" />
          </button>
          <div
            ref={trackRef}
            onScroll={updateArrows}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
          >
            {clients.map((c) => (
              <div key={c._id} className="shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 snap-start px-4 md:px-6">
                <ClientLogo c={c} />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            aria-label={locale === 'en' ? 'More clients' : 'Flere kunder'}
            className={`${arrowClass} right-0`}
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function FeaturedPostSection({ post, locale }) {
  if (!post?.slug?.current) return null;

  const title = t(post, 'title', locale);
  const excerpt = t(post, 'excerpt', locale);
  const dateLocale = locale === 'en' ? enGB : nb;
  const date = post.date ? format(new Date(post.date), 'd. MMMM yyyy', { locale: dateLocale }) : null;
  // Ca. 200 ord i minuttet, regnet ut fra antall tegn (≈ 6 tegn per ord inkl. mellomrom)
  const readingMinutes = post.charCount ? Math.max(1, Math.round(post.charCount / 6 / 200)) : null;
  const meta = [
    date,
    readingMinutes && (locale === 'en' ? `${readingMinutes} min read` : `${readingMinutes} min lesing`),
  ].filter(Boolean).join(' · ');

  return (
    <section className="pt-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          {locale === 'en' ? 'Latest insights' : 'Siste innsikt'}
        </h2>

        <Link
          href={`/innsikt/${post.slug.current}`}
          className="group grid grid-cols-1 md:grid-cols-12 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-100 transition-shadow duration-300"
        >
          <div className="relative md:col-span-7 h-56 sm:h-72 md:h-auto md:min-h-[420px] bg-gray-100">
            {post.mainImage?.asset?.url && (
              <Image
                src={urlFor(post.mainImage).width(1200).quality(80).url()}
                alt={t(post.mainImage, 'alt', locale) || title}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            )}
          </div>
          <div className="md:col-span-5 flex flex-col justify-center gap-4 md:gap-5 p-6 md:p-10 lg:p-12">
            {post.categories?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.slice(0, 3).map((cat) => (
                  <span key={cat._id} className="text-sm font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                    {t(cat, 'title', locale)}
                  </span>
                ))}
              </div>
            )}
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 group-hover:text-blue-700 transition-colors">
              {title}
            </h3>
            {excerpt && (
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">{excerpt}</p>
            )}
            {(post.author?.name || meta) && (
              <div className="flex items-center gap-3">
                {post.author?.image?.asset?.url && (
                  <img
                    src={urlFor(post.author.image).width(80).height(80).url()}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div className="flex flex-col">
                  {post.author?.name && <span className="text-sm font-semibold text-gray-900">{post.author.name}</span>}
                  {meta && <span className="text-sm text-gray-500">{meta}</span>}
                </div>
              </div>
            )}
            <span className="inline-flex items-center gap-2 font-semibold text-blue-600 group-hover:text-blue-800">
              {locale === 'en' ? 'Read the article' : 'Les artikkelen'}
              <ArrowIcon />
            </span>
          </div>
        </Link>

        <div className="mt-8 flex justify-center">
          <Link href="/innsikt" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-900 font-medium py-3 px-6 rounded-md transition duration-300">
            {locale === 'en' ? 'See all articles' : 'Se alle artikler'}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home({ globalSettings, homePage, featuredPost, clients, locale }) {
  const heroHeading = t(homePage, 'heroHeading', locale) || 'Rådgivning for fremtidens utfordringer';
  const heroSubheading = t(homePage, 'heroSubheading', locale) || 'Vi hjelper bedrifter med å navigere i skjæringspunktet mellom teknologi, innovasjon og bærekraft.';

  // Bruk hotspot satt i Sanity Studio som fokuspunkt for hero-bildet, slik at
  // riktig del av bildet (f.eks. ansiktet på et portrett) blir synlig når
  // bildet beskjæres på ulike skjermstørrelser. Uten hotspot: anta at
  // motivet står i venstre tredjedel, litt over midten (vanlig for
  // portrettbilder), i stedet for å midtstille beskjæringen.
  const hotspot = homePage?.heroImage?.hotspot;
  const heroImagePosition = hotspot
    ? `${(hotspot.x * 100).toFixed(1)}% ${(hotspot.y * 100).toFixed(1)}%`
    : '18% 20%';

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Fortolker AS - Rådgivning innen innovasjon, teknologi og kommunikasjon</title>
        <meta name="description" content="Fortolker tilbyr rådgivning innen innovasjon, teknologi og kommunikasjon for å hjelpe din bedrift med å møte fremtidens utfordringer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden h-[560px] sm:h-[620px] md:h-[680px] xl:h-[760px] 2xl:h-[860px]">
          {homePage?.heroImage?.asset?.url ? (
            <Image
              src={urlFor(homePage.heroImage).width(1600).quality(80).url()}
              alt={heroHeading}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: heroImagePosition }}
            />
          ) : (
            <div className="absolute inset-0 bg-gray-200" />
          )}

          {/* Skygge-overlegg: bunn-tungt på mobil (teksten ligger nederst),
              venstre-tungt fra md og opp (teksten ligger til venstre) */}
          <div
            className="absolute inset-0 md:hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(9,13,26,0.05) 0%, rgba(9,13,26,0.2) 45%, rgba(9,13,26,0.82) 85%, rgba(9,13,26,0.93) 100%)',
            }}
          />
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background:
                'linear-gradient(100deg, rgba(9,13,26,0.88) 0%, rgba(9,13,26,0.62) 34%, rgba(9,13,26,0.18) 60%, rgba(9,13,26,0) 80%)',
            }}
          />

          <div className="relative h-full container mx-auto px-4">
            <div className="flex h-full items-end md:items-center pb-10 md:pb-0">
              <div className="max-w-xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 leading-tight tracking-tight">
                  {heroHeading}
                </h1>
                <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-md md:max-w-lg">
                  {heroSubheading}
                </p>
                <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                  <Link href="/kontakt" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300">
                    {locale === 'en' ? 'Get in touch' : 'Kontakt oss'}
                  </Link>
                  <Link href="/tjenester" className="inline-block bg-white/10 hover:bg-white/20 border border-white/40 text-white font-medium py-3 px-6 rounded-md transition duration-300">
                    {locale === 'en' ? 'Our services' : 'Våre tjenester'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t(homePage, 'introHeading', locale)}
              </h2>
              <p className="text-lg text-gray-600">
                {t(homePage, 'introText', locale)}
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        {homePage?.featuredServices?.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{locale === 'en' ? 'Our services' : 'Våre tjenester'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {homePage.featuredServices.map((service) => (
                  <Link href={`/tjenester#${service.slug.current}`} key={service.slug.current} className="block bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 h-full min-h-[360px]">
                      <div className="flex flex-col h-full items-center text-center">
                        <div className="w-20 h-20 mb-6">
                          {service.image?.asset?.url ? (
                            <img
                              src={service.image.asset.url}
                              alt={service.title}
                              className="w-full h-full object-contain rounded"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                              Ingen bilde
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {t(service, 'title', locale)}
                        </h3>
                        <p className="text-gray-600 mb-4 flex-grow">
                          {t(service, 'shortDescription', locale)}
                        </p>
                        <span className="text-blue-600 hover:text-blue-800 font-medium mt-auto">
                          {locale === 'en' ? 'Read more →' : 'Les mer →'}
                        </span>
                      </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Clients Section */}
        <ClientsSection clients={clients} locale={locale} />

        {/* Featured Blog Post */}
        <FeaturedPostSection post={featuredPost} locale={locale} />

        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-blue-600 rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                {t(homePage, 'ctaHeading', locale)}
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                {t(homePage, 'ctaText', locale)}
              </p>
              <Link href="/kontakt" className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-md transition duration-300">
                {t(homePage, 'ctaButtonText', locale) || (locale === 'en' ? 'Contact us' : 'Kontakt oss')}
              </Link>
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
    const globalSettingsQuery = `*[_type == "globalSettings"][0]`;

    const homePageQuery = `*[_type == "homePage"][0]{
      title,
      heroHeading,
      heroSubheading,
      heroImage {
        asset->{
          _id,
          url
        },
        hotspot
      },
      introHeading,
      introText,
      featuredServices[]->{
        title, title_en,
        slug,
        shortDescription, shortDescription_en,
        image {
          asset->{
            _id,
            url
          }
        }
      },
      ctaHeading, ctaHeading_en,
      ctaText, ctaText_en,
      ctaButtonText, ctaButtonText_en,
      heroHeading_en, heroSubheading_en,
      introHeading_en, introText_en,
      title_en,
      featuredClients[]->{
        _id,
        name,
        url,
        logo {
          asset->{
            _id,
            url
          }
        }
      }
    }`;

    // Fremhevet innlegg velges i Sanity; faller tilbake til siste innlegg
    const postFields = `{
      title, title_en,
      slug,
      excerpt, excerpt_en,
      "date": coalesce(publishedAt, _createdAt),
      "charCount": length(pt::text(body)),
      mainImage { asset->{ _id, url }, hotspot, crop, alt, alt_en },
      author->{ name, image { asset->{ _id, url } } },
      categories[]->{ _id, title, title_en }
    }`;
    const featuredPostQuery = `coalesce(
      *[_type == "homePage"][0].featuredPost->${postFields},
      *[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)[0]${postFields}
    )`;

    const globalSettings = await client.fetch(globalSettingsQuery);
    const homePage = await client.fetch(homePageQuery);
    const featuredPost = await client.fetch(featuredPostQuery);
    // Kunder valgt under «Fremhevede kunder» på Forsiden; ellers alle kunder
    const clients = homePage?.featuredClients?.length
      ? homePage.featuredClients
      : await client.fetch(`*[_type == "client" && defined(logo.asset)] | order(coalesce(order, 999) asc, name asc){
          _id, name, url, logo { asset->{ _id, url } }
        }`);

    return {
      props: {
        globalSettings,
        homePage,
        featuredPost: featuredPost || null,
        clients: clients || [],
        locale,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Feil ved henting av innhold fra Sanity:', error);
    return {
      props: {
        globalSettings: {},
        homePage: {},
        featuredPost: null,
        clients: [],
        locale,
      },
    };
  }
}
