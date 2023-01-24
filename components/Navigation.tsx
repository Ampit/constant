//import Link from "next/link";
import { signOut, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Nav, Navbar, Button, Container, Row, Col } from "react-bootstrap";

const Navigation = () => {
  const { data: session } = useSession();
  const { pathname } = useRouter();
  const [activePage, setActivePage] = useState({
    "/": "",
    "/tasks": "",
    "/recurringtasks": "",
    "/profile": "",
  });

  useEffect(() => {
    const updateActivePage = activePage;
    updateActivePage[pathname as keyof typeof updateActivePage] = "active";
    setActivePage(updateActivePage);
  }, [pathname]);

  return (
    <Container>
      <Row>
        <Col className="col-md-12">
          <Navbar collapseOnSelect expand="md">
            <Navbar.Brand href="/">Constant</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="justify-content-center"
              id="basic-navbar-nav"
            >
              <Nav variant="pills" className="mr-auto">
                <Nav.Link className={activePage["/"]} href="/">
                  Dashboard
                </Nav.Link>
                {session && (
                  <>
                    <Nav.Link className={activePage["/tasks"]} href="/tasks">
                      Tasks
                    </Nav.Link>
                    <Nav.Link
                      className={activePage["/recurringtasks"]}
                      href="/recurringtasks"
                    >
                      Recurring Tasks
                    </Nav.Link>
                    <Nav.Link
                      className={activePage["/profile"]}
                      href="/profile"
                    >
                      Profile
                    </Nav.Link>
                  </>
                )}
              </Nav>
              {session && (
                <>
                  <Navbar.Text>Signed in as: {session.user?.email}</Navbar.Text>
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
