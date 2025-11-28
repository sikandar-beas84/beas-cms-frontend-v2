
import React from 'react'
import BreadCrumb from '../component/BreadCrumb';
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap";
import Link from 'next/link'
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import { postService } from "../../util/configs/FetchRequest";

const Page = ({ service, enrichedChildren, seometadata }) => {

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const metaTitle = seometadata?.title
    ? seometadata?.title
    : `Services`;
  const metaKeyword = seometadata?.keyword
    ? seometadata?.keyword
    : "services, beas consultancy, business solutions, software development";
  const metaDesc = seometadata?.description
    ? seometadata?.description
    : service?.menu_contents?.description.replace(/(<([^>]+)>)/gi, "").slice(0, 50);
  const metaImage = seometadata?.image
    ? `${env.BACKEND_BASE_URL}${seometadata?.image}`
    : `${env.BACKEND_BASE_URL}${service?.image}`;
  const metaUrl = seometadata?.url
    ? `${env.FRONTEND_BASE_URL}services/${seometadata?.url}`
    : `${env.FRONTEND_BASE_URL}services/${service?.slug}`;
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
        <BreadCrumb
          pagetitle={service?.name}
          pageslug="Service"
          pageBanner={`assets/img/menu-content/${service?.menu_contents?.banner}`}
        />

        <div className="py-5">

          {enrichedChildren?.map((item1, index1) => (
            <React.Fragment key={index1}>
              <Container>
                <Row key={index1}>
                  <Col>
                    {/* <p className='title mb-3'>{service?.name}</p> */}
                    <div className="about_texts">

                      {/* <h1>{service?.name}</h1> */}
                      <div className='ServicesPara mb-4' dangerouslySetInnerHTML={{ __html: item1?.description }} />
                    </div>
                  </Col>
                </Row>
              </Container>
              <section className="section-services">
                <Container>

                  <Row>
                    <Col xs={12}>
                      <div className="imageTextBlock">
                        <div className="ser_rea services_sec">
                          <div className="row no-gutters center-cols py-5">
                            {item1?.menu_contents?.contents?.map((content, index) => {
                              const casestudyData = content?.casestudy?.data?.casestudy;

                              const isEven = index % 2 !== 0;
                              const slug = casestudyData?.slug;
                              const short_desc = casestudyData?.short_desc;

                              const longdesc = casestudyData?.long_desc
                                ? casestudyData.long_desc.split(",")
                                : [];

                              return (
                                <Col xs={12} md={4} key={index}>
                                  <div className="port-box">
                                    <div className="port-img port-img2">
                                      <Image
                                        width={600}
                                        height={150}
                                        src={`${env.BACKEND_BASE_URL}${casestudyData?.image}`}
                                        alt="image"
                                        className="img-fluid"
                                        loading="lazy"
                                      />
                                    </div>

                                    <h3 className="port-title-case-study">{casestudyData?.title}</h3>

                                    <div className="blog-hm-desc p-3">{short_desc}</div>

                                    {/*
                                    <div className="port-tags">
                                      {longdesc.map((item, i) => (
                                        <h4 key={i}>{item}</h4>
                                      ))}
                                    </div>
                                    */}

                                    <div className="services-btn-area">
                                      {slug && (
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
                                </Col>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </Col>

                  </Row>
                </Container>

              </section>
              {/* <section className="section-services">
                <Container>

                  <Row>
                    <Col xs={12}>
                      <div className="imageTextBlock">
                        <div className="ser_rea services_sec">
                          {item1?.menu_contents?.contents?.map((content, index) => {
                            const casestudyData = content?.casestudy?.data?.casestudy;

                            const isEven = index % 2 !== 0;
                            const slug = casestudyData?.slug;
                            const description = content?.extra_description;

                            const short_desc = casestudyData?.short_desc;

                            const longdesc = casestudyData?.long_desc
                              ? casestudyData.long_desc.split(",")
                              : [];

                            return (
                              <div className="row no-gutters" key={index}>
                                {isEven ? (
                                  <>
                                    <div className="col-lg-6 col-12">
                                      <div className="services-text">
                                        <h2>{casestudyData?.title}</h2>
                                        <p>{short_desc}</p>
                                        <div className="port-tags services-tags">
                                          {longdesc.map((item, i) => (
                                            <h4 key={i}>{item}</h4>
                                          ))}
                                        </div>

                                        {slug && (
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
                                          src={`${env.BACKEND_BASE_URL}${casestudyData?.image}`}
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
                                          src={`${env.BACKEND_BASE_URL}${casestudyData?.image}`}
                                          alt="image"
                                          className="img-fluid"
                                          loading="lazy"
                                        />
                                      </div>
                                    </div>

                                    <div className="col-lg-6 col-12">
                                      <div className="services-text">
                                        <h2>{casestudyData?.title}</h2>
                                        <p>{short_desc}</p>
                                        <div className="port-tags services-tags">
                                          {longdesc.map((item, i) => (
                                            <h4 key={i}>{item}</h4>
                                          ))}
                                        </div>

                                        {slug && (
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
                            );
                          })}
                        </div>


                      </div>
                    </Col>
                  </Row>
                </Container>

              </section> */}


              {/* <section className="section-services">
                <Container>

                  <Row>
                    <Col xs={12}>
                      <div className="imageTextBlock">
                        <div className="ser_rea services_sec">
                          {item1?.menu_contents?.contents?.map((content, index) => {
                            const casestudyData = content?.casestudy?.data?.casestudy;

                            const isEven = index % 2 !== 0;
                            const slug = casestudyData?.slug;
                            const description = content?.extra_description;

                            const short_desc = casestudyData?.short_desc;

                            const longdesc = casestudyData?.long_desc
                              ? casestudyData.long_desc.split(",")
                              : [];

                            return (
                              <div className="row no-gutters" key={index}>
                                {isEven ? (
                                  <>
                                    <div className="col-lg-6 col-12">
                                      <div className="services-text">
                                        <h2>{casestudyData?.title}</h2>
                                        <p>{short_desc}</p>
                                        <div className="port-tags services-tags">
                                          {longdesc.map((item, i) => (
                                            <h4 key={i}>{item}</h4>
                                          ))}
                                        </div>

                                        {slug && (
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
                                          src={`${env.BACKEND_BASE_URL}${casestudyData?.image}`}
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
                                          src={`${env.BACKEND_BASE_URL}${casestudyData?.image}`}
                                          alt="image"
                                          className="img-fluid"
                                          loading="lazy"
                                        />
                                      </div>
                                    </div>

                                    <div className="col-lg-6 col-12">
                                      <div className="services-text">
                                        <h2>{casestudyData?.title}</h2>
                                        <p>{short_desc}</p>
                                        <div className="port-tags services-tags">
                                          {longdesc.map((item, i) => (
                                            <h4 key={i}>{item}</h4>
                                          ))}
                                        </div>

                                        {slug && (
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
                            );
                          })}
                        </div>


                      </div>
                    </Col>
                  </Row>
                </Container>

              </section> */}



            </React.Fragment>
          ))}
        </div>
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

  let service = null;

  // If slug belongs to application-solutioning sub-services
  if (
    slug === "application-development" ||
    slug === "application-maintenance" ||
    slug === "ui-ux" ||
    slug === "professional-services"
  ) {
    // find the APPLICATION SOLUTIONING parent
    const service_ = services.find(
      (item) => item.slug.toString() === "application-solutioning"
    );

    // find the sub-child
    service = service_?.children?.find(
      (item) => item.slug.toString() === slug
    );
  } else {
    // normal find
    service = services.find((item) => item.slug.toString() === slug);
  }


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

  const seobyslug = await HomeService.seobyslug(slug);
  const seometadata = seobyslug?.data?.seometa;

  return {
    props: {
      service,
      enrichedChildren,
      seometadata
    },
  };
}