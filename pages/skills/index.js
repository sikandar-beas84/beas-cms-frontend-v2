import React from 'react'
import BreadCrumb from '../component/BreadCrumb'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const Skills = ({skills}) => {

  const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }

  return (
    <>
      <SEO
        title={skills?.name || "Skills | Beas Consultancy & Services Pvt. Ltd."}
        description={skills?.menu_contents?.description?.slice(0, 50) || 'Explore the skills and capabilities of Beas Consultancy.'}
        keywords="Skills, Expertise, Technologies, Services"
        image={
          skills?.image
            ? `${env.BACKEND_BASE_URL}${skills.image}`
            : `${env.BACKEND_BASE_URL}/default-image.jpg`
        }
        url={`${env.BACKEND_BASE_URL}${skills?.slug || 'skills'}`}
        author="Beas Consultancy & Services Pvt. Ltd."
      />
      <main>
        <BreadCrumb pagetitle="Skills" pageBanner={`assets/img/menu-content/${skills?.menu_contents?.banner}`}/>
        <Container className='py-5'>
            <Row>
                <Col>
                    <div className="aboutusTxt">

                        {/* <Image width={450} height={150} src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${skills?.menu_contents?.image}`} className="img-fluid" alt="image" />
                         */}
                        <div className="aboutTxt">
                            <p className="sub-title">Specality Of Our Company</p>
                            <h1>{skills?.menu_contents?.title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: skills?.description }} />
                        </div>
                        <div className='clear'></div>
                    </div>
                </Col>

            </Row>
        </Container>
        {/* <section className='service-left-panel-curve pad-150'> */}
          <section className=''>
            <Container>
              
              <div className='tecnology-all pb-5'>
                <ul>
                  { skills?.menu_contents?.contents?.map((item,index) => {
                  const randomNum = (index % 6) + 1;
                  return(
                  <li key={index}>
                    <a href='#'>
                      <div className='tech-head'>
                        <span className={`coloe_t${randomNum}`}>
                        <Image
                          src={`/assets/images/skills/skills${index+1}.png`}   // use optimized format (webp/avif)
                          alt="Hero Banner"
                          width={1920}
                          height={1080}
                          priority      // ✅ ensures this image is not lazy-loaded
                          fetchPriority="high" // ✅ tells browser it’s critical
                          className="img-fluid" // you can keep bootstrap class
                        />
                        
                        </span>
                        <p>{item?.extra_title}</p>
                      </div>
                      <p>{item?.extra_description}</p>
                    </a>
                  </li>);
                  })}
                </ul>
              </div>

                {/* <Row>
                    <Col xs={12} className='text-center mb-5'>
                    {<div dangerouslySetInnerHTML={{ __html: skills?.menu_contents?.description }} />}
                    </Col>
                </Row> */}
            </Container>
        </section>
      </main>
    </>
  )
}

export default React.memo(Skills);

export async function getServerSideProps() {
  const res = await HomeService.menuSkillPage();
  const skills = res.data?.skills || [];


  return {
    props: {
      skills
    }
  }
}