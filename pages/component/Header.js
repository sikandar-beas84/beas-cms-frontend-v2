import React, { JSX } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Col, Row } from "react-bootstrap";
import { Mail, Phone } from "react-feather";
import { env } from '../../util/constants/common';
import { useRouter } from 'next/router';


export default function Header({homeData}) {
  const router = useRouter();
  const casestudy = Array.isArray(homeData?.projects) ? homeData.projects?.[0] : [];
  return (
    <>
      <section className="blue-bg p-10">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={6}>
              <p className="main-focus-text mb-0">AI-Driven Development • Faster Execution • Smarter Results</p>
            </Col>
            <Col xs={12} md={6} className="d-none d-md-block">
              <ul className="d-flex justify-content-md-end gap-4 m-0 p-0">
                <li>
                  <a href="mailto:beas@beas.co.in" className="text-white d-flex align-items-center gap-2 text-decoration-none">
                    <Mail size={16} /> beas@beas.co.in
                  </a>
                </li>
                <li>
                  <a href="tel:+913323211380" className="text-white d-flex align-items-center gap-2 text-decoration-none">
                    <Phone size={16} /> +91-33-2321-1380
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <Navbar expand="lg" className="bg-white p-4">
        <Container>
          <Navbar.Brand href="#">
            <img src="/assets/images/logo.png" alt="logo" className='img-fluid' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mx-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {homeData?.menus
                ?.sort((a, b) => a.order - b.order) // sort menus by order field
                ?.map((item, index) => {
                  // Special dropdown for Industries
                  if (item.slug === "industries") {
                    return (
                      <NavDropdown title="Industries" id="navbarScrollingDropdown" key={index}>
                        {homeData?.industries?.children?.map((child, i) => (
                          <NavDropdown.Item href={`/industries/${child.slug}`} key={i}>
                            {child.name}
                          </NavDropdown.Item>
                        ))}
                      </NavDropdown>
                    );
                  }

                  // Special dropdown for Services
                  if (item.slug === "services") {
                    return (
                      <NavDropdown title="Services" id="navbarScrollingDropdown" key={index}>
                        {homeData?.services?.children?.map((child, i) => (
                          <NavDropdown.Item href={`/services/${child.slug}`} key={i}>
                            {child.name}
                          </NavDropdown.Item>
                        ))}
                      </NavDropdown>
                    );
                  }

                  // Special case for Case Study
                  if (item.slug === "casestudy") {
                    return (
                      <Nav.Link href={`/${item.slug}/${casestudy.slug}`} key={index}>
                        {item.name}
                      </Nav.Link>
                    );
                  }

                  // Default menu item
                  return (
                    <Nav.Link href={`/${item.slug}`} key={index}>
                      {item.name}
                    </Nav.Link>
                  );
                })}
            </Nav>
            <Form className="d-flex">
              <Button variant="outline-primary">Request A Quote</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
