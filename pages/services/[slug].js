
import React from 'react'
import BreadCrumb from '../component/BreadCrumb';
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap";
import { ArrowUpRight } from 'react-feather';
import Link from 'next/link'
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import { postService } from "../../util/configs/FetchRequest";
import { Buffer } from "buffer";

const Page = ({service, enrichedChildren }) => {

    const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }
    
    const metaTitle = `Service | ${service?.name}`;
    const metaDesc = service?.menu_contents?.description
        ? service.menu_contents.description.replace(/(<([^>]+)>)/gi, "").slice(0, 50)
        : "Explore our wide range of services to empower your business through innovative solutions.";
    const metaImage = service?.image
        ? `${env.BACKEND_BASE_URL}${service.image}`
        : `${env.BACKEND_BASE_URL}assets/img/default-image.jpg`;
    const metaUrl = `${env.FRONTEND_BASE_URL}/service/${service?.slug || ""}`;

    return (
        <>
            <SEO
                title={metaTitle}
                description={metaDesc}
                keywords="services, beas consultancy, business solutions, software development"
                image={metaImage}
                url={metaUrl}
            />
            <main>
                <BreadCrumb pagetitle={service?.name} pageslug='Service' pageBanner={`assets/img/menu-content/${service?.menu_contents?.banner}`} />
                <Container className='py-5'>
                {enrichedChildren?.map((item1, index1) => (
                <Row key={index1}>
                    <Col>
                        {/* <p className='title mb-3'>{service?.name}</p> */}
                        <div className='ServicesPara mb-4' dangerouslySetInnerHTML={{ __html: item1?.description }} />
                        <div className='imageTextBlock p-0'>
                            <Row>
                                {item1?.menu_contents?.contents?.map((content, index) =>
                                  {
                                    const caseStudyId = content?.casestudy?.data?.casestudy?.id;

                                    const encodedId = caseStudyId
                                      ? Buffer.from(caseStudyId.toString()).toString("base64")
                                      : null;
                                    return(
                                    content?.extra_description ? (
                                    <React.Fragment key={index}>
                                        <Col xs={4}>
                                            <div className='gigs_box'>
                                                <div className='story-box'>
                                                  <Image width={550} height={50} src={`${env.BACKEND_BASE_URL}${content.casestudy?.data?.casestudy?.image}`} alt='image' className='img-fluid' loading="lazy" />
                                              </div>

                                              <div className='p-3'>
                                            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                                                    <p className='mt-0'>
                                                        {content.casestudy?.data?.casestudy?.title}
                                                  </p>
                                                  {content.casestudy?.data?.casestudy?.slug ? (
                                                    
                                                    <Link
                                                        href={{
                                                            pathname: "/casestudy",
                                                            query: { id: encodedId },
                                                        }}
                                                        className=""
                                                        >
                                                        Read Case Study<ArrowUpRight />
                                                    </Link>
                                                    ) : (
                                                    <button type="button" className="" disabled>
                                                        Read Case Study<ArrowUpRight />
                                                    </button>
                                                    )}
                                            </div>

                                        </div>
                                            </div>
                                            
                                        </Col>
                                    </React.Fragment>
                                    ) : null
                                )})} 

                            </Row>
                        </div>
                    </Col>
                </Row>
                ))} 
                </Container>
            </main>
        </>
    )
}

export default React.memo(Page);

export async function getServerSideProps({ params }) {
    const { slug } = params;
  
    // 1. Load menu tree
    const response = await HomeService.menuServicePage();
    const services = response?.data?.services?.children || [];
  
    // 2. Find service by slug
    const service = services.find((item) => item.slug.toString() === slug);
  
    if (!service) {
      return { notFound: true };
    }
  
    // 3. Enrich children with case studies
    const enrichedChildren = await Promise.all(
      (service?.children || []).map(async (child) => {
        const contents = child?.menu_contents?.contents || [];
  
        const enrichedContents = await Promise.all(
          contents.map(async (c) => {
            if (!c?.extra_description) return c;
            try {
              const data = await postService(
                "get-casestudy-by-slug",
                env.ACCESS_TOKEN,
                c.extra_description
              );
              return { ...c, casestudy: data };
            } catch (err) {
              //console.error("❌ Error fetching casestudy:", err);
              return c;
            }
          })
        );
  
        return {
          ...child,
          menu_contents: { ...child.menu_contents, contents: enrichedContents },
        };
      })
    );
  
    return {
      props: {
        service,
        enrichedChildren,
      },
    };
  }