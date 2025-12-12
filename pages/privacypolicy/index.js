import React from 'react'
import BreadCrumb from '../component/BreadCrumb'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const PrivacyPolicy = ({ privacypolicy, seometadata }) => {

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }


  const metaTitle = seometadata?.title
  ? seometadata?.title
  :`Privacy Policy`;
  const metaKeyword = seometadata?.keyword
  ? seometadata?.keyword
  :"Privacy Policy, Expertise, Technologies, Services";
  const metaDesc = seometadata?.description
  ? seometadata?.description
  : "Explore the Privacy Policy and capabilities of Beas Consultancy.";
  const metaImage = seometadata?.image
  ? `${env.BACKEND_BASE_URL}${seometadata?.image}`
  : `${env.BACKEND_BASE_URL}${privacypolicy?.image}`;
  const metaUrl = seometadata?.url
  ?`${env.FRONTEND_BASE_URL}${seometadata?.url}`
  :`${env.FRONTEND_BASE_URL}${privacypolicy?.slug}`;
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
        <BreadCrumb pagetitle={privacypolicy?.title} pageBanner={privacypolicy?.image} />
        <Container className='py-5'>
          <Row>
            <Col>
            {privacypolicy ? (
              <>
              <h1 className='inner-page-title'>{privacypolicy?.short_desc}</h1>
            <div className="inner-page-text" dangerouslySetInnerHTML={{ __html: privacypolicy?.long_desc }} />
            </>
            ) : (
              <p>Privacy Policy not found.</p>
            )}
            </Col>

          </Row>
        </Container>

      </main>
    </>
  )
}

export default React.memo(PrivacyPolicy);

export async function getServerSideProps(context) {

  const url = context.req.url;
  const lastSegment = url.split("/").filter(Boolean).pop();

  const result = await HomeService.commonPage();
  const privacypolicies = result.data?.common || [];
  const privacypolicy = privacypolicies.find((temp) => temp.slug === 'privacypolicy');

  const seobyslug = await HomeService.seobyslug(lastSegment);
  const seometadata = seobyslug?.data?.seometa;

  return {
    props: {
      privacypolicy,
      seometadata
    }
  }
}