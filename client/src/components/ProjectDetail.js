import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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

  const projectsData = {
    "quickchat": {
      title: "QuickChat by Surya",
      description: "Real-time Chat Application",
      fullDescription: "QuickChat is a real-time messaging application built using the MERN stack with Socket.IO for instant communication. It includes secure authentication, profile customization, image uploads via Cloudinary, and a clean responsive UI for seamless chatting.",
      technologies: ["React", "Vite", "TailwindCSS", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT", "Cloudinary"],
      features: [
        "Real-time 1-to-1 private messaging",
        "JWT-based secure authentication",
        "Profile update with image upload",
        "Cloudinary media storage support",
        "Online users indicator",
        "Fully responsive UI (Desktop & Tablet)"
      ],
      images: [assets.chatSignupDesktop, assets.chatLoginDesktop, assets.chatHomeDesktop, assets.chatDesktop, assets.chatProfileDesktop],
      demoUrl: "https://quickchatbysurya.vercel.app",
      githubUrl: "https://github.com/Surya821/Chat-App"
    },    
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
      images: [assets.FImg1, assets.FImg2, assets.FImg3],
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
      images: [assets.MImg1, assets.MImg2, assets.MImg3],
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
      images: [assets.EImg1, assets.EImg2, assets.EImg3],
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
      images: [assets.projImg4],
      demoUrl: "https://surya821.github.io/Music-Player/",
      githubUrl: "https://github.com/Surya821/Music-Player"
    },
    "Email-Spam-Classifier": {
      title: "Email Spam Classifier",
      description: "A machine learning model that classifies emails as spam or not spam.",
      fullDescription: "An intelligent email spam detection system built using machine learning techniques. It analyzes email content and classifies messages as 'Spam' or 'Not Spam' based on patterns in the text. The project involves data preprocessing, feature extraction using TF-IDF vectorization, and model training with algorithms like Naive Bayes and Logistic Regression to achieve high accuracy.",
      technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
      features: [
        "Text preprocessing and cleaning",
        "Feature extraction using TF-IDF",
        "Spam vs. Ham classification",
        "Model evaluation and accuracy visualization",
        "Interactive user input for testing emails"
      ],
      images: [assets.Email],
      demoUrl: "#",
      githubUrl: "https://github.com/Surya821/Email-Spam-Classifier"
    },
    "Face-Feature-Detection": {
      title: "Face Feature Detection",
      description: "A computer vision project that detects and analyzes key facial features using machine learning.",
      fullDescription: "A face feature detection system built using computer vision and machine learning techniques. It identifies and marks key facial features such as eyes, nose, and mouth in images or real-time video. The project uses OpenCV and Haar Cascade classifiers (or Dlib/MediaPipe) to perform face detection and landmark recognition, providing a foundation for applications like emotion recognition, facial authentication, and augmented reality.",
      technologies: ["Python", "OpenCV", "NumPy", "Matplotlib", "Dlib"],
      features: [
        "Real-time face and feature detection",
        "Detection of eyes, nose, and mouth",
        "Image and webcam input support",
        "Visualization of facial landmarks",
        "Efficient and accurate detection using OpenCV"
      ],
      images: [assets.Face],
      demoUrl: "#",
      githubUrl: "https://github.com/Surya821/Face-Feature-Detection"
    },    
    "Breast-Cancer-Detectionp": {
      title: "Breast Cancer Detection",
      description: "A machine learning model that predicts whether a tumor is malignant or benign based on cell data.",
      fullDescription: "A predictive machine learning project that helps in early detection of breast cancer using diagnostic data. The model analyzes various cellular features to classify tumors as benign (non-cancerous) or malignant (cancerous). It involves data preprocessing, feature selection, and model training using algorithms like Logistic Regression, Support Vector Machine (SVM), and Random Forest, providing high accuracy and explainability.",
      technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      features: [
        "Data preprocessing and cleaning",
        "Feature selection and visualization",
        "Classification using ML algorithms",
        "Accuracy evaluation and confusion matrix",
        "Prediction for new patient data"
      ],
      images: [assets.Breast],
      demoUrl: "#",
      githubUrl: "https://github.com/Surya821/Breast-Cancer-Detection"
    },
    
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
                    <LazyImage 
                      src={project.images[0]} 
                      alt={project.title}
                    />
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
                              <LazyImage 
                                src={image} 
                                alt={`${project.title} screenshot ${index + 2}`}
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