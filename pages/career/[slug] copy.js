
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

const page = ({career, menucareer, contact}) => {

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
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


  const handleChange = (e) => {
    const { name, value, files } = e.target;
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
    data.append('job_id', career.id);
    
    // for (let [key, value] of data.entries()) {
    //   console.log(`${key}:`, value);
    // }

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
          name: '', email: '', phone: '', resume: ''
        });
        //recaptchaRef.current.reset();
      } else {
        setStatus(`❌ Error: ${result.message || 'Failed to send'}`);
        setErrors(result.error); // store errors in state
      }
    } catch (err) {
      //console.error(err);
      setStatus('❌ Submission failed. Check console.');
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
            <Col xs={12} lg={12}>
              <div className="aboutTxt">
                <p className="sub-title">Job Opening</p>
                <p>Driving Growth through Quality</p>
                <div dangerouslySetInnerHTML={{ __html: menucareer?.menu_contents?.description }} />
              </div>
            </Col>
          </Row>
          <p></p>
          <Row>
            <Col xs={12} lg={4}>
            <span className="bold-title">Level of Experience:</span><span> {career.experience}</span>
            </Col>
            <Col xs={12} lg={4}>
            <span className="bold-title">Location:</span><span> {career.location}</span>
            </Col>
            <Col xs={12} lg={4}>
            <span className="bold-title">Job Type:</span><span> Full Time</span>
            </Col>
          </Row>
          <p></p>
          {/* <div className='map-wrap'></div> */}
          <Row>
            <Col xs={12} lg={6}>
                
                {(Array.isArray(career.required_skills) && career.required_skills.length > 0) ||
                  (typeof career.required_skills === 'string' && career.required_skills.trim() !== '') ? (
                    <>
                      <p className="bold-title">Required Skills</p>
                      <ul>
                        {(Array.isArray(career.required_skills)
                          ? career.required_skills
                          : career.required_skills.split(',')
                        ).map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
            </Col>
            <Col xs={12} lg={6}>
                {(Array.isArray(career.additional_skills) && career.additional_skills.length > 0) ||
                  (typeof career.additional_skills === 'string' && career.additional_skills.trim() !== '') ? (
                    <>
                      <p className="bold-title">Additional Skills</p>
                      <ul>
                        {(Array.isArray(career.additional_skills)
                          ? career.additional_skills
                          : career.additional_skills.split(',')
                        ).map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
            </Col>
            </Row>
            <p></p>
            <Row>
            <Col xs={12} lg={12}>
              <p>We would be happy to hear from you, please fill in the form below or mail us your requirements on Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
              <form className="was-validate" onSubmit={handleSubmit}>
                <input type="hidden" name="job_id" value={career.id} />
                <Row> 
                  <Col xs={12} lg={3}>
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
                  <Col xs={12} lg={3}>
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
                  <Col xs={12} lg={3}>
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

                  <Col xs={12} lg={3}>
                    <label>Choose Your Resume: <span className='text-danger'><b>*</b></span></label>
                      <input 
                          type='file' 
                          name="resume" 
                          onChange={handleChange}
                          accept=".doc,.docx,.pdf,.ppt,.pptx"
                          className='form-control mb-3' 
                        />
                        
                    </Col>
                  
                  <Row>
                    <Col xs={12} lg={9}></Col>
                    <Col xs={12} lg={3}>
                    <p className='bold-title' style={{fontSize:'12px'}}>Attach files: (File size up to 2 MB. Formats: doc, docx, pdf, ppt, pptx)</p>
                    {errors.resume && (<p className='error_message'>{errors.resume[0]}</p>)}
                    </Col>
                  </Row>
                  <Col xs={12} className='my-3'>
                    <ReCAPTCHA
                      sitekey={`${env.SITE_KEY}`}
                      onChange={setCaptchaToken}
                    />
                  </Col>
                  <Col xs={12} lg={3}>
                    <button type="submit" className='red-btn w-100 mt-3'>Submit</button>
                  </Col>
                  <Col xs={12} className='mt-3'>
                  {status && <p>{status}</p>}
                  {/* Show all errors together */}
                  {/* {Object.keys(errors).length > 0 && (
                    <div style={{ color: "red", marginTop: "10px" }}>
                      <ul>
                        {Object.keys(errors).map((field) =>
                          errors[field].map((msg, i) => (
                            <li key={field + i}>{msg}</li>
                          ))
                        )}
                      </ul>
                    </div>
                  )} */}
                  </Col>
                </Row>
              </form>

            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default page

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const res = await HomeService.menuCareerPage();
  const menucareer = res.data?.career || [];

  const response = await HomeService.careerPage();
  const careers = response.data?.careers || [];

  const result = await HomeService.contactPage();
  const contact = result.data?.contact || [];
  // Find index of current project by matching the ID (slug)
  const career = careers.find((item) => item.id.toString() === slug);

  if (!career) {
    return {
      notFound: true, // 👈 Triggers 404 page
    };
  }

  return {
    props: {
      career,
      menucareer,
      contact
    },
  };
}
