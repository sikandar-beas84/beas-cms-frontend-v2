import React, { useState, useRef } from 'react'
import BreadCrumb from '../component/BreadCrumb';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import Accordion from 'react-bootstrap/Accordion';
const ContactUs = ({ contactus, faqs, seometadata }) => {

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const fileInputRef = useRef(null);

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

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    setLoading(true); // ✅ start loader
    setStatus('');    // clear previous status
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
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', file: null });
        // ✅ Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      } else {
        setStatus(`❌ Error: ${result.message || 'Failed to send'}`);
        setErrors(result.error);
      }
    } catch (err) {
      //console.error(err);
      setStatus('❌ Submission failed.');
    }finally {
      setLoading(false); // ✅ stop loader
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

  const metaTitle = seometadata?.title
  ? seometadata?.title
  :`Contact Us`;
  const metaKeyword = seometadata?.keyword
  ? seometadata?.keyword
  :"Contact Beas, Contact Form, Business Inquiry, Support";
  const metaDesc = seometadata?.description
  ? seometadata?.description
  : "Reach out to Beas Consultancy. We’re here to help with your questions, suggestions, and business inquiries."
  const metaImage = seometadata?.image
  ? `${env.BACKEND_BASE_URL}${seometadata?.image}`
  : `${env.BACKEND_BASE_URL}${contactus?.image}`;
  const metaUrl = seometadata?.url
  ?`${env.FRONTEND_BASE_URL}contact/${seometadata?.url}`
  :`${env.FRONTEND_BASE_URL}contact/${contactus?.slug}`;
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
        <BreadCrumb pagetitle="Contact Us" pageBanner={contactus?.banner} />

        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <div className="contact_form_heading">
                  <h2>Are you Ready for a Better, more Productive Business?</h2>
                </div>
                <div className="contact_form_box">
                  <form className="was-validate contact-frm" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="contact_inputs">
                        <input 
                          type='text' 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          className='form-control mb-3'
                          placeholder='Name'
                          required 
                        />
                        {errors.name && (<p className='error_message'>{errors.name[0]}</p>)}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="contact_inputs">
                        <input 
                          type='text' 
                          name="email" 
                          value={formData.email}
                          onChange={handleChange}
                          className='form-control mb-3'
                          placeholder='Email'
                          required 
                        />
                        {errors.email && (<p className='error_message'>{errors.email[0]}</p>)}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="contact_inputs">
                        <input 
                          type='text' 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleChange}
                          className='form-control mb-3'
                          placeholder='Mobile Number'
                          required 
                        />
                        {errors.phone && (<p className='error_message'>{errors.phone[0]}</p>)}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="contact_inputs">
                        <input 
                          type='text' 
                          name="subject" 
                          value={formData.subject}
                          onChange={handleChange}
                          className='form-control mb-3'
                          placeholder='Subject'
                          required 
                        />
                        {errors.subject && (<p className='error_message'>{errors.subject[0]}</p>)}
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="contact_inputs">
                        <textarea 
                          name="message" 
                          value={formData.message}
                          onChange={handleChange}
                          className='form-control h-150 mb-3'
                          placeholder='Message'
                          rows={5}
                          required 
                          ></textarea>
                          {errors.message && (<p className='error_message'>{errors.message[0]}</p>)}
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="contact_form_btn">
                          
                          <button type="submit" className='red-btn w-100 mt-3 post-job-btn' disabled={loading} >
                            {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                      </div>
                      {loading && <div className="spinner">Loading...</div>}
                      {status && <p>{status}</p>}
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="contact_right_box">
                  <div className="contact_form_add_heading">

                    <div className="form_add map_add1">
                      <div className="map_location_icon">
                        <img src="assets/images/add2.png" className="beats" />
                      </div>
                      <div className="map_location_icon_cont">
                        <h1>Address</h1>
                        <h3>{contactus?.address}</h3>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                    <div className="form_add map_add3">
                      <div className="map_location_icon">
                        <img src="assets/images/add3.png" className="beats" />
                      </div>
                      <div className="map_location_icon_cont map_location_icon_cont4">
                        <h1>Email Address</h1>
                        <h3> <a href="#">{contactus?.email}</a></h3>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                    <div className="form_add map_add2">
                      <div className="map_location_icon">
                        <img src="assets/images/add1.png" className="beats" />
                      </div>
                      <div className="map_location_icon_cont map_location_icon_cont2">
                        <h1>Mobile Number</h1>
                        <h3> <a href="#">{contactus?.phone}</a>  <br /> <a href="#">{contactus?.mobile}</a></h3>
                      </div>
                      <div className="clearfix"></div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="section-abuts section-contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="ser_rea">
                  <div className="about_texts">
                    <div className="serv-head">
                      { faqs?.map((item,index)=> item.type ==='faq-heading' && (
                          <React.Fragment key={index}>
                          <h2>{item?.title}</h2>
                          <p>{item?.long_desc}</p>
                          </React.Fragment>
                      )) }
                      
                      <Accordion defaultActiveKey="0" flush>
                      { faqs?.map((item,index)=> item.type !=='faq-heading' && (
                        <Accordion.Item eventKey={index}>
                          <Accordion.Header>
                            { `${index+1}. ${item.title}` }
                          </Accordion.Header>
                          <Accordion.Body>
                            <p>{item.short_desc}</p>
                          </Accordion.Body>
                        </Accordion.Item>
                      )) }
                      </Accordion>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="shp1"><img src="assets/images/ser-bg.png" /></div>
          <div className="shp2"><img src="assets/images/ser-bg2.png" /></div>
        </section>
      </main>
    </>
  )
}

export default React.memo(ContactUs);

export async function getServerSideProps(context) {

  const url = context.req.url;
  const lastSegment = url.split("/").filter(Boolean).pop();

  const res = await HomeService.contactPage();
  const contactus = res.data?.contact || {}

  const faqres = await HomeService.faqPage();
  const faqs = faqres.data?.faqs || {}

  const seobyslug = await HomeService.seobyslug(lastSegment);
  const seometadata = seobyslug?.data?.seometa;

  return {
    props: {
      contactus,
      faqs,
      seometadata
    }
  }
}