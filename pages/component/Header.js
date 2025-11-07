"use client";
import React from 'react'
import Container from 'react-bootstrap/Container';
import { Col, Row, Dropdown } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { Phone } from 'react-feather';
import { PhoneCall } from 'react-feather';
import { useRouter } from 'next/router';
import { env } from '../../util/constants/common';
import Image from 'next/image';

const Header = ({homeData}) => {
  const router = useRouter();
  const casestudy = Array.isArray(homeData?.projects) ? homeData.projects?.[0] : [];
  return (
    <>
    <div className="nav-white-bg fixed-top shadow-sm">
          <Container>
            <Row>
              <Col>
                <Navbar collapseOnSelect expand="lg">

                  <Navbar.Brand href={env.SITE_URL}>
                  <Image
                    src={`${env.BACKEND_BASE_URL}${homeData?.logo?.image}`}   // use optimized format (webp/avif)
                    alt="Hero Banner"
                    width={300}
                    height={50}
                    priority      // ✅ ensures this image is not lazy-loaded
                    fetchPriority="high" // ✅ tells browser it’s critical
                    className="img-fluid" // you can keep bootstrap class
                  />
                    </Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mx-auto">
                    {homeData?.menus
                      ?.sort((a, b) => a.order - b.order) // sort menus by order field
                      ?.map((item, index) => {
                        // Special dropdown for Industries
                        if (item.slug === "industries") {
                          return (
                            <NavDropdown title="Industries" id="industries-dropdown" key={index}>
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
                            <NavDropdown title="Services" id="services-dropdown" key={index}>
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


                    {/* <Nav className="mx-auto">
                      { homeData?.menus?.slice(0, 2).map((item, index)=>(
                        <Nav.Link href={`/${item.slug}`} key={index}>{item.name}</Nav.Link>
                      ))}

                      <NavDropdown title="Industries" id="collapsible-nav-dropdown">
                        { homeData?.industries?.children?.map((item, index)=>(
                          <NavDropdown.Item href={`/industries/${item.slug}`} key={index}> {item.name}</NavDropdown.Item>
                        ))}
                      </NavDropdown>

                      <NavDropdown title="Services" id="collapsible-nav-dropdown">
                        { homeData?.services?.children?.map((item, index)=>(
                          <NavDropdown.Item href={`/service/${item.slug}`} key={index}> {item.name}</NavDropdown.Item>
                        ))}
                      </NavDropdown>
                    
                      {homeData?.menus?.slice(4, 9).map((item, index) => {
                        if (item.slug === 'casestudy') {
                          return (
                            <Nav.Link href={`/${item.slug}/${casestudy.slug}`} key={index}>
                            {item.name}
                            </Nav.Link>
                          );
                        } else {
                          return (
                            <Nav.Link href={`/${item.slug}`} key={index}>
                              {item.name}
                            </Nav.Link>
                          );
                        }
                      })}
                    </Nav> */}
                    
                    <Nav>
                    <Nav.Link href="#"><div className='d-flex top-phone-txt'><PhoneCall /><div>For any query <strong>{homeData?.contactus?.mobile}</strong></div></div></Nav.Link>
                      {/* <Nav.Link href="#" className="gradient-border">
                       Get Quote
                      </Nav.Link> */}
                      {/* <Nav.Link href="#" className="blue-btn2">
                       Get Quote
                      </Nav.Link> */}
                    </Nav>
                  </Navbar.Collapse>

                </Navbar>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="quote-bar" onClick={() => router.push('/contact')} style={{ cursor: 'pointer' }}>Get Quote</div>
        </>
  )
}

export default React.memo(Header);
