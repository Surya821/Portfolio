import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { projects as projectsList } from '../data/projectsData';
import assets from "../assets";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

// Lazy Loading Image Component
const LazyImage = ({ src, alt, className = "" }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    let observer;
    
    if (imgRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(imgRef.current);
            }
          });
        },
        {
          rootMargin: '100px', 
        }
      );

      observer.observe(imgRef.current);
    }

    const img = imgRef.current;
    return () => {
      if (observer && img) {
        observer.unobserve(img);
      }
    };
  }, [src]);

  return (
    <div 
      ref={imgRef}
      className={`lazy-image-container ${className}`}
      style={{
        position: 'relative',
        backgroundColor: '#1a1a1a',
        minHeight: '200px',
      }}
    >
      {!imageLoaded && (
        <div className="image-skeleton">
          <div className="skeleton-shimmer"></div>
        </div>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          style={{
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
          onLoad={() => setImageLoaded(true)}
        />
      )}
    </div>
  );
};

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projectsList.find(p => p.id === id);

  if (!project) {
    return (
      <section className="project-detail">
        <Container>
          <div className="text-center py-5">
            <h2>Project Not Found</h2>
            <button onClick={() => navigate('/')} className="back-btn mt-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span>Back to Home</span>
            </button>
          </div>
        </Container>
      </section>
    );
  }

  const displayTitle = project.fullTitle || project.title;
  const displayDesc = project.fullDescription || project.description;
  const projectImages = project.images || [project.imgUrl];

  return (
    <section className="project-detail" id="project-detail" style={{ paddingTop: '120px' }}>
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <button onClick={() => navigate(-1)} className="back-btn mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    <span>Back</span>
                  </button>

                  <div className="project-header">
                    <h1>{displayTitle}</h1>
                    <p className="project-subtitle">{project.description}</p>
                  </div>

                  <Row className="project-info-section">
                    <Col lg={8}>
                      <div className="project-description-box">
                        <h3>About This Project</h3>
                        <p>{displayDesc}</p>
                      </div>

                      <div className="project-features-box">
                        <h3>Key Features</h3>
                        <ul className="features-list">
                          {project.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </Col>

                    <Col lg={4}>
                      <div className="project-tech-box">
                        <h3>Technologies Used</h3>
                        <div className="tech-tags">
                          {project.technologies.map((tech, index) => (
                            <span key={index} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div className="project-actions">
                        {project.demoUrl && project.demoUrl !== "#" && (
                          <a 
                            href={project.demoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="demo-btn"
                          >
                            <span>View Live Demo</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                              <polyline points="15 3 21 3 21 9"/>
                              <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                          </a>
                        )}
                        {project.githubUrl && project.githubUrl !== "#" && (
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="github-btn"
                          >
                            <span>View on GitHub</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                              <polyline points="15 3 21 3 21 9"/>
                              <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </Col>
                  </Row>

                  {projectImages.length > 0 && (
                    <div className="project-gallery">
                      <h3>Project Gallery</h3>
                      <Row>
                        {projectImages.map((image, index) => (
                          <Col key={index} md={6} className="mb-4">
                            <div className="gallery-image">
                              <LazyImage 
                                src={image} 
                                alt={`${project.title} screenshot ${index + 1}`}
                              />
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={assets.colorSharp2} alt="" loading="lazy" />
    </section>
  );
}