import React from 'react'
import { Container } from 'react-bootstrap'
import { Col, Row } from "react-bootstrap";
import { ArrowUp, ArrowUpRight, Upload } from "react-feather";
import BreadCrumb from '../component/BreadCrumb';
import Link from 'next/link'
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';

const Career = ({ careers, menucareer }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SEO
        title={menucareer?.name || "Career | Beas Consultancy & Services Pvt. Ltd."}
        description={menucareer?.description || "Explore exciting career opportunities with us."}
        keywords="career, jobs, openings"
        image={
          menucareer?.image
            ? `${env.BACKEND_BASE_URL}${menucareer.image}`
            : `${env.BACKEND_BASE_URL}/default-image.jpg`
        }
        url={`${env.BACKEND_BASE_URL}${menucareer?.slug || 'career'}`}
      />
      <main>
        <BreadCrumb pagetitle="Career" pageBanner={`assets/img/menu-content/${menucareer?.menu_contents?.banner}`} />
        <Container className='py-5'>

          <Row>
            <Col>
              <h1 className='inner-page-title'>{menucareer?.menu_contents?.title}</h1>
              <div className="inner-page-text" dangerouslySetInnerHTML={{ __html: menucareer?.menu_contents?.description }} />
            </Col>
          </Row>
        </Container>

        <Container className='pb-5'>
          <Row>
            {careers?.map((item, index) => (
              <Col key={index} xs={12} md={3} lg={4}>
                <Link href={`/career/${item?.title}`} className="">
                  <div className='skill-wrap'>
                    <div className='sill-wrap-head'>
                      <div className='skill-wrap-img-without-bg'>
                        <Image width={80} height={60} src={`${env.BACKEND_BASE_URL}${item?.image}`} alt="image" className="img-fluid" loading="lazy" />
                      </div>
                      <div className='skill-wrap-head-text'>{item?.role}</div>
                    </div>
                    <div className='sill-wrap-text'>
                      {item?.responsibility}
                    </div>
                    <p className='job-experience-txt'>{item.experience}</p>
                    <button type="button" className="btn btn-primary-blue">Apply</button>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>

        {/* Carrer Details */}
        <Container className='py-5'>

          <Row>
            <Col>
              <h1 className='inner-page-title'>Join BEAS — Drive Growth through Quality</h1>
              <div className="inner-page-text">BEAS’s Software Division had been appraised at CMMI Maturity Level 5 since 2015 and has a portfolio of a wide array of technology implementations ranging
                from legacy to N-tier to mobile, Cloud, Analytics and IOT. A career with BEAS will also enable you to dabble with and gain specialized skills in a host of domains
                namely, E-Governance, media and entertainment, GPS, Transport and Shipping, Air Traffic Management, Banking, E-Commerce, Non-Banking Financials, Travel and
                Tourism, and HealthCare and Wellness. Leverage this exposure in developing domain rich solutions and redefine your career in Information Technology.
                BEAS thrives on its passion to venture into new technologies, learn from them and deliver matured implementations. With an opportunity to delve into
                cutting-edge technologies, BEAS provides a fantastic learning environment for the inquisitive mind and inspires a challenging and exciting growth in your
                IT career path. BEAS offers ample scope to help you, tailor your IT career by challenging your intellect and building professional expertise, connecting people,
                domain, process and technology. Enhance your Information Technology career as you develop knowledge, adopt skills and hone your project management abilities.
                Our dynamic environment provides you with opportunities to mentor teams for developing robust applications. BEAS offers exciting Information Technology job
                opportunities for a plethora of skills and proficiencies that helps it endorse its brand with more value and you to embellish your information technology career
                with the desired expertise. Explore with us, our innovative ways to build your career in IT.</div>
            </Col>
          </Row>
        </Container>
        <Container className='my-3'>
          <Row>
            <Col xs={12} md={8}>
              <div className='job-details-block-card'>
                <h2>Apply For Job</h2>
                <Row>
                  <Col xs={12} md={4}>
                    <Form.Control type="text" placeholder="First Name" />
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Control type="text" placeholder="Last Name" />
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Control type="text" placeholder="Email Address" />
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Control type="text" placeholder="Mobile Number" />
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Control type="text" placeholder="Designation" />
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Control type="text" placeholder="Height Qualification" />
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Control type="text" placeholder="Gender" />
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Control type="text" placeholder="DOB" />
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Control type="text" placeholder="Year Of Experience" />
                  </Col>
                  <Col xs={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Control as="textarea" rows={5} placeholder='Address' />
                    </Form.Group>
                  </Col>
                  <Col xs={12} className='my-2'>
                    <div className="upload-btn-wrapper">
                      <button className="btn2">Upload Your CV <ArrowUp/> </button>
                      <input type="file" name="myfile" />
                    </div>
                  </Col>
                  <Col xs={12} md={4} className='mb-3'>
                    <button type="button" className="btn btn-primary-blue">Submit</button>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className='job-details-block'>
                <div className='job-details-inner-block'>
                  <p className='job-details-title'>Job Details</p>
                  <ul>
                    <li>2­-5 years Experience</li>
                    <li>Kolkata</li>
                    <li>Full Time</li>
                  </ul>
                </div>
                {/* <!--/--> */}
                <div className='job-details-inner-block'>
                  <p className='job-details-title'>Required Skills</p>
                  <div className="skill-tags">
                    <p>Angular</p>
                    <p>Node JS</p>
                    <p>ABC Dummy</p>
                    <p>Node JS</p>
                  </div>
                </div>
                {/* <!--/--> */}
                <div className='job-details-inner-block'>
                  <p className='job-details-title'>Additional Skills</p>
                  <div className="skill-tags">
                    <p>Angular</p>
                    <p>Node JS</p>
                    <p>ABC Dummy</p>
                    <p>Node JS</p>
                  </div>
                </div>
              </div>
            </Col>

          </Row>
        </Container>







        {/* <Row>
              <Col>
                <div className="">
                  <Row>
                    <Col xs={12}>
                      <ul className="CareerList">
                      { careers?.map((item,index)=>{
                        
                        const encodedId = Buffer.from(item.id.toString()).toString("base64");
                        return(
                        <li key={index}>
                          {item.id && (
                              <Link href={`/career/${encodedId}`} className="">
                                <div className="Career_join_box_inner__wQyGi">
                                  <div className="Career_join_section__j4tVW">
                                    <Image width={450} height={150} src={`${env.BACKEND_BASE_URL}${item?.image}`} alt="image" className="img-fluid" loading="lazy" />
                                    <div className='Career_join_box__mRfXx'>
                                      <p><b>{item.title}</b></p>
                                      <span>{item.experience}</span>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            )}
                          
                        </li>
                        );
                      }) }
                    
                      </ul>

                    </Col>
                  </Row>
                </div>
              </Col>
          </Row> */}

      </main>
    </>
  )
}

export default React.memo(Career);

export async function getServerSideProps() {
  const res = await HomeService.menuCareerPage();
  const menucareer = res.data?.career || [];

  const res1 = await HomeService.careerPage();
  const careers = res1.data?.careers || [];

  return {
    props: {
      menucareer,
      careers
    }
  }
}