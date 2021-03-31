import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <footer className="footer bg-white pb-3 fixed-bottom">
      <hr className="mt-0" />
      <Row>
        <Col className="col-sm-6 mx-auto text-center">
          {new Date().getFullYear()}&nbsp;&nbsp;
          {process.env.NEXT_PUBLIC_TITLE}
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
