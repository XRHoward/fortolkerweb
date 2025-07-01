import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28 px-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
