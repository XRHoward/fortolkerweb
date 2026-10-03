import '../styles/globals.css';
import 'flag-icons/css/flag-icons.min.css';
import CookieConsent from '../components/CookieConsent';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <CookieConsent />
    </>
  );
}

export default MyApp;
