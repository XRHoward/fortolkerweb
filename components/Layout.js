import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, globalSettings }) {
  return (
    <>
      <Header globalSettings={globalSettings} />
      <main className="pt-24 md:pt-28 px-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
