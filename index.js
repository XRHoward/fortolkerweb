import Head from 'next/head';
import Link from 'next/link';
import { client } from '../lib/sanity';
import Layout from '../components/Layout';

export default function Home({ globalSettings, homePage }) {
  return (
    <Layout globalSettings={globalSettings}>
      <Head>
        <title>
          {globalSettings?.siteName || 'Fortolker AS'} - Rådgivning innen innovasjon, teknologi og ledelse
        </title>
        <meta
          name="description"
          content="Fortolker AS tilbyr spesialisert rådgivning innen innovasjon, teknologi og ledelse som hjelper din bedrift med å møte fremtidens utfordringer."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {homePage?.heroHeading || 'Rådgivning for fremtidens utfordringer'}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {homePage?.heroSubheading ||
                  'Vi hjelper bedrifter med å navigere i skjæringspunktet mellom innovasjon, teknologi og ledelse.'}
              </p>
              <Link
                href="/kontakt"
                className="inline-block bg-blue-
