import React, { useState } from "react";
import { useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Col, Row } from "react-bootstrap";
import { Mail, Phone } from "react-feather";
import { useRouter } from 'next/router';
import { env } from '../../util/constants/common';
import Image from 'next/image';
import Link from "next/link";

const Header = ({ homeData }) => {
  const router = useRouter();
  const casestudy = Array.isArray(homeData?.projects) ? homeData.projects?.[0] : [];
  const emblemRef = useRef(null);

  useEffect(() => {
    if (!emblemRef.current) return;

    const element = emblemRef.current;
    const text = element.innerText;
    element.innerHTML = "";

    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      const span = document.createElement("span");
      span.textContent = letter;

      const r = (360 / text.length) * i;
      const x = (Math.PI / text.length).toFixed(0) * i;
      const y = (Math.PI / text.length).toFixed(0) * i;

      span.style.transform = `rotate(${r}deg) translate3d(${x}px, ${y}px, 0)`;

      element.appendChild(span);
    }
  }, []);



  const [showService, setServiceShow] = useState(false);
  const [showIndustry, setIndustryShow] = useState(false);
  const [open, setOpen] = useState(false);

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
                  <a href={`mailto:${homeData?.contactus?.email}`} className="text-white d-flex align-items-center gap-2 text-decoration-none">
                    <Mail size={16} /> {homeData?.contactus?.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${homeData?.contactus?.mobile}`} className="text-white d-flex align-items-center gap-2 text-decoration-none">
                    <Phone size={16} /> {homeData?.contactus?.mobile}
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <Navbar expand="lg" className="bg-white p-4">
        <Container>
          <Navbar.Brand href="/">
            <Image
              src={`${env.BACKEND_BASE_URL}${homeData?.logo?.image}`}
              alt="Logo"
              width={300}
              height={50}
              priority
              fetchPriority="high"
              className="img-fluid"
            />
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
                      <NavDropdown
                        title="Industries"
                        id="navbarScrollingDropdown"
                        key={index}
                        show={showIndustry}
                        onMouseEnter={() => setIndustryShow(true)}
                        onMouseLeave={() => setIndustryShow(false)}
                      >
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
                      <NavDropdown
                        title="Services"
                        id="services-menu"
                        show={showService}
                        onMouseEnter={() => setServiceShow(true)}
                        onMouseLeave={() => setServiceShow(false)}
                      >

                        {homeData?.services?.children?.map((child, i) => {

                          const shouldShowSubmenu = child.slug.toLowerCase() === "application-solutioning";

                          return shouldShowSubmenu ? (
                            // Show submenu ONLY for "Application Solutioning"
                            <NavDropdown
                              title={child.name}
                              id={`child-${child.slug}`}
                              drop="end"
                              show={open}
                              onMouseEnter={() => setOpen(true)}
                              onMouseLeave={() => setOpen(false)}
                              className="nested-dropdown"
                            >
                              {child.children?.map((sub, j) => (
                                <NavDropdown.Item href={`/services/${sub.slug}`} key={j}>
                                  {sub.name}
                                </NavDropdown.Item>
                              ))}
                            </NavDropdown>
                          ) : (
                            // For all OTHER menus, show as normal link (NO submenu)
                            <NavDropdown.Item
                              key={i}
                              href={`/services/${child.slug}`}
                            >
                              {child.name}
                            </NavDropdown.Item>
                          );
                        })}

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
             <div className="glow">
              <Button variant="outline-primary" onClick={() => router.push('/contact')}>Get Quote</Button>
              </div>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <Link href="#" className="">
        <Image
          src="/assets/images/whatsapp.png"
          alt="whatsApp"
          width={60}
          height={60}
          priority
          fetchPriority="high"
          className="img-fluid fixed-social"
        />

      </Link> */}


      {/* <div className="badge fixed-social">
        
        <Image
          src="/assets/images/whatsapp.png"
          alt="whatsApp"
          width={50}
          height={50}
          className="center-icon"
          onClick={() => {
            window.open(
              "https://wa.me/9433068494?text=BEAS%20CONSULTANCY%20PT%20LTD.",
              "_blank"
            );
          }}
        />
      </div> */}










      {/* <div className="wpp-iicon">
  <div className="emblem" ref={emblemRef}>Connect With Us*</div>

  <Image
    src="/assets/images/whatsapp.png"
    alt="WhatsApp"
    width={40}
    height={40}
    className="img-fluid"
    onClick={() => {
      window.open(
        "https://wa.me/9433068494/?text=Hi%20BEAS%20CONSULTANCY%20AND%20SERVICES%20PVT.%20LTD.",
        "_blank"
      );
    }}
  />
</div> */}


      <div class="wpp-iicon" >
        <div class="emblem">
          <svg viewBox="0 0 200 200">
            <defs>
              <path
                id="circlePath"
                d="
                  M 100, 100
                  m -64, 0
                  a 64,64 0 1,1 128,0
                  a 64,64 0 1,1 -128,0
                "
              />
            </defs>

            <text font-size="18" fill="#000" font-weight="bold" textLength="402">
              <textPath href="#circlePath">
                CONNECT WITH US *  CONNECT WITH US  *
              </textPath>
            </text>
          </svg>
        </div>

        <Image
          src="/assets/images/whatsapp.png"
          alt="WhatsApp"
          width={40}
          height={40}
          className="wp-icon"
          onClick={() => {
            window.open(
              "https://wa.me/9433068494/?text=Hi%20BEAS%20CONSULTANCY%20AND%20SERVICES%20PVT.%20LTD.",
              "_blank"
            );
          }}
        />
      </div>







    </>
  );
}
export default React.memo(Header);