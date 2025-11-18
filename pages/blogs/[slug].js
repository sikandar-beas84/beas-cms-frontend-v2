import React, { useState } from 'react'
import BreadCrumb from '../component/BreadCrumb';
import { Container, Col, Row } from 'react-bootstrap'
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import { Clock, MessageCircle, User } from "react-feather";

const Blog = ({ blog, seometadata, homeData }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const createdAtString = blog?.created_at;
  const created_at = createdAtString ? new Date(createdAtString) : null;
  const day = created_at ? created_at.getDate() : "";
  const month = created_at ? created_at.getMonth() + 1 : "";
  const year = created_at ? created_at.getFullYear() : "";

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!regex.test(value)) {
        //Invalid input — do not update formData
        setErrors((prev) => ({
          ...prev,
          email: ["Enter a valid email address."],
        }));
        return;
      } else {
        //  Valid input
        setErrors((prev) => ({
          ...prev,
          email: null,
        }));
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));

  }
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    url: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const token = recaptchaRef.current.getValue();

    if (!captchaToken) {
      alert('Please verify the captcha');
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('check_token', checkToken);
    data.append('blog_id', careerId);

    // for (let [key, value] of data.entries()) {
    //   console.log(`${key}:`, value);
    // }

    setLoading(true); //  start loader
    setStatus('');    // clear previous status

    try {
      const res = await fetch(`${env.API_BASE_URL}apply-job`, {
        method: 'POST',
        headers: {
          'X-SECURE-KEY': env.ACCESS_TOKEN
        },
        body: data
      });

      const result = await res.json();
      if (res.ok) {
        setStatus('✅ Your job application has been submitted successfully.');
        setErrors({});
        setFormData({
          name: '', email: '', phone: '', resume: null
        });
        // ✅ Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        //recaptchaRef.current.reset();
      } else {
        setStatus(`❌ Error: ${result.message || 'Failed to send'}`);
        setErrors(result.error); // store errors in state
      }
    } catch (err) {
      //console.error(err);
      setStatus('❌ Submission failed. Check console.');
    } finally {
      setLoading(false); // ✅ stop loader
    }
  };


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
    : `${env.BACKEND_BASE_URL}${blog?.image}`;
  const metaUrl = seometadata?.url
    ? `${env.FRONTEND_BASE_URL}blog/${seometadata?.url}`
    : `${env.FRONTEND_BASE_URL}blog/${blog?.slug}`;
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
        <BreadCrumb pagetitle="Blog" pageBanner={`${blog?.banner}`} />
        {console.log('blog', blog)}
        <Container className='py-5'>
          <section className="space-ptb">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-8">
                  <div className="blog-detail">
                    <div className="blog-post">
                      <div className="blog-post-title about_texts">
                        <h1>{blog?.title}</h1>
                      </div>
                      <div className="blog-post-footer border-0 justify-content-start pt-0 blog-details-txt">
                        <div className="blog-post-time">
                           <Clock size={16} /> {day} / {month} / {year}
                        </div>
                        <div className="blog-post-author">
                          <span><User size={16}/> {blog?.author_name}</span>
                        </div>
                        <div className="blog-post-comment">
                          <MessageCircle size={16} /> {blog.blog_contents.length} 
                        </div>
                      </div>
                      <div className="blog-post-image border-20">
                        <Image
                          width={850}
                          height={500}
                          src={`${env.BACKEND_BASE_URL}${blog?.image}`}
                          alt="image"
                          className="img-fluid"
                          loading="lazy"
                        />
                      </div>
                      <div className="blog-post-content mt-4">
                        <div
                          className="mb-0"
                          dangerouslySetInnerHTML={{ __html: blog?.description }}
                        ></div>
                      </div>
                      <div className="blog-post-content mt-4">
                       

                        <blockquote className="blockquote">
                          <p>{blog?.quote}</p>
                        </blockquote>

                        <div className="mt-4">

                          {blog.blog_contents.map((item, index) => (
                            <div key={index} className="media mb-3">
                              {/* <div className="avatar avatar-lg">
                            <img src="assets/images/01.jpg" className="img-fluid rounded-circle" alt="..."/>
                            </div> */}
                              <div className="media-body ml-3 border p-4">
                                <div className="d-flex">
                                  <h6 className="mt-0">{item.name}</h6>
                                </div>
                                <p className="mb-0">{item.comment}</p>
                              </div>
                            </div>
                          ))}

                          <div className="mt-4">
                            <h5 className="mb-4">Leave a Reply</h5>
                            <form onSubmit={handleSubmit}>
                              <div className="form-row">
                                <div className="form-group col-md-6">
                                  <input
                                    type='text'
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className='form-control'
                                    placeholder='Your Name'
                                    required
                                  />

                                </div>
                                <div className="form-group col-md-6">
                                  <input
                                    type='text'
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className='form-control'
                                    placeholder='Your Email'
                                    required
                                  />

                                </div>
                                <div className="form-group col-12">
                                  <input
                                    type='text'
                                    name="url"
                                    value={formData.url}
                                    onChange={handleChange}
                                    className='form-control'
                                    placeholder='Your Website'
                                    required
                                  />

                                </div>
                                <div className="form-group col-md-12">
                                  <textarea
                                    type='text'
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className='form-control'
                                    placeholder='Your Message'
                                    required
                                  ></textarea>

                                </div>
                                <div className=" form-group col-md-12">
                                  <div className="custom-control custom-checkbox checkbox-">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label pr-5" for="customCheck1"> I consent to having this website store my submitted information so they can respond to my inquiry.</label>
                                  </div>
                                </div>
                                <div className="col-md-12 pt-3">
                                  <a className="post-job-btn" href="#">Send Message</a>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4 mt-5 mt-lg-0">
                  <div className="blog-sidebar">
                    <h2>Transform business with <br /> Beas Consultancy Pvt. Ltd</h2>
                    <ul className='pb-4'>
                      <li>20 years experience</li>
                      <li>Expert team across diverse industries</li>
                      <li>Customized business solutions</li>
                      <li>Proven track record of client success</li>
                      <li>End-to-end support for every project</li>
                      <li>Data-driven strategies for smarter decisions</li>
                      <li>Cost-effective and scalable solutions</li>
                   </ul>
                    <div className='d-flex justify-content-center'>
                      <a className="post-job-btn" href="#">Connect with us</a>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </section>
        </Container>
        {/* <Container>
          <Row>
            <Col>
              <div className="Blogs">
                <div className="container">
                  <div className="Blogs-head">
                    <h2>{homeData?.bloghomepage?.title}</h2>
                    <p>{homeData?.bloghomepage?.long_desc}</p>
                  </div>
                  <div className="Blogs-inr">
                    <div className="row">
                      <div className='col-12'>

                        <BannerCarousal page="blogs" blogs={homeData?.blogs} />

                      </div>
                    </div>



                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container> */}
      </main>
    </>
  );

}

export default React.memo(Blog);

export async function getServerSideProps({ params }) {

  const { slug } = params;

  const response = await HomeService.individualBlogPage(slug);
  const blog = response.data?.blog || [];

  const seobyslug = await HomeService.seobyslug(slug);
  const seometadata = seobyslug?.data?.seometa;

  return {
    props: {
      blog,
      seometadata
    }
  }
}