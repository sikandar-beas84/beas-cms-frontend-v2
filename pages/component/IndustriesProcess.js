import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
const IndustriesProcess = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabs = [
        {
            title: "Media and Entertainment",
            image: "/assets/images/process.png",
            description:
                "Media and Entertainment industry leverages technology to deliver engaging content and seamless digital experiences.",
        },
        {
            title: "Banking, Insurance and Finance",
            image: "/assets/images/process2.png",
            description:
                "We provide secure, scalable financial solutions that enable smarter transactions, analytics, and customer engagement.",
        },
        {
            title: "Business",
            image: "/assets/images/process.png",
            description:
                "Empowering businesses with modern digital strategies, CRM systems, and scalable operations for global growth.",
        },
        {
            title: "Government",
            image: "/assets/images/process.png",
            description:
                "Digitally transforming government processes with transparency, efficiency, and citizen-centric solutions.",
        },
        {
            title: "Healthcare and Wellness",
            image: "/assets/images/process.png",
            description:
                "Revolutionizing healthcare with data-driven systems, patient portals, and wellness tracking solutions.",
        },
        {
            title: "Manufacturing",
            image: "/assets/images/process.png",
            description:
                "Streamlining production and supply chain management through smart manufacturing technologies.",
        },
    ];

    const activeTab = tabs[activeIndex];
    // Auto change tab every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === tabs.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval); // cleanup
    }, [tabs.length]);

    return (
        <>
            <div className="process">
                <div className="container">
                    <div className="port-hd-txt proc-hd">
                        <h2>Industries we Serve</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                    </div>
                </div>
                (
                <div className="process-inr">
                    <div className="container">
                        <div className="process-txt">
                            {/* Tabs on Left */}
                            <div className="tab">
                                {tabs.map((tab, index) => (
                                    <button
                                        key={index}
                                        className={`tablinks ${index === activeIndex ? "activen" : ""}`}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        {index + 1}. {tab.title}
                                    </button>
                                ))}
                            </div>

                            {/* Right Content */}
                            <div className="tabcontent">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        className="proc-deet"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                    >
                                        <div className="proc-img">
                                            <Image
                                                src={tabs[activeIndex].image}
                                                alt={tabs[activeIndex].title}
                                                width={500}
                                                height={350}
                                                className="img-fluid"
                                            />
                                        </div>

                                        <div className="proc-text">
                                            <h2>{tabs[activeIndex].title}</h2>
                                            <p>{tabs[activeIndex].description}</p>
                                            <a href="#" className="proc-btn thar-three4">
                                                Get in Touch
                                            </a>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
                )
            </div>
        </>
    )
}

export default IndustriesProcess