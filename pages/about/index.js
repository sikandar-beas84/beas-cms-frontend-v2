import React, { useState, useEffect } from 'react'
import BreadCrumb from '../component/BreadCrumb'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image';
import HomeService from '../../util/service/Home';
import { env } from '../../util/constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const AboutUs = ({ aboutus, commonaboutus, seometadata }) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const descriptionText = aboutus?.description
        ? aboutus?.description.split(" ").slice(0, 139).join(" ") + ""
        : "";
    const descriptionTextTwo = aboutus?.description
        ? aboutus?.description.split(" ").slice(139, 400).join(" ") + ""
        : "";
    const [safeHTML, setHtml] = useState('');

    useEffect(() => {
        setHtml(descriptionTextTwo); // only runs on client
    }, []);

    const metaTitle = seometadata?.title
        ? seometadata?.title
        : `About Us`;
    const metaKeyword = seometadata?.keyword
        ? seometadata?.keyword
        : "About Beas, Meet our team, Software Company, Technology, Experts at Beas, Corporate Profile";
    const metaDesc = seometadata?.description
        ? seometadata?.description
        : "Learn more about Beas and our specialties.";
    const metaImage = seometadata?.image
        ? `${env.BACKEND_BASE_URL}${seometadata?.image}`
        : `${env.BACKEND_BASE_URL}${aboutus?.image}`;
    const metaUrl = seometadata?.url
        ? `${env.FRONTEND_BASE_URL}about/${seometadata?.url}`
        : `${env.FRONTEND_BASE_URL}about/${aboutus?.slug}`;
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
                <BreadCrumb pagetitle="About Us" pageBanner={`assets/img/menu-content/${aboutus?.menu_contents?.banner}`} />

                <section className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-md-5">
                                <div className="about_imgs">
                                    <span>
                                        <Image width={500} height={200} src={`${env.BACKEND_BASE_URL}${aboutus?.image}`} className="img-fluid about_thumb_img" alt="image" loading="lazy" />
                                    </span>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-7">
                                <div className="about_texts">
                                    <h1>{aboutus?.menu_contents?.title}</h1>
                                    <div dangerouslySetInnerHTML={{ __html: descriptionText }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='section-abuts'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='ser_rea'>
                                    <div
                                        className="about_texts"
                                        dangerouslySetInnerHTML={{ __html: safeHTML }} />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shp1">
                        <Image
                            src="/assets/images/ser-bg.png"
                            alt="shape"
                            width={474}
                            height={73}
                            loading="lazy"

                        />
                    </div>
                    <div className="shp2">
                        <Image
                            src="/assets/images/ser-bg2.png"
                            alt="shape"
                            width={474}
                            height={73}
                            loading="lazy"

                        />
                    </div>
                </section>

                <div className="why_abt">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6 col-12">
                                <div className="our_misson_boxs">
                                    {aboutus?.menu_contents?.contents.map((item, index) =>
                                        item.extra_title !== 'Corporate Strategy' && (

                                            <div key={index} className="mission_boxs our_box_mi">
                                                <h2>{item?.extra_title}</h2>
                                                <p>{item?.extra_description}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                {aboutus?.menu_contents?.contents.map((item, index) =>
                                    item.extra_title === 'Corporate Strategy' && (
                                        <div className="why_abuts">
                                            <h2>{item?.extra_title}</h2>
                                            <div className='' dangerouslySetInnerHTML={{ __html: item?.extra_description }} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>

                <section className="meter-area">
                    <div className="container">
                        <h2>We've helped businesses increase their revenues significantly in their very first year of partnering with us!</h2>
                        <div className="counter-show">
                            <div className="row">
                                <div className="all-meter">
                                    <ul>
                                        {commonaboutus?.map((item, index) => {
                                            if (item.title === "Clients" || item.title === "Experts" || item.title === "Projects" || item.title === "Years Experience") {
                                                return (
                                                    <li className="meter-box">
                                                        <span className="timer count-number">{item?.short_desc}</span>
                                                        <p>{item?.long_desc}</p>
                                                    </li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



            </main>
        </>
    )
}

export default React.memo(AboutUs);

export async function getServerSideProps(context) {

    const url = context.req.url;
    const lastSegment = url.split("/").filter(Boolean).pop();

    const res = await HomeService.menuAboutusPage();
    const aboutus = res.data?.aboutus || [];

    const res1 = await HomeService.expertPage();
    const experts = res1.data?.careers || [];

    const res2 = await HomeService.commonaboutusPage();
    const commonaboutus = res2.data?.commonaboutus || [];

    const seobyslug = await HomeService.seobyslug(lastSegment);
    const seometadata = seobyslug?.data?.seometa;

    return {
        props: {
            aboutus,
            experts,
            commonaboutus,
            seometadata
        }
    }
}