
import React, {useState} from 'react'
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
import ImageModal from '../component/ImageModal';
import BannerCarousal from '../component/BannerCarousal';

const Page = ({ service, enrichedChildren, seometadata, slug, allclient }) => {

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Modal control
  const [modalImage, setModalImage] = useState(null);

  const openModal = (img) => {
    setModalImage(img); // open modal with clicked image
  };

  const closeModal = () => {
    setModalImage(null); // close modal
  };
  
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

          {enrichedChildren?.map((item1, index1) => {
            return(
            <React.Fragment key={index1}>
              <Container>
                <Row key={index1}>
                  <Col>
                    {/* <p className='title mb-3'>{service?.name}</p> */}
                    <div className="about_texts">

                      {/* <h1>{service?.name}</h1> */}
                      <span className='ServicesPara mb-4' dangerouslySetInnerHTML={{ __html: item1?.description }} />
                      { item1.slug === "cloud-services" && (
                        <div>
                        <ul style={{listStyleType:'none'}}>
                          <li>a) <span onClick={() => openModal('/assets/images/aws.webp')} className="bblue-llink">Amazon Web Services (AWS)</span></li>
                          <li>b) <span onClick={() => openModal('/assets/images/azure.webp')} className="bblue-llink"> Azure Cloud</span></li>
                          <li>c) <span onClick={() => openModal('/assets/images/oracle_cloud.webp')} className="bblue-llink"> Oracle Cloud</span></li>
                          <li>d) <span onClick={() => openModal('/assets/images/google_cloud.webp')} className="bblue-llink"> Google Cloud</span></li>

                        </ul>
                        </div>
                      )

                      }
                      {item1?.image && (
                        <span
                          onClick={() => openModal(`${env.BACKEND_BASE_URL}${item1?.image}`)}
                          style={{ cursor: "pointer", color:'#0081d2', fontWeight:'600', textDecoration:'underline' }}
                        >
                          shown in the diagram.
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>
              </Container>
              <section className="section-services">
                <Container>
                  <Row>
                    <Col xs={12}>
                      <div className="imageTextBlock">
                        <div className="row center-cols py-3">

                          { slug !== 'professional-services'?
                          ( 
                            item1?.menu_contents?.contents
                              ?.sort((a, b) => Number(a?.extra_order) - Number(b?.extra_order))
                              ?.map((content, index) => {
                                const casestudyData = content?.casestudy?.data?.casestudy;
                            
                                const isEven = index % 2 !== 0;
                                const slug = casestudyData?.slug;
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
                                        </div>
                            
                                        <div className="ggrey-bg">
                                          <h5 className="blog-hm-title pbb-5">
                                            {casestudyData?.title}
                                          </h5>
                            
                                          <div className="mb-0 portfilo-hm-desc color-black pbb-5">
                                            {short_desc}
                                          </div>
                            
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
                              })
                            
                          ):(
                            <div className="Blogs">
                            <div className="container">
                                <div className="Blogs-head">
                                  
                                </div>
                                <div className="Blogs-inr">
                                  <div className="row">
                                    <div className='col-12'>
                                      <BannerCarousal page="clients" clients={allclient} />
                                      </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                          )
                          }

                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>

            </React.Fragment>
          )
            })}
          {/* Modal Component */}
      <ImageModal
        show={!!modalImage}
        image={modalImage}
        onClose={closeModal}
      />
        </div>
      </main>


    </>
  )
}

export default React.memo(Page);

export async function getServerSideProps({ params }) {
  try {
  const { slug } = params;

  // 1. Load menu tree
  const [homeres, menuRes, clientRes, seoRes] = await Promise.all([
    HomeService.homePage(),
    HomeService.menuServicePage(),
    HomeService.clientPage(),
    HomeService.seobyslug(slug),
  ]);

  const services = menuRes?.data?.services?.children || [];
  const allclient = clientRes?.data?.clients || [];
  const seometadata = seoRes?.data?.seometa || null;

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


  return {
    props: {
      service,
      enrichedChildren,
      seometadata,
      slug,
      allclient,
      homeData: homeres?.data || null
    },
  };
} catch {
  return { notFound: true };
}
}