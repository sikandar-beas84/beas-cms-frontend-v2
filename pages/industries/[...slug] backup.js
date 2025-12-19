
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

const Page = ({ industry, enrichedContents, seometadata }) => {

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }



  const metaTitle = seometadata?.title
    ? seometadata?.title
    : `Industry`;
  const metaKeyword = seometadata?.keyword
    ? seometadata?.keyword
    : "services, beas consultancy, business solutions, software development";
  const metaDesc = seometadata?.description
    ? seometadata?.description
    : "Explore our wide range of services to empower your business through innovative solutions.";
  const metaImage = seometadata?.image
    ? `${env.BACKEND_BASE_URL}${seometadata?.image}`
    : `${env.BACKEND_BASE_URL}${industry?.image}`;
  const metaUrl = seometadata?.url
    ? `${env.FRONTEND_BASE_URL}industries/${seometadata?.url}`
    : `${env.FRONTEND_BASE_URL}industries/${industry?.slug}`;
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
          pagetitle={industry?.name}
          pageslug="Industry"
          pageBanner={`assets/img/menu-content/${industry?.menu_contents?.banner}`}
        />

        <Container className="pt-5">
          <Row>
            <Col>
              <div className="about_texts">
                <h1>{industry?.name}</h1>
                <div
                  className="ServicesPara mb-4"
                  dangerouslySetInnerHTML={{ __html: industry?.description }}
                />
              </div>
            </Col>
          </Row>
        </Container>
        <section>
          <Container className="pb-5">
       
                <div className='imageTextBlock'>
                  <div className='row center-cols'>
                    {enrichedContents?.map((item, index) => {
                      const casestudyData = item?.casestudy?.data?.casestudy;
                      const isEven = index % 2 !== 0;
                      const slug = casestudyData?.slug;

                      const description = item?.extra_description;
                      if (!description) return null;

                      const short_desc = casestudyData?.short_desc;

                      const longdesc = casestudyData?.long_desc
                        ? casestudyData.long_desc.split(",")
                        : [];

                      return (

                        slug && (
                          <Col xs={12} md={4} key={index}>
                            <div className="guiditem">
                              <div className="blog-hm-img">
                                <Image
                                  src={`${env.BACKEND_BASE_URL}${casestudyData?.image}`}
                                  alt="case-study"
                                  width={400}
                                  height={400}
                                  priority
                                  fetchPriority="high"
                                  className="img-fluid"
                                />
                                {/* <div className="guidcal">
                                  <strong>17</strong>
                                  <br />
                                  <span>Nov</span>
                                </div> */}
                              </div>

                              <div className="ggrey-bg">
                                <h5 className="blog-hm-title pbb-5">
                                  {casestudyData?.title}
                                </h5>

                                <div className="mb-0 portfilo-hm-desc color-black pbb-5">
                                    {short_desc}
                                </div>
                                <div className='bbbblue-border'></div>
                                <div className="d-flex justify-content-center mt-35">
                                 {slug && (
                                  <Link
                                    href={{
                                      pathname: "/casestudy",
                                      query: { id: slug },
                                    }}
                                    className="post-job-btn"
                                  >
                                    Read Case Study
                                  </Link>
                                )}
                                </div>
                              </div>
                            </div>
                          </Col>
                        )
                      );
                    })}
                  </div>
                </div>
              
          </Container>

          {/* Background shapes */}
          {/* <div className="shp1">
            <img src="../assets/images/ser-bg.png" />
          </div>
          <div className="shp2">
            <img src="../assets/images/ser-bg2.png" />
          </div> */}
        </section>
      </main>


    </>
  )
}

export default React.memo(Page);

export async function getServerSideProps({ params }) {
  const { slug } = params; // slug is now an array

  const response = await HomeService.menuIndustryPage(); // Load menu tree
  const industries = response.data?.industries?.children || [];

  let industry = null;
  let currentLevel = industries;
  // Traverse nested slugs
  for (const part of slug) {
    industry = currentLevel.find(item => item.slug.toString() === part);
    if (!industry) break;
    currentLevel = industry.children || [];
  }

  if (!industry) {
    return {
      notFound: true, // 404 if no match
    };
  }

  const contents = industry?.menu_contents?.contents || [];

  const enrichedContents = await Promise.all(

    contents.map(async (item) => {
      if (!item.extra_description) return item;

      try {
        const data = await HomeService.individualProjectPage(item?.extra_description);
        return { ...item, casestudy: data };
      } catch (err) {
        //console.error(`Failed to fetch for ${item.extra_description}:`, err);
        return item; // fallback to original item
      }
    })
  );

  const seobyslug = await HomeService.seobyslug(slug);
  const seometadata = seobyslug?.data?.seometa;

  return {
    props: {
      industry,
      enrichedContents,
      seometadata
    },
  };
}


