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
// 👇 Added FaMagic for the AI button
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaMagic } from 'react-icons/fa';

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
  const [isExiting, setIsExiting] = useState(false); 

  // 👇 NEW: AI STATE VARIABLES
  const [aiText, setAiText] = useState('');       // Stores the text as it gets typed out
  const [isTyping, setIsTyping] = useState(false); // Prevents clicking the button twice

  // -- SCROLL TO TOP --
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // -- NAVIGATION HANDLER --
  const handleBackClick = (e) => {
    e.preventDefault(); 
    setIsExiting(true); 
    setTimeout(() => {
        navigate('/#projects');
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

  // ====================================================================
  // 3. RENDER (HTML STRUCTURE)
  // ====================================================================
  return (
    <div className={`project-page-container ${isExiting ? 'slide-out' : ''}`}>
      
      {/* --- NAVBAR --- */}
      <nav className="project-nav">
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
            
            <img 
                src={project.modalImage || project.image} 
                alt={project.title} 
                className="project-hero-image" 
                // NOTE: No loading="lazy" here because this is "Above the Fold" (immediately visible)
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

        {/* Divider Line */}
        <hr className="divider"/>

        {/* 👇 NEW: AI ANALYSIS SECTION */}
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
            
            {/* Text Description */}
            <div className="details-text">
                <h3>Overview</h3>
                <p style={{whiteSpace: 'pre-line'}}>{project.fullDescription}</p>
            </div>
            
            {/* Tech Stack Grid */}
            {project.techStack.length > 0 && (
                <div className="details-tech">
                    <h3>Technologies Used</h3>
                    <div className="tech-stack-grid">
                        {project.techStack.map((tech, index) => (
                            <div key={index} className="tech-badge-small">
                                {/* 👇 ADDED loading="lazy" HERE */}
                                <img src={tech.icon} alt={tech.name} loading="lazy" />
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