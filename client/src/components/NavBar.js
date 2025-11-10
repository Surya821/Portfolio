import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import {assets} from '../assets.js'

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  const handleNavClick = (section) => {
    onUpdateActiveLink(section);
    
    // If we're on a project detail page, navigate to home first
    if (location.pathname.startsWith('/project/')) {
      navigate('/', { replace: true });
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're already on the home page, just scroll
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <div className="text-white" style={{ fontSize: '1em' }}>Surya</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              href="#home" 
              className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              href="#skills" 
              className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('skills');
              }}
            >
              Skills
            </Nav.Link>
            <Nav.Link 
              href="#projects" 
              className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('projects');
              }}
            >
              Projects
            </Nav.Link>
            <Nav.Link 
              href="#certificates" 
              className={activeLink === 'certificates' ? 'active navbar-link' : 'navbar-link'} 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('certificates');
              }}
            >
              Certificates
            </Nav.Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/surya-pratap-singh1/" target="_blank" rel="noopener noreferrer"><img src={assets.navIcon1} alt="" /></a>
              <a href="https://github.com/Surya821" target="_blank" rel="noopener noreferrer"><img src={assets.navIcon2} alt="" /></a>
              <a href="https://leetcode.com/u/suryapratap821/" target="_blank" rel="noopener noreferrer"><img src={assets.navIcon3} alt="" /></a>
            </div>
            <button className="vvd" onClick={() => handleNavClick('connect')}>
              <span>Let's Connect</span>
            </button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}