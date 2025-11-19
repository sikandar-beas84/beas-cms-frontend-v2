import React, { useState } from 'react'
import BreadCrumb from '../component/BreadCrumb';
import { Container, Col, Row } from 'react-bootstrap'
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Blog = ({ blogs, seometadata, commonblog }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const PER_PAGE = 6; // 👉 SET ITEMS PER PAGE
  const [currentPage, setCurrentPage] = useState(1);

  const totalBlogs = blogs?.length || 0;
  const totalPages = Math.ceil(totalBlogs / PER_PAGE);

  // Slice according to page
  const displayedBlogs = blogs.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const goToPage = (pageNum) => setCurrentPage(pageNum);



  const metaTitle = seometadata?.name
    ? seometadata?.title
    : `Blog`;
  const metaKeyword = seometadata?.keyword
    ? seometadata?.keyword
    : "Blog, posting";
  const metaDesc = seometadata?.description
    ? seometadata?.description
    : "Explore exciting Blog opportunities with us.";
  const metaImage = seometadata?.image
    ? `${env.BACKEND_BASE_URL}${seometadata?.image}`
    : `${env.BACKEND_BASE_URL}${commonblog?.image}`;
  const metaUrl = seometadata?.url
    ? `${env.FRONTEND_BASE_URL}blog/${seometadata?.url}`
    : `${env.FRONTEND_BASE_URL}blog/${commonblog?.slug}`;
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
        <BreadCrumb pagetitle="Blog" pageBanner={`${commonblog?.image}`} />

        <Container className='py-5'>
          <Row>
            <Col>
              <div className="about_texts">
                <h1>{commonblog?.long_desc}</h1>
                <p>{commonblog?.short_desc}</p>
              </div>
            </Col>
          </Row>
        </Container>
        <section className="section-abuts section-services">
          <div className="container">
            <div className="row">
              {displayedBlogs?.map((item, index) => {
              
                const createdAtString = item?.blog?.created_at;
                const created_at = createdAtString ? new Date(createdAtString) : null;
                const day = created_at ? created_at.getDate() : "";
                const month = created_at ? created_at.getMonth() + 1 : "";
                const year = created_at ? created_at.getFullYear() : "";

                return (
                  <div className="col-12 col-md-4">
                    <div key={index} className='test-box'>
                      <Link
                        href={`blogs/${item?.slug}`}

                      >
                        <div className="guiditem">
                          <div className="blog-hm-img">
                            <Image
                              src={`${env.BACKEND_BASE_URL}${item.image}`}
                              alt="blog"
                              width={400}
                              height={400}
                              priority
                              fetchPriority="high"
                              className="img-fluid port-shw"
                            />
                            <div className="guidcal">

                              <strong>{day}</strong> <br /><span>{month}</span>
                            </div>
                          </div>
                          <div className="guidtext">
                            <h5 className='blog-hm-title'>{item?.title}</h5>
                            <div className="blog-hm-desc" dangerouslySetInnerHTML={{ __html: item?.short_desc }}
                            ></div>
                           <div class="d-flex justify-content-center mt-35"><div class="post-job-btn">Read More</div></div>

                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );

              })}
            </div>
          </div>

          {/* PAGINATION UI */}
          <div className="pagination-wrapper mt-5 d-flex justify-content-center">
              <ul className="pagination">

                {/* PREV BUTTON */}
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                >
                  <a className="page-link">Prev</a>
                </li>

                {/* PAGE NUMBERS */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                  <li
                    key={num}
                    className={`page-item ${currentPage === num ? "active" : ""}`}
                    onClick={() => goToPage(num)}
                  >
                    <a className="page-link">{num}</a>
                  </li>
                ))}

                {/* NEXT BUTTON */}
                <li
                  className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                  onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
                >
                  <a className="page-link">Next</a>
                </li>
              </ul>
            </div>



        </section>
      </main>
    </>
  );

}

export default React.memo(Blog);

export async function getServerSideProps(context) {

  const url = context.req.url;
  const lastSegment = url.split("/").filter(Boolean).pop();

  const response = await HomeService.blogPage();
  const blogs = response.data?.blogs || [];

  const commonresponse = await HomeService.commonPage();
  const commonData = commonresponse.data?.common || [];
  const firstBlog = commonData.filter((item) => item.slug === 'blog-section-homepage');
  const commonblog = firstBlog?.length > 0 ? firstBlog[0] : null;

  const seobyslug = await HomeService.seobyslug(lastSegment);
  const seometadata = seobyslug?.data?.seometa;

  return {
    props: {
      blogs,
      seometadata,
      commonblog
    }
  }
}