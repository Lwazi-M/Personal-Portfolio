import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'; 
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa'; 
import './App.css'
import { projects } from './projects'; 

// Images
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

export default function Overlay() { 
  const [userEmail, setUserEmail] = useState('')
  const [userMessage, setUserMessage] = useState('') 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [activeSection, setActiveSection] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const navRef = useRef(null);
  const [navBubbleStyle, setNavBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [hoverBubbleStyle, setHoverBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdaneony"; 
  const location = useLocation();

  // 1. SCROLL SPY LOGIC
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const offset = windowHeight * 0.3; 

      const aboutSection = document.getElementById('about');
      const projectsSection = document.getElementById('projects');
      const contactSection = document.getElementById('contact');

      if (contactSection && scrollY + offset >= contactSection.offsetTop) {
        setActiveSection('contact');
      } else if (projectsSection && scrollY + offset >= projectsSection.offsetTop) {
        setActiveSection('projects');
      } else if (aboutSection && scrollY + offset >= aboutSection.offsetTop) {
        setActiveSection('about');
      } else {
        setActiveSection('home');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. ACTIVE BUBBLE POSITIONING LOGIC (With Resize Listener)
  useEffect(() => {
    const updateBubblePosition = () => {
      if (activeSection === 'home') {
          setNavBubbleStyle(prev => ({ ...prev, opacity: 0 }));
      } else {
          const navEl = navRef.current;
          if (navEl) {
              const activeLink = navEl.querySelector(`a[href="#${activeSection}"]`);
              if (activeLink) {
                  setNavBubbleStyle({
                      left: activeLink.offsetLeft,
                      width: activeLink.offsetWidth,
                      opacity: 1
                  });
              }
          }
      }
    };

    // Run immediately
    updateBubblePosition();

    // Run on resize to keep bubble aligned
    window.addEventListener('resize', updateBubblePosition);
    return () => window.removeEventListener('resize', updateBubblePosition);

  }, [activeSection, isMenuOpen]); 

  // 3. HOVER LOGIC
  const handleMouseEnter = (e) => {
    const { offsetLeft, offsetWidth } = e.currentTarget;
    setHoverBubbleStyle({ left: offsetLeft, width: offsetWidth, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setHoverBubbleStyle(prev => ({ ...prev, opacity: 0 }));
  };

  useEffect(() => {
    if (location.hash === '#projects') {
      const element = document.getElementById('projects');
      if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
    }
  }, [location]);

  const toggleMenu = () => { setIsMenuOpen(!isMenuOpen); };
  
  const scrollToSection = (id) => {
    setIsMenuOpen(false); 
    const element = document.getElementById(id);
    if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
  };

  const scrollToTop = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault(); 
    if (!userEmail || !userMessage) { alert("Please fill in both your email and a message."); return; }
    setIsSubmitting(true);
    try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail, message: userMessage })
        });
        if (response.ok) {
            setIsSubmitting(false); setIsSuccess(true);     
            setUserEmail(''); setUserMessage('');
            setTimeout(() => { setIsSuccess(false); }, 3000);
        } else { setIsSubmitting(false); alert("Oops! There was a problem sending your form."); }
    } catch (error) { setIsSubmitting(false); alert("Oops! There was a network error."); }
  }

  const getButtonClass = () => {
    if (isSubmitting) return 'loading';
    if (isSuccess) return 'success';
    return '';
  };

  return (
    <div className="overlay">
      <header className="header">
        <a href="#" className={`logo ${activeSection === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
            Lwazi Mhlongo
        </a>
        <div className="mobile-menu-icon" onClick={toggleMenu}>{isMenuOpen ? <FaTimes /> : <FaBars />}</div>
        
        <div className={`nav-wrap ${isMenuOpen ? 'active' : ''}`}>
            <nav className="nav" ref={navRef} onMouseLeave={handleMouseLeave}>
                {/* JS Bubbles */}
                <div className="bubble active" style={{ left: navBubbleStyle.left, width: navBubbleStyle.width, opacity: navBubbleStyle.opacity }}></div>
                <div className="bubble hover" style={{ left: hoverBubbleStyle.left, width: hoverBubbleStyle.width, opacity: hoverBubbleStyle.opacity }}></div>
                
                <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} onMouseEnter={handleMouseEnter}>About</a>
                <a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} onMouseEnter={handleMouseEnter}>Projects</a>
                <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} onMouseEnter={handleMouseEnter}>Contact</a>
            </nav>
        </div>

        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
             <button className="visit-btn" onClick={() => window.open('https://github.com/Lwazi-M', '_blank')}>Visit Github</button>
        </div>
      </header>

      <section className="hero-section">
        <img src={profileImg} alt="Profile" className="mobile-profile-img" />
        <div className="hero-content">
          <h3>Hello, I'm</h3>
          <h1>Nhlanzeko Lwazi Mhlongo</h1>
          <p className="subtitle">Welcome to my portfolio! I am a Junior Software Engineer creating innovative solutions.<br /><span className="instruction" style={{color: '#4a90e2', display: 'inline-block'}}>(Try dragging the lanyard!)</span></p>
          <div className="btn-group">
            <button className="btn" onClick={() => alert("My Resume is currently being updated. Please check back soon!")}>Resume / CV</button>
            <button className="btn" onClick={() => scrollToSection('contact')}>Contact</button>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <h2 className="section-title">About Me</h2>
        <div className="about-grid">
          <div className="card">
            <img src={educationIcon} alt="Education" loading="lazy" style={{height: '40px', marginBottom: '1rem'}}/>
            <h3>Education</h3>
            <p><strong>Eduvos</strong></p>
            <p>B.Sc. Information Technology<br/>(Software Engineering)</p>
            <br/>
            <a href="https://allqs.saqa.org.za/showQualification.php?id=120690" target="_blank" className="link-text" style={{color: '#4a90e2'}}>View Qualification</a>
          </div>
          <div className="card">
            <h3>My Tech Stack</h3>
            <div className="tech-container">
              <div className="tech-badge"><img src={htmlIcon} alt="HTML" loading="lazy"/><span>HTML</span></div>
              <div className="tech-badge"><img src={cssIcon} alt="CSS" loading="lazy"/><span>CSS</span></div>
              <div className="tech-badge"><img src={jsIcon} alt="JS" loading="lazy"/><span>JavaScript</span></div>
              <div className="tech-badge"><img src={gitIcon} alt="Git" loading="lazy"/><span>Git</span></div>
              <div className="tech-badge"><img src={pythonIcon} alt="Python" loading="lazy"/><span>Python</span></div>
              <div className="tech-badge"><img src={reactIcon} alt="React" loading="lazy"/><span>React</span></div>
              <div className="tech-badge"><img src={typescriptIcon} alt="TypeScript" loading="lazy"/><span>TypeScript</span></div>
              <div className="tech-badge"><img src={tailwindIcon} alt="Tailwind" loading="lazy"/><span>Tailwind</span></div>
              <div className="tech-badge"><img src={nextjsIcon} alt="Nextjs" loading="lazy"/><span>Next JS</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section">
        <h2 className="section-title">Recent Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
                <div className="card-image-container">
                    {project.image ? (
                    <img src={project.image} alt={project.title} className="card-image" loading="lazy" />
                    ) : (
                    <div className="card-placeholder"></div>
                    )}
                </div>
                <div className="card-content">
                    <h3>{project.title}</h3>
                    <p>{project.shortDescription}</p>
                    <div className="card-buttons">
                        {(project.link || project.repoLink) ? (
                            <Link to={`/project/${project.id}`} className="btn sm-btn">View More</Link>
                        ) : (
                            <button className="btn sm-btn" disabled style={{opacity: 0.5, cursor: 'not-allowed', borderColor: '#555', color: '#555'}}>Coming Soon</button>
                        )}
                    </div>
                </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2 className="section-title">Get in Touch</h2>
        <form className="input-box" onSubmit={handleContactSubmit}>
            <input type="email" placeholder="Your Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
            <textarea className="message-box" placeholder="Your Message..." value={userMessage} onChange={(e) => setUserMessage(e.target.value)} required />
            <button type="submit" className={`kk-submit-container ${getButtonClass()}`} disabled={isSubmitting || isSuccess}>
                <svg width="196" height="70" viewBox="0 0 196 70">
                    <rect className="btn-shape btn-bg" x="3" y="3" width="190" height="64" rx="32" ry="32" />
                    <rect className="btn-shape btn-color" x="3" y="3" width="190" height="64" rx="32" ry="32" />
                    <text className="kk-check" x="96" y="42" textAnchor="middle">✔</text>
                    <text className="kk-text" x="96" y="42" textAnchor="middle">Send Message</text>
                </svg>
            </button>
        </form>
        <div className="socials">
             <a href="mailto:nhlamhlongo.work@gmail.com" title="Email Me" className="social-icon"><FaEnvelope /></a>
             <a href="https://linkedin.com/in/nhlamhlongo" target="_blank" rel="noopener" className="social-icon"><FaLinkedin /></a>
             <a href="https://github.com/Lwazi-M" target="_blank" rel="noopener" className="social-icon"><FaGithub /></a>
        </div>
      </section>
    </div>
  )
}