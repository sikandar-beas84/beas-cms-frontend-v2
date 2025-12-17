import React from 'react'
import { Container } from 'react-bootstrap'
import { Col, Row } from "react-bootstrap";
import BreadCrumb from '../component/BreadCrumb';
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import Link from 'next/link';
const Indutries = ({ industries, seometadata }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const industryList = industries?.children || [];
  const stripHtml = (html, wordLimit = 2000) => {
    if (!html) return '';
    const text = html.replace(/<[^>]+>/g, '');
    const words = text.split(/\s+/).slice(0, wordLimit);
    return words.join(' ') + (words.length >= wordLimit ? '...' : '');
  };

  const metaTitle = seometadata?.title
    ? seometadata?.title
    : `Industries`;
  const metaKeyword = seometadata?.keyword
    ? seometadata?.keyword
    : "Industries, IT Services, Beas Consultancy & Services Pvt. Ltd., Software Solutions, Healthcare, Education, Retail, Manufacturing";
  const metaDesc = seometadata?.description
    ? seometadata?.description
    : "Explore the industries we serve with expert solutions tailored to your business needs. Discover how Beas Consultancy empowers various sectors.";
  const metaImage = seometadata?.image
    ? `${env.BACKEND_BASE_URL}${seometadata?.image}`
    : `${env.BACKEND_BASE_URL}${industries?.image}`;
  const metaUrl = seometadata?.url
    ? `${env.FRONTEND_BASE_URL}${seometadata?.url}`
    : `${env.FRONTEND_BASE_URL}${industries?.slug}`;
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
      <main>
        <BreadCrumb pagetitle="Industries" pageBanner={`assets/img/menu-content/${industries?.menu_contents?.banner}`} />
        <Container className='py-5'>
          <Row>
            <Col>
              <div className="about_texts">
                <h1>{industries?.menu_contents?.short_desc}</h1>
                <p>{industries?.menu_contents?.description}</p>
              </div>
            </Col>
          </Row>
        </Container>
        <section className="section-abuts section-services">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="ser_rea services_sec">
                  {industryList?.map((item, index) => {
                    const isEven = index % 2 !== 0;

                    return (
                      <div className="row no-gutters" key={index}>
                        {isEven ? (
                          <>
                            <div className="col-lg-6 col-12">
                              <div className="services-text">
                                <h2>{item?.name}</h2>
                                <p>{stripHtml(item?.description)}</p>
                                <Link href={`/industries/${item?.slug}`} className="services-btn proc-btn thar-three4">
                                  Read More
                                </Link>
                              </div>
                            </div>
                            <div className="col-lg-6 col-12">
                              <div className="mediaimg">
                                <Image
                                  width={600}
                                  height={150}
                                  src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.image}`}
                                  alt="industry image"
                                  className="img-fluid"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-lg-6 col-12">
                              <div className="mediaimg">
                                <Image
                                  width={600}
                                  height={150}
                                  src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.image}`}
                                  alt="industry image"
                                  className="img-fluid"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-12">
                              <div className="services-text">
                                <h2>{item?.name}</h2>
                                <p>{stripHtml(item?.description)}</p>
                                <Link href={`/industries/${item?.slug}`} className="services-btn proc-btn thar-three4">
                                  Read More
                                </Link>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}

                </div>

              </div>
            </div>
          </div>
          <div className="shp1">
            <Image
              src="/assets/images/ser-bg.png"
              alt="shape"
              width={474}
              height={73}
              loading="lazy"

            />
          </div>
          <div className="shp2">
            <Image
              src="/assets/images/ser-bg2.png"
              alt="shape"
              width={474}
              height={73}
              loading="lazy"

            />
          </div>


        </section>
      </main>
    </>
  )
}

export default React.memo(Indutries);

export async function getServerSideProps(context) {

  const url = context.req.url;
  const lastSegment = url.split("/").filter(Boolean).pop();

  const res = await HomeService.menuIndustryPage()
  const industries = res.data?.industries || []

  const seobyslug = await HomeService.seobyslug(lastSegment);
  const seometadata = seobyslug?.data?.seometa;

  return {
    props: {
      industries,
      seometadata
    }
  }
}