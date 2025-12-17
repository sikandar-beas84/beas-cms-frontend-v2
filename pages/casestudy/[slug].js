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
import BannerCarousal from "../component/BannerCarousal";
import SlideQueryComponent from "../component/SlideQueryComponent";

const Page = ({
  casestudy,
  menucasestudy,
  homeData,
  prevProject,
  nextProject,
  seometadata,
  currentIndex,
  totalPages
}) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  // 🔴 SAFETY GUARD (VERY IMPORTANT)
  if (!casestudy) return null;

  const parseHTMLWithEnv = (html) => {
    if (!html) return "";
    return html
      .replace(/\{env\.SITE_URL\}/g, env.SITE_URL)
      .replace(/\{env\.BACKEND_BASE_URL\}/g, env.BACKEND_BASE_URL);
  };

  const metaTitle = seometadata?.title || "Case Study";
  const metaKeyword =
    seometadata?.keyword ||
    "case study, business solution, project success, Beas consultancy";
  const metaDesc =
    seometadata?.description ||
    "Learn how Beas Consultancy delivered a tailored solution and business impact";
  const metaImage = seometadata?.image
    ? `${env.BACKEND_BASE_URL}${seometadata.image}`
    : `${env.BACKEND_BASE_URL}${casestudy.image}`;
  const metaUrl = `${env.FRONTEND_BASE_URL}casestudy/${casestudy.slug}`;
  const metaAuthor =
    seometadata?.author ||
    "BEAS Consultancy And Services Private Limited";

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
          pagetitle={casestudy?.title}
          pageslug="Casestudy"
          pageBanner={`assets/img/menu-content/${menucasestudy?.menu_contents?.banner}`}
          totalCasestudy={{ currentStudy: currentIndex+1, totalStudy: totalPages }}
        />

        <div className="bgF2F4F7 p-relative">
          <Container fluid>
            <div className="d-flex justify-content-between carosalArrow">
              {prevProject && (
                <Link
                  prefetch
                  href={`/casestudy/${prevProject.slug}`}
                  className="btn btn-primary"
                >
                  <ChevronLeft />
                </Link>
              )}

              {nextProject && (
                <Link
                  prefetch
                  href={`/casestudy/${nextProject.slug}`}
                  className="btn btn-primary"
                >
                  <ChevronRight />
                </Link>
              )}
            </div>
          </Container>

          <Container className="py-5 ccase-study-container">
            <Row>
              <Col xs={12}>
                <h1 className="inner-page-title-small">
                  {casestudy?.title}
                </h1>
              </Col>

              <Col xs={12} lg={5}>
                <Image
                  width={600}
                  height={150}
                  src={`${env.BACKEND_BASE_URL}${casestudy?.image}`}
                  alt={casestudy?.title}
                  className="img-fluid"
                  loading="lazy"
                />
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

                  <Accordion.Item eventKey="1" className="green-bg">
                    <Accordion.Header>
                      BEAS’s Solution
                    </Accordion.Header>
                    <Accordion.Body>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: parseHTMLWithEnv(
                            casestudy?.beas_solution
                          ),
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
                            __html:
                              casestudy.benefits_to_the_customer,
                          }}
                        />
                      ) : (
                        <Image
                          width={550}
                          height={50}
                          src={`${env.BACKEND_BASE_URL}${casestudy?.samplescreen}`}
                          alt="Sample Screen"
                          className="img-fluid"
                          loading="lazy"
                        />
                      )}
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3" className="orange-bg">
                    <Accordion.Header>
                      Technology Platform
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {casestudy?.technology_platform?.map(
                          (item, index) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>

            <Row>
              <Col xs={12} className="mt-5">
                <h1 className="inner-page-title mb-2 text-center">
                  {homeData?.portfoliohomepage?.title}
                </h1>
                <p className="text-center">
                  {homeData?.portfoliohomepage?.long_desc}
                </p>
              </Col>

              <Col xs={12} className="my-3">
                <BannerCarousal
                  page="projectsnew"
                  projects={homeData?.projects}
                />
              </Col>
            </Row>
          </Container>

          {showForm && (
            <SlideQueryComponent modalshow={showForm} />
          )}
        </div>
      </main>
    </>
  );
};

export default React.memo(Page);
export async function getServerSideProps({ params, res }) {
  const slug = params?.slug;

  // CDN cache (fast like static)
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=600"
  );

  try {
    const [homeRes, projectRes, menuRes, seoRes] =
      await Promise.all([
        HomeService.homePage(),
        HomeService.projectPage(),
        HomeService.menuProjectPage(),
        HomeService.seobyslug(slug),
      ]);

    const projects = projectRes?.data?.projects || [];
    const totalPages = projects.length;

    const index = projects.findIndex(
      (p) => p.slug === slug
    );

    if (index === -1) {
      return { notFound: true };
    }

    return {
      props: {
        homeData: homeRes?.data || null,
        casestudy: projects[index],
        menucasestudy:
          menuRes?.data?.casestudy || null,
        prevProject:
          projects[
            (index - 1 + projects.length) %
              projects.length
          ],
        nextProject:
          projects[(index + 1) % projects.length],
        seometadata:
          seoRes?.data?.seometa || null,
        currentIndex : index,
        totalPages
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
