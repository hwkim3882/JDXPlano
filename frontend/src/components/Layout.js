import Navbar from './Navbar';
import Footer from './Footer';
import AiChat from './AiChat/AiChat';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <AiChat />
    </div>
  );
}

export default Layout;
