
import React, { useState } from 'react'
import BreadCrumb from '../component/BreadCrumb'
import { Container, Row, Col } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion';
import { ArrowRight, ArrowUp, ArrowUpRight } from 'react-feather';
import Carousel from 'react-bootstrap/Carousel';
import Nav from 'react-bootstrap/Nav';
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import Link from 'next/link';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const page = ({casestudy, menucasestudy, prevId, nextId}) => {
  
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
    <SEO
      title={`Case Study | ${casestudy?.title}`}
      description={
        casestudy?.title ||
        `${casestudy?.title} - Learn how Beas Consultancy delivered a tailored solution and business impact.`
      }
      keywords={
        casestudy?.title || 
        "case study, business solution, project success, Beas consultancy"
      }
      image={
        casestudy?.image 
          ? `${env.BACKEND_BASE_URL}${casestudy.image}`
          : `${env.BACKEND_BASE_URL}/default-image.jpg`
      }
      url={`${env.FRONTEND_BASE_URL}/casestudy/${casestudy?.slug}`}
      author="Beas Consultancy & Services Pvt. Ltd."
    />
    <main>
      <BreadCrumb pagetitle = {casestudy.title} pageslug='Casestudy' pageBanner={`assets/img/menu-content/${menucasestudy?.menu_contents?.banner}`} />
      <div className="d-flex justify-content-around mt-3 mx-5">
          {prevId && (
            <Link href={`/casestudy/${prevId}`} className="btn btn-outline-primary">
              ← Previous
            </Link>
          )}
          {nextId && (
            <Link href={`/casestudy/${nextId}`} className="btn btn-outline-primary ms-auto">
              Next →
            </Link>
          )}
      </div>
      <Container className="py-5">
        <Row>  
          <Col xs={12} lg={5}>
            
             <div className='serviceDetailsWrap'>
              <Image width={600} height={150} src={`${env.BACKEND_BASE_URL}${casestudy?.image}`} alt='image' className='img-fluid' />
            </div>
            <div className='service-left-panel vertical-box my-3'>
              <p className='title'>Technology Platform</p>
              <ul>
                { casestudy?.technology_platform?.map((item, index)=>(
                <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className='service-left-panel blue-box'>
             <p> Want A <br/> Project Like this? </p>
             <a href='#' className='red-btn'>Call Now</a>
            </div>
          </Col>
          <Col xs={12} lg={7}>
           
            {/* <p className='title mb-3'>Project Overview / Business Need</p>
            {<div dangerouslySetInnerHTML={{ __html: casestudy?.business_need }} />}
            <p className='title my-3'>BEAS’s Solution</p>
            {<div dangerouslySetInnerHTML={{ __html: casestudy?.beas_solution }} />}
            <p className='title my-3'>Benefits to the customer</p>
            {<div dangerouslySetInnerHTML={{ __html: casestudy?.benefits_to_the_customer }} />} */}

            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Project Overview / Business Need</Accordion.Header>
                <Accordion.Body>
                {<div dangerouslySetInnerHTML={{ __html: casestudy?.business_need }} />}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>BEAS’s Solution</Accordion.Header>
                <Accordion.Body>
                {<div dangerouslySetInnerHTML={{ __html: casestudy?.beas_solution }} />}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                {casestudy?.benefits_to_the_customer
                ? "Benefits to the customer"
                : "Sample Screen"}
                </Accordion.Header>
                <Accordion.Body>
                {casestudy?.benefits_to_the_customer ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: casestudy.benefits_to_the_customer,
                    }}
                  />
                ) : (
                  <Image width={550} height={50} src={`${env.BACKEND_BASE_URL}${casestudy?.samplescreen}`} alt='image' className='img-fluid' />
                )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          
        </Row>
      </Container>
    </main>
    </>
  )
}

export default page

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const response = await HomeService.projectPage();
  const projects = response.data?.projects || [];

  const result = await HomeService.menuProjectPage();
  const menucasestudy = result.data?.casestudy || [];

  // Find index of current project by matching the ID (slug)
  const currentIndex = projects.findIndex((item) => item.slug.toString() === slug);

  if (currentIndex === -1) {
    return {
      notFound: true,
    };
  }

  const casestudy = projects[currentIndex];
  const prevProject = projects[currentIndex - 1] || null;
  const nextProject = projects[currentIndex + 1] || null;

  return {
    props: {
      casestudy,
      menucasestudy,
      prevId: prevProject?.slug || null,
      nextId: nextProject?.slug || null,
    },
  };
}
