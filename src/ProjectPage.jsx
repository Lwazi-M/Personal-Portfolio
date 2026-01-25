// ====================================================================
// 1. IMPORTS
// ====================================================================

// Hooks from React Router:
// - useParams: Grabs the ":id" from the URL (e.g., gets "studyconnect" from "/project/studyconnect").
// - useNavigate: Allows us to change the URL using code (instead of just clicking a link).
import { useParams, useNavigate } from 'react-router-dom'; 

// Import the data file containing all project details.
import { projects } from './projects';

// Import icons for the buttons.
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

// React Hooks:
// - useEffect: Used to run code when the page loads (like scrolling to the top).
// - useState: Used to track if the page is currently animating out.
import { useEffect, useState } from 'react'; 

// Import styles.
import './App.css';

// ====================================================================
// 2. COMPONENT DEFINITION
// ====================================================================
export default function ProjectPage() {
  
  // -- GET DATA --
  // 1. Get the 'id' from the URL.
  const { id } = useParams();
  
  // 2. Search the 'projects' array for the project that matches this ID.
  const project = projects.find((p) => p.id === id);
  
  // -- HOOKS --
  // Initialize the navigate function so we can use it later.
  const navigate = useNavigate(); 
  
  // Create a state variable to track if the exit animation is running.
  // false = showing normally.
  // true = sliding down.
  const [isExiting, setIsExiting] = useState(false); 

  // -- SCROLL TO TOP --
  // When this page loads, force the browser to scroll to the very top.
  // Otherwise, you might start halfway down the page if you were scrolling previously.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // -- NAVIGATION HANDLER --
  // This function runs when the user clicks "Back to Portfolio".
  const handleBackClick = (e) => {
    e.preventDefault(); // Stop the browser from jumping to the link immediately.
    
    setIsExiting(true); // 1. Turn on the 'slide-out' CSS class.
    
    // 2. Wait 500ms (0.5 seconds) for the animation to finish.
    setTimeout(() => {
        // 3. Actually change the URL back to the home page (#projects section).
        navigate('/#projects');
    }, 500);
  };

  // -- SAFETY CHECK --
  // If the URL has an ID that doesn't exist (e.g. /project/blahblah), show an error.
  if (!project) {
    return <div className="project-page-container"><h1>Project not found</h1></div>;
  }

  // ====================================================================
  // 3. RENDER (HTML STRUCTURE)
  // ====================================================================
  return (
    // Dynamic Class:
    // If 'isExiting' is true, add the "slide-out" class.
    // This triggers the CSS animation defined in App.css (@keyframes slideDownFade).
    <div className={`project-page-container ${isExiting ? 'slide-out' : ''}`}>
      
      {/* --- NAVBAR --- */}
      <nav className="project-nav">
        {/* Back Button with custom click handler */}
        <a 
            href="/#projects" 
            onClick={handleBackClick} 
            className="back-link" 
            style={{cursor: 'pointer'}}
        >
            <FaArrowLeft /> Back to Portfolio
        </a>
      </nav>

      <div className="project-content">
        
        {/* --- HERO SECTION --- */}
        <div className="project-hero">
            <h1 className="project-title">{project.title}</h1>
            
            {/* Main Project Image */}
            <img 
                src={project.modalImage || project.image} 
                alt={project.title} 
                className="project-hero-image" 
            />

            {/* Action Buttons (Live & Repo) */}
            <div className="project-links">
                
                {/* Only show "View Live" if a link exists in the data */}
                {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn">
                        View Live <FaExternalLinkAlt style={{marginLeft:'8px'}}/>
                    </a>
                )}
                
                {/* Only show "GitHub" if a repo link exists */}
                {project.repoLink && (
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="btn outline-btn">
                        GitHub Repo <FaGithub style={{marginLeft:'8px'}}/>
                    </a>
                )}
            </div>
        </div>

        {/* Divider Line */}
        <hr className="divider"/>

        {/* --- DETAILS SECTION --- */}
        <div className="project-details">
            
            {/* Text Description */}
            <div className="details-text">
                <h3>Overview</h3>
                {/* whiteSpace: 'pre-line' preserves line breaks from your text data */}
                <p style={{whiteSpace: 'pre-line'}}>{project.fullDescription}</p>
            </div>
            
            {/* Tech Stack Grid */}
            {/* Only render this section if there are items in the techStack array */}
            {project.techStack.length > 0 && (
                <div className="details-tech">
                    <h3>Technologies Used</h3>
                    <div className="tech-stack-grid">
                        {/* Loop through techStack and create a badge for each */}
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