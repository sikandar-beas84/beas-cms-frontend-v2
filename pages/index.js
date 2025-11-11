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
            {/* <div className='beas_W1200'>
              <ul className='clientele__list pt-5 py-4'>
                { homeData?.services?.children?.map((item, index)=>(
                  <li key={index}>
                    <span>{item.name}<span className="star">* </span></span>
                  </li>
                  )) }
              </ul>
            </div> */}

            {/* service section start */}
      <div className="service" id="what_why_panel1">
         <div className="container">
            <div className="serv-head">
               <h2>Our world class Services</h2>
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
            </div>
         </div>
         <div className="service-inr">
            <div className="container">
               <div className="srvc-txt">
                  <div className="srvc-txt-top">
                     <div className="row no-gutters">
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                           <div className="srvc-box fst-srvc-bx sevc-1 hverx">
                              <img src="assets/images/service1.png" alt="" className="srvc-icon"/>
                              <div className="srvc-bxtx">
                                 <h3>Website Design</h3>
                                 <p>Lorem Ipsum is simply dummy text caption  the the printing  typesetting the industry is Lorem Ipsum has been the</p>
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                           <div className="srvc-box fst-srvc-bx sevc-1 hverx">
                              <img src="assets/images/service1.png" alt="" className="srvc-icon"/>
                              <div className="srvc-bxtx">
                                 <h3>Website Design</h3>
                                 <p>Lorem Ipsum is simply dummy text caption  the the printing  typesetting the industry is Lorem Ipsum has been the</p>
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                           <div className="srvc-box fst-srvc-bx sevc-1 hverx">
                              <img src="assets/images/service1.png" alt="" className="srvc-icon"/>
                              <div className="srvc-bxtx">
                                 <h3>Website Design</h3>
                                 <p>Lorem Ipsum is simply dummy text caption  the the printing  typesetting the industry is Lorem Ipsum has been the</p>
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                           <div className="srvc-box fst-srvc-bx sevc-1 hverx">
                              <img src="assets/images/service1.png" alt="" className="srvc-icon"/>
                              <div className="srvc-bxtx">
                                 <h3>Website Design</h3>
                                 <p>Lorem Ipsum is simply dummy text caption  the the printing  typesetting the industry is Lorem Ipsum has been the</p>
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                           <div className="srvc-box fst-srvc-bx sevc-1 hverx">
                              <img src="assets/images/service1.png" alt="" className="srvc-icon"/>
                              <div className="srvc-bxtx">
                                 <h3>Website Design</h3>
                                 <p>Lorem Ipsum is simply dummy text caption  the the printing  typesetting the industry is Lorem Ipsum has been the</p>
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                           <div className="srvc-box fst-srvc-bx sevc-1 hverx">
                              <img src="assets/images/service1.png" alt="" className="srvc-icon"/>
                              <div className="srvc-bxtx">
                                 <h3>Website Design</h3>
                                 <p>Lorem Ipsum is simply dummy text caption  the the printing  typesetting the industry is Lorem Ipsum has been the</p>
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                           <div className="srvc-box fst-srvc-bx sevc-1 hverx">
                              <img src="assets/images/service1.png" alt="" className="srvc-icon"/>
                              <div className="srvc-bxtx">
                                 <h3>Website Design</h3>
                                 <p>Lorem Ipsum is simply dummy text caption  the the printing  typesetting the industry is Lorem Ipsum has been the</p>
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                           <div className="srvc-box fst-srvc-bx sevc-1 hverx">
                              <img src="assets/images/service1.png" alt="" className="srvc-icon"/>
                              <div className="srvc-bxtx">
                                 <h3>Website Design</h3>
                                 <p>Lorem Ipsum is simply dummy text caption  the the printing  typesetting the industry is Lorem Ipsum has been the</p>
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                           <div className="srvc-box fst-srvc-bx sevc-1 hverx">
                              <img src="assets/images/service1.png" alt="" className="srvc-icon"/>
                              <div className="srvc-bxtx">
                                 <h3>Website Design</h3>
                                 <p>Lorem Ipsum is simply dummy text caption  the the printing  typesetting the industry is Lorem Ipsum has been the</p>
                              </div>
                           </div>
                        </div>
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
               <h2>About Us</h2>
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the dummy.</p>
            </div>
            <div className="stat-bod">
               <div className="counter-show">
                  <div className="row">
                     <div className="counter col-lg-3 col-md-6 col-sm-6 col-6">
                        <div className="stat-box">
                           <div className="stat-img">
                              <img src="assets/images/stat-1.png" alt=""/>
                           </div>
                           <div className="d-flexrt">
                              <h3 className="count-number">10 <span>+</span></h3>
                           </div>
                           <p>Years in business</p>
                        </div>
                     </div>
                     <div className="counter col-lg-3 col-md-6 col-sm-6 col-6">
                        <div className="stat-box">
                           <div className="stat-img">
                              <img src="assets/images/stat-1.png" alt=""/>
                           </div>
                           <div className="d-flexrt">
                              <h3 className="count-number">10 <span>+</span></h3>
                           </div>
                           <p>Years in business</p>
                        </div>
                     </div>
                     <div className="counter col-lg-3 col-md-6 col-sm-6 col-6">
                        <div className="stat-box">
                           <div className="stat-img">
                              <img src="assets/images/stat-1.png" alt=""/>
                           </div>
                           <div className="d-flexrt">
                              <h3 className="count-number">10 <span>+</span></h3>
                           </div>
                           <p>Years in business</p>
                        </div>
                     </div>
                     <div className="counter col-lg-3 col-md-6 col-sm-6 col-6">
                        <div className="stat-box">
                           <div className="stat-img">
                              <img src="assets/images/stat-1.png" alt=""/>
                           </div>
                           <div className="d-flexrt">
                              <h3 className="count-number">10 <span>+</span></h3>
                           </div>
                           <p>Years in business</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      {/* About section end */}

      {/* why section start */}
      <div class="why">
         <div class="container">
            <div class="serv-head stat-head why-head">
               <h2>Why Choose Us?</h2>
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
            </div>
            <div className="why-inr">
               <div className="row">
                  <div className="col-lg-3 col-md-6 col-sm-6 p-0">
                     <div className="why-box why-1">
                        <div className="why-img">
                           <img src="assets/images/why-1.png" alt=""/>
                        </div>
                        <h3>Dedicated Specialists</h3>
                        <p>Lorem Ipsum is simply dummy caption  the the printing and typesetting the industry is Lorem Ipsum has been the</p>
                     </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 p-0">
                     <div className="why-box why-1">
                        <div className="why-img">
                           <img src="assets/images/why-1.png" alt=""/>
                        </div>
                        <h3>Dedicated Specialists</h3>
                        <p>Lorem Ipsum is simply dummy caption  the the printing and typesetting the industry is Lorem Ipsum has been the</p>
                     </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 p-0">
                     <div className="why-box why-1">
                        <div className="why-img">
                           <img src="assets/images/why-1.png" alt=""/>
                        </div>
                        <h3>Dedicated Specialists</h3>
                        <p>Lorem Ipsum is simply dummy caption  the the printing and typesetting the industry is Lorem Ipsum has been the</p>
                     </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 p-0">
                     <div className="why-box why-1 why-last">
                        <div className="why-img">
                           <img src="assets/images/why-1.png" alt=""/>
                        </div>
                        <h3>Dedicated Specialists</h3>
                        <p>Lorem Ipsum is simply dummy caption  the the printing and typesetting the industry is Lorem Ipsum has been the</p>
                     </div>
                  </div>
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
               <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="port-box">
                     <div className="port-img">
                        <img src="assets/images/port-1.png" alt="" class="port-shw"/>
                     </div>
                     <h3>Project name</h3>
                     <p>Lorem Ipsum is simply dummy the caption printing and typesetting lorem Ipsum </p>
                     <div className="port-tags">
                        <h4>Angular</h4>
                        <h4>Node JS</h4>
                        <h4>ABC Dummy</h4>
                     </div>
                  </div>
               </div>               
               <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="port-box">
                     <div className="port-img">
                        <img src="assets/images/port-1.png" alt="" class="port-shw"/>
                     </div>
                     <h3>Project name</h3>
                     <p>Lorem Ipsum is simply dummy the caption printing and typesetting lorem Ipsum </p>
                     <div className="port-tags">
                        <h4>Angular</h4>
                        <h4>Node JS</h4>
                        <h4>ABC Dummy</h4>
                     </div>
                  </div>
               </div>               
               <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="port-box">
                     <div className="port-img">
                        <img src="assets/images/port-1.png" alt="" class="port-shw"/>
                     </div>
                     <h3>Project name</h3>
                     <p>Lorem Ipsum is simply dummy the caption printing and typesetting lorem Ipsum </p>
                     <div className="port-tags">
                        <h4>Angular</h4>
                        <h4>Node JS</h4>
                        <h4>ABC Dummy</h4>
                     </div>
                  </div>
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
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                     <div className="tech-list-bx">
                        <img className="tech-icon" src="assets/images/angular.png" alt=""/>
                        <h5>Angular</h5>
                     </div>
                  </div>
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
                  <div className="col-lg-4 col-md-6 col-sm-6">
                     <div className="test-box">
                        <div className="quote-txt">
                           <p>I highly recommend at least reaching out to them if you are searching for a technology solution for your business at a very reasonable cost!</p>
                        </div>
                        <div className="tester">
                           <div className="tester-img">
                              <img src="assets/images/tester-1.png" alt=""/>
                           </div>
                           <div className="tester-name">
                              <h2>Fabien Mahieu</h2>
                              <p>Co-Founder/Director Flexiwork, UK</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                     <div className="test-box">
                        <div className="quote-txt">
                           <p>I highly recommend at least reaching out to them if you are searching for a technology solution for your business at a very reasonable cost!</p>
                        </div>
                        <div className="tester">
                           <div className="tester-img">
                              <img src="assets/images/tester-1.png" alt=""/>
                           </div>
                           <div className="tester-name">
                              <h2>Fabien Mahieu</h2>
                              <p>Co-Founder/Director Flexiwork, UK</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                     <div className="test-box">
                        <div className="quote-txt">
                           <p>I highly recommend at least reaching out to them if you are searching for a technology solution for your business at a very reasonable cost!</p>
                        </div>
                        <div className="tester">
                           <div className="tester-img">
                              <img src="assets/images/tester-1.png" alt=""/>
                           </div>
                           <div className="tester-name">
                              <h2>Fabien Mahieu</h2>
                              <p>Co-Founder/Director Flexiwork, UK</p>
                           </div>
                        </div>
                     </div>
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