import React from 'react'
import { Container } from 'react-bootstrap'
import { Col, Row } from "react-bootstrap";
import { ArrowUpRight } from "react-feather";
import BreadCrumb from '../component/BreadCrumb';
import Link from 'next/link'
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import { Buffer } from "buffer";

const Career = ({careers, menucareer}) => {
  const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }

  return (
    <>
    <SEO
        title={menucareer?.name || "Career | Beas Consultancy & Services Pvt. Ltd."}
        description={menucareer?.description || "Explore exciting career opportunities with us."}
        keywords="career, jobs, openings"
        image={
          menucareer?.image 
            ? `${env.BACKEND_BASE_URL}${menucareer.image}`
            : `${env.BACKEND_BASE_URL}/default-image.jpg`
        }
        url={`${env.BACKEND_BASE_URL}${menucareer?.slug || 'career'}`}
      />
      <main>
        <BreadCrumb pagetitle="Career" pageBanner={`assets/img/menu-content/${menucareer?.menu_contents?.banner}`} />
        <Container className='py-5'>
          <Row>
            <Col>
              <p className="sub-title">{menucareer?.menu_contents?.title}</p>
              <p className='title mb-3'>Why Join Us?</p>
              <div className='all_contents' dangerouslySetInnerHTML={{ __html: menucareer?.menu_contents?.description }} />
            </Col>
          </Row>
          <Row>
              <Col>
                <div className="">
                  <Row>
                    <Col xs={12}>
                      <ul className="CareerList">
                      { careers?.map((item,index)=>{
                        
                        const encodedId = Buffer.from(item.id.toString()).toString("base64");
                        return(
                        <li key={index}>
                          {item.id && (
                              <Link href={`/career/${encodedId}`} className="">
                                <div className="Career_join_box_inner__wQyGi">
                                  <div className="Career_join_section__j4tVW">
                                    <Image width={450} height={150} src={`${env.BACKEND_BASE_URL}${item?.image}`} alt="image" className="img-fluid" loading="lazy" />
                                    <div className='Career_join_box__mRfXx'>
                                      <p><b>{item.title}</b></p>
                                      <span>{item.experience}</span>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            )}
                          
                        </li>
                        );
                      }) }
                    
                      </ul>

                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
        </Container>
      </main>
    </>
  )
}

export default React.memo(Career);

export async function getServerSideProps() {
  const res = await HomeService.menuCareerPage();
  const menucareer = res.data?.career || [];

  const res1 = await HomeService.careerPage();
  const careers = res1.data?.careers || [];

  return {
    props: {
      menucareer,
      careers
    }
  }
}