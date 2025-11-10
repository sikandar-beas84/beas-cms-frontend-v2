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

    console.log("homeData=",homeData.logo)
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 1.5]);

  const aboutustext = homeData?.aboutus?.description;
  const aboutussentences = aboutustext?.match(/[^.!?]+[.!?]+/g) || [];
  const aboutuspreviewText = aboutussentences.slice(0, 3).join(' ').trim();
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
          <Container fluid>
            {/* <div className='beas_W1200'>
              <ul className='clientele__list pt-5 py-4'>
                { homeData?.services?.children?.map((item, index)=>(
                  <li key={index}>
                    <span>{item.name}<span className="star">* </span></span>
                  </li>
                  )) }
              </ul>
            </div> */}
            <Row>
              <Col className="px-0">
                <div className="working-area working--area">
                  <div className="scroll-animation ">
                    <div className="scroll-slide-track">
                      <ul>
                        { homeData?.clients?.map((item, index)=>(
                        <li key={index}>
                          <Image width={600} height={100} src={`${env.BACKEND_BASE_URL}${item?.logo}`} alt="image" loading="lazy" />
                        </li>
                        )) }
                      </ul>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <div className='beas_W1200 pt-0'>
              <div className='bg_0081d2 AboutUs'>
                <Row>
                  <Col lg={12}>
                    <div className='aboutTxt text-left'>
                      <h1>{homeData?.aboutus?.name}</h1>
                      <div className="gry-txt">
                      {aboutuspreviewText}
                      </div>
                      <div className='Learn_More_Link'>
                        <Link href="/about">
                        <p className='beas_text_link'>
                          Learn More <ArrowUpRight />
                        </p>
                      </Link>
                      </div>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className='WHOWEARE'>
                      <ul>
                      { homeData?.commonaboutus?.map((item, index)=>(
                      <li key={index}><span>{item?.short_desc}</span><span className="ttxt">{item?.title}</span><p class="stat-label">{item?.long_desc}</p></li>
                      ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
            </div> 
            
          </Container>
        </section>

        <section className='section_e6f6ff mt-5 py-5'>
          <div className='beas_W1200'>
            <h2 class="beas_h2 mb-0">Our Services</h2>
            <Row>
              { homeData?.services?.children?.map((item, index)=>{
              const descriptionText = item?.description
              ? item.description.split(" ").slice(0, 10).join(" ") + "..."
              : "";
              return (
                <Col lg={4} key={index}>
                  <Nav.Link href={`/services/${item.slug}`}  style={{ cursor: "pointer", color: 'white !important' }}>
                    <div className="wedeliver_block srvc-box" >
                      <div className="we_icon">
                        <Image 
                        width={600} 
                        height={100} 
                        src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.icon}`} 
                        className="img-fluid" 
                        alt="image" 
                        loading="lazy"
                        />
                      </div>
                      <div className='wedeliver_item'>
                          <h3>{item.name}</h3>
                          <p className="p-0">
                        {descriptionText}
                      </p>
                        </div>                      
                      <div className='Learn_More_Link'>
                        <p className='beas_text_link m-0'>
                          Learn More <ArrowUpRight />
                        </p>
                      </div>
                    </div>
                  </Nav.Link>
                </Col>
              );
            })}
            </Row>
            <h2 class="beas_h2 pt-5 mb-0">Industries we Serve</h2>
            <Row>
            { homeData?.industries?.children?.map((item, index)=>(
              <Col lg={4} key={index}>
                <div className='industries_imgs'>
                  <a href={`/industries/${item.slug}`}>
                  <Image width={600} height={100} src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.image}`} alt="image" loading="lazy" />
                    <span class="text__csogW">{item.name}</span>
                    <div class="overlay__L3Hen"></div>
                  </a>
                </div>
              </Col>
              ))}
            </Row>
          </div>
        </section>
        
        <div className='container-fluid'>
          <div className='beas_W1200'>
            <div class="text-center pt-5"><h2 class="beas_h2 mb-4">Our Technology Expertise</h2></div>
            <Row>
            { homeData?.technologies?.map((item, index)=>(
              <Col lg={2} key={index}>
                <div class="tech-list-bx">
                <Image width={600} height={100} src={`${env.BACKEND_BASE_URL}assets/img/technology/${item.logo}`} alt="image" loading="lazy" />
                  <h5>{item.name}</h5>
                </div>
              </Col>
            ))}
            </Row>
          </div>
        </div>
        
        <section className="tool-bg mt-5">
          <Container>
            <div className='beas_W1200'>
              <Row className="">

              <Col>
                <div className="beas_Why">
                {homeData?.whychooseus?.map((item, index) =>
                  item.slug === "why-choose-us-content" && (
                    <React.Fragment key={index}>
                      <p className="title">{item?.title}</p>
                      <div className="grey-txt" dangerouslySetInnerHTML={{ __html: item?.description }} />
                    </React.Fragment>
                  )
                )}
                <Row>
                {homeData?.whychooseus?.map((item, index) => {
                  if (item.slug === "why-choose-us-sub-content") {
                  return (
                  <Col lg={4}>
                    <div class="why_block__GpObg">
                      <div class="why_icon_num">
                      <Image width={600} height={100} style={{ minWidth: "42px" }}  src={`${env.BACKEND_BASE_URL}${item.image}`} alt="image" loading="lazy" />
                        
                      <span>{index + 1}</span>
                      </div>
                        <p class="mb-0 mt-3">{item.description}</p>
                    </div>
                  </Col>
                  );
                  }
                  return null;
                })}
                </Row>
                  
                </div>
              </Col>
            </Row>
            </div>
            
          </Container>
        </section>

        <section>
          <Container>
            <div className='beas_W1200'>
              <div class="text-center pt-5"><h2 class="beas_h2 mb-4">What Our Clients Say</h2></div>
              <div className='w-50 m-auto'>
                <BannerCarousal page="testimonial" testimonials={homeData?.testimonials} />
              </div>
            </div>
          </Container>
        </section>

        <section class="section_e6f6ff mt-5 py-5">
          <Container>
            <div className='beas_W1200'>
              <div class="text-center pt-0"><h2 class="beas_h2 mb-4">Project Experience</h2></div>
              <div className='bg-white ProjectExperience'>
                <div className=''>
                <Row>
              <BannerCarousal page="projects" projects={homeData?.projects} />
            </Row>

                </div>
              </div>
            </div>
          </Container>
          {/* <div class="text-center my-5 mb-0">
            <a class="btn Home_btn_border__TjT33 ms-0" href="#">
              See Case Studies <ArrowUpRight />
            </a>
          </div> */}
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