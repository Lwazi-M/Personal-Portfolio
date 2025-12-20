import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'; 
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa'; 
import './App.css'
import { projects } from './projects'; 

// Images for this component specifically (Icons & Profile)
import htmlIcon from './assets/html.png'
import cssIcon from './assets/css.png'
import jsIcon from './assets/javascript.webp'
import gitIcon from './assets/git.png'
import pythonIcon from './assets/python.webp'
import educationIcon from './assets/education.png'
import profileImg from './assets/Me-Profile.jpeg' 
import reactIcon from './assets/react.webp'
import tailwindIcon from './assets/tailwind.webp'
import typescriptIcon from './assets/typescript.png'
import nextjsIcon from './assets/nextjs.webp'

// ProjectCard Component
import ProjectCard from './ProjectCard'

export default function Overlay() { 
  const [userEmail, setUserEmail] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Handle scrolling to #projects when returning from detail page
  const location = useLocation();

  useEffect(() => {
    // If the URL has #projects, scroll to that section
    if (location.hash === '#projects') {
      const element = document.getElementById('projects');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // 👇 NEW: Smooth Scroll Function
  const scrollToSection = (id) => {
    setIsMenuOpen(false); // Close mobile menu first
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 👇 NEW: Scroll to Top Function (for Logo)
  const scrollToTop = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const handleContactSubmit = () => {
    if (userEmail) {
        const subject = "Portfolio Contact";
        const body = `Hi Lwazi, I was viewing your portfolio and I would love to connect. From: ${userEmail}`;
        window.location.href = `mailto:nhlamhlongo.work@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
        console.log("Error: Please enter your email first.");
    }
  }

  return (
    <div className="overlay">
      
      {/* HEADER */}
      <header className="header">
        {/* Logo now scrolls to top smoothly */}
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
            Lwazi Mhlongo
        </a>

        <div className="mobile-menu-icon" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Nav links use smooth scroll handler */}
        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
        </nav>

        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
             <button className="visit-btn" onClick={() => window.open('https://github.com/Lwazi-M', '_blank')}>
              Visit Github
            </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-section">
        <img src={profileImg} alt="Profile" className="mobile-profile-img" />
        <div className="hero-content">
          <h3>Hello, I'm</h3>
          <h1>Nhlanzeko Lwazi Mhlongo</h1>
          <p className="subtitle">
            Welcome to my portfolio! I am a Junior Software Engineer creating innovative solutions.
            <br /> 
            <span className="instruction" style={{color: '#4a90e2', display: 'inline-block'}}>(Try dragging the lanyard!)</span>
          </p>
          <div className="btn-group">
            {/* 👇 UPDATED: Added temporary alert for Resume button */}
            <button 
                className="btn" 
                onClick={() => alert("My Resume is currently being updated. Please check back soon!")}
            >
                Resume / CV
            </button>
            
            {/* Contact button now scrolls smoothly */}
            <button className="btn" onClick={() => scrollToSection('contact')}>Contact</button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <h2 className="section-title">About Me</h2>
        <div className="about-grid">
          <div className="card">
            <img src={educationIcon} alt="Education" style={{height: '40px', marginBottom: '1rem'}}/>
            <h3>Education</h3>
            <p><strong>Eduvos</strong></p>
            <p>B.Sc. Information Technology<br/>(Software Engineering)</p>
            <br/>
            <a href="https://allqs.saqa.org.za/showQualification.php?id=120690" target="_blank" className="link-text" style={{color: '#4a90e2'}}>View Qualification</a>
          </div>

          <div className="card">
            <h3>My Tech Stack</h3>
            <div className="tech-container">
              <div className="tech-badge"><img src={htmlIcon} alt="HTML"/><span>HTML</span></div>
              <div className="tech-badge"><img src={cssIcon} alt="CSS"/><span>CSS</span></div>
              <div className="tech-badge"><img src={jsIcon} alt="JS"/><span>JavaScript</span></div>
              <div className="tech-badge"><img src={gitIcon} alt="Git"/><span>Git</span></div>
              <div className="tech-badge"><img src={pythonIcon} alt="Python"/><span>Python</span></div>
              <div className="tech-badge"><img src={reactIcon} alt="React"/><span>React</span></div>
              <div className="tech-badge"><img src={typescriptIcon} alt="TypeScript"/><span>TypeScript</span></div>
              <div className="tech-badge"><img src={tailwindIcon} alt="Tailwind"/><span>Tailwind</span></div>
              <div className="tech-badge"><img src={nextjsIcon} alt="Nextjs"/><span>Next JS</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="projects-section">
        <h2 className="section-title">Recent Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
                <div className="card-image-container">
                    {project.image ? (
                    <img src={project.image} alt={project.title} className="card-image" />
                    ) : (
                    <div className="card-placeholder"></div>
                    )}
                </div>
                <div className="card-content">
                    <h3>{project.title}</h3>
                    <p>{project.shortDescription}</p>
                    
                    <div className="card-buttons">
                        {/* Only show button if there is a Repo or Live Link */}
                        {(project.link || project.repoLink) ? (
                            <Link to={`/project/${project.id}`} className="btn sm-btn">
                                View More
                            </Link>
                        ) : (
                            /* Optional: Render a disabled button */
                            <button className="btn sm-btn" disabled style={{opacity: 0.5, cursor: 'not-allowed', borderColor: '#555', color: '#555'}}>
                                Coming Soon
                            </button>
                        )}
                    </div>
                </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <h2 className="section-title">Get in Touch</h2>
        <div className="input-box">
            <input 
                type="email" 
                placeholder="example@domain.com" 
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
            />
            <button className="btn submit-btn" onClick={handleContactSubmit}>
                Send Message
            </button>
        </div>
        <div className="socials">
             <a href="mailto:nhlamhlongo.work@gmail.com" title="Email Me" className="social-icon"><FaEnvelope /></a>
             <a href="https://linkedin.com/in/nhlamhlongo" target="_blank" rel="noopener" className="social-icon"><FaLinkedin /></a>
             <a href="https://github.com/Lwazi-M" target="_blank" rel="noopener" className="social-icon"><FaGithub /></a>
        </div>
      </section>
      
    </div>
  )
}