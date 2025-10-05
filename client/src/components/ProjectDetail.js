import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import colorSharp2 from "../assets/img/color-sharp2.png";
import FImg1 from "../assets/ProjImg/Fhome.png";
import FImg2 from "../assets/ProjImg/Fmenu.png";
import FImg3 from "../assets/ProjImg/Fcontact.png";
import MImg1 from "../assets/ProjImg/Mhome.png";
import MImg2 from "../assets/ProjImg/Mfavorite.png";
import MImg3 from "../assets/ProjImg/Msearch.png";
import EImg1 from "../assets/ProjImg/Ehome.png";
import EImg2 from "../assets/ProjImg/Eproduct.png";
import EImg3 from "../assets/ProjImg/Ecart.png";
import projImg4 from "../assets/img/project-img4.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Using the existing project images from your Projects component
  const projectsData = {
    "food-delivery-app": {
      title: "Food Delivery App",
      description: "UI Design & Development",
      fullDescription: "A comprehensive food delivery application with intuitive user interface and seamless ordering experience. Built with modern web technologies to provide fast and responsive performance across all devices.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      features: [
        "Real-time order tracking",
        "Secure payment integration",
        "Restaurant menu management",
        "User authentication and profiles",
        "Rating and review system"
      ],
      images: [FImg1, FImg2, FImg3],
      demoUrl: "https://food-delivery-app-two-pi.vercel.app/",
      githubUrl: "https://github.com/Surya821/Food-Delivery-App"
    },
    "movie-app": {
      title: "Movie App",
      description: "Dynamic Movie Finder",
      fullDescription: "An interactive movie discovery platform that allows users to search, browse, and explore movies with detailed information including ratings, cast, and reviews.",
      technologies: ["React", "TMDB API", "CSS3", "React Router"],
      features: [
        "Advanced movie search",
        "Filter by genre and rating",
        "Detailed movie information",
        "Watchlist functionality",
        "Responsive design"
      ],
      images: [MImg1, MImg2, MImg3],
      demoUrl: "https://movie-app-two-cyan-50.vercel.app/",
      githubUrl: "https://github.com/Surya821/Movie-App"
    },
    "e-commerce-website": {
      title: "E-Commerce Website",
      description: "React-Powered Online Store",
      fullDescription: "A full-featured e-commerce platform with shopping cart, product catalog, and secure checkout process. Designed for optimal user experience and conversion rates.",
      technologies: ["React", "Redux", "Node.js", "PostgreSQL", "Stripe"],
      features: [
        "Product catalog with filters",
        "Shopping cart management",
        "Secure payment processing",
        "Order history and tracking",
        "Admin dashboard"
      ],
      images: [EImg1, EImg2, EImg3],
      demoUrl: "https://e-commerce-website-one-psi.vercel.app/",
      githubUrl: "https://github.com/Surya821/E-Commerce-Website"
    },
    "music-player": {
      title: "Music Player",
      description: "Deezer-Powered Music Player",
      fullDescription: "A modern music streaming application integrated with Deezer API, featuring playlist management, audio controls, and a beautiful user interface.",
      technologies: ["React", "Deezer API", "Web Audio API", "CSS3"],
      features: [
        "Music streaming",
        "Playlist creation",
        "Search functionality",
        "Audio visualization",
        "Favorite tracks management"
      ],
      images: [projImg4],
      demoUrl: "https://surya821.github.io/Music-Player/",
      githubUrl: "https://github.com/Surya821/Music-Player"
    }
  };

  const project = projectsData[id];

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

  return (
    <section className="project-detail" id="project-detail">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <button onClick={() => navigate('/')} className="back-btn mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    <span>Back to Projects</span>
                  </button>

                  <div className="project-header">
                    <h1>{project.title}</h1>
                    <p className="project-subtitle">{project.description}</p>
                  </div>

                  <div className="project-main-image">
                    <img src={project.images[0]} alt={project.title} />
                  </div>

                  <Row className="project-info-section">
                    <Col lg={8}>
                      <div className="project-description-box">
                        <h3>About This Project</h3>
                        <p>{project.fullDescription}</p>
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
                        {project.githubUrl && (
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

                  {project.images.length > 1 && (
                    <div className="project-gallery">
                      <h3>Project Gallery</h3>
                      <Row>
                        {project.images.slice(1).map((image, index) => (
                          <Col key={index} md={6} className="mb-4">
                            <div className="gallery-image">
                              <img src={image} alt={`${project.title} screenshot ${index + 2}`} />
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
      <img className="background-image-right" src={colorSharp2} alt="" />
    </section>
  );
}