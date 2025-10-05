import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ProjectCard = ({ title, description, imgUrl, projectId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${projectId}`);
    window.scrollTo(0, 0);
  };

  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <img src={imgUrl} alt={title} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  );
}