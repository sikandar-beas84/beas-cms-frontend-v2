import React from 'react'
import BreadCrumb from '../component/BreadCrumb'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const Skills = ({ skills }) => {

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SEO
        title={skills?.name || "Skills | Beas Consultancy & Services Pvt. Ltd."}
        description={skills?.menu_contents?.description?.slice(0, 50) || 'Explore the skills and capabilities of Beas Consultancy.'}
        keywords="Skills, Expertise, Technologies, Services"
        image={
          skills?.image
            ? `${env.BACKEND_BASE_URL}${skills.image}`
            : `${env.BACKEND_BASE_URL}/default-image.jpg`
        }
        url={`${env.BACKEND_BASE_URL}${skills?.slug || 'skills'}`}
        author="Beas Consultancy & Services Pvt. Ltd."
      />
      <main>
        <BreadCrumb pagetitle="Skills" pageBanner={`assets/img/menu-content/${skills?.menu_contents?.banner}`} />
        <Container className='py-5'>
          <Row>
            <Col>
              <h1 className='inner-page-title'>{skills?.menu_contents?.title}</h1>
              <div className="inner-page-text" dangerouslySetInnerHTML={{ __html: skills?.description }} />

            </Col>

          </Row>
        </Container>
        <Container className='pb-5'>
          <Row>
          { skills?.menu_contents?.contents?.map((item,index) => (
            <Col key={index} xs={12} md={3} lg={4}>
              <div className='skill-wrap skill-image175'>
                <div className='sill-wrap-head'>
                  <div className='skill-wrap-img'>
                    <img src="/assets/images/s1.png" alt="skill-name" className='img-fluid' />
                  </div>
                  <div className='skill-wrap-head-text'>{item?.extra_title}</div>
                </div>
                <div className='sill-wrap-text'>
                {item?.extra_description}
                </div>
              </div>
            </Col>
            ))}
          </Row>
        </Container>

      </main>
    </>
  )
}

export default React.memo(Skills);

export async function getServerSideProps() {
  const res = await HomeService.menuSkillPage();
  const skills = res.data?.skills || [];


  return {
    props: {
      skills
    }
  }
}