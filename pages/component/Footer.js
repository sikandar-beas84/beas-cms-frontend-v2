import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Mail, Map, Phone, ArrowUp } from "react-feather";
export default function Footer() {
  return (
    <footer>

      <Container>

        <Row>
          <Col xs={12} md={8}>
            <Row>
              <Col xs={12} md={4}>
                <div className='footer-txt'>Quick Links</div>
                <ul className='footer-list'>
                  <li><a href='#'>Home</a></li>
                  <li><a href='#'>About Us</a></li>
                  <li><a href='#'>Our Services</a></li>
                  <li><a href='#'>Portfolio</a></li>
                  <li><a href='#'>Contact Us</a></li>
                </ul>
              </Col>
              <Col xs={12} md={4}>
                <div className='footer-txt'>Industries</div>
                <ul className='footer-list'>
                  <li><a href='#'>Home</a></li>
                  <li><a href='#'>About Us</a></li>
                  <li><a href='#'>Our Services</a></li>
                  <li><a href='#'>Portfolio</a></li>
                  <li><a href='#'>Contact Us</a></li>
                </ul>
              </Col>
              <Col xs={12} md={4}>
                <div className='footer-txt'>Our Services</div>
                <ul className='footer-list'>
                  <li><a href='#'>Home</a></li>
                  <li><a href='#'>About Us</a></li>
                  <li><a href='#'>Our Services</a></li>
                  <li><a href='#'>Portfolio</a></li>
                  <li><a href='#'>Contact Us</a></li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={4}>
            <div className='get-in-touch-block'>
              <div className='footer-txt'>Get In Touch</div>
              <ul>
                <li><Map size={16} />BEAS Consultancy & Services Pvt. Ltd. CF-345, Salt Lake City, Sector - I Kolkata - 700064,West Bengal, India</li>
                <li><Phone size={16} /> +91-33-2321-1380 / 1381 / 1384</li>
                <li><Mail size={16} /> beas@beas.co.in</li>

              </ul>
            </div>
          </Col>


        </Row>
        {/* Footer White Section */}

      </Container>
      <section className='bg-white py-3 mt-5'>
        <Container>
          <Row>
            <Col xs={12} lg={6}>
              <div className='award-section'>
                <ul>
                  <li>
                    <img src="/assets/images/a1.png" alt="a1-logo" className='img-fluid' />
                  </li>
                  <li>
                    <img src="/assets/images/a2.png" alt="a2-logo" className='img-fluid' />
                  </li>
                  <li>
                    <img src="/assets/images/a3.png" alt="a3-logo" className='img-fluid' />
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={12} lg={6}>
            <div className='award-section'>
                <ul>
                  <li>
                    <img src="/assets/images/a1.png" alt="a1-logo" className='img-fluid' />
                  </li>
                  <li>
                    <img src="/assets/images/a2.png" alt="a2-logo" className='img-fluid' />
                  </li>
                  <li>
                    <img src="/assets/images/a3.png" alt="a3-logo" className='img-fluid' />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='bg-light-blue py-3'>
        <Container>

          <Row className="d-flex justify-content-between align-items-center">
            <Col xs={12} lg={6}>
              <p className='mb-0'>© 2024 BEAS Consultancy & Services Pvt. Ltd. All Rights Reserved</p>
            </Col>
            <Col xs={12} lg={6} className="text-lg-end text-start">
              <a href='#' className='scroll-top'><ArrowUp size={16} /></a>
            </Col>
          </Row>
        </Container>
      </section>
    </footer>
  );
}
