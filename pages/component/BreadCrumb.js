import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { env } from '../../util/constants/common';
const BreadCrumb = ({pagetitle, pageslug, pageBanner}) => {

  const bannerUrl = `${env.BACKEND_BASE_URL}${pageBanner}`;
  const bgStyle = {
    backgroundImage: `linear-gradient(rgba(14,19,51,0.5), rgba(14,19,51,0.5)), url(${bannerUrl})`
  };

  return (
    <section>
      <Container fluid  className="breadcrumbBg" style={bgStyle}>
        <Row>
          <Col>
           <div className='breadcrumbWrap'>
             <div className='pageTitle drop_ani'>{pagetitle}</div>
             <div className='pgNameListing'>
              <ul>
                <li>Home</li>
                {pageslug && <li>{pageslug}</li>}
                <li>{pagetitle}</li>
              </ul>
             </div>
           </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default React.memo(BreadCrumb);