import React from 'react'
import BreadCrumb from '../component/BreadCrumb'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const Skills = ({ skills, seometadata }) => {

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const metaTitle = seometadata?.title
  ? seometadata?.title
  :`Skills`;
  const metaKeyword = seometadata?.keyword
  ? seometadata?.keyword
  :"Skills, Expertise, Technologies, Services";
  const metaDesc = seometadata?.description
  ? seometadata?.description
  : "Explore the skills and capabilities of Beas Consultancy.";
  const metaImage = seometadata?.image
  ? `${env.BACKEND_BASE_URL}${seometadata?.image}`
  : `${env.BACKEND_BASE_URL}${skills?.image}`;
  const metaUrl = seometadata?.url
  ?`${env.FRONTEND_BASE_URL}skills/${seometadata?.url}`
  :`${env.FRONTEND_BASE_URL}skills/${skills?.slug}`;
  const metaAuthor = seometadata?.author
  ? seometadata?.author
  :"BEAS Consultancy And Services Private Limited";

  return (
    <>
      <SEO
        title={ metaTitle }
        description={ metaDesc }
        keywords={ metaKeyword }
        image={ metaImage }
        url={ metaUrl }
        author={ metaAuthor }
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
                   <Image
                    src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.extra_icon}`}
                    alt="skill-name" 
                    className='img-fluid'
                    width={32}
                    height={32}
                    loading="lazy"

                  />
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

export async function getServerSideProps(context) {

  const url = context.req.url;
  const lastSegment = url.split("/").filter(Boolean).pop();

  const res = await HomeService.menuSkillPage();
  const skills = res.data?.skills || [];

  const seobyslug = await HomeService.seobyslug(lastSegment);
  const seometadata = seobyslug?.data?.seometa;

  return {
    props: {
      skills,
      seometadata
    }
  }
}