import Head from 'next/head';
import Link from 'next/link';
import { client } from '../../lib/sanity';
import { urlFor } from '../../lib/sanity';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { PortableText } from '@portabletext/react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || ' '}
            className="w-full rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-600">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold text-gray-900 mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-600 pl-4 py-2 my-6 italic text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = value.blank ? '_blank' : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          target={target}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      );
    },
  },
};

export default function BloggInnlegg({ post, relatedPosts }) {
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Innlegget ble ikke funnet
            </h1>
            <Link href="/blogg" className="text-blue-600 hover:text-blue-800">
              Tilbake til bloggen
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{post.seo?.metaTitle || post.title} - Fortolker AS</title>
        <meta
          name="description"
          content={post.seo?.metaDescription || post.excerpt || ''}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow pt-20">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">
                Hjem
              </Link>
              <span className="mx-2">/</span>
              <Link href="/blogg" className="hover:text-blue-600">
                Blogg
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/blogg?kategori=${category.slug.current}`}
                      className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center text-gray-600 mb-8 pb-8 border-b">
                {post.author && (
                  <div className="flex items-center mr-6">
                    {post.author.image && (
                      <img
                        src={urlFor(post.author.image).width(48).height(48).url()}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full mr-3"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{post.author.name}</p>
                      {post.publishedAt && (
                        <p className="text-sm">
                          {format(new Date(post.publishedAt), 'd. MMMM yyyy', { locale: nb })}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Main Image */}
              {post.mainImage && (
                <div className="mb-8">
                  <img
                    src={urlFor(post.mainImage).width(1200).url()}
                    alt={post.mainImage.alt || post.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              )}

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                {post.body && <PortableText value={post.body} components={portableTextComponents} />}
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t">
                <p className="text-gray-600 mb-4">Del denne artikkelen:</p>
                <div className="flex gap-4">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      typeof window !== 'undefined' ? window.location.href : ''
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      typeof window !== 'undefined' ? window.location.href : ''
                    )}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Relaterte artikler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost._id}
                    href={`/blogg/${relatedPost.slug.current}`}
                    className="group"
                  >
                    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                      {relatedPost.mainImage && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={urlFor(relatedPost.mainImage).width(400).height(300).url()}
                            alt={relatedPost.mainImage.alt || relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        {relatedPost.excerpt && (
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back to Blog */}
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/blogg"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Tilbake til bloggen
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const query = `*[_type == "post"]{ "slug": slug.current }`;
  const posts = await client.fetch(query);

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  try {
    const postQuery = `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        image {
          asset->{
            _id,
            url
          }
        }
      },
      categories[]->{
        _id,
        title,
        slug
      },
      body,
      seo
    }`;

    const relatedPostsQuery = `*[_type == "post" && slug.current != $slug] | order(publishedAt desc) [0...3]{
      _id,
      title,
      slug,
      excerpt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      }
    }`;

    const post = await client.fetch(postQuery, { slug: params.slug });
    const relatedPosts = await client.fetch(relatedPostsQuery, { slug: params.slug });

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post,
        relatedPosts,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Feil ved henting av blogginnlegg:', error);
    return {
      notFound: true,
    };
  }
}
