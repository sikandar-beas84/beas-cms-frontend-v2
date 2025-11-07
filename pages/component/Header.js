import React, { JSX } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Col, Row } from "react-bootstrap";
import { Mail, Phone } from "react-feather";
export default function Header() {
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
              <Nav.Link href="#">Home</Nav.Link>
              <NavDropdown title="Services" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Application Development</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Analytics and AI</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Application Maintenance</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Application Solutioning</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Cloud and DevOps Services</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Cybersecurity Services</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Digital transformation</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Professional Services Final</NavDropdown.Item>
                <NavDropdown.Item href="#action3">UI/UX</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Industries" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Media and Entertainment</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Banking , Insurance and Finance</NavDropdown.Item>

              </NavDropdown>
              <Nav.Link href="#">Skill</Nav.Link>
              <Nav.Link href="#">Case Studies</Nav.Link>
              <Nav.Link href="#">Career</Nav.Link>
              <Nav.Link href="#">About Us</Nav.Link>
              <Nav.Link href="#">Contact Us</Nav.Link>

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
