import React from 'react'
import BreadCrumb from '../component/BreadCrumb';
import { Container, Col, Row } from 'react-bootstrap'
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import { Clock, MessageCircle, Facebook, Twitter, Instagram, Linkedin, CornerUpLeft, Search } from "react-feather";

const Blog = ({ blog, seometadata }) => {
    const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }
    

    const metaTitle = seometadata?.name
    ? seometadata?.title
    :`Blog`;
    const metaKeyword = seometadata?.keyword
    ? seometadata?.keyword
    :"Blog, posting";
    const metaDesc = seometadata?.description
    ? seometadata?.description
    : "Explore exciting Blog opportunities with us.";
    const metaImage = seometadata?.image
    ? `${env.BACKEND_BASE_URL}${seometadata?.image}`
    : `${env.BACKEND_BASE_URL}${blog?.image}`;
    const metaUrl = seometadata?.url
    ?`${env.FRONTEND_BASE_URL}blog/${seometadata?.url}`
    :`${env.FRONTEND_BASE_URL}blog/${blog?.slug}`;
    const metaAuthor = seometadata?.author
    ? seometadata?.author
    :"BEAS Consultancy And Services Private Limited";

    return(
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
        <BreadCrumb pagetitle="Blog" pageBanner={`assets/img/blog/${blog?.icon}`} />
        
        <Container className='py-5'>
        <section className="space-ptb">
            <div className="container">
            <div className="row">
            <div className="col-lg-8">
                <div className="blog-detail">
                <div className="blog-post">
                    <div className="blog-post-title">
                    <h4>7 Things are Making your Resume look Dated</h4>
                    </div>
                    <div className="blog-post-footer border-0 justify-content-start">
                    <div className="blog-post-time">
                        <a href="#"> <Clock size={16} /> 25 March 2020</a>
                    </div>
                    <div className="blog-post-author">
                        <span> By <a href="#"> <img className="img-fluid" src="assets/images/avatar1.jpg" alt=""/>Felica queen</a> </span>
                    </div>
                    <div className="blog-post-comment">
                        <a href="#"> <MessageCircle size={16} /> (15) </a>
                    </div>
                    </div>
                    <div className="blog-post-image">
                    <img className="img-fluid" src="assets/images/blog1.jpg" alt=""/>
                    </div>
                    <div className="blog-post-content mt-4">
                    <div className="blog-post-description">
                        <p className="mb-0">The first thing to remember about success is that it is a process – nothing more, nothing less. There is really no magic to it and it’s not reserved only for a select few people. As such, success really has nothing to do with luck, coincidence or fate. It really comes down to understanding.</p>
                    </div>
                    <i className="text-primary d-block lead my-3">There are basically six key areas to higher achievement. Some people will tell you there are four while others may tell you there are eight. One thing for certain though, is that.</i>
                    
                    <p>Making a decision to do something – this is the first step. We all know that nothing moves until someone makes a decision. The first action is always in making the decision to proceed. This is a fundamental step, which most people overlook.</p>
                    <blockquote className="blockquote">
                        <p>Without clarity, you send a very garbled message out to the Universe. We know that the Law of Attraction says that we will attract what we focus on, so if we don’t have clarity, we will attract confusion.</p>
                        <cite>– Alice Williams</cite>
                    </blockquote>
                    <p>The sad thing is the majority of people have no clue about what they truly want. They have no clarity. When asked the question, responses will be superficial at best, and at worst.</p>
                    <div className="blog-post-tags mb-4 align-items-center d-flex">
                        <span>Popular-Tags: </span>
                        <ul className="list-inline mb-0 mt-2 mt-sm-0 ml-sm-3">
                        <li className="list-inline-item"><a href="#">Career</a></li>
                        <li className="list-inline-item"><a href="#">Advice</a></li>
                        <li className="list-inline-item"><a href="#">Recruitment</a></li>
                        </ul>
                    </div>
                    
                        <div className="mt-4">
                        <h5 className="mb-3">About Author</h5>
                        <div className="border p-4">
                            <div className="d-sm-flex gap-2">
                            <div className="avatar avatar-xlll mb-3 mb-sm-0">
                                <img className="img-fluid rounded-circle" src="assets/images/01.jpg" alt=""/>
                            </div>
                            <div className="pl-sm-4">
                                <h6 className="mb-3"> <span className="text-primary"> Posted by:</span> Alice Williams</h6>
                                <p>SMART is an acronym for Specific, Measurable, Achievable, Realistic and Time Sensitive – S-M-A-R-T. Knowing what you want and setting SMART goals as mileposts on your quest cannot help but give you clarity!</p>
                                <div className="social-icon d-flex">
                                <span>Follow us:</span>
                                <ul className="list-unstyled mb-0 ml-3 list-inline">
                                    <li className="list-inline-item"> <a href="#"> <Facebook size={16} /> </a> </li>
                                    <li className="list-inline-item"> <a href="#"> <Twitter size={16} /> </a> </li>
                                    <li className="list-inline-item"> <a href="#"> <Instagram size={16} /> </a> </li>
                                    <li className="list-inline-item"> <a href="#"> <Linkedin size={16} /> </a> </li>
                                </ul>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="mt-4">
                        {/* <h5 className="mb-3">Related Post</h5>
                        <div className="row">
                            <div className="col-12">
                            <div className="owl-carousel " data-nav-dots="true" data-items="2" data-md-items="2" data-sm-items="1" data-xs-items="1" data-xx-items="1" data-space="15">
                                <div className="item">
                                <div className="blog-post text-center">
                                    <div className="blog-post-image">
                                    <img className="img-fluid" src="assets/images/blog2.jpg" alt=""/>
                                    </div>
                                    <div className="blog-post-content">
                                    <div className="blog-post-details">
                                        <div className="blog-post-category">
                                        <a className="mb-1" href="#">Recruitment</a>
                                        </div>
                                        <div className="blog-post-title">
                                        <h5><a href="blog-detail.html">Hype or Helpful to the Jobs Market?</a></h5>
                                        </div>
                                        <div className="blog-post-description mb-0">
                                        <p className="mb-0">So, how can we stay on course with all the distractions in our lives? Willpower.</p>
                                        </div>
                                    </div>
                                    <div className="blog-post-footer">
                                        <div className="blog-post-time">
                                        <a href="#"> <Clock size={16} /> 02 Jan 2020</a>
                                        </div>
                                        <div className="blog-post-author">
                                        <span> By <a href="#"> <img className="img-fluid" src="assets/images/blog2.jpg" alt=""/>Sara lisbon </a> </span>
                                        </div>
                                        <div className="blog-post-comment">
                                        <a href="#"> <MessageCircle size={16} /> (12) </a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <hr className="my-5" /> */}
                        <div className="media mb-3">
                            <div className="avatar avatar-lg">
                            <img src="assets/images/01.jpg" className="img-fluid rounded-circle" alt="..."/>
                            </div>
                            <div className="media-body ml-3 border p-4">
                            <div className="d-flex">
                                <h6 className="mt-0">Carolyn & Dan</h6>
                                <a className="ml-auto" href="#"><CornerUpLeft size={16} />Reply</a>
                            </div>
                            <p className="mb-0">Then work backwards to develop the plan. What steps are required to get you to the goals? Make the plan as detailed as possible. Try to visualize and then plan.</p>
                            </div>
                        </div>
                        <div className="media mb-3 ml-5">
                            <div className="avatar avatar-lg">
                            <img src="assets/images/02.jpg" className="img-fluid rounded-circle" alt="..."/>
                            </div>
                            <div className="media-body ml-3 border p-4">
                            <div className="d-flex">
                                <h6 className="mt-0">John Doe</h6>
                                <a className="ml-auto" href="#"><CornerUpLeft size={16} />Reply</a>
                            </div>
                            <p className="mb-0">Every possible setback. Commit the plan to paper and then keep it with you at all times. Review it regularly and ensure that every step takes you closer.</p>
                            </div>
                        </div>
                        <div className="media mb-3 ml-5">
                            <div className="avatar avatar-lg">
                            <img src="assets/images/01.jpg" className="img-fluid rounded-circle" alt="..."/>
                            </div>
                            <div className="media-body ml-3 border p-4">
                            <div className="d-flex">
                                <h6 className="mt-0">Carolyn & Dan</h6>
                                <a className="ml-auto" href="#"><CornerUpLeft size={16} />Reply</a>
                            </div>
                            <p className="mb-0">Along with your plans, you should consider developing an action orientation that will keep you motivated to move forward at all times. This requires a little self-discipline.</p>
                            </div>
                        </div>
                        <div className="media mb-3">
                            <div className="avatar avatar-lg">
                            <img src="assets/images/04.jpg" className="img-fluid rounded-circle" alt="..."/>
                            </div>
                            <div className="media-body ml-3 border p-4">
                            <div className="d-flex">
                                <h6 className="mt-0">Melissa Doe</h6>
                                <a className="ml-auto" href="#"><CornerUpLeft size={16} />Reply</a>
                            </div>
                            <p className="mb-0">But is a crucial component to achievement of any kind. Before starting any new activity, ask yourself if that activity will move you closer to your goals. If the answer is no.</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h5 className="mb-4">Leave a Reply</h5>
                            <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                <input type="text" className="form-control" id="name" placeholder="Your Name"/>
                                </div>
                                <div className="form-group col-md-6">
                                <input type="email" className="form-control" id="inputEmail4" placeholder="Your Email"/>
                                </div>
                                <div className="form-group col-12">
                                <input type="text" className="form-control" id="Website" placeholder="Website"/>
                                </div>
                                <div className="form-group col-md-12">
                                <textarea className="form-control" rows={5} placeholder="Your Message"></textarea>
                                </div>
                                <div className=" form-group col-md-12">
                                <div className="custom-control custom-checkbox checkbox-">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1"/>
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
                <div className="col-lg-4 mt-5 mt-lg-0">
                <div className="blog-sidebar">
                    <div className="widget">
                    <div className="widget-title">
                        <h5>Search Job</h5>
                    </div>
                    <div className="search">
                        <i><Search size={16} /></i>
                        <input type="text" className="form-control" placeholder="Search..."/>
                    </div>
                    </div>
                    <div className="widget">
                    <div className="widget-title">
                        <h5>Recent Posts</h5>
                    </div>
                    <div className="d-flex mb-3 align-items-start">
                        <div className="avatar avatar-xl">
                        <img className="img-fluid" src="assets/images/blog6.jpg" alt=""/>
                        </div>
                        <div className="ml-3 recent-posts">
                        <a href="#"><b>Expanding Access to Tech Talent</b></a>
                        <a className="d-block font-sm mt-1 text-light" href="#">25 Feb 2020</a>
                        </div>
                    </div>
                    <div className="d-flex mb-3 align-items-start">
                        <div className="avatar avatar-xl">
                        <img className="img-fluid" src="assets/images/blog7.jpg" alt=""/>
                        </div>
                        <div className="ml-3 recent-posts">
                        <a href="#"><b>How to become an Account Manager</b></a>
                        <a className="d-block font-sm mt-1 text-light" href="#">20 March 2020</a>
                        </div>
                    </div>
                    <div className="d-flex mb-3 align-items-start">
                        <div className="avatar avatar-xl">
                        <img className="img-fluid" src="assets/images/blog8.jpg" alt=""/>
                        </div>
                        <div className="ml-3 recent-posts">
                        <a href="#"><b>Job interview tips for older workers</b></a>
                        <a className="d-block font-sm mt-1 text-light" href="#">15 Jan 2020</a>
                        </div>
                    </div>
                    </div>
                    <div className="widget">
                    <div className="widget-title">
                        <h5>Categories</h5>
                    </div>
                    <ul className="list-unstyled list-style mb-0">
                        <li><a href="#">Accountancy<span className="ml-auto">(3)</span></a></li>
                        <li><a href="#">General Insurance<span className="ml-auto">(15)</span></a></li>
                        <li><a href="#">Motoring & Automotive<span className="ml-auto">(10)</span></a></li>
                        <li><a href="#">Social Care<span className="ml-auto">(6)</span></a></li>
                        <li><a href="#">Purchasing<span className="ml-auto">(5)</span></a></li>
                    </ul>
                    </div>
                    
                    <div className="widget">
                    <div className="widget-title">
                        <h5>Follow</h5>
                    </div>
                    <div className="social">
                        <ul className="list-unstyled">
                        <li className="facebook">
                            <a className="text-uppercase" href="#"> <Facebook size={16} /> Facebook</a>
                            <a className="follow ml-auto" href="#">Like </a>
                        </li>
                        <li className="twitter">
                            <a className="text-uppercase" href="#"> <Twitter size={16} /> twitter</a>
                            <a className="follow ml-auto" href="#">Followers </a>
                        </li>
                        <li className="instagram">
                            <a className="text-uppercase" href="#"> <Instagram size={16} /> instagram</a>
                            <a className="follow ml-auto" href="#">Followers </a>
                        </li>
                        <li className="linkedin">
                            <a className="text-uppercase" href="#"> <Linkedin size={16} /> linkedin</a>
                            <a className="follow ml-auto" href="#">Followers </a>
                        </li>
                        </ul>
                    </div>
                    </div>
                    
                    <div className="widget">
                    <div className="widget-title">
                        <h5>Popular Tags</h5>
                    </div>
                    <div className="popular-tag">
                        <ul className="list-unstyled mb-0">
                        <li><a href="#">Bootstrap</a></li>
                        <li><a href="#">HTML5</a></li>
                        <li><a href="#">Wordpress</a></li>
                        <li><a href="#">CSS3</a></li>
                        <li><a href="#">Creative</a></li>
                        <li><a href="#">Multipurpose</a></li>
                        <li><a href="#">Fashion</a></li>
                        <li><a href="#">Color</a></li>
                        <li><a href="#">Lifestyle</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        </Container>
        </main>
        </>
    );

}

export default React.memo(Blog);

export async function getServerSideProps({query}) {

    const { id } = query ;

    const response = await HomeService.individualBlogPage(id);
    const blog = response.data?.blog || [];

    const seobyslug = await HomeService.seobyslug(id);
    const seometadata = seobyslug?.data?.seometa;

  return {
    props: {
      blog,
      seometadata
    }
  }
}