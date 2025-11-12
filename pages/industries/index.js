import React from 'react'
import { Container } from 'react-bootstrap'
import { Col, Row } from "react-bootstrap";
import { ArrowUpRight } from "react-feather";
import BreadCrumb from '../component/BreadCrumb';
import Nav from 'react-bootstrap/Nav';
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import Link from 'next/link';
const Indutries = ({ industries }) => {
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
        <Container className='py-5'>
          <Row>
            <Col>
              <div className="about_texts">
                <h1>Industries</h1>
                <p>Holisticly benchmark functional products before excellent methods of empowerment. Seamlessly visualize innovative web-readiness whereas extensive initiatives. Completely unleash frictionless data via end-to-end services. Continually unleash virtual e-tailers through magnetic core competencies. Interactively engage distributed alignments via focused alignments. Dynamically fabricate excellent innovation for go forward technology. Intrinsicly impact empowered scenarios after cost effective outsourcing. Synergistically productivate pandemic e-business rather than state of the art e-tailers. Continually expedite customized information with go forward potentialities.</p>
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
                                <h2>{item?.menu_contents?.title}</h2>
                                <p>{stripHtml(item?.description)}</p>
                                <Link href={`/industries/${item?.slug}`} className="services-btn proc-btn thar-three4">
                                   Read Case Study
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
                                <h2>{item?.menu_contents?.title}</h2>
                                <p>{stripHtml(item?.description)}</p>
                                <Link href={`/industries/${item?.slug}`} className="services-btn proc-btn thar-three4">
                                   Read Case Study
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
          <div className="shp1"><img src="../assets/images/ser-bg.png" /></div>
          <div className="shp2"><img src="../assets/images/ser-bg2.png" /></div>
        </section>
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