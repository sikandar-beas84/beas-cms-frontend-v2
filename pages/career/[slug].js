
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
const Page = ({career, menucareer, contact, decodedId}) => {

  console.log("career",career);
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
    data.append('job_id', decodedId);
    
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
      
      </main>
    </>
  )
}

export default React.memo(Page);

export async function getServerSideProps({ params }) {
  const { slug } = params;

  // Decode Base64 slug to original ID
  let decodedId;
  try {
    decodedId = Buffer.from(slug, "base64").toString("utf-8");
  } catch (error) {
    return { notFound: true };
  }

  const res = await HomeService.menuCareerPage();
  const menucareer = res.data?.career || [];

  const response = await HomeService.careerPage();
  const careers = response.data?.careers || [];

  const result = await HomeService.contactPage();
  const contact = result.data?.contact || [];
  // Find index of current project by matching the ID (slug)
  const career = careers.find((item) => item.id.toString() === decodedId);

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
      decodedId
    },
  };
}
