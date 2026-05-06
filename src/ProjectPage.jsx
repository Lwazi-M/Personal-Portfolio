// ====================================================================
// 1. IMPORTS
// ====================================================================

// Hooks from React Router:
// - useParams: Grabs the ":id" from the URL (e.g., gets "studyconnect" from "/project/studyconnect").
// - useNavigate: Allows us to change the URL using code (instead of just clicking a link).
// - useLocation to read the "secret note" about where the user came from.
import { useParams, useNavigate, useLocation } from 'react-router-dom'; 

// Import the data file containing all project details.
import { projects } from './projects';

// Import icons for the buttons.
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaMagic, FaTimes, FaChevronDown } from 'react-icons/fa';

// React Hooks:
import { useEffect, useState } from 'react'; 

// Import styles.
import './App.css';

// Import your downloaded custom SVG file
import expandIcon from './assets/expand.svg'; 

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
  
  // Initialize location to read the state passed from the previous page
  const location = useLocation();
  
  // Create a state variable to track if the exit animation is running.
  const [isExiting, setIsExiting] = useState(false); 

  // AI STATE VARIABLES
  const [aiText, setAiText] = useState('');       // Stores the text as it gets typed out
  const [isTyping, setIsTyping] = useState(false); // Prevents clicking the button twice

  // IMAGE EXPAND STATE
  // Tracks whether the full-screen image modal is open or closed
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  // ACCORDION STATE
  // Instead of true/false, we track the NAME of the open section. 
  // If it's null, all are closed.
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Helper function to toggle accordions cleanly
  const toggleAccordion = (sectionName) => {
      // If clicking the one that's already open, close it (set to null). Otherwise, open the new one.
      setActiveAccordion(prev => prev === sectionName ? null : sectionName);
  };

  // -- SCROLL TO TOP --
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // -- NAVIGATION HANDLER --
  const handleBackClick = (e) => {
    e.preventDefault(); 
    setIsExiting(true); 
    
    // Check the secret note. If they came from 'all-projects', send them there. Otherwise, default to Home.
    const destination = location.state?.from === 'all-projects' ? '/all-projects' : '/#projects';

    setTimeout(() => {
        navigate(destination);
    }, 500);
  };

  // SIMULATE AI TYPING FUNCTION (Fixed "Missing First Letter" Bug)
  const handleAskAI = () => {
    if (isTyping || aiText) return; 
    setIsTyping(true);
    
    // Safety check: ensure text exists
    const textToType = project.aiAnalysis || "AI Analysis unavailable for this project.";
    
    setAiText(""); // Clear first

    let i = -1; // Start at -1 so the first increment goes to 0

    const typingInterval = setInterval(() => {
        i++; // Increment first: -1 -> 0 (First letter)
        
        if (i < textToType.length) {
            // Append the character at current index
            setAiText(prev => prev + textToType.charAt(i));
        } else {
            // Finished
            clearInterval(typingInterval);
            setIsTyping(false);
        }
    }, 20); 
  };

  // -- SAFETY CHECK --
  if (!project) {
    return <div className="project-page-container"><h1>Project not found</h1></div>;
  }

  // GROUPING LOGIC FOR TECH STACK
  // This automatically sorts your flat array into categorized groups based on projects.js
  const groupedTechStack = project.techStack?.reduce((groups, tech) => {
      const category = tech.category || "Tools & Platforms"; // Fallback if you forget to add a category
      if (!groups[category]) {
          groups[category] = [];
      }
      groups[category].push(tech);
      return groups;
  }, {}) || {};

  // ====================================================================
  // 3. RENDER (HTML STRUCTURE)
  // ====================================================================
  return (
    <div className={`project-page-container ${isExiting ? 'slide-out' : ''}`}>
      
      {/* --- NAVBAR --- */}
      <nav className="project-nav">
        {/* Update href fallback to match the dynamic destination */}
        <a 
            href={location.state?.from === 'all-projects' ? "/all-projects" : "/#projects"} 
            onClick={handleBackClick} 
            className="back-link" 
            style={{cursor: 'pointer'}}
        >
            <FaArrowLeft /> Back to {location.state?.from === 'all-projects' ? 'Project Archive' : 'Portfolio'}
        </a>
      </nav>

      <div className="project-content">
        
        {/* --- HERO SECTION --- */}
        <div className="project-hero">
            <h1 className="project-title">{project.title}</h1>
            
            {/* Wrapped the image in a relative container for the expand button */}
            <div className="project-hero-image-wrapper" style={{ position: 'relative' }}>
                {/* 👇 FIX: Added explicit dimensions to prevent Layout Shifts */}
                <img 
                    src={project.modalImage || project.image} 
                    alt={project.title} 
                    className="project-hero-image" 
                    onClick={() => setIsImageExpanded(true)}
                    style={{cursor: 'zoom-in'}}
                    width="1200"
                    height="675"
                />
                
                {/* The Corner Expand Button */}
                {/* 👇 FIX: Added aria-label for accessibility */}
                <button 
                    className="expand-btn"
                    onClick={() => setIsImageExpanded(true)}
                    title="View Fullscreen"
                    aria-label="Expand image fullscreen"
                >
                    <img src={expandIcon} alt="Expand" className="custom-expand-icon" />
                </button>
            </div>

            <div className="project-links">
                {project.link && (
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn"
                        aria-label={`View live demo for ${project.title}`}
                    >
                        View Live <FaExternalLinkAlt style={{marginLeft:'8px'}}/>
                    </a>
                )}
                {project.repoLink && (
                    <a 
                        href={project.repoLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn outline-btn"
                        aria-label={`View GitHub repository for ${project.title}`}
                    >
                        GitHub Repo <FaGithub style={{marginLeft:'8px'}}/>
                    </a>
                )}
            </div>
        </div>

        {/* Divider Line */}
        <hr className="divider"/>

        {/* AI ANALYSIS SECTION */}
        <div className="project-details" style={{marginBottom: '3rem', display: 'block'}}> 
            {/* We use a separate block container for the AI box so it spans full width */}
            <div style={{
                width: '100%', 
                background: 'rgba(255,255,255,0.03)', 
                padding: '2rem', 
                borderRadius: '15px', 
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap'}}>
                    <h3 style={{margin: 0, color: '#a0aec0', border: 'none'}}>AI Summary (Simple English)</h3>
                    
                    {/* Only show button if text hasn't started yet */}
                    {!aiText && (
                        <button 
                            onClick={handleAskAI} 
                            className="btn sm-btn" 
                            style={{display: 'flex', alignItems: 'center', gap: '8px'}}
                        >
                            <FaMagic /> Generate Analysis
                        </button>
                    )}
                </div>
                
                {/* The Output Box (Typewriter Effect) */}
                <div style={{
                    minHeight: '60px', 
                    fontFamily: 'monospace', 
                    color: '#4a90e2', 
                    lineHeight: '1.6',
                    fontSize: '1rem'
                }}>
                    {aiText}
                    {/* Blinking Cursor */}
                    {isTyping && <span className="cursor-blink">|</span>}
                </div>
            </div>
        </div>

        {/* --- DETAILS SECTION --- */}
        <div className="project-details">
            
            {/* Mutually Exclusive Accordions */}
            <div className="details-text">
                
                {/* 1. ABOUT ACCORDION */}
                {project.about && (
                    <div className={`overview-dropdown ${activeAccordion === 'about' ? 'open' : ''}`} style={{marginBottom: '1.5rem'}}>
                        <div 
                            className="overview-header" 
                            onClick={() => toggleAccordion('about')}
                            style={{cursor: 'pointer'}}
                        >
                            <h3>About The Project</h3>
                            <FaChevronDown className={`overview-chevron ${activeAccordion === 'about' ? 'rotated' : ''}`} />
                        </div>
                        <div className="overview-content">
                            <p style={{whiteSpace: 'pre-line'}}>{project.about}</p>
                        </div>
                    </div>
                )}

                {/* 2. TECHNICAL ARCHITECTURE ACCORDION */}
                {project.technical && (
                    <div className={`overview-dropdown ${activeAccordion === 'technical' ? 'open' : ''}`} style={{marginBottom: '1.5rem'}}>
                        <div 
                            className="overview-header" 
                            onClick={() => toggleAccordion('technical')}
                            style={{cursor: 'pointer'}}
                        >
                            <h3>Technical Architecture</h3>
                            <FaChevronDown className={`overview-chevron ${activeAccordion === 'technical' ? 'rotated' : ''}`} />
                        </div>
                        <div className="overview-content">
                            <p style={{whiteSpace: 'pre-line'}}>{project.technical}</p>
                        </div>
                    </div>
                )}

                {/* 3. FALLBACK OVERVIEW (Only shows if the others are missing) */}
                {!project.about && !project.technical && project.fullDescription && (
                    <div className={`overview-dropdown ${activeAccordion === 'overview' ? 'open' : ''}`} style={{marginBottom: '1.5rem'}}>
                        <div 
                            className="overview-header" 
                            onClick={() => toggleAccordion('overview')}
                            style={{cursor: 'pointer'}}
                        >
                            <h3>Overview</h3>
                            <FaChevronDown className={`overview-chevron ${activeAccordion === 'overview' ? 'rotated' : ''}`} />
                        </div>
                        <div className="overview-content">
                            <p style={{whiteSpace: 'pre-line'}}>{project.fullDescription}</p>
                        </div>
                    </div>
                )}

            </div>
            
            {/* Categorized Tech Stack Grid */}
            {Object.keys(groupedTechStack).length > 0 && (
                <div className="details-tech">
                    <h3>Technologies Used</h3>
                    <div className="tech-categories-container">
                        {Object.entries(groupedTechStack).map(([category, techs]) => (
                            <div key={category} className="tech-category-block">
                                <h4>{category}</h4>
                                <div className="tech-stack-grid">
                                    {techs.map((tech, index) => (
                                        <div key={index} className="tech-badge-small">
                                            {/* 👇 FIX: Added explicit dimensions to prevent layout shifts */}
                                            <img src={tech.icon} alt={tech.name} loading="lazy" width="50" height="50" />
                                            <span>{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* FULLSCREEN IMAGE MODAL */}
      {/* This only renders if isImageExpanded is true */}
      {isImageExpanded && (
          <div className="image-modal-overlay" onClick={() => setIsImageExpanded(false)}>
              
              {/* 👇 FIX: Added aria-label for accessibility */}
              <button 
                  className="close-modal-btn" 
                  onClick={() => setIsImageExpanded(false)}
                  aria-label="Close fullscreen image"
              >
                  <FaTimes />
              </button>
              
              {/* 👇 FIX: Added explicit dimensions to prevent Layout Shifts */}
              <img 
                  src={project.modalImage || project.image} 
                  alt={`${project.title} Fullscreen`} 
                  className="image-modal-content" 
                  onClick={(e) => e.stopPropagation()} // Prevents click on image from closing the modal
                  width="1920"
                  height="1080"
              />
          </div>
      )}

    </div>
  );
}