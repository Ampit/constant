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
        <div className="row">
          <div className="col-sm-6 mx-auto mb-5">
            <Header />
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
