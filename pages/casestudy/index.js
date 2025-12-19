
import React, { useEffect, useState } from 'react'
import BreadCrumb from '../component/BreadCrumb'
import { Container, Row, Col } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion';
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import BannerCarousal from "../component/BannerCarousal";
import ModalComponent from '../component/ModalComponent';

const Casestudy = ({ casestudy, menucasestudy, seometadata, homeData }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
 
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   // Show modal after 10 seconds (10000 ms)
  //   const timer = setTimeout(() => {
  //     setShowModal(true);
  //     setShow(true);
  //   }, 10000);

  //   return () => clearTimeout(timer); // cleanup on unmount
  // }, []);

  const metaTitle = seometadata?.title
    ? seometadata?.title
    : `Case Study`;
  const metaKeyword = seometadata?.keyword
    ? seometadata?.keyword
    : "case study, business solution, project success, Beas consultancy";
  const metaDesc = seometadata?.description
    ? seometadata?.description
    : "Learn how Beas Consultancy delivered a tailored solution and business impact.";
  const metaImage = seometadata?.image
    ? `${env.BACKEND_BASE_URL}${seometadata?.image}`
    : `${env.BACKEND_BASE_URL}${casestudy?.image}`;
  const metaUrl = seometadata?.url
    ? `${env.FRONTEND_BASE_URL}casestudy/${seometadata?.url}`
    : `${env.FRONTEND_BASE_URL}casestudy/${casestudy?.slug}`;
  const metaAuthor = seometadata?.author
    ? seometadata?.author
    : "BEAS Consultancy And Services Private Limited";

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDesc}
        keywords={metaKeyword}
        image={metaImage}
        url={metaUrl}
        author={metaAuthor}
      />
      {showModal && <ModalComponent modalshow={show} />}
      <main>
        <BreadCrumb pagetitle={casestudy.title} pageslug='Casestudy' pageBanner={`assets/img/menu-content/${menucasestudy?.menu_contents?.banner}`} />
        <div className="bgF2F4F7 p-relative">
          <Container className="py-5 ccase-study-container">
            <Row>
              <Col xs={12}>
                <h1 className="inner-page-title-small">{casestudy?.title}</h1>
              </Col>
              <Col xs={12} lg={5}>

                <div className='serviceDetailsWrap'>
                  <Image width={600} height={150} src={`${env.BACKEND_BASE_URL}${casestudy?.image}`} alt='image' className='img-fluid' loading="lazy" />
                </div>

              </Col>
              <Col xs={12} lg={7}>


                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="0" className="blue-bg2">
                    <Accordion.Header>Project Overview / Business Need</Accordion.Header>
                    <Accordion.Body>
                      {<div dangerouslySetInnerHTML={{ __html: casestudy?.business_need }} />}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1" className="green-bg">
                    <Accordion.Header>BEAS’s Solution</Accordion.Header>
                    <Accordion.Body>
                      {<div dangerouslySetInnerHTML={{ __html: casestudy?.beas_solution }} />}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2" className="yellow-bg">
                    <Accordion.Header>Benefits to the customer</Accordion.Header>
                    <Accordion.Body>
                      {<div dangerouslySetInnerHTML={{ __html: casestudy?.benefits_to_the_customer }} />}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3" className="orange-bg">
                    <Accordion.Header>Technology Platform</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {casestudy?.technology_platform?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

              </Col>

            </Row>
            <Row>
              <Col xs={12} className="mt-5">
                <h1 className="inner-page-title mb-2 text-center">{homeData?.portfoliohomepage?.title}</h1>
                <p className="text-center">{homeData?.portfoliohomepage?.long_desc}</p>
              </Col>
              <Col xs={12} className="my-3">
                <BannerCarousal page="projectsnew" projects={homeData?.projects} />
              </Col>
            </Row>
          </Container>
          
        </div>
      </main>
    </>
  )
}

export default React.memo(Casestudy);

export async function getServerSideProps({ query }) {
  const { id } = query;

  const [homeRes, projectRes, menuProject, seoRes] = await Promise.all([
    HomeService.homePage(),
    HomeService.individualProjectPage(id),
    HomeService.menuProjectPage(),
    HomeService.seobyslug('casestudies'),
  ]);

  const homeData = homeRes.data || [];
  const casestudy = projectRes.data?.casestudy || [];
  const menucasestudy = menuProject.data?.casestudy || [];
  const seometadata = seoRes?.data?.seometa || null;


  return {
    props: {
      homeData,
      casestudy,
      menucasestudy,
      seometadata
    },
  };
}
