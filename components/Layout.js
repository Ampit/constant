import Meta from "./Meta";
import Nav from "./Nav";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav />
      <div className="container">
        <main>
          <Header />
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
