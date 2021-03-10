import Meta from "./Meta";
import Navigation from "./Navigation";
import Header from "./Header";
import Footer from "./Footer";
import { Container, Row, Col } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Navigation />
      <Container>
        <Row>
          <Col className="col-sm-6 mx-auto mb-5">
            <Header />
            {children}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
