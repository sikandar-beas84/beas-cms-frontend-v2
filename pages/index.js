import React from 'react'
import Link from 'next/link'
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap";
import BannerSlider from "./component/BannerSlider";
import BannerCarousal from "./component/BannerCarousal";
import { ArrowUpRight } from "react-feather";
import { useScroll, useTransform } from 'framer-motion';
import Nav from 'react-bootstrap/Nav';
import HomeService from "../util/service/Home";
import { env } from '../util/constants/common';

import SEO from '../components/SEO';
import Image from 'next/image';
import { useRouter } from 'next/router';
import IndustriesProcess from './component/IndustriesProcess';

function Home({homeData, seometadata}) {
  const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 1.5]);

  //const aboutustext = homeData?.aboutus?.description;
  // const aboutussentences = aboutustext?.match(/[^.!?]+[.!?]+/g) || [];
  // const aboutuspreviewText = aboutussentences.slice(0, 3).join(' ').trim();
  const aboutuspreviewText = homeData?.aboutus?.menu_contents?.description;
  const home_image = homeData?.menus?.[0]?.image;

  //seo start
  const metaTitle = seometadata?.title
  ? seometadata?.title
  :`Home`;
const metaKeyword = seometadata?.keyword
  ? seometadata?.keyword
  :"IT Consulting, Software Development, Digital Transformation, Business Solutions, Technology Partners, Beas Consultancy";
const metaDesc = seometadata?.description
  ? seometadata?.description
  : "Learn about our 25+ years of IT consulting expertise, client stories, and services.";
const metaImage = seometadata?.image
  ? `${env.BACKEND_BASE_URL}${seometadata?.image}`
  : `${env.BACKEND_BASE_URL}${home_image}`;
const metaUrl = seometadata?.url
  ?`${env.FRONTEND_BASE_URL}${seometadata?.url}`
  :`${env.FRONTEND_BASE_URL}`;
