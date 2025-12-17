// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../public/assets/css/styles.css';
import '../public/assets/css/responsive.css';
import "@flaticon/flaticon-uicons/css/all/all.css";

import Header from './component/Header';
import Footer from './component/Footer';

export default function MyApp({ Component, pageProps }) {
  const { homeData } = pageProps;

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
export async function getStaticProps() {
  const res = await HomeService.homePage();

  return {
    props: {
      homeData: res?.data || null,
    },
    revalidate: 300,
  };
}
