import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Mail, Map, Phone, ArrowUp } from "react-feather";
import Nav from 'react-bootstrap/Nav';
import { env } from '../../util/constants/common';
import Image from 'next/image';
import Link from 'next/link';

const Footer = ({ homeData }) => {

  const casestudy = Array.isArray(homeData?.projects) ? homeData.projects?.[0] : [];
  
  // Step 1: Expand application-solutioning
  let finalServices = homeData?.services?.children?.flatMap(item => {
    if (item.slug === "application-solutioning") {
      return item.children?.map(child => ({
        slug: child.slug,
        name: child.name
      }));
    }

    return [{
      slug: item.slug,
      name: item.name
    }];
  });

  // Step 2: Move specific items to the bottom
  const bottomSlugs = ["ui-ux", "professional-services"];

  finalServices = [...finalServices].sort((a, b) => {
    const aLast = bottomSlugs.includes(a?.slug);
    const bLast = bottomSlugs.includes(b?.slug);

    if (aLast && !bLast) return 1;   // a goes down
    if (!aLast && bLast) return -1;  // b goes down
    return 0;
  });
  //////////////////////////////////////////

  return (
    <>

      <footer>
        <Container>

          <Row>
            <Col xs={12} md={8}>
              <Row>
                <Col xs={12} md={4}>
                  <div className='footer-txt'>Quick Links</div>
                  <ul className='footer-list'>
                    {homeData?.menus?.map((item, index) => {
                      if (item.slug === 'casestudy') {
                        return (
                          <li className='footer-li' key={index}>
                            <Link href={`/${item.slug}/${casestudy.slug}`} className="nav-link">{item.name}</Link>
                          </li>
                        );
                      } else {
                        return (
                          //item.slug !== "service" && item.slug !== "industries" && (
                          <li className='footer-li' key={index}>

                            <Link href={`/${item.slug}`} className="nav-link">
                              {item.name}
                            </Link>
                          </li>
                          //)
                        );
                      }
                    })}
                    <li className='footer-li'><Link href="/privacypolicy" passHref className='nav-link'>
                      Privacy Policy
                    </Link></li>
                  </ul>
                </Col>
                <Col xs={12} md={4}>
                  <div className='footer-txt'>Industries</div>
                  <ul className='footer-list'>
                    {homeData?.industries?.children?.map((item, index) => (
                      <li className='footer-li' key={index}>
                        <Link href={`/industries/${item.slug}`} className="nav-link">{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </Col>
                <Col xs={12} md={4}>
                  <div className='footer-txt'>Our Services</div>
                  <ul className="footer-list">
                    {finalServices.map((item, index) => (
                        <li className="footer-li" key={index}>
                          <Link href={`/services/${item.slug}`} className="nav-link">{item.name}</Link>
                          
                        </li>
                      ))}
                  </ul>

                </Col>
              </Row>
            </Col>
            <Col xs={12} md={4}>
              <div className='get-in-touch-block'>
                <div className='footer-txt'>Get In Touch</div>
                <ul>
                  <li><Map size={16} />{homeData?.contactus?.address}</li>
                  <li><Phone size={16} /> {homeData?.contactus?.phone}</li>
                  <li><Mail size={16} /> {homeData?.contactus?.email}</li>

                </ul>
              </div>
            </Col>


          </Row>
          {/* Footer White Section */}

        </Container>
      </footer>
      <section className='bg-white py-2'>
        <Container>
          <Row>
            <Col xs={12} lg={8}>
              <div className='award-section'>
                <ul>
                  {homeData?.certificates?.map((item, index) => (
                    <li className='certificate-icon' key={index}>
                      <Image width={220} height={90} src={`${env.BACKEND_BASE_URL}${item?.image}`} alt="image" loading="lazy" />
                    </li>
                  ))}
                </ul>
              </div>
            </Col>

            <Col xs={12} lg={4}>
              <div className='social-icon-section'>
                <ul>
                    { homeData.socials.map((item,index)=>(
                  <li key={index}>
                    <a
                      href={item?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                     <Image width={30} height={30} src={`${env.BACKEND_BASE_URL}${item?.icon}`} alt="image" loading="lazy" />
                    </a>
                  </li>
                  )) }
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='bg-light-blue py-3'>
        <Container>

          <Row className="d-flex justify-content-between align-items-center">
            <Col xs={12} lg={6}>
              <p className='mb-0'>© 2024 BEAS Consultancy & Services Pvt. Ltd. All Rights Reserved</p>
            </Col>
            <Col xs={12} lg={6} className="text-end">
              <a href='#' className='scroll-top'><ArrowUp size={16} /></a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
export default React.memo(Footer);