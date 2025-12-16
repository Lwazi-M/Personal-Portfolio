import { useParams, Link } from 'react-router-dom';
import { projects } from './projects';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { useEffect } from 'react';
import './App.css';

export default function ProjectPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return <div className="project-page-container"><h1>Project not found</h1></div>;
  }

  return (
    <div className="project-page-container">
      {/* Navbar */}
      <nav className="project-nav">
        <Link to="/" className="back-link">
            <FaArrowLeft /> Back to Portfolio
        </Link>
      </nav>

      <div className="project-content">
        
        {/* Hero Section (Centered) */}
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
                    {/* 👇 Rendering the Badges */}
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