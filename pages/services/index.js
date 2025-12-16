import React from 'react'
import { Container } from 'react-bootstrap'
import { Col, Row } from "react-bootstrap";
import { ArrowUpRight } from "react-feather";
import BreadCrumb from '../component/BreadCrumb';
import Nav from 'react-bootstrap/Nav';
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import Link from "next/link";

const Service = ({ services, service, seometadata }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Step 1: Expand application-solutioning
  let finalServices = services?.flatMap(item => {
    if (item.slug === "application-solutioning") {
      return item.children?.map(child => ({
        ...child,
        menu_contents: child.menu_contents
      }));
    }

    return [{
      ...item,
      menu_contents: item.menu_contents
    }];
  });

  // Step 2: Move specific items to the bottom
  const bottomSlugs = ["ui-ux", "professional-services"];

  finalServices = [...finalServices].sort((a, b) => {
    const aLast = bottomSlugs.includes(a?.slug);
    const bLast = bottomSlugs.includes(b?.slug);

    if (aLast && !bLast) return 1;   // a goes down
    if (!aLast && bLast) return -1;  // b goes down
    return 0;
  });
  //////////////////////////////////////////

  const metaTitle = seometadata?.title
    ? seometadata?.title
    : `Service`;
  const metaKeyword = seometadata?.keyword
    ? seometadata?.keyword
    : "services, beas consultancy, business solutions, software development";
  const metaDesc = seometadata?.description
    ? seometadata?.description
    : "Explore our wide range of services tailored to your business needs.";
  const metaImage = seometadata?.image
    ? `${env.BACKEND_BASE_URL}${seometadata?.image}`
    : `${env.BACKEND_BASE_URL}${service?.image}`;
  const metaUrl = seometadata?.url
    ? `${env.FRONTEND_BASE_URL}${seometadata?.url}`
    : `${env.FRONTEND_BASE_URL}${service?.slug}`;
  const metaAuthor = seometadata?.author
    ? seometadata?.author
    : "BEAS Consultancy And Services Private Limited";

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDesc}
        keywords={metaKeyword}
        image={metaImage}
        url={metaUrl}
        author={metaAuthor}
      />
      <main>
        <BreadCrumb pagetitle="Services" pageBanner={`assets/img/menu-content/${service?.menu_contents?.banner}`} />
        <Container className='py-5'>
          <Row>
            <Col>
              <div className="about_texts">
                <h1>{service?.menu_contents?.short_desc}</h1>
                <p>{service?.menu_contents?.description}</p>
              </div>
            </Col>
          </Row>
        </Container>
        <section className="section-abuts section-services">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="ser_rea services_sec">
                  {finalServices?.map((item, index) => {
                    const isEven = index % 2 !== 0;

                    const description = item?.menu_contents?.description
                      ? item?.menu_contents?.description.split(' ').slice(0, 90).join(' ') + '...'
                      : '';

                    return (
                      <div className="row no-gutters" key={index}>
                        {isEven ? (
                          <>
                            <div className="col-lg-6 col-12">
                              <div className="services-text">
                                <h2>{item?.menu_contents?.title}</h2>
                                <p dangerouslySetInnerHTML={{ __html: description }} />
                                <Link
                                  href={`/services/${item?.menu_contents?.slug}`}
                                  className="services-btn proc-btn thar-three4"
                                >
                                  Read More
                                </Link>
                              </div>
                            </div>
                            <div className="col-lg-6 col-12">
                              <div className="mediaimg">
                                <Image
                                  width={600}
                                  height={150}
                                  src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.image}`}
                                  alt="image"
                                  className="img-fluid"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-lg-6 col-12">
                              <div className="mediaimg">
                                <Image
                                  width={600}
                                  height={150}
                                  src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.image}`}
                                  alt="image"
                                  className="img-fluid"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-12">
                              <div className="services-text">
                                <h2>{item?.menu_contents?.title}</h2>
                                <p dangerouslySetInnerHTML={{ __html: description }} />
                                <Link
                                  href={`/services/${item?.menu_contents?.slug}`}
                                  className="services-btn proc-btn thar-three4"
                                >
                                  Read More
                                </Link>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>
          <div className="shp1">
            <Image
              src="/assets/images/ser-bg.png"
              alt="shape"
              width={474}
              height={73}
              loading="lazy"

            />
          </div>
          <div className="shp2">
            <Image
              src="/assets/images/ser-bg2.png"
              alt="shape"
              width={474}
              height={73}
              loading="lazy"

            />
          </div>
        </section>
      </main>
    </>
  )
}

export default React.memo(Service);

export async function getServerSideProps(context) {

  const url = context.req.url;
  const lastSegment = url.split("/").filter(Boolean).pop();

  const res = await HomeService.homePage()
  const services = res.data?.services?.children || []
  const service = res.data?.services || []

  const seobyslug = await HomeService.seobyslug(lastSegment);
  const seometadata = seobyslug?.data?.seometa;

  return {
    props: {
      services,
      service,
      seometadata
    }
  }
}