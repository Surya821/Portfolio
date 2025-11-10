import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import {assets} from '../assets.js'
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      id: "quickchat",
      title: "QuickChat by Surya",
      description: "UI Design & Development",
      imgUrl: assets.chatHome4,
    },
    {
      id: "food-delivery-app",
      title: "Food Delivery App",
      description: "UI Design & Development",
      imgUrl: assets.projImg1,
    },
    {
      id: "movie-app",
      title: "Movie App",
      description: "Dynamic Movie Finder",
      imgUrl: assets.projImg2,
    },
    {
      id: "e-commerce-website",
      title: "E-Commerce-Website",
      description: "React-Powered Online Store",
      imgUrl: assets.projImg3,
    },
    {
      id: "music-player",
      title: "Music Player",
      description: "Deezer-Powered Music Player",
      imgUrl: assets.projImg4,
    },
    {
      id: "Email-Spam-Classifier",
      title: "Email Spam Classifier",
      description: "Spam email detection using ML",
      imgUrl: assets.Email,
    },
    {
      id: "Face-Feature-Detection",
      title: "Face Feature Detection",
      description: "Facial feature detection using AI",
      imgUrl: assets.Face,
    },
    {
      id: "Breast-Cancer-Detectionp",
      title: "Breast Cancer Detection",
      description: "ML-based cancer prediction model",
      imgUrl: assets.Breast,
    },    
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>Explore my portfolio of innovative web applications. Each project showcases unique features, modern design principles, and cutting-edge technologies. Click on any project to learn more about its development process and see it in action.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    {/* Tabs commented out - can be enabled if needed */}
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                projectId={project.id}
                                {...project}
                              />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={assets.colorSharp2} alt="" />
    </section>
  )
}