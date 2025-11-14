
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

const Page = ({industry, enrichedContents, seometadata}) => {

    const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }
    
    const metaTitle = seometadata?.title
        ? seometadata?.title
        :`Industry`;
    const metaKeyword = seometadata?.keyword
        ? seometadata?.keyword
        :"services, beas consultancy, business solutions, software development";
    const metaDesc = seometadata?.description
        ? seometadata?.description
        : "Explore our wide range of services to empower your business through innovative solutions.";
    const metaImage = seometadata?.image
        ? `${env.BACKEND_BASE_URL}${seometadata?.image}`
        : `${env.BACKEND_BASE_URL}${industry?.image}`;
    const metaUrl = seometadata?.url
        ?`${env.FRONTEND_BASE_URL}industries/${seometadata?.url}`
        :`${env.FRONTEND_BASE_URL}industries/${industry?.slug}`;
    const metaAuthor = seometadata?.author
        ? seometadata?.author
        :"BEAS Consultancy And Services Private Limited";

    return (
        <>
            <SEO
                title={ metaTitle }
                description={ metaDesc }
                keywords={ metaKeyword }
                image={ metaImage }
                url={ metaUrl }
                author={ metaAuthor }
            />
            <main>
                <BreadCrumb pagetitle={industry?.name} pageslug='Industry' pageBanner={`assets/img/menu-content/${industry?.menu_contents?.banner}`} />
                <Container className='py-5'>
                    <Row>
                        <Col>
                            {/* <div className="cmsPage_h1">Industries</div> */}
                            {/* <p className='title mb-3'>{industry?.name}</p> */}
                            <div className='IndustriesPara mb-4' dangerouslySetInnerHTML={{ __html: industry?.description }} />
                            <div className=''>
                                <Row>
                                    { enrichedContents?.map((item, index)=>
                                    {

                                        const casestudyData = item?.casestudy?.data?.casestudy;
                                        const isEven = index % 2 !== 0;
                                        const slug = casestudyData?.slug;

                                        const description = item?.extra_description;
                                        
                                        const short_desc = casestudyData?.short_desc
                                            ? casestudyData?.short_desc.split(" ").slice(0, 4).join(" ") + ""
                                            : "";
                                        
                                        const longdesc = casestudyData?.long_desc ? casestudyData.long_desc.split(",") : [];

                                        return description ? (
                                            <div className="row no-gutters" key={index}>
                                              {/* For even items: text first, image second */}
                                              {isEven ? (
                                                <>
                                                  <div className="col-lg-6 col-12">
                                                    <div className="services-text">
                                                      <h2>{casestudyData?.title}</h2>
                                                      <p>{short_desc}</p>
                                                      <div className="port-tags services-tags">
                                                      { longdesc.map((item, index)=>(
                                                      <h4 key={index}>{item}</h4>
                                                      )) }
                                                      </div>
                                                      {casestudyData?.slug && (
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
                                                // For odd items: image first, text second
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
                                                      { longdesc.map((item, index)=>(
                                                      <h4 key={index}>{item}</h4>
                                                      )) }
                                                      </div>
                                                      {casestudyData?.slug && (
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


                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
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
  
  
  