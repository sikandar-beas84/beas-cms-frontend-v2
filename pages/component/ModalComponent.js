import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
function ModalComponent() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch static backdrop modal
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                dialogClassName="modal-xl"
                centered
                className='contact-modal'
            >
                <Modal.Header closeButton className='mmodal-header'>
                    {/* <Modal.Title></Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={12} lg={5} className='bgg-bright'>
                                <div className='year-awar'>
                                    <Image
                                        src="/assets/images/awards.png"
                                        alt="awards"
                                        width={200}
                                        height={200}
                                        className="img-fluid"
                                    />
                                </div>
                                <div className='award-section pt-4 pop-up-award'>
                                    <ul>
                                        <li>
                                            <Image
                                                src="/assets/images/a1.png"
                                                alt="awards"
                                                width={150}
                                                height={90}
                                                className="img-fluid"
                                            />
                                        </li>
                                        <li>
                                            <Image
                                                src="/assets/images/a2.png"
                                                alt="awards"
                                                width={150}
                                                height={90}
                                                className="img-fluid"
                                            />
                                        </li>
                                        <li>
                                            <Image
                                                src="/assets/images/a3.png"
                                                alt="awards"
                                                width={150}
                                                height={90}
                                                className="img-fluid"
                                            />
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col xs={12} lg={7} className='bgg-light-blue'>
                                <div class="about_texts"><h1>Your Journey to Growth Begins Now</h1></div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.
                                </p>
                                <div className='modal-ffoter'>
                                    <ul>
                                        <li>
                                            <Image
                                                src="/assets/images/green-check.png"
                                                alt="awards"
                                                width={20}
                                                height={20}
                                                className="img-fluid"
                                            />
                                            Confidentiality Assured</li>
                                        <li>
                                            <Image
                                                src="/assets/images/green-check.png"
                                                alt="awards"
                                                width={20}
                                                height={20}
                                                className="img-fluid"
                                            />
                                            Zero Spam Commitment</li>
                                        <li>
                                            <Image
                                                src="/assets/images/green-check.png"
                                                alt="awards"
                                                width={20}
                                                height={20}
                                                className="img-fluid"
                                            />
                                            100% Quick Response
                                        </li>
                                    </ul>
                                </div>

                                <div className="contact_form_box mt-4">
                                    <form className="was-validate contact-frm">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div>
                                                    <input
                                                        type='text'
                                                        name="name"
                                                        // value={formData.name}
                                                        // onChange={handleChange}
                                                        className='form-control mb-3'
                                                        placeholder='Name'
                                                        required
                                                    />
                                                    {/* {errors.name && (<p className='error_message'>{errors.name[0]}</p>)} */}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div>
                                                    <input
                                                        type='text'
                                                        name="email"
                                                        // value={formData.email}
                                                        // onChange={handleChange}
                                                        className='form-control mb-3'
                                                        placeholder='Email'
                                                        required
                                                    />
                                                    {/* {errors.email && (<p className='error_message'>{errors.email[0]}</p>)} */}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div>
                                                    <input
                                                        type='text'
                                                        name="phone"
                                                        // value={formData.phone}
                                                        // onChange={handleChange}
                                                        className='form-control'
                                                        placeholder='Mobile Number'
                                                        required
                                                    />
                                                    {/* {errors.phone && (<p className='error_message'>{errors.phone[0]}</p>)} */}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div>
                                                    <input
                                                        type='text'
                                                        name="message"
                                                        // value={formData.subject}
                                                        // onChange={handleChange}
                                                        className='form-control'
                                                        placeholder='Message'
                                                        required
                                                    />
                                                    {/* {errors.subject && (<p className='error_message'>{errors.subject[0]}</p>)} */}
                                                </div>
                                            </div>
                                            <div className="col-lg-8"></div>
                                            <div className="col-lg-4">
                                                <div className="contact_form_btn">

                                                    <button type="submit" className='red-btn w-100 mt-3 post-job-btn' >
                                                        Submit {/* {loading ? 'Submitting...' : 'Submit'} */}
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </form>


                                </div>
                            </Col>
                        </Row>

                    </Container>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ModalComponent;