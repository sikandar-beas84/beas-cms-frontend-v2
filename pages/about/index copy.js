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
                <Container className='py-5 container-bx'>
                    <Row>
                        <Col>
                            <div className="aboutusTxt">

                                <Image width={450} height={150} src={`${env.BACKEND_BASE_URL}${aboutus?.image}`} className="img-fluid about_thumb_img" alt="image" loading="lazy" />
                                <div className="abut_all_contents">
                                    <p className="sub-title">About Our Company</p>
                                    <h1>{aboutus?.menu_contents?.title}</h1>
                                    <div dangerouslySetInnerHTML={{ __html: aboutus?.description }} />
                                </div>
                                <div className='clear'></div>
                            </div>
                        </Col>

                    </Row>
                </Container>

                <section className='about_count_sec'>
                    <Container>
                        <Row>
                            <Col xs={12} className='text-center about_count_inr'>
                                
                                <div className='counterpanel'>
                                    <div className='counterInrPanel'>
                                        <Row>
                                            { commonaboutus?.map((item, index)=>{
                                            if (item.title !== "Years Experience") {
                                            return(<Col key={index}>
                                                <div className="counter_bx">
                                                    <em>
                                                    <Image 
                                                    width={600} 
                                                    height={100} 
                                                    src={`${env.BACKEND_BASE_URL}${item?.icon}`} 
                                                    className="img-fluid" 
                                                    alt="image" 
                                                    loading="lazy"
                                                    />
                                                    </em>
                                                    <div className="st_texts">
                                                        <p><span className="counter-value" data-count="100">{item?.short_desc}</span></p>
                                                        <b>{item?.long_desc}</b>
                                                    </div>
                                                </div>
                                            </Col>);
                                            }
                                            })}
                                        </Row>
                                    </div>
                                </div>
                                <p className="sub-title">Specality Of Our Company</p>
                                <div className='title' dangerouslySetInnerHTML={{ __html: aboutus?.menu_contents?.description }} />
                                
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className='mis_about_section'>
                    <Container>
                        <Row>
                            {/* <Col xs={12} className='text-center mb-5'>
                                <p className="sub-title">Specality Of Our Company</p>
                                <div className='title' dangerouslySetInnerHTML={{ __html: aboutus?.menu_contents?.description }} />
                            </Col> */}
                            <Col xs={12}>
                                <div className='white-card-container pb-5'>
                                    { aboutus?.menu_contents?.contents.map((item,index)=>(
                                    <div className='white-card mis_cont' key={index}>
                                        <div className='media_img'>
                                            <Image width={450} height={150} src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.extra_icon}`} className="img-fluid" alt="image" loading="lazy" />
                                        </div>
                                        <div className='media-body'>
                                            <p className=''>{item?.extra_title}</p>
                                            <div className='' dangerouslySetInnerHTML={{ __html: item?.extra_description }} />
                                        </div>
                                        

                                    </div>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* <Container className='py-5'>
                    <Row>
                        <Col xs={12} className='mb-3'>
                            <div className="aboutTxt">
                                <p className="sub-title mb-0">Meet Our Team</p>
                                <p className='mb-3'>{experts?.title}</p>
                                <div className="gry-txt" dangerouslySetInnerHTML={{ __html: experts?.description }} />
                            </div>
                        </Col>
                        { experts?.contents?.map((item,index)=>(
                        <Col xs={12} lg={3} key={index}>
                            <div className='team-item'>
                                <div className='team-member-image'>
                                    <Image width={450} height={150} src={`${env.BACKEND_BASE_URL}${item?.extra_image}`}
                                        alt='image' className='img-fluid' />
                                </div>
                                <div className='team-member-name'>
                                    {item?.extra_title}
                                    <span>{item?.extra_role}</span>
                                </div>
                            </div>

                        </Col>
                        )) }

                    </Row>
                </Container> */}
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