const metaAuthor = seometadata?.author
  ? seometadata?.author
  :"BEAS Consultancy And Services Private Limited";
  //seo end
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
        <section>

          <Container fluid className="mtt-100">
            <Row>
              <Col className="px-0 beas_banner">
                <BannerSlider bannerSlide={homeData?.banners} />
              </Col>
            </Row>
          </Container>
            {/* service section start */}
          <div className="service" id="what_why_panel1">
            <div className="container">
                <div className="serv-head">
                  <h2>{homeData?.underbannercontent?.title}</h2>
                  <p>{homeData?.underbannercontent?.long_desc}</p>
                </div>
            </div>
            <div className="service-inr">
                <div className="container">
                  <div className="srvc-txt">
                      <div className="srvc-txt-top">
                        <div className="row no-gutters">
                        { homeData?.services?.children?.map((item, index)=>{
                          const descriptionText = item?.description
                          ? item.description.length > 50
                            ? item.description.substring(0, 60) + "..."
                            : item.description
                          : "";
                          return (
                            
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                              <Link href={`/services/${item?.slug}`}>
                              <div className="srvc-box fst-srvc-bx sevc-1 hverx">
                                  <Image 
                                    width={50} 
                                    height={50} 
                                    src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.icon}`} 
                                    className="img-fluid srvc-icon" 
                                    alt="image" 
                                    loading="lazy"
                                    />
                                  <div className="srvc-bxtx">
                                    <h3>{item?.name}</h3>
                                    <p>{descriptionText}</p>
                                    <p>Read more...</p>
                                  </div>
                                  
                              </div>
                              </Link>
                            </div>
                            
                          );
                        })}
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
          {/* sevice section end */}

          {/* About section start */}
          <div className="About">
            <div className="container">
                <div className="serv-head stat-head">
                  <h2>{homeData?.aboutus?.name}</h2>
                  <p>{aboutuspreviewText}</p>
                </div>
                <div className="stat-bod">
                  <div className="counter-show">
                      <div className="row">
                      { homeData?.commonaboutus?.map((item, index)=>(
                        <div className="counter col-lg-3 col-md-6 col-sm-6 col-6" key={index}>
                            <div className="stat-box">
                              <div className="stat-img">
                              <Image width={100} height={100} style={{ minWidth: "42px" }}  src={`${env.BACKEND_BASE_URL}${item.icon}`} alt="image" loading="lazy" />
                              </div>
                              <div className="d-flexrt">
                                  <h3 className="count-number">{item?.short_desc}</h3>
                              </div>
                              <p>{item?.title}</p>
                            </div>
                        </div>
                      ))}
                      </div>
                  </div>
                </div>
            </div>
          </div>
          {/* About section end */}

          {/* why section start */}
          <div className="why">
            <div className="container">
                {homeData?.whychooseus?.map((item, index) =>
                  item.slug === "why-choose-us-content" && (
                        <React.Fragment key={index}>
                  <div className="serv-head stat-head why-head">
                    <h2>{item?.title}</h2>
                    <div className="grey-txt" dangerouslySetInnerHTML={{ __html: item?.description }} />
                  </div>
                </React.Fragment>
                  )
                )}
                <div className="why-inr">
                  <div className="row">
                      {homeData?.whychooseus?.map((item, index) =>
                      item.slug === "why-choose-us-sub-content" && (
                        <React.Fragment key={index}>
                        <div className="col-lg-4 col-md-6 col-sm-6 p-0">
                          <div className="why-box why-1">
                              <div className="why-img">
                              <Image width={60} height={50} style={{ minWidth: "42px" }}  src={`${env.BACKEND_BASE_URL}${item.image}`} alt="image" loading="lazy" />
                              </div>
                              <h3>{item.title}</h3>
                              <p>{item.description}</p>
                          </div>
                        </div>
                        </React.Fragment>
                      )
                      )}
                  </div>
                </div>
            </div>
          </div>
          {/* why section end */}

          {/* portfolio section start */}
          <div className="portfolio">
            <div className="container">
                <div className="port-head">
                  <div className="port-hd-txt">
                    <h2>{homeData?.portfoliohomepage?.title}</h2>
                    <p>{homeData?.portfoliohomepage?.long_desc}</p>
                  </div>
                </div>
                <div className="row">

                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <BannerCarousal page="projectsnew" projects={homeData?.projects} />
                      
                  </div>               

                </div>
            </div>
          </div>
          {/* portfolio section end */}

          {/* process secton start */}
          <IndustriesProcess industryData={homeData?.industries?.children} pageTitle={homeData?.industrieshomepage?.title} pageDesc={homeData?.industrieshomepage?.long_desc} />
          {/* process secton end */}

          {/* more section start */}
          <div className="more">
            <div className="more-inr">
                <div className="container">
                  <div className="more-txt">
                      <div className="mr-txt-lft">
                        <h2>{homeData?.consultanthomepage?.title}</h2>
                        <p>{homeData?.consultanthomepage?.long_desc}</p>
                      </div>
                      <Link href={homeData?.consultanthomepage?.short_desc} className="mr-btn">Get Free Consultation Now</Link>
                  </div>
                </div>
            </div>
          </div>
          {/* more section end */}

          {/* technology section start */}
          <div className="tachnology">
            <div className="container">
                <div className="tech-hd">
                  <h2>{homeData?.technologyhomepage?.title}</h2>
                  <p>{homeData?.technologyhomepage?.long_desc}</p>
                </div>
                <div className="tech-list-r">
                  <div className="row">
                    { homeData?.technologies?.map((item, index)=>{
                      return(
                      <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                        <div className="tech-list-bx">
                        <Image width={600} height={100} src={`${env.BACKEND_BASE_URL}assets/img/technology/${item.logo}`} alt="image" loading="lazy" />
                      <h5>{item.name}</h5>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>
            </div>
          </div>
          {/* technology section end */}

          {/* testimonial section begin */}
          <div className="testimonial">
            <div className="container">
            <div className="serv-head test-head">
              <h2>{homeData?.testimonialhomepage?.title}</h2>
              <p>{homeData?.testimonialhomepage?.long_desc}</p>
              <img src="assets/images/test-star-grp.png"/>
            </div>
            <div className="test-inr">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12"> 
                    <BannerCarousal page="testimonialnew" testimonials={homeData?.testimonials} />
                </div>
              </div>
            </div>
            </div>
          </div>
          {/* testimonial section end */}

          {/* Blogs section start */}
          <div className="Blogs">
            <div className="container">
                <div className="Blogs-head">
                  <h2>{homeData?.bloghomepage?.title}</h2>
                  <p>{homeData?.bloghomepage?.long_desc}</p>
                </div>
                <div className="Blogs-inr">
                  <div className="row">
                      <BannerCarousal page="blogs" blogs={homeData?.blogs} />                       
                      </div>
                </div>
            </div>
          </div>
          {/* Blogs section end */}
   
        </section>  
      </main>
    </>
  );
}

export default React.memo(Home);

export async function getServerSideProps() {

  const homesection = await HomeService.homePage();
  const homeResult = homesection.data;

  const seobyslug = await HomeService.seobyslug();
  const seometadata = seobyslug?.data?.seometa;

  return {
    props: {
      homeData: homeResult ? homeResult : [],
      seometadata
    },
  };
}