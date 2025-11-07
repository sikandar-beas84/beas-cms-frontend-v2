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
                    <div>

                        {/* <Image width={450} height={150} src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${skills?.menu_contents?.image}`} className="img-fluid" alt="image" />
                         */}
                        <div className="aboutTxt">
                            <h1 className='inner-page-title'>{skills?.menu_contents?.title}</h1>
                            <div className="inner-page-text" dangerouslySetInnerHTML={{ __html: skills?.description }} />
                        </div>
                        <div className='clear'></div>
                    </div>
                </Col>

            </Row>
        </Container>
      
          <section>
            <Container>
              <Row>
                <Col xs={12}>
                  <div className='skill-block'>
                  <div className='skill-wrap'>
                     <div className='sill-wrap-head'>
                      <div className='skill-wrap-img'>
                      <img src="/assets/images/s1.png" alt="skill-name" className='img-fluid' />
                      </div>
                      <div className='skill-wrap-head-text'>UI/UX</div>
                     </div>
                     <div className='sill-wrap-text'>
                     Figma, Tailwind, Adobe, 3D Vista Stitcher ver:4, Affinity Photo, Laminar Neo, and Virtual Tour Pro
                     </div>
                  </div>
                  {/* <!--/--> */}
                  <div className='skill-wrap'>
                     <div className='sill-wrap-head'>
                      <div className='skill-wrap-img'>
                      <img src="/assets/images/s1.png" alt="skill-name" className='img-fluid' />
                      </div>
                      <div className='skill-wrap-head-text'>UI/UX</div>
                     </div>
                     <div className='sill-wrap-text'>
                     Figma, Tailwind, Adobe, 3D Vista Stitcher ver:4, Affinity Photo, Laminar Neo, and Virtual Tour Pro
                     </div>
                  </div>
                  </div>
                </Col>
              </Row>
              
              {/* <div className='tecnology-all pb-5'>
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
              </div> */}

                
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