import React from 'react'
import { Container } from 'react-bootstrap'
import { Col, Row } from "react-bootstrap";
import BreadCrumb from '../component/BreadCrumb';
import Link from 'next/link'
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const Career = ({ careers, menucareer, seometadata }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const metaTitle = seometadata?.title
  ? seometadata?.title
  :`Careers`;
  const metaKeyword = seometadata?.keyword
  ? seometadata?.keyword
  :"career, jobs, openings";
  const metaDesc = seometadata?.description
  ? seometadata?.description
  : "Explore exciting career opportunities with us.";
  const metaImage = seometadata?.image
  ? `${env.BACKEND_BASE_URL}${seometadata?.image}`
  : `${env.BACKEND_BASE_URL}${menucareer?.image}`;
  const metaUrl = seometadata?.url
  ?`${env.FRONTEND_BASE_URL}career/${seometadata?.url}`
  :`${env.FRONTEND_BASE_URL}career/${menucareer?.slug}`;
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
                        <Image width={60} height={60} src={`${env.BACKEND_BASE_URL}${item?.image}`} alt="image" className="img-fluid" loading="lazy" />
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
      </main>
    </>
  )
}

export default React.memo(Career);

export async function getServerSideProps(context) {

  const url = context.req.url;
  const lastSegment = url.split("/").filter(Boolean).pop();

  const res = await HomeService.menuCareerPage();
  const menucareer = res.data?.career || [];

  const res1 = await HomeService.careerPage();
  const careers = res1.data?.careers || [];

  const seobyslug = await HomeService.seobyslug(lastSegment);
  const seometadata = seobyslug?.data?.seometa;

  return {
    props: {
      menucareer,
      careers,
      seometadata
    }
  }
}