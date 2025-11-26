import { useState } from 'react'
// Assuming `npm install react-icons` has been run for these imports
import { FaGithub, FaLinkedin, FaEnvelope, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa'; 
import './App.css'

// IMPORTANT: Ensure these files exist in src/assets/
import htmlIcon from './assets/html.png'
import cssIcon from './assets/css.png'
import jsIcon from './assets/javascript.png'
import gitIcon from './assets/git.png'
import pythonIcon from './assets/python.png'
import educationIcon from './assets/education.png'
import project1Img from './assets/37917.jpeg' 
import profileImg from './assets/Me-Profile.jpeg' 

// Ensure ProjectCard.jsx exists in the same folder (src/)
import ProjectCard from './ProjectCard'

const projects = [
  {
    title: "Project 1",
    description: "Coming Soon",
    image: project1Img, 
    link: null,
    repoLink: null
  },
  {
    title: "Project 2",
    description: "Coming Soon",
    image: project1Img,
    link: null,
    repoLink: null
  },
  {
    title: "Project 3",
    description: "Coming Soon",
    image: project1Img,
    link: null,
    repoLink: null
  }
]

export default function Overlay() {
  const [userEmail, setUserEmail] = useState('')
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile Menu State

  // Toggle mobile menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Close menu when navigating (important for mobile UX)
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };


  // Toggle Logic (For now, just switches icon, complex 3D lighting switch is Level 6)
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    // Note: The actual global CSS switch and 3D scene lighting switch needs global state management (out of scope for this turn, but planned!)
    alert("Theme toggle functionality is currently toggling the icon only. Full site theme switch is coming soon!");
  };

  const handleContactSubmit = () => {
    if (userEmail) {
        const subject = "Portfolio Contact";
        const body = `Hi Lwazi, I was viewing your portfolio and I would love to connect. From: ${userEmail}`;
        window.location.href = `mailto:nhlamhlongo.work@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
        alert("⚠️ Please enter your email first.");
    }
  }

  return (
    <div className="overlay">
      
      {/* HEADER */}
      <header className="header">
        <a href="#" className="logo">Lwazi Mhlongo</a>
        
        {/* HAMBURGER ICON (Visible on Mobile) */}
        <div className="mobile-menu-icon" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        {/* NAVIGATION LINKS (Desktop & Mobile Menu) */}
        {/* Added dynamic class for mobile menu activation */}
        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#about" onClick={handleNavClick}>About</a>
          <a href="#projects" onClick={handleNavClick}>Projects</a>
          <a href="#contact" onClick={handleNavClick}>Contact</a>
        </nav>

        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
             <button className="visit-btn" onClick={() => window.open('https://github.com/Lwazi-M', '_blank')}>
              Visit Github
            </button>
            {/* THEME TOGGLE ICON (Desktop) */}
            <div onClick={toggleTheme} className="theme-toggle-desktop" style={{display: 'flex', alignItems: 'center',cursor: 'pointer', color: 'white', fontSize: '1.4rem'}}>
                {theme === 'dark' ? <FaMoon /> : <FaSun />}
            </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-section">
        
        {/* STATIC IMAGE (Visible only on Mobile via CSS) */}
        <img src={profileImg} alt="Profile" className="mobile-profile-img" />

        <div className="hero-content">
          <h3>Hello, I'm</h3>
          <h1>Nhlanzeko Lwazi Mhlongo</h1>
          <p className="subtitle">
            Welcome to my portfolio! I am a Junior Software Engineer creating innovative solutions.
            <br /> 
            {/* Hide instruction on mobile since 3D is hidden */}
            <span className="instruction" style={{color: '#4a90e2', display: 'inline-block'}}>(Try dragging the lanyard!)</span>
          </p>
          <div className="btn-group">
            <button className="btn">Resume / CV</button>
            <a href="#contact" className="btn">Contact</a>
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
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="projects-section">
        <h2 className="section-title">Recent Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard 
                key={index} 
                title={project.title} 
                description={project.description} 
                image={project.image} 
                link={project.link}
                repoLink={project.repoLink}
            />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <h2 className="section-title">Get in Touch</h2>
        <p className="subtitle" style={{textAlign: 'center'}}>
            Enter your email below to send me a message!
        </p>

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

        {/* ICONS */}
        <div className="socials">
             <a href="mailto:nhlamhlongo.work@gmail.com" title="Email Me" className="social-icon"><FaEnvelope /></a>
             <a href="https://linkedin.com/in/nhlamhlongo" target="_blank" rel="noopener" className="social-icon"><FaLinkedin /></a>
             <a href="https://github.com/Lwazi-M" target="_blank" rel="noopener" className="social-icon"><FaGithub /></a>
        </div>
      </section>
      
    </div>
  )
}