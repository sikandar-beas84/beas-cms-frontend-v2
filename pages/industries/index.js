import React from 'react'
import { Container } from 'react-bootstrap'
import { Col, Row } from "react-bootstrap";
import { ArrowUpRight } from "react-feather";
import BreadCrumb from '../component/BreadCrumb';
import Link from 'next/link'
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const Indutries = ({industries}) => {
  const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }

  const industryList = industries?.children || [];

  return (
    
    <>
    <SEO
        title={industries?.name || 'Industries | Beas Consultancy & Services Pvt. Ltd.'}
        description="Explore the industries we serve with expert solutions tailored to your business needs. Discover how Beas Consultancy empowers various sectors."
        keywords="Industries, IT Services, Beas Consultancy & Services Pvt. Ltd., Software Solutions, Healthcare, Education, Retail, Manufacturing"
        image={
          industries?.image 
            ? `${env.BACKEND_BASE_URL}${industries.image}`
            : `${env.BACKEND_BASE_URL}/default-image.jpg`
        }
        url={`${env.BACKEND_BASE_URL}${industries?.slug || 'industries'}`}
        author="Beas Consultancy & Services Pvt. Ltd."
      />
    <main>
      <BreadCrumb pagetitle="Industries" pageBanner={`assets/img/menu-content/${industries?.menu_contents?.banner}`} />
      <Container className='py-5 Industries_how-it-works__lcCAN'>
      {industryList?.map((item, index) => (
        <Row key={index}>
          {index % 2 === 0 ? (
            <>
            
          <Col xs={12} lg={6}>
            <div className='mediaimg'>
              <Image width={600} height={150} src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.image}`} alt="image" className="img-fluid" loading="lazy" />
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className='industriesInfo pt-4'>
              <p className='title'>{item?.name}</p>
              <div className='industries-body-text py-3' dangerouslySetInnerHTML={{ __html: item?.description }} />
              <div className='Learn_More_Link'>
                  <Link href={`/industries/${item?.slug}`}>
                    <p style={{ cursor: "pointer" }}>
                      Learn More <ArrowUpRight />
                    </p>
                  </Link>
                </div>
            </div>
          </Col>
            </> ):(
              <>
              <Col xs={12} lg={6}>
                <div className='industriesInfo pt-4'>
                  <p className='title'>{item?.name}</p>
                  <div className='industries-body-text py-3' dangerouslySetInnerHTML={{ __html: item?.description }} />
                  <div className='Learn_More_Link'>
                    <Link href={`/industries/${item?.slug}`}>
                      <p style={{ cursor: "pointer" }}>
                        Learn More <ArrowUpRight />
                      </p>
                    </Link>
                  </div>
                </div>
              </Col>        
              <Col xs={12} lg={6}>
                <div className='mediaimg'>
                  <Image width={600} height={150} src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.image}`} alt="image" className="img-fluid mb-5" loading="lazy" />
                </div>
              </Col>
              </>
            )}

        </Row>

      ))}
        
      </Container>
    </main>
    </>
  )
}

export default React.memo(Indutries);

export async function getServerSideProps() {
  const res = await HomeService.menuIndustryPage()
  const industries = res.data?.industries || []

  return {
    props: {
      industries
    }
  }
}