import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
const API_URL = process.env.REACT_APP_API_URL;

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});
  const [showToast, setShowToast] = useState(false);

  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    
    try {
      let response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(formDetails),
      });      
      
      setButtonText("Send");
      let result = await response.json();
      setFormDetails(formInitialDetails);
      
      if (result.code === 200) {
        setStatus({ success: true, message: 'Message sent successfully!' });
      } else {
        setStatus({ success: false, message: 'Something went wrong, please try again later.' });
      }
      
      // Show toast notification
      setShowToast(true);
      
      // Auto hide after 5 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
      
    } catch (error) {
      setButtonText("Send");
      setStatus({ success: false, message: 'Failed to connect to server. Please try again.' });
      setShowToast(true);
      
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Get In Touch</h2>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input 
                        type="text" 
                        value={formDetails.firstName} 
                        placeholder="First Name" 
                        onChange={(e) => onFormUpdate('firstName', e.target.value)} 
                        required
                      />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input 
                        type="text" 
                        value={formDetails.lastName} 
                        placeholder="Last Name" 
                        onChange={(e) => onFormUpdate('lastName', e.target.value)}
                        required
                      />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input 
                        type="email" 
                        value={formDetails.email} 
                        placeholder="Email Address" 
                        onChange={(e) => onFormUpdate('email', e.target.value)} 
                        required
                      />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input 
                        type="tel" 
                        value={formDetails.phone} 
                        placeholder="Phone No." 
                        onChange={(e) => onFormUpdate('phone', e.target.value)}
                        required
                      />
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea 
                        rows="6" 
                        value={formDetails.message} 
                        placeholder="Message" 
                        onChange={(e) => onFormUpdate('message', e.target.value)}
                        required
                      ></textarea>
                      <button type="submit"><span>{buttonText}</span></button>
                    </Col>
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      
      {/* Toast Notification */}
      {showToast && (
        <div className={`toast-notification ${status.success ? 'toast-success' : 'toast-error'}`}>
          <div className="toast-icon">
            {status.success ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
              </svg>
            )}
          </div>
          <div className="toast-content">
            <div className="toast-title">{status.success ? 'Success!' : 'Error'}</div>
            <div className="toast-message">{status.message}</div>
          </div>
          <button className="toast-close" onClick={() => setShowToast(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}