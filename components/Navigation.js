//import Link from "next/link";
import { signOut, signIn } from "next-auth/client";
import { useSession } from "next-auth/client";
import { Nav, Navbar, Button, Container, Row, Col } from "react-bootstrap";

const Navigation = () => {
  const [session] = useSession();

  return (
    <Container>
      <Row>
        <Col className="col-md-12">
          <Navbar>
            <Navbar.Brand href="/">Constant</Navbar.Brand>
            <Nav variant="pills" className="mr-auto">
              <Nav.Link href="/">Dashboard</Nav.Link>
              {session && (
                <>
                  <Nav.Link href="/tasks">Tasks</Nav.Link>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                </>
              )}
            </Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="justify-content-end"
              id="basic-navbar-nav"
            >
              {session && (
                <>
                  <Navbar.Text>Signed in as: {session.user.email}</Navbar.Text>
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Button>
                </>
              )}

              {!session && (
                <>
                  <Button
                    variant="primary"
                    className="ml-2"
                    onClick={() => signIn()}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};

export default Navigation;
