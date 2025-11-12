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

function Home({homeData}) {
  const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }

    console.log("homeData",homeData);
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 1.5]);

  //const aboutustext = homeData?.aboutus?.description;
  // const aboutussentences = aboutustext?.match(/[^.!?]+[.!?]+/g) || [];
  // const aboutuspreviewText = aboutussentences.slice(0, 3).join(' ').trim();
  const aboutuspreviewText = homeData?.aboutus?.menu_contents?.description;
 
  const home_image = homeData?.menus?.[0]?.image;
  return (
    <>
      <SEO
        title={homeData?.menus?.[0]?.name || 'Home | Beas Consultancy & Services Pvt. Ltd.'}
        description={aboutuspreviewText || "Learn about our 25+ years of IT consulting expertise, client stories, and services."}
        keywords="IT Consulting, Software Development, Digital Transformation, Business Solutions, Technology Partners, Beas Consultancy"
        image={
          home_image 
            ? `${env.BACKEND_BASE_URL}${home_image}`
            : `${env.BACKEND_BASE_URL}/default-image.jpg`
        }
        url={`${env.BACKEND_BASE_URL}${homeData?.menus?.[0]?.slug || 'home'}`}
        author="Beas Consultancy & Services Pvt. Ltd."
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
                                  <img src="assets/images/stat-1.png" alt=""/>
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
                              <p>Lorem Ipsum is simply dummy caption  the the printing and typesetting the industry is Lorem Ipsum has been the</p>
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
                      <h2>Portfolio that speak!</h2>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
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
          <div className="process">
            <div className="container">
                <div className="port-hd-txt proc-hd">
                  <h2>Industries we Serve</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                </div>
            </div>
            <div className="process-inr">
                <div className="container">
                  <div className="process-txt">
                      <div className="tab">
                        <button className="tablinks activen">1. Media and Entertainment</button>
                        <button className="tablinks">2. Banking , Insurance and Finance</button>
                        <button className="tablinks">3. Business</button>
                        <button className="tablinks">4. Government</button>
                        <button className="tablinks">5. Healthcare and Wellness</button>
                        <button className="tablinks">6. Manufacturing</button>
                      </div>
                      <div className="tabcontent">
                        <div className="proc-deet">
                            <div className="proc-img">
                              <img src="assets/images/process.png" alt=""/>
                            </div>
                            <div className="proc-text">
                              <h2>Media and Entertainment</h2>
                              <p>Lorem Ipsum is simply dumy text of printing and typesetting industry. Lorem Ipsum has been the industry's standard lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy.</p>
                              <a href="#" className="proc-btn thar-three4">Get in Touch</a>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
          {/* process secton end */}

          {/* more section start */}
          <div className="more">
            <div className="more-inr">
                <div className="container">
                  <div className="more-txt">
                      <div className="mr-txt-lft">
                        <h2>Want more information ?</h2>
                        <p>Request a quote about our web and mobile application development services
                            Lorem Ipsum is simply dummy text of the
                        </p>
                      </div>
                      <a href="#" className="mr-btn">Get Free Consultation Now</a>
                  </div>
                </div>
            </div>
          </div>
          {/* more section end */}

          {/* technology section start */}
          <div className="tachnology">
            <div className="container">
                <div className="tech-hd">
                  <h2>Our Technology Expertise</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum</p>
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
              <h2>our Testimonials</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the dummy.</p>
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
                  <h2>Blogs</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum</p>
                </div>
                <div className="Blogs-inr">
                  <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="guiditem">
                            <div className="guidimg">
                              <a href=""><img src="assets/images/guid2.jpg" alt=""/></a>
                              <div className="guidcal">
                                  <strong>20 <br/><b>Jan</b></strong>
                              </div>
                            </div>
                            <div className="guidtext">
                              <h5><a href="">Bring to the table win-win sur<br/>vival strategies to</a></h5>
                              <p>Lorem ipsum dolor sit amet, cibo mundi ea duo dummy duo vim exerci pha vim exerci textpha edrum  cibo mundi duo edrum</p>
                            </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="guiditem">
                            <div className="guidimg">
                              <a href=""><img src="assets/images/guid2.jpg" alt=""/></a>
                              <div className="guidcal">
                                  <strong>20 <br/><b>Jan</b></strong>
                              </div>
                            </div>
                            <div className="guidtext">
                              <h5><a href="">Bring to the table win-win sur<br/>vival strategies to</a></h5>
                              <p>Lorem ipsum dolor sit amet, cibo mundi ea duo dummy duo vim exerci pha vim exerci textpha edrum  cibo mundi duo edrum</p>
                            </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="guiditem">
                            <div className="guidimg">
                              <a href=""><img src="assets/images/guid2.jpg" alt=""/></a>
                              <div className="guidcal">
                                  <strong>20 <br/><b>Jan</b></strong>
                              </div>
                            </div>
                            <div className="guidtext">
                              <h5><a href="">Bring to the table win-win sur<br/>vival strategies to</a></h5>
                              <p>Lorem ipsum dolor sit amet, cibo mundi ea duo dummy duo vim exerci pha vim exerci textpha edrum  cibo mundi duo edrum</p>
                            </div>
                        </div>
                      </div>
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
  return {
    props: {
      homeData: homeResult ? homeResult : [],
    },
  };
}