
import React, { useState, useRef } from 'react'
import BreadCrumb from '../component/BreadCrumb'
import { Container, Row, Col } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion';
import { ArrowRight, ArrowUp, ArrowUpRight } from 'react-feather';
import Carousel from 'react-bootstrap/Carousel';
import Nav from 'react-bootstrap/Nav';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import ReCAPTCHA from 'react-google-recaptcha';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import { Buffer } from "buffer";
const Page = ({career, menucareer, contact, careerId}) => {

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const fileInputRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    address: '',
    resume: ''
  });

  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // ✅ Allow only numbers and special characters for phone field
    if (name === "phone") {
      const regex = /^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/;

      if (!regex.test(value)) {
        // ❌ Invalid input — do not update formData
        setErrors((prev) => ({
          ...prev,
          phone: ["Only numbers and special characters are allowed."],
        }));
        return;
      } else {
        // ✅ Valid input
        setErrors((prev) => ({
          ...prev,
          phone: null,
        }));
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

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
    data.append('recaptcha_token', captchaToken);
    data.append('job_id', careerId);
    
    // for (let [key, value] of data.entries()) {
    //   console.log(`${key}:`, value);
    // }

    setLoading(true); // ✅ start loader
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
    }finally {
      setLoading(false); // ✅ stop loader
    }
  };


  return (
    <>
      <SEO
        title={`${menucareer?.name || "Career"} | Beas Consultancy & Services Pvt. Ltd.`}
        description={
          menucareer?.description ||
          menucareer?.menu_contents?.description ||
          "Explore exciting career opportunities with us."
        }
        keywords={
          "career, job opening, full-time jobs, hiring, apply job, beas consultancy"
        }
        image={
          menucareer?.image
            ? `${env.BACKEND_BASE_URL}${menucareer.image}`
            : `${env.BACKEND_BASE_URL}/default-image.jpg`
        }
        url={`${env.FRONTEND_BASE_URL}/career/${career?.id}`}
        author="Beas Consultancy & Services Pvt. Ltd."
      />
      <main>
        <BreadCrumb pagetitle = {career.title} pageslug='Career' pageBanner={`assets/img/menu-content/${menucareer?.menu_contents?.banner}`} /> 
        
        <Container className='py-5'>

          <Row>
            <Col>
              <h1 className='inner-page-title'>Join BEAS — Drive Growth through Quality</h1>
              <div className='inner-page-text' dangerouslySetInnerHTML={{ __html: menucareer?.menu_contents?.description }} />
              
            </Col>
          </Row>
        </Container>
        <Container className='my-3'>
          <Row>
            <Col xs={12} md={8}>
              <div className='job-details-block-card'>
                <h2>Apply For Job</h2>
                <Row>
                  <Col xs={12}>
                  <form className="was-validate mt-4" onSubmit={handleSubmit}>
                {/* <input type="hidden" name="job_id" value={slug} /> */}
                  <Row> 
                    <Col xs={12} lg={6}>
                      <label>Name <span className='text-danger'><b>*</b></span></label>
                      <input 
                        type='text' 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        className='form-control mb-3'
                        required 
                      />
                      {errors.name && (<p className='error_message'>{errors.name[0]}</p>)}
                    </Col>
                    <Col xs={12} lg={6}>
                      <label>Email <span className='text-danger'><b>*</b></span></label>
                      <input 
                        type='text' 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className='form-control mb-3'
                        required 
                      />
                      {errors.email && (<p className='error_message'>{errors.email[0]}</p>)}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} lg={6}>
                      <label>Phone No <span className='text-danger'><b>*</b></span></label>
                      <input 
                        type='text' 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        className='form-control mb-3'
                        required 
                      />
                      {errors.phone && (<p className='error_message'>{errors.phone[0]}</p>)}
                    </Col>

                    <Col xs={12} lg={6}>
                      <div className="mt-4 upload-btn-wrapper">
                        <button className="btn2">Upload Your CV <ArrowUp/> </button>
                        <input 
                            type='file' 
                            name="resume" 
                            onChange={handleChange}
                            ref={fileInputRef}
                            accept=".doc,.docx,.pdf,.ppt,.pptx"
                            className='form-control mb-3' 
                          />
                      </div>
                      
                      {errors.resume && (<p className='error_message'>{errors.resume[0]}</p>)}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} className='my-3'>
                      <ReCAPTCHA
                        sitekey={`${env.SITE_KEY}`}
                        onChange={setCaptchaToken}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} lg={3}>
                      <button type="submit" className='btn btn-primary-blue' disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                      </button>
                    </Col>
                    
                  </Row>
                  {loading && <div className="spinner">Loading...</div>}
                  <Row>
                    <Col xs={12} className='mt-3'>
                    {status && <p>{status}</p>}
                    </Col>
                  </Row>
              </form>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className='job-details-block'>
                <div className='job-details-inner-block'>
                  <p className='job-details-title'>Job Details</p>
                  <ul>
                    <li> <span>Years Of Experience: </span> {career?.experience}</li>
                    <li> <span>Location: </span> {career?.location}</li>
                    <li> <span>Level: </span> {career?.level}</li>
                    <li> <span>Duration: </span> {career?.duration}</li>
                    <li> <span>Vacancy: </span> {career?.vacancy}</li>
                    <li> <span>Type: </span> Full Time</li>
                  </ul>
                </div>
                {/* <!--/--> */}
                  {
                  (Array.isArray(career?.required_skills) && career?.required_skills.length > 0 && career?.required_skills[0] !== null) ? 
                  (
                  <div className='job-details-inner-block'>
                    <p className='job-details-title'>Required Skills</p>
                    <div className="skill-tags">
                    
                        <ul>
                            {(Array.isArray(career?.required_skills)
                              ? career?.required_skills
                              : career?.required_skills.split(',')
                            ).map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>
                        
                    </div>
                  </div>
                ) : null
                }
                {/* <!--/--> */}
                {
                (Array.isArray(career?.key_responsibilities) && career?.key_responsibilities.length > 0 && career?.key_responsibilities[0] !== null) ? 
                (
                <div className='job-details-inner-block'>
                  <p className='job-details-title'>Key Responsibilities</p>
                  <div className="skill-tags">
                  
                        <ul>
                            {(Array.isArray(career?.key_responsibilities)
                              ? career?.key_responsibilities
                              : career?.key_responsibilities.split(',')
                            ).map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>

                  </div>
                </div>
                ) : null
                }
                {/* <!--/--> */}
                {
                (Array.isArray(career?.additional_skills) && career?.additional_skills.length > 0 && career?.additional_skills[0] !== null) ? 
                (
                <div className='job-details-inner-block'>
                  <p className='job-details-title'>Additional Skills</p>
                  <div className="skill-tags">
                  
                      <ul>
                      {(Array.isArray(career?.additional_skills)
                        ? career?.additional_skills
                        : career?.additional_skills.split(',')
                      ).map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                        
                  </div>
                </div>
                ) : null
                }
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
  const { slug } = params;

  const res = await HomeService.menuCareerPage();
  const menucareer = res.data?.career || [];

  const response = await HomeService.careerPage();
  const careers = response.data?.careers || [];

  const result = await HomeService.contactPage();
  const contact = result.data?.contact || [];
  // Find index of current project by matching the ID (slug)
  console.log("slug",slug);
  console.log("careers",careers);
  const career = careers.find((item) => item.title.toString() === slug);
  const careerId = career?.id;


  if (!career) {
    return {
      notFound: true, // 👈 Triggers 404 page
    };
  }

  return {
    props: {
      career,
      menucareer,
      contact,
      careerId
    },
  };
}
