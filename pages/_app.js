// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../public/assets/css/styles.css';
import '../public/assets/css/responsive.css';
import "@flaticon/flaticon-uicons/css/all/all.css";

import Header from './component/Header';
import Footer from './component/Footer';

import { IndustryProvider } from "../util/context/industrycontext";
import { ServiceProvider } from "../util/context/servicecontext";
import { HomeProvider, useHome } from "../util/context/homecontext";

function Layout({ children }) {
  const { homeData } = useHome();

  return (
    <>
      <section className="top-bg">
        <Header homeData={homeData} />
      </section>

      {children}

      <Footer homeData={homeData} />
    </>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <HomeProvider>
      <IndustryProvider>
        <ServiceProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ServiceProvider>
      </IndustryProvider>
    </HomeProvider>
  );
}
