import '../styles/globals.css';
import Layout from '../components/Layout';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }) {
  return (
    <Layout globalSettings={pageProps.globalSettings}>
    <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);
