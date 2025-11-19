import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Mail, Map, Phone, ArrowUp } from "react-feather";
import { Smartphone, MapPin, PhoneCall, Printer } from 'react-feather'
import Nav from 'react-bootstrap/Nav';
import { env } from '../../util/constants/common';
import Image from 'next/image';

import { FaLaptopCode, FaCloud, FaLock, FaCogs, FaLightbulb } from "react-icons/fa";
import { MdOutlineDesignServices } from "react-icons/md";
import { AiOutlineAppstore } from "react-icons/ai";
import { SiAdobe } from "react-icons/si";

import { FaHome, FaIndustry, FaServicestack, FaUserGraduate, FaBookOpen, FaEnvelope } from "react-icons/fa";
import { FaFilm, FaUniversity, FaShoppingCart, FaLandmark, FaHeartbeat } from "react-icons/fa";
import { FaWhatsapp, FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { usePathname } from "next/navigation";

const Footer = ({ homeData }) => {

  const casestudy = Array.isArray(homeData?.projects) ? homeData.projects?.[0] : [];
  const serviceIcons = {
    "application-development": <FaLaptopCode />,
    "analytics-and-ai": <FaLightbulb />,
    "application-maintenance": <FaCogs />,
    "application-solutioning": <AiOutlineAppstore />,
    "cloud-and-devops-services": <FaCloud />,
    "cybersecurity-services": <FaLock />,
    "digital-transformation": <MdOutlineDesignServices />,
    "professional-services-final": <FaCogs />,
    "ui-ux": <SiAdobe />,
  };
  const industryIcons = {
    "media-and-entertainment": <FaFilm />,
    "banking-insurance-and-finance": <FaUniversity />,
    "e-business": <FaShoppingCart />,
    "government": <FaLandmark />,
    "healthcare-and-wellness": <FaHeartbeat />,
    "manufacturing": <FaIndustry />,
  };
  const menuIcons = {
    "home": <FaHome />,
    "about": <MdInfo />,
    "industries": <FaIndustry />,
    "services": <FaServicestack />,
    "skills": <GiSkills />,
    "career": <FaUserGraduate />,
    "casestudy": <FaBookOpen />,
    "contact": <FaEnvelope />,
  };

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
                            {/* <span className='footer-icon'>
                          {menuIcons['casestudy'] || <FaHome />}
                        </span> */}
                            <Nav.Link href={`/${item.slug}/${casestudy.slug}`}>{item.name}</Nav.Link>
                          </li>
                        );
                      } else {
                        return (
                          //item.slug !== "service" && item.slug !== "industries" && (
                          <li className='footer-li' key={index}>
                            {/* <span className='footer-icon'>
                            {menuIcons[item.slug] || <FaHome />}
                          </span> */}
                            <Nav.Link href={`/${item.slug}`}>
                              {item.name}
                            </Nav.Link>
                          </li>
                          //)
                        );
                      }
                    })}
                    <li className='footer-li'>
                        <Nav.Link href="/blogs">
                          Blogs
                        </Nav.Link>
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={4}>
                  <div className='footer-txt'>Industries</div>
                  <ul className='footer-list'>
                    {homeData?.industries?.children?.map((item, index) => (
                      <li className='footer-li' key={index}>
                        {/* <span className='footer-icon'>
                      {industryIcons[item.slug] || <FaLaptopCode />} 
                    </span> */}
                        <Nav.Link href={`/industries/${item.slug}`}>{item.name}</Nav.Link>
                      </li>
                    ))}
                  </ul>
                </Col>
                <Col xs={12} md={4}>
                  <div className='footer-txt'>Our Services</div>
                  <ul className='footer-list'>
                    {homeData?.services?.children?.map((item, index) => (
                      <li className='footer-li' key={index}>
                        {/* <span className='footer-icon'>
                        {serviceIcons[item.slug] || <FaLaptopCode />}
                      </span> */}
                        <Nav.Link href={`/services/${item.slug}`}>{item.name}</Nav.Link>
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
            <Col xs={12} lg={6} className="text-lg-end text-start">
              <a href='#' className='scroll-top'><ArrowUp size={16} /></a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
export default React.memo(Footer);