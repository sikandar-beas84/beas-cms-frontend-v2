
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

const Page = ({ service, enrichedChildren }) => {

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
                <div className="about_texts">
                  <h1>{service?.name}</h1>
                  <div className='ServicesPara mb-4' dangerouslySetInnerHTML={{ __html: item1?.description }} />
                </div>

                <div className='imageTextBlock '>
                  <div className='ser_rea services_sec'>
                    {item1?.menu_contents?.contents?.map((content, index) => {
                      const caseStudyId = content?.casestudy?.data?.casestudy?.id;
                      const isEven = index % 2 !== 0;
                      const slug = content?.casestudy?.data?.casestudy?.slug;

                      const description = content?.extra_description;

                      return content?.extra_description ? (
                        <div className="row no-gutters" key={index}>
                          {/* For even items: text first, image second */}
                          {isEven ? (
                            <>
                              <div className="col-lg-6 col-12">
                                <div className="services-text">
                                  <h2>{content.casestudy?.data?.casestudy?.title}</h2>
                                  <p dangerouslySetInnerHTML={{ __html: description }} />

                                  {content.casestudy?.data?.casestudy?.slug && (
                                    <Link
                                      href={{
                                        pathname: "/casestudy",
                                        query: { id: slug },
                                      }}
                                      className="services-btn proc-btn thar-three4"
                                    >
                                      Read Case Study
                                    </Link>
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-6 col-12">
                                <div className="mediaimg">
                                  <Image
                                    width={600}
                                    height={150}
                                    src={`${env.BACKEND_BASE_URL}${content.casestudy?.data?.casestudy?.image}`}
                                    alt="image"
                                    className="img-fluid"
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                            </>
                          ) : (
                            // For odd items: image first, text second
                            <>
                              <div className="col-lg-6 col-12">
                                <div className="mediaimg">
                                  <Image
                                    width={600}
                                    height={150}
                                    src={`${env.BACKEND_BASE_URL}${content.casestudy?.data?.casestudy?.image}`}
                                    alt="image"
                                    className="img-fluid"
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-12">
                                <div className="services-text">
                                  <h2>{content.casestudy?.data?.casestudy?.title}</h2>
                                  <p dangerouslySetInnerHTML={{ __html: description }} />
                                  <div className="port-tags services-tags">
                                    <h4>Angular</h4>
                                    <h4>Node JS</h4>
                                    <h4>ABC Dummy</h4>
                                  </div>
                                  {content.casestudy?.data?.casestudy?.slug && (
                                    <Link
                                      href={{
                                        pathname: "/casestudy",
                                        query: { id: slug },
                                      }}
                                      className="services-btn proc-btn thar-three4"
                                    >
                                      Read Case Study
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ) : null;
                    })}
                  </div>
                  <div className="shp1"><img src="../assets/images/ser-bg.png" /></div>
                 <div className="shp2"><img src="../assets/images/ser-bg2.png" /></div>
                </div>
              </Col>
            </Row >
          ))}
        </Container >
      </main >
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