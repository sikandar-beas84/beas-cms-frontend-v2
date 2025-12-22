import React, { useEffect, useMemo, useState } from 'react';
import BreadCrumb from '../component/BreadCrumb';
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap";
import Link from 'next/link';
import Image from 'next/image';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import HomeService from '../../util/service/Home';

import { useIndustries } from '../../util/context/industrycontext';

const Page = ({ slug, seometadata }) => {
  const router = useRouter();
  const { industries, loading } = useIndustries();
  const [enrichedContents, setEnrichedContents] = useState([]);

  if (router.isFallback || loading) {
    return <div>Loading...</div>;
  }

  /**
   * 🔍 Resolve industry FROM CONTEXT using slug
   */
  const industry = useMemo(() => {
    let currentLevel = industries;
    let found = null;

    for (const part of slug) {
      found = currentLevel.find(item => item.slug === part);
      if (!found) return null;
      currentLevel = found.children || [];
    }
    return found;
  }, [industries, slug]);

  if (!industry) {
    return <div>Industry not found</div>;
  }

  /**
   * 🔁 Enrich case studies FROM industry contents (NO industry API)
   */
  useEffect(() => {
    const contents = industry?.menu_contents?.contents || [];

    const enrich = async () => {
      const result = await Promise.all(
        contents.map(async (item) => {
          if (!item.extra_description) return item;
          try {
            const data = await HomeService.individualProjectPage(item.extra_description);
            return { ...item, casestudy: data };
          } catch {
            return item;
          }
        })
      );
      setEnrichedContents(result);
    };

    enrich();
  }, [industry]);

  /**
   * 🔹 SEO META
   */
  const metaTitle = seometadata?.title || "Industry";
  const metaKeyword =
    seometadata?.keyword ||
    "services, beas consultancy, business solutions, software development";
  const metaDesc =
    seometadata?.description ||
    "Explore our wide range of services to empower your business through innovative solutions.";

  const metaImage = seometadata?.image
    ? `${env.BACKEND_BASE_URL}${seometadata.image}`
    : `${env.BACKEND_BASE_URL}${industry.image}`;

  const metaUrl = seometadata?.url
    ? `${env.FRONTEND_BASE_URL}industries/${seometadata.url}`
    : `${env.FRONTEND_BASE_URL}industries/${industry.slug}`;

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
          pagetitle={industry.name}
          pageslug="Industry"
          pageBanner={`assets/img/menu-content/${industry?.menu_contents?.banner}`}
        />

        <Container className="pt-5">
          <Row>
            <Col>
              <div className="about_texts">
                <h1>{industry.name}</h1>
                <div
                  className="ServicesPara mb-4"
                  dangerouslySetInnerHTML={{ __html: industry.description }}
                />
              </div>
            </Col>
          </Row>
        </Container>

        <section>
          <Container className="pb-5">
            <div className="imageTextBlock">
              <div className="row center-cols">
                {enrichedContents.map((item, index) => {
                  const casestudyData = item?.casestudy?.data?.casestudy;
                  if (!casestudyData?.slug) return null;

                  return (
                    <Col xs={12} md={4} key={index}>
                      <div className="guiditem">
                        <div className="blog-hm-img">
                          <Image
                            src={`${env.BACKEND_BASE_URL}${casestudyData.image}`}
                            alt="case-study"
                            width={400}
                            height={400}
                            className="img-fluid"
                            priority={index < 3}
                          />
                        </div>

                        <div className="ggrey-bg">
                          <h5 className="blog-hm-title pbb-5">
                            {casestudyData.title}
                          </h5>

                          <div className="mb-0 portfilo-hm-desc color-black pbb-5">
                            {casestudyData.short_desc}
                          </div>

                          <div className="bbbblue-border"></div>

                          <div className="d-flex justify-content-center mt-35">
                            <Link
                              href={{
                                pathname: "/casestudy",
                                query: { id: casestudyData.slug },
                              }}
                              className="post-job-btn"
                            >
                              Read Case Study
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default React.memo(Page);
export async function getServerSideProps({ params }) {
  const { slug } = params;

  const seoRes = await HomeService.seobyslug(slug);

  return {
    props: {
      slug,
      seometadata: seoRes?.data?.seometa || null,
    },
  };
}
