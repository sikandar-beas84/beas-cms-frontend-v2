import React, { useEffect, useState } from "react";
import BreadCrumb from "../component/BreadCrumb";
import { Container, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "react-feather";
import HomeService from "../../util/service/Home";
import { env } from "../../util/constants/common";
import Link from "next/link";
import SEO from "../../components/SEO";
import { useRouter } from "next/router";
import BannerCarousal from "../component/BannerCarousal";
import SlideQueryComponent from '../component/SlideQueryComponent';

const MAX_VISIBLE = 10; // show 10 numbers at a time

const Page = ({ casestudy, menucasestudy, projects, currentSlug, homeData, seometadata }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 15000); // 15 seconds delay

    return () => clearTimeout(timer);
  }, []);



  // find current index
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const prevProject = projects[currentIndex - 1] || null;
  const nextProject = projects[currentIndex + 1] || null;

  //  Pagination logic (10 at a time)
  const totalPages = projects.length;
  const currentPage = currentIndex + 1;
  const currentGroup = Math.floor((currentPage - 1) / MAX_VISIBLE);
  const start = currentGroup * MAX_VISIBLE;
  const end = Math.min(start + MAX_VISIBLE, totalPages);


  // Helper function to replace variables
const parseHTMLWithEnv = (html) => {
  if (!html) return "";

  return html
    .replace(/\{env\.SITE_URL\}/g, env.SITE_URL)   // replace {env.SITE_URL}
    .replace(/\{env\.BACKEND_BASE_URL\}/g, env.BACKEND_BASE_URL); // other env vars if needed
};

  const metaTitle = seometadata?.title
    ? seometadata?.title
    : `Case Study`;
  const metaKeyword = seometadata?.keyword
    ? seometadata?.keyword
    : "case study, business solution, project success, Beas consultancy";
  const metaDesc = seometadata?.description
    ? seometadata?.description
    : "Learn how Beas Consultancy delivered a tailored solution and business impact";
  const metaImage = seometadata?.image
    ? `${env.BACKEND_BASE_URL}${seometadata?.image}`
    : `${env.BACKEND_BASE_URL}${casestudy?.image}`;
  const metaUrl = seometadata?.url
    ? `${env.FRONTEND_BASE_URL}casestudy/${seometadata?.url}`
    : `${env.FRONTEND_BASE_URL}casestudy/${casestudy?.slug}`;
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
          pagetitle={casestudy.title}
          pageslug="Casestudy"
          pageBanner={`assets/img/menu-content/${menucasestudy?.menu_contents?.banner}`}
        />


        <div className="bgF2F4F7 p-relative">
          <Container fluid>
            <div className="d-flex justify-content-between carosalArrow">
              {/* Previous */}
              {
                prevProject ? (
                  <Link
                    href={`/casestudy/${prevProject.slug}`}
                    className="btn btn-primary"
                  >
                    <ChevronLeft />
                  </Link>
                ) : <Link href="#" className="btn btn-primary" ><ChevronLeft /></Link>
              }

              {/* Next */}
              {
                nextProject ? (
                  <Link
                    href={`/casestudy/${nextProject.slug}`}
                    className="btn btn-primary"
                  >
                    <ChevronRight />
                  </Link>
                ) : <Link href="#" className="btn btn-primary" ><ChevronRight /></Link>
              }
            </div>
          </Container>

          <Container className="py-5 ccase-study-container">
            <Row>
              <Col xs={12}>
                <h1 className="inner-page-title-small">{casestudy?.title}</h1>
              </Col>
              <Col xs={12} lg={5}>
                <div className="serviceDetailsWrap">
                  <Image
                    width={600}
                    height={150}
                    src={`${env.BACKEND_BASE_URL}${casestudy?.image}`}
                    alt="image"
                    className="img-fluid"
                    loading="lazy"
                  />
                </div>

              </Col>

              <Col xs={12} lg={7}>
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="0" className="blue-bg2">
                    <Accordion.Header>
                      Project Overview / Business Need
                    </Accordion.Header>
                    <Accordion.Body>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: casestudy?.business_need,
                        }}
                      />
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* <Accordion.Item eventKey="1" className="green-bg">
                    <Accordion.Header>BEAS’s Solution</Accordion.Header>
                    <Accordion.Body>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: casestudy?.beas_solution,
                        }}
                      />
                    </Accordion.Body>
                  </Accordion.Item> */}
                  <Accordion.Item eventKey="1" className="green-bg">
                    <Accordion.Header>BEAS’s Solution</Accordion.Header>
                    <Accordion.Body>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: parseHTMLWithEnv(casestudy?.beas_solution),
                        }}
                      />
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2" className="yellow-bg">
                    <Accordion.Header>
                      {casestudy?.benefits_to_the_customer
                        ? "Benefits To The Customer"
                        : "Sample Screen"}
                    </Accordion.Header>
                    <Accordion.Body>
                      {casestudy?.benefits_to_the_customer ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: casestudy.benefits_to_the_customer,
                          }}
                        />
                      ) : (
                        <Image
                          width={550}
                          height={50}
                          src={`${env.BACKEND_BASE_URL}${casestudy?.samplescreen}`}
                          alt="image"
                          className="img-fluid"
                          loading="lazy"
                        />
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3" className="orange-bg">
                    <Accordion.Header>Technology Platform</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {casestudy?.technology_platform?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="mt-5">
                <h1 className="inner-page-title mb-2 text-center">{homeData?.portfoliohomepage?.title}</h1>
                <p className="text-center">{homeData?.portfoliohomepage?.long_desc}</p>
              </Col>
              <Col xs={12} className="my-3">
                <BannerCarousal page="projectsnew" projects={homeData?.projects} />
              </Col>
            </Row>

          </Container>

          {showForm && <SlideQueryComponent modalshow={showForm} />}

        </div>
      </main>
    </>
  );
};

export default React.memo(Page);

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const response = await HomeService.projectPage();
  const projects = response.data?.projects || [];

  const result = await HomeService.menuProjectPage();
  const menucasestudy = result.data?.casestudy || [];

  const currentIndex = projects.findIndex(
    (item) => item.slug.toString() === slug
  );

  const homesection = await HomeService.homePage();
  const homeResult = homesection.data;


  if (currentIndex === -1) {
    return {
      notFound: true,
    };
  }

  const casestudy = projects[currentIndex];

  const seobyslug = await HomeService.seobyslug(slug);
  const seometadata = seobyslug?.data?.seometa;

  return {
    props: {
      casestudy,
      menucasestudy,
      projects,
      currentSlug: slug,
      homeData: homeResult ? homeResult : [],
      seometadata
    },
  };
}
