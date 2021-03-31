import Meta from "./Meta";
import Navigation from "./Navigation";
import Header from "./Header";
import Footer from "./Footer";
import { Container, Row, Col } from "react-bootstrap";
import { AppProps } from "next/app";

const Layout = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Meta />
      <Navigation />
      <Container>
        <Row>
          <Col className="col-md-8 mx-auto mb-5">
            <Header />
            <Component {...pageProps} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
