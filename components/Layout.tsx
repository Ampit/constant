import Meta from "./Meta";
import Navigation from "./Navigation";
import Header from "./Header";
import Footer from "./Footer";
import { Container, Row, Col } from "react-bootstrap";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Navigation />
      <Container>
        <Row>
          <Col className="col-md-8 mx-auto mb-5">
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
