import React, {useState } from 'react'
import { Container } from 'react-bootstrap'
import { Col, Row } from "react-bootstrap";
import BreadCrumb from '../component/BreadCrumb';
import { Mail, PhoneCall } from 'react-feather'
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const ContactUs = ({contactus}) => {

  const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    file: ''
  });

  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

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

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await fetch(`${env.API_BASE_URL}save-customer-enquiry`, {
        method: 'POST',
        headers: {
          'X-SECURE-KEY': env.ACCESS_TOKEN
        },
        body: data
      });
      const result = await res.json();

      if (res.ok) {
        setStatus('✅ Message sent successfully!');
        setErrors({});
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', file: '' });
      } else {
        setStatus(`❌ Error: ${result.message || 'Failed to send'}`);
        setErrors(result.error);
      }
    } catch (err) {
      //console.error(err);
      setStatus('❌ Submission failed.');
    }
  };

  const isFormValid = Object.values({
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    subject: formData.subject,
    message: formData.message,
    file: formData.file
  }).every((value) => value && value !== '');

  return (
    <>
    <SEO
        title="Contact Us"
        description="Reach out to Beas Consultancy. We’re here to help with your questions, suggestions, and business inquiries."
        keywords="Contact Beas, Contact Form, Business Inquiry, Support"
        url={`${env.BACKEND_BASE_URL}${contactus?.slug || 'skills'}`}
        image={
          contactus?.image 
            ? `${env.BACKEND_BASE_URL}${contactus.image}`
            : `${env.BACKEND_BASE_URL}/default-image.jpg`
        }
        author="Beas Consultancy & Services Pvt. Ltd."
      />
      <main>
        <BreadCrumb pagetitle="Contact Us" pageBanner={contactus?.banner} />
        <Container className='py-5 contactPage'>
          <Row>
            <Col xs={12} lg={6}>
              <form className="was-validate contact-frm" onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12}>
                    <div className="contactTxt">
                      <p className="sub-title">{contactus?.slug}</p>
                      <h1>{contactus?.title}</h1>
                      <div className="gry--txt" dangerouslySetInnerHTML={{ __html: contactus?.short_desc }} />
                    </div>
                  </Col>
                  <Row className='row contact-form margin-top-8'>
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
                    <label>Subject <span className='text-danger'><b>*</b></span></label>
                    <input 
                      type='text' 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      className='form-control mb-3'
                      required 
                    />
                    {errors.subject && (<p className='error_message'>{errors.subject[0]}</p>)}
                  </Col>
                  <Col xs={12} lg={12}>
                    <label>Message <span className='text-danger'><b>*</b></span></label>
                    <textarea 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    className='form-control h-150 mb-3'
                    required 
                    ></textarea>
                    {errors.message && (<p className='error_message'>{errors.message[0]}</p>)}
                  </Col>
                  <Col xs={12} lg={6}>
                    <label>Choose a file: <span className='text-danger'><b>*</b></span></label>
                    <input 
                        type='file' 
                        name="file" 
                        onChange={handleChange}
                        accept=".doc,.docx,.pdf,.ppt,.pptx"
                        className='form-control mb-3' 
                      />
                      <p className='bold-title' style={{fontSize:'12px'}}>Attach files: (File size up to 3 MB. Formats: doc, docx, pdf, ppt, pptx)</p>
                      {errors.file && (<p className='error_message'>{errors.file[0]}</p>)}
                  </Col>
                  </Row>
                  <Col xs={12} lg={3}>
                    <button type="submit" className='red-btn w-100 mt-3'  >Submit</button>
                  </Col>
                  <Col xs={12} className='mt-3'>
                  {status && <p>{status}</p>}
                  </Col>
                </Row>
              </form>

            </Col>
            <Col xs={12} lg={5}>
              <div className='map-wrap contact-page-info'>

              <Row>
                  <Col>
                  <div className='SalesInquiries'>
                    <span><PhoneCall /></span>
                    <div>
                      <p className="contact_popup_text__6IJDd"><b>Sales Inquiries</b> 
                      <a class="contact_popup_link__IFKEk" href="tel:+91-33-2321-1380">+91-33-2321-1380</a>
                      </p>
                    </div>
                  </div>
                    
                  </Col>
                  <Col>
                    <div className='CustomerSupport'>
                      <span><Mail /></span>
                      <div>
                        <p className="contact_popup_text__6IJDd"><b>Customer Support</b> 
                        <a class="contact_popup_link__IFKEk" href="mailto:beas@beas.co.in">beas@beas.co.in</a>
                        </p>
                      </div>
                    </div>
                    
                  </Col>
                </Row>
                <iframe className='contactMap' src={`${contactus?.url}`} width="100%" height="400" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

              </div>

            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default React.memo(ContactUs);

export async function getServerSideProps() {
  const res = await HomeService.contactPage();
  const contactus = res.data?.contact || {}

  return {
    props: {
      contactus
    }
  }
}