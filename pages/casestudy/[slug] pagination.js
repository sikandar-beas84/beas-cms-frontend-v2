import React from "react";
import BreadCrumb from "../component/BreadCrumb";
import { Container, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Image from "next/image";
import HomeService from "../../util/service/Home";
import { env } from "../../util/constants/common";
import Link from "next/link";
import SEO from "../../components/SEO";
import { useRouter } from "next/router";

const MAX_VISIBLE = 10; // show 10 numbers at a time

const Page = ({ casestudy, menucasestudy, projects, currentSlug }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // find current index
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const prevProject = projects[currentIndex - 1] || null;
  const nextProject = projects[currentIndex + 1] || null;

  // 🔹 Pagination logic (10 at a time)
  const totalPages = projects.length;
  const currentPage = currentIndex + 1;
  const currentGroup = Math.floor((currentPage - 1) / MAX_VISIBLE);
  const start = currentGroup * MAX_VISIBLE;
  const end = Math.min(start + MAX_VISIBLE, totalPages);

  return (
    <>
      <SEO
        title={`Case Study | ${casestudy?.title}`}
        description={
          casestudy?.title ||
          `${casestudy?.title} - Learn how Beas Consultancy delivered a tailored solution and business impact.`
        }
        keywords={
          casestudy?.title ||
          "case study, business solution, project success, Beas consultancy"
        }
        image={
          casestudy?.image
            ? `${env.BACKEND_BASE_URL}${casestudy.image}`
            : `${env.BACKEND_BASE_URL}/default-image.jpg`
        }
        url={`${env.FRONTEND_BASE_URL}/casestudy/${casestudy?.slug}`}
        author="Beas Consultancy & Services Pvt. Ltd."
      />

      <main>
        <BreadCrumb
          pagetitle={casestudy.title}
          pageslug="Casestudy"
          pageBanner={`assets/img/menu-content/${menucasestudy?.menu_contents?.banner}`}
        />

        <Container className="py-5">
          <Row>
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

              {casestudy?.technology_platform?.length > 0 && (
                <div className="service-left-panel vertical-box my-3">
                  <p className="title">Technology Platform</p>
                  <ul>
                    {casestudy.technology_platform.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

            </Col>

            <Col xs={12} lg={7}>
              <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
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

                <Accordion.Item eventKey="1">
                  <Accordion.Header>BEAS’s Solution</Accordion.Header>
                  <Accordion.Body>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: casestudy?.beas_solution,
                      }}
                    />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    {casestudy?.benefits_to_the_customer
                      ? "Benefits to the customer"
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
              </Accordion>
            </Col>
          </Row>
        </Container>

        {/* ✅ Pagination (10 numbers at a time) */}
        <div className="d-flex justify-content-center my-4">
          {/* Previous */}
          {prevProject && (
            <Link
              href={`/casestudy/${prevProject.slug}`}
              className="btn btn-outline-primary mx-1"
            >
              ← Previous
            </Link>
          )}

          {/* Numbered Slugs */}
          {projects.slice(start, end).map((proj, index) => (
            <Link
              key={proj.slug}
              href={`/casestudy/${proj.slug}`}
              className={`btn mx-1 ${
                proj.slug === currentSlug
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
            >
              {start + index + 1}
            </Link>
          ))}

          {/* Next Group */}
          {end < totalPages && (
            <Link
              href={`/casestudy/${projects[end].slug}`}
              className="btn btn-outline-primary mx-1"
            >
              Next →
            </Link>
          )}
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

  if (currentIndex === -1) {
    return {
      notFound: true,
    };
  }

  const casestudy = projects[currentIndex];

  return {
    props: {
      casestudy,
      menucasestudy,
      projects,
      currentSlug: slug,
    },
  };
}
