import { useParams, useNavigate } from 'react-router-dom'; // 👈 Import useNavigate
import { projects } from './projects';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react'; // 👈 Import useState
import './App.css';

export default function ProjectPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const navigate = useNavigate(); // 👈 Hook for manual navigation
  const [isExiting, setIsExiting] = useState(false); // 👈 State to track animation

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 👇 Handles the "Slide Down then Navigate" logic
  const handleBackClick = (e) => {
    e.preventDefault(); // Stop instant navigation
    setIsExiting(true); // Trigger the CSS animation
    
    // Wait 500ms (matches CSS animation time) then go back
    setTimeout(() => {
        navigate('/#projects');
    }, 500);
  };

  if (!project) {
    return <div className="project-page-container"><h1>Project not found</h1></div>;
  }

  return (
    // 👇 Add the 'slide-out' class if isExiting is true
    <div className={`project-page-container ${isExiting ? 'slide-out' : ''}`}>
      
      {/* Navbar */}
      <nav className="project-nav">
        {/* 👇 Changed Link to <a> with onClick handler */}
        <a href="/#projects" onClick={handleBackClick} className="back-link" style={{cursor: 'pointer'}}>
            <FaArrowLeft /> Back to Portfolio
        </a>
      </nav>

      <div className="project-content">
        
        {/* Hero Section */}
        <div className="project-hero">
            <h1 className="project-title">{project.title}</h1>
            
            <img 
                src={project.modalImage || project.image} 
                alt={project.title} 
                className="project-hero-image" 
            />

            <div className="project-links">
                {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn">
                        View Live <FaExternalLinkAlt style={{marginLeft:'8px'}}/>
                    </a>
                )}
                {project.repoLink && (
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="btn outline-btn">
                        GitHub Repo <FaGithub style={{marginLeft:'8px'}}/>
                    </a>
                )}
            </div>
        </div>

        <hr className="divider"/>

        {/* Details Section */}
        <div className="project-details">
            <div className="details-text">
                <h3>Overview</h3>
                <p style={{whiteSpace: 'pre-line'}}>{project.fullDescription}</p>
            </div>
            
            {project.techStack.length > 0 && (
                <div className="details-tech">
                    <h3>Technologies Used</h3>
                    <div className="tech-stack-grid">
                        {project.techStack.map((tech, index) => (
                            <div key={index} className="tech-badge-small">
                                <img src={tech.icon} alt={tech.name} />
                                <span>{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}