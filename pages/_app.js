// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../public/assets/css/styles.css';
import '../public/assets/css/responsive.css';
import "@flaticon/flaticon-uicons/css/all/all.css";

import { useEffect, useState } from "react";
import Header from './component/Header';
import Footer from './component/Footer';
import HomeService from "../util/service/Home";

export default function MyApp({ Component, pageProps }) {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadHomeData = async () => {
      try {
        const res = await HomeService.homePage();
        if (mounted) {
          setHomeData(res?.data || null);
        }
      } catch {
        if (mounted) setHomeData(null);
      }
    };

    loadHomeData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <section className="top-bg">
        <Header homeData={homeData} />
      </section>

      <Component {...pageProps} />

      <Footer homeData={homeData} />
    </>
  );
}
