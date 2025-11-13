
import React from 'react'
import BreadCrumb from '../component/BreadCrumb'
import { Container, Row, Col } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion';
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import Link from 'next/link';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const Casestudy = ({casestudy, menucasestudy}) => {
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
      <div className="bgF2F4F7 p-relative">
      <Container className="py-5">
        <Row>  
          <Col xs={12} lg={5}>
            
             <div className='serviceDetailsWrap'>
              <Image width={600} height={150} src={`${env.BACKEND_BASE_URL}${casestudy?.image}`} alt='image' className='img-fluid' loading="lazy" />
            </div>
            
          </Col>
          <Col xs={12} lg={7}>
           
            <div className="CaseStudyH">{casestudy?.title}</div>
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
                <Accordion.Header>Benefits to the customer</Accordion.Header>
                <Accordion.Body>
                {<div dangerouslySetInnerHTML={{ __html: casestudy?.benefits_to_the_customer }} />}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Technology Platform</Accordion.Header>
                <Accordion.Body>
                <ul>
                { casestudy?.technology_platform?.map((item, index)=>(
                <li key={index}>{item}</li>
                ))}
              </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

          </Col>
          
        </Row>
      </Container>
      </div>
    </main>
    </>
  )
}

export default React.memo(Casestudy);

export async function getServerSideProps({ query  }) {
  const { id } = query ;

  const response = await HomeService.individualProjectPage(id);
  const casestudy = response.data?.casestudy || [];

  const result = await HomeService.menuProjectPage();
  const menucasestudy = result.data?.casestudy || [];

  return {
    props: {
      casestudy,
      menucasestudy
    },
  };
}
