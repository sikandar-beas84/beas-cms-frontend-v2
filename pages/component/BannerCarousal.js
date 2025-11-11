import React from 'react';
import Slider from 'react-slick';
import { Col, Row } from "react-bootstrap";
import { ArrowUpRight } from "react-feather";
import { useRouter } from 'next/router';
import { env } from '../../util/constants/common';
import Image from 'next/image';
import Link from "next/link";

const BannerCarousal = ({ page, technologiya, clients, projects, testimonials }) => {

  const createSliderSettings = (slidesToShowDefault, sliderDot = false) => ({
    dots: sliderDot,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShowDefault,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShowDefault > 3 ? 3 : slidesToShowDefault,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  const testimoniolnewSliderSettings = (slidesToShowDefault, sliderDot = false) => ({
    dots: sliderDot,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShowDefault,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShowDefault > 3 ? 3 : slidesToShowDefault,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  // Default settings
  const settings = createSliderSettings(3);
  // Work Area settings
  const workareasettings = createSliderSettings(2);

  // Tools settings
  const toolssettings = createSliderSettings(6);
  // testimonial settings
  const testimonialsettings = createSliderSettings(1);
  // client settings
  const clientsettings = createSliderSettings(5);

  const testimonialnewsettings = testimoniolnewSliderSettings(3);

  const router = useRouter();

  return (
    <>

      {/* {page == 'topBanner' && (
        <Slider {...workareasettings}>
          <div className="working-area__list">
            <span>Application Development <span className="star">* </span></span>
          </div>
          <div className="working-area__list">
            <span>Application Maintaince <span className="star">* </span></span>
          </div>
          <div className="working-area__list">
            <span>Mobility <span className="star">* </span></span>
          </div>
          <div className="working-area__list">
            <span>UI/UX Services <span className="star">* </span></span>
          </div>
          <div className="working-area__list">
            <span>Data Analytics <span className="star">* </span></span>
          </div>
          <div className="working-area__list">
            <span>Professional Services <span className="star">* </span></span>
          </div>
          <div className="working-area__list">
            <span>Large Offshore Development <span className="star">* </span></span>
          </div>
          <div className="working-area__list">
            <span>AI/ML/DML <span className="star">* </span></span>
          </div>
          <div className="working-area__list">
            <span>Cloud Computing <span className="star">* </span></span>
          </div>
          <div className="working-area__list">
            <span>Cybersecurity</span>
          </div>
       </Slider>
      )} */}

      {page == 'projects' && (
        <Slider {...settings}>
          { projects?.map((item, index)=>{

            const titleText = item?.title
            ? item.title.split(" ").slice(0, 4).join(" ") + "..."
            : "";
          return(<Col xs={12} lg={4} key={index}>
            <div className="portfolio-work-wrap">
              <div className="portfolio-work-wrap__img">
              <Image
              src={`${env.BACKEND_BASE_URL}${item.image}`}   // use optimized format (webp/avif)
              alt="Hero Banner"
              width={1920}
              height={1080}
              priority      // ✅ ensures this image is not lazy-loaded
              fetchPriority="high" // ✅ tells browser it’s critical
              className="img-fluid" // you can keep bootstrap class
            />
              
              </div>
              <div
                  className="portfolio-work-wrap__block"
                  onClick={() => router.push(`/casestudy/${item.slug}`)}
                  style={{ cursor: 'pointer' }} // Optional: makes it feel clickable
                >
                <div className="portfolio-work-wrap__txt">
                  <p>{titleText}</p>
                </div>
                <p className="link-txt"><ArrowUpRight /></p>
              </div>

            </div>

          </Col>);
        })}
          
        </Slider>
      )}

      {page == 'testimonial' && (
        <Slider {...testimonialsettings}>

          { testimonials?.map((item, index)=>(
          <div className="client-testimonial">
            <div className="testimonial-wrapper">
              <div className="testimonial">
                <p>
                  {item.message}
                </p>
              </div>
              <div className="media">
              <Image
              src={`${env.BACKEND_BASE_URL}assets/img/testimonial/${item.profile_photo_path}`}   // use optimized format (webp/avif)
              alt="Hero Banner"
              width={1920}
              height={1080}
              priority      // ✅ ensures this image is not lazy-loaded
              fetchPriority="high" // ✅ tells browser it’s critical
              className="img-fluid" // you can keep bootstrap class
            />
               <div className="media-body">
                  <div className="overview">
                    <div className="overview-box">
                      <div className="name"><b>{item.name}</b></div>
                      <div className="grey-txt" dangerouslySetInnerHTML={{ __html: item?.role }} />
                      {/* <div className="details">{item.role}</div> */}
                    </div>
                    <div className="overview-box-quote">
                    <Image
                      src="/assets/images/quote.png"   // use optimized format (webp/avif)
                      alt="Hero Banner"
                      width={1920}
                      height={1080}
                      priority      // ✅ ensures this image is not lazy-loaded
                      fetchPriority="high" // ✅ tells browser it’s critical
                      className="img-fluid" // you can keep bootstrap class
                    />
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))}

        </Slider>
      )}
      {page == 'tools' && (
        <Slider {...toolssettings}>
          
         { technologiya?.map((item, index)=>(
          <div className='tools' key={index}>
            <div className='tools-image'>
            <Image
                src={`${env.BACKEND_BASE_URL}assets/img/technology/${item.logo}`}   // use optimized format (webp/avif)
                alt="Hero Banner"
                width={1920}
                height={1080}
                priority      // ✅ ensures this image is not lazy-loaded
                fetchPriority="high" // ✅ tells browser it’s critical
                className="img-fluid" // you can keep bootstrap class
              />
              <Image
              src={`${env.BACKEND_BASE_URL}assets/img/technology/${item.logo}`}   // use optimized format (webp/avif)
              alt="Hero Banner"
              width={1920}
              height={1080}
              priority      // ✅ ensures this image is not lazy-loaded
              fetchPriority="high" // ✅ tells browser it’s critical
              className="img-fluid" // you can keep bootstrap class
            />
            
            </div>
          </div>
         ))}

        </Slider>
      )}
      {page == 'clients' && (
        <Slider {...clientsettings}>

          { clients?.map((item, index)=>(
          <div className='client-logo' key={index}>
            <Image
              src={`${env.BACKEND_BASE_URL}${item.logo}`}   // use optimized format (webp/avif)
              alt="Hero Banner"
              width={1920}
              height={1080}
              priority      // ✅ ensures this image is not lazy-loaded
              fetchPriority="high" // ✅ tells browser it’s critical
              className="img-fluid" // you can keep bootstrap class
            />
            
          </div>
          ))}

        </Slider>
      )}

      {page == 'testimonialnew' && (
        <Slider {...testimonialnewsettings}>
          
          { testimonials?.map((item, index)=>{
            const messageText = item?.message
            ? item.message.length > 50
              ? item.message.substring(0, 250) + "..."
              : item.message
            : "";
              return(
              <div className="test-box" key={index}>
                <div className="quote-txt">
                  <p>{messageText}</p>
                </div>
                <div className="tester">
                  <div className="tester-img">
                  <Image
                    src={`${env.BACKEND_BASE_URL}assets/img/testimonial/${item.profile_photo_path}`}  
                    alt="Hero Banner"
                    width={50}
                    height={50}
                    priority      
                    fetchPriority="high" 
                    className="img-fluid" 
                  />
                  </div>
                  <div className="tester-name">
                      <h2>{item.name}</h2>
                      <p dangerouslySetInnerHTML={{ __html: item?.role }} />
                  </div>
                </div>
                </div>
              );
            })}
        </Slider>
      )}

      {page == 'projectsnew' && (
        <Slider {...settings}>
          { projects?.map((item, index)=>{

            const titleText = item?.title
            ? item.title.split(" ").slice(0, 4).join(" ") + "..."
            : "";
            const businessNeed = item?.business_need
            ? item.business_need.split(" ").slice(0, 10).join(" ") + "..."
            : "";
          return(
          <>
          <Link
            href={`/casestudy/${item.slug}`}
          >
          <div className="port-box">
            <div className="port-img">
                
                <Image
                  src={`${env.BACKEND_BASE_URL}${item.image}`} 
                  alt="Hero Banner"
                  width={100}
                  height={100}
                  priority 
                  fetchPriority="high" 
                  className="img-fluid port-shw" 
                />
            </div>
            <h3>{titleText}</h3>
            <p dangerouslySetInnerHTML={{ __html: businessNeed }} />
            <div className="port-tags">
                <h4>Angular</h4>
                <h4>Node JS</h4>
                <h4>ABC Dummy</h4>
            </div>
          </div>
          </Link>

          </>
          );
        })}
          
        </Slider>
      )}
    </>
  );
};

export default React.memo(BannerCarousal);
