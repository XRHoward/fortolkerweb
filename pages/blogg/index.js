import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { client } from '../../lib/sanity';
import { urlFor } from '../../lib/sanity';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

export default function BloggOversikt({ posts, categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredPosts = selectedCategory
    ? posts.filter(post => 
        post.categories?.some(cat => cat._id === selectedCategory)
      )
    : posts;

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Blogg - Fortolker AS</title>
        <meta name="description" content="Les våre siste artikler om innovasjon, teknologi og ledelse" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Blogg
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Innsikt og perspektiver på innovasjon, teknologi og ledelse
            </p>
          </div>
        </section>

        {/* Category Filter */}
        {categories && categories.length > 0 && (
          <section className="bg-white border-b">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    !selectedCategory
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Alle
                </button>
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category._id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category._id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredPosts && filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post._id} className="group">
                    <Link
                      href={`/blogg/${post.slug.current}`}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col block"
                    >
                      {post.mainImage && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={urlFor(post.mainImage).width(600).height(400).url()}
                            alt={post.mainImage.alt || post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-grow">
                        {post.categories && post.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.categories.map((category) => (
                              <span
                                key={category._id}
                                className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-600"
                              >
                                {category.title}
                              </span>
                            ))}
                          </div>
                        )}
                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center text-sm text-gray-500 mt-auto">
                          {post.author && (
                            <>
                              {post.author.image && (
                                <img
                                  src={urlFor(post.author.image).width(40).height(40).url()}
                                  alt={post.author.name}
                                  className="w-8 h-8 rounded-full mr-2"
                                />
                              )}
                              <span className="mr-3">{post.author.name}</span>
                            </>
                          )}
                          {post.publishedAt && (
                            <span>
                              {format(new Date(post.publishedAt), 'd. MMMM yyyy', { locale: nb })}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Ingen blogginnlegg funnet
                  {selectedCategory && ' i denne kategorien'}.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
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
      }
    }`;

    const categoriesQuery = `*[_type == "category"] | order(title asc) {
      _id,
      title,
      slug
    }`;

    const posts = await client.fetch(postsQuery);
    const categories = await client.fetch(categoriesQuery);

    return {
      props: {
        posts,
        categories
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('Feil ved henting av blogginnlegg:', error);
    return {
      props: {
        posts: [],
        categories: []
      }
    };
  }
}
