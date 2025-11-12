import React from 'react'
import BreadCrumb from '../component/BreadCrumb'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const AboutUs = ({aboutus, commonaboutus}) => {
    const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }

    return (
        <>
        <SEO
            title={aboutus?.name || 'About Us | Beas Consultancy & Services Pvt. Ltd.'}
            description={aboutus?.menu_contents?.description || 'Learn more about Beas and our specialties.'}
            keywords={
                [
                aboutus?.menu_contents?.title,
                aboutus?.menu_contents?.description,
                'About Beas',
                'Meet our team',
                'Software Company',
                'Technology',
                'Experts at Beas',
                'Corporate Profile'
                ]
                .filter(Boolean)
                .join(', ')
            }
            image={
                aboutus?.image 
                  ? `${env.BACKEND_BASE_URL}${aboutus.image}`
                  : `${env.BACKEND_BASE_URL}/default-image.jpg`
              }
            url={`${env.BACKEND_BASE_URL}${aboutus?.slug || 'about-us'}`}
            publishedDate={aboutus?.created_at || new Date().toISOString()}
            author="Beas Consultancy & Services Pvt. Ltd."
            />

            <main>
                <BreadCrumb pagetitle="About Us" pageBanner={`assets/img/menu-content/${aboutus?.menu_contents?.banner}`} />

                <section className="section-padding">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-5 col-md-5">
                                <div className="about_imgs">
                                    <span>
                                        <img src="assets/images/abt_img.png" className="drop_ani"/> 
                                    </span>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-7">
                                <div className="about_texts">
                                    <h1>Corporate Overview Driving Growth Through Quality</h1>
                                    <p>Laoreet scelerisque euismod egestas suspendisse aliquet amet ultrices faucibus mauris sit odio. Mattis morbi suspendisse mus ut pellentesque at pulvinar. Interdum justo suspendisse porttitor ornare. Mattis morbfaucibus mauris sit odio.</p>
                                    <p>Laoreet scelerisque euismod egestas suspendisse aliquet amet ultrices faucibus mauris sit odio. Mattis morbi suspendisse mus ut pellentesque at pulvinar. Interdum justo suspendisse porttitor ornare. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='section-abuts'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='ser_rea'>
                                    <div className="about_texts">
                                    <p>Laoreet scelerisque euismod egestas suspendisse aliquet amet ultrices faucibus mauris sit odio. Mattis morbi suspendisse mus ut pellentesque at pulvinar. Interdum justo suspendisse porttitor ornare. Mattis morbfaucibus mauris sit odio.</p>
                                    <p>Laoreet scelerisque euismod egestas suspendisse aliquet amet ultrices faucibus mauris sit odio. Mattis morbi suspendisse mus ut pellentesque at pulvinar. Interdum justo suspendisse porttitor ornare. </p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shp1"><img src="assets/images/ser_bg.png"/></div>
                    <div className="shp2"><img src="assets/images/ser_bg2.png"/></div>
                </section>

                <div className="why_abt">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6 col-12">
                                <div className="our_misson_boxs">
                                    <div className="mission_boxs our_box_mi">
                                        <h2>Our Mission</h2>
                                        <p>To be a world class IT Services and Solutions Provider 
    through meeting customer requirements every- time. 
    We will continuously enhance our Domain, Technology 
    and Process capabilities, to ensure that we provide value 
    to our customers in every transaction.</p>
                                    </div>
                                    <div className="vis_boxs our_box_mi">
                                        <h2>Our Business Objective</h2>
                                        <p>To be a world class IT Services and Solutions Provider 
    through meeting customer requirements every- time. 
    We will continuously enhance our Domain, Technology 
    and Process capabilities, to ensure that we provide value 
    to our customers in every transaction.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="why_abuts">
                                <h2>Our Corporate Strategy</h2>
                                <ul>
                                    <li>1. Build strong technical and domain capabilities to ensure responsiveness to client needs. </li>
                                    <li>2. Create and maintain World-class processes. </li>
                                    <li>3. Enhance Corporate reach in global markets. </li>
                                    <li>4. Create a strong human capital through training, mentoring and by establishing a work- environment of Equality, Inclusion and Diversity.</li>
                                </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="meter-area">
                    <div className="container">
                    <h2>We've helped businesses increase their revenue on an average by 90% in their first year with us!</h2>
                    <div className="counter-show">
                        <div className="row">
                            <div className="all-meter">
                                <ul>
                                <li className="meter-box">
                                    <span className="timer count-number">1500</span><span>+</span>
                                    <p>Satisfied Clients Across the Globe</p>
                                </li>
                                <li className="meter-box">
                                    <span className="timer count-number">7000</span><span>+</span>
                                    <p>Projects Delivered Successfully</p>
                                </li>
                                <li className="meter-box">
                                    <span className="timer count-number">450</span><span>+</span>
                                    <p>Experts Under the Same Roof</p>
                                </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>


                
            </main>
        </>
    )
}

export default React.memo(AboutUs);

export async function getServerSideProps() {
    const res = await HomeService.menuAboutusPage();
    const aboutus = res.data?.aboutus || [];

    const res1 = await HomeService.expertPage();
    const experts = res1.data?.careers || [];

    const res2 = await HomeService.commonaboutusPage();
    const commonaboutus = res2.data?.commonaboutus || [];
  
    return {
      props: {
        aboutus,
        experts,
        commonaboutus
      }
    }
  }