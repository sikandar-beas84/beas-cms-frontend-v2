import React from 'react'
import { Container, Row, Col, Dropdown } from 'react-bootstrap'
import { Smartphone, Mail, MapPin, PhoneCall, Printer } from 'react-feather'
import Nav from 'react-bootstrap/Nav';
import { env } from '../../util/constants/common';
import Image from 'next/image';

import { FaLaptopCode, FaCloud, FaLock, FaCogs, FaLightbulb } from "react-icons/fa";
import { MdOutlineDesignServices } from "react-icons/md";
import { AiOutlineAppstore } from "react-icons/ai";
import { SiAdobe } from "react-icons/si";

import { FaHome, FaIndustry, FaServicestack, FaUserGraduate, FaBookOpen, FaEnvelope } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import { GiSkills } from "react-icons/gi";

const Footer = ({homeData}) => {

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
          <Row className='justify-content-center'>

            <Col xs={12} lg={3} className='mb-md-2 mb-lg-0'>
              <p>Services</p>
              <ul className='service-explore'>
              { homeData?.services?.children?.map((item, index)=>(
                <li style={{listStyleType:'none'}} key={index}>
                  <span className='footer-icon'>
                    {serviceIcons[item.slug] || <FaLaptopCode />} {/* fallback icon */}
                  </span>
                <Nav.Link href={`/services/${item.slug}`}  style={{ color: 'white !important' }}>{item.name}</Nav.Link>
                </li>
              ))}
              </ul>
            </Col>
            <Col xs={12} lg={2}>
              <p>Explore</p>
              <ul className='service-explore'>
              
              { homeData?.menus?.map((item, index)=>{
                if (item.slug === 'casestudy') {
                  return (
                    <li style={{listStyleType:'none'}}key={index}>
                      <span className='footer-icon'>
                        {menuIcons['casestudy'] || <FaHome />}
                      </span>
                    <Nav.Link href={`/${item.slug}/${casestudy.slug}`} style={{ color: 'white !important' }}>{item.name}</Nav.Link>
                    </li>
                     );
                }else {
                  return (
                    //item.slug !== "service" && item.slug !== "industries" && (
                      <li style={{ listStyleType: 'none' }} key={index}>
                        <span className='footer-icon'>
                          {menuIcons[item.slug] || <FaHome />}
                        </span>
                        <Nav.Link href={`/${item.slug}`} style={{ color: 'white' }}>
                          {item.name}
                        </Nav.Link>
                      </li>
                    //)
                    );
                }
              })}
              </ul>
            </Col>
            <Col xs={12} lg={4}>
              <p>Quick Contact</p>
              <ul className='contactInfo'>

                <li><span> <MapPin /></span> <span>{homeData?.contactus?.address}</span></li>

                <li><span><PhoneCall /></span> <span>Phone: {homeData?.contactus?.phone}</span></li>

                <li><span><Smartphone /></span> <span>Mobile: {homeData?.contactus?.mobile}</span></li>

                <li><span><Printer/></span> <span>Fax: {homeData?.contactus?.contactname}</span></li>

                <li><span><Mail /></span> <span>Email: {homeData?.contactus?.email}</span></li>
              </ul>
            </Col>
            <Col xs={12} lg={2}>
              <p>Our Certificate</p>
              <div className='mt-2 CertificatePic'>
                {/* <iframe src={homeData?.contactus?.url} width="100%" height="200" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                { homeData?.certificates?.map((item, index)=>(
                <div className='certificate-icon' key={index}>
                  <Image width={450} height={380} src={`${env.BACKEND_BASE_URL}${item?.image}`} alt="image" loading="lazy" />
                </div>
                ))}
                
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
      <section className='footerBottom'>
        <Container>
          <Row>
            <Col>
              <p className='mb-0 text-center'>© 2024 BEAS Consultancy & Services Pvt. Ltd. All Rights Reserved</p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default React.memo(Footer);