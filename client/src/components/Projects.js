import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import { assets } from '../assets.js';
import { projects as projectsData } from '../data/projectsData';
import { Link } from 'react-router-dom';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = ({ isHome = true }) => {
  const displayProjects = isHome ? projectsData.slice(0, 3) : projectsData;

  return (
    <section className={`project ${isHome ? "": "projects-page"}`} id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>{isHome ? "Latest Projects" : "All My Projects"}</h2>
                <p>
                  {isHome 
                    ? "Explore some of my most recent work. Each project represents a unique challenge and solution."
                    : "A comprehensive showcase of various web applications and ML models I've built, ranging from e-commerce to AI solutions."}
                </p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    {/* Tabs commented out - can be enabled if needed */}
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          displayProjects.map((project, index) => {
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
                {isHome && (
                  <div className="text-center mt-5 pt-3">
                    <Link to="/projects" className="see-all-btn">
                      <span>See All Projects 
                        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 16 16 12 12 8"/>
                          <line x1="8" y1="12" x2="16" y2="12"/>
                        </svg>
                      </span>
                    </Link>
                  </div>
                )}


              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={assets.colorSharp2} alt="" />
    </section>
  )
}