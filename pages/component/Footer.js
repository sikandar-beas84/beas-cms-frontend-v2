import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
export default function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col xs={12} md={3}>
            <div className='footer-txt'>Quick Links</div>
            <ul className='footer-list'>
              <li><a href='#'>Home</a></li>
              <li><a href='#'>About Us</a></li>
              <li><a href='#'>Our Services</a></li>
              <li><a href='#'>Portfolio</a></li>
              <li><a href='#'>Contact Us</a></li>
            </ul>
          </Col>
          <Col xs={12} md={3}>
            <div className='footer-txt'>Industries</div>
            <ul className='footer-list'>
              <li><a href='#'>Home</a></li>
              <li><a href='#'>About Us</a></li>
              <li><a href='#'>Our Services</a></li>
              <li><a href='#'>Portfolio</a></li>
              <li><a href='#'>Contact Us</a></li>
            </ul>
          </Col>
          <Col xs={12} md={3}>
            <div className='footer-txt'>Our Services</div>
            <ul className='footer-list'>
              <li><a href='#'>Home</a></li>
              <li><a href='#'>About Us</a></li>
              <li><a href='#'>Our Services</a></li>
              <li><a href='#'>Portfolio</a></li>
              <li><a href='#'>Contact Us</a></li>
            </ul>
          </Col>
          <Col xs={12} md={3}>
            <div className='get-in-touch-block'>
              <div className='footer-txt'>Get In Touch</div>
              <ul>
                <li>BEAS Consultancy & Services Pvt. Ltd. CF-345, Salt Lake City, Sector - I Kolkata - 700064,West Bengal, India</li>
                <li>+91-33-2321-1380 / 1381 / 1384</li>
                <li>beas@beas.co.in</li>

              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
