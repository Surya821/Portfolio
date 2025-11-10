import { Container, Row, Col } from "react-bootstrap";
import { MailchimpForm } from "./MailchimpForm";
import { assets } from "../assets.js";

export const Footer = ({ hideNewsletter = false }) => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          {!hideNewsletter && <MailchimpForm />}
          <Col size={12} sm={6}>
            {/* <img src={logo} alt="Logo" /> */}
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Surya Pratap Singh
            </p>
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/surya-pratap-singh1/" target="_blank" rel="noopener noreferrer">
                <img src={assets.navIcon1} alt="" />
              </a>
              <a href="https://github.com/Surya821" target="_blank" rel="noopener noreferrer">
                <img src={assets.navIcon2} alt="" />
              </a>
              <a href="https://leetcode.com/u/suryapratap821/" target="_blank" rel="noopener noreferrer">
                <img src={assets.navIcon3} alt="" />
              </a>
              
            </div>
            <p>Copyright 2025. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};