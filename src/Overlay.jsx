// ====================================================================
// 1. IMPORTS
// These lines bring in tools we need from other libraries.
// ====================================================================

// Hooks from React:
// - useState: Lets us store data that changes (like user input or menu status).
// - useEffect: Lets us run code automatically when something happens (like scrolling).
// - useRef: Lets us "grab" a specific HTML element to measure or control it.
import { useState, useEffect, useRef } from 'react'

// Tools from React Router for navigation:
// - Link: Creates clickable links that change the URL without reloading the page.
// - useLocation: Tells us which page/URL we are currently on.
import { Link, useLocation } from 'react-router-dom'; 

// Icons from the 'react-icons' library (FontAwesome pack).
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa'; 

// Import your custom styles and project data.
import './App.css'
import { projects } from './projects'; 

// ====================================================================
// 2. IMAGE IMPORTS
// We import images here so Vite can bundle them correctly for the website.
// ====================================================================
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

// ====================================================================
// 3. THE MAIN COMPONENT
// This function represents your entire Home Page (Overlay).
// ====================================================================
export default function Overlay() { 
  
  // -- STATE VARIABLES (Memory for the component) --
  // Stores what the user types in the contact form.
  const [userEmail, setUserEmail] = useState('')
  const [userMessage, setUserMessage] = useState('') 
  
  // Controls if the mobile menu is open (true) or closed (false).
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Tracks which section is currently visible on screen (home, about, projects, contact).
  const [activeSection, setActiveSection] = useState('home');

  // Tracks the status of the contact form submission (loading, success, or idle).
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // -- REFS & BUBBLE STATE --
  // 'navRef' lets us measure the exact width/position of the navigation bar.
  const navRef = useRef(null);
  
  // Stores the position (left) and size (width) for the sliding bubbles.
  const [navBubbleStyle, setNavBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [hoverBubbleStyle, setHoverBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Where your contact form sends data (Formspree service).
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdaneony"; 
  
  // Gets the current URL info.
  const location = useLocation();

  // ====================================================================
  // 4. SCROLL SPY LOGIC
  // This detects which section the user is looking at as they scroll.
  // ====================================================================
  useEffect(() => {
    const handleScroll = () => {
      // How far down the user has scrolled (in pixels).
      const scrollY = window.scrollY;
      
      // Calculate an "offset" (30% of screen height) so the highlight updates 
      // BEFORE the section hits the very top of the screen.
      const windowHeight = window.innerHeight;
      const offset = windowHeight * 0.3; 

      // Get the HTML elements for each section.
      const aboutSection = document.getElementById('about');
      const projectsSection = document.getElementById('projects');
      const contactSection = document.getElementById('contact');

      // Check positions:
      // If we scrolled past Contact, set active to 'contact'.
      if (contactSection && scrollY + offset >= contactSection.offsetTop) {
        setActiveSection('contact');
      } 
      // Else if past Projects, set to 'projects'.
      else if (projectsSection && scrollY + offset >= projectsSection.offsetTop) {
        setActiveSection('projects');
      } 
      // Else if past About, set to 'about'.
      else if (aboutSection && scrollY + offset >= aboutSection.offsetTop) {
        setActiveSection('about');
      } 
      // Otherwise, we must be at the top ('home').
      else {
        setActiveSection('home');
      }
    };
    
    // Attach the scroll listener to the window.
    window.addEventListener('scroll', handleScroll);
    
    // Run it once immediately to set the initial state.
    handleScroll(); 
    
    // Cleanup: Remove the listener when the component unmounts (prevents memory leaks).
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ====================================================================
  // 5. BUBBLE POSITIONING LOGIC
  // This calculates where the White "Active" Bubble should sit.
  // ====================================================================
  useEffect(() => {
    const updateBubblePosition = () => {
      // If we are at Home, hide the bubble (opacity: 0).
      if (activeSection === 'home') {
          setNavBubbleStyle(prev => ({ ...prev, opacity: 0 }));
      } else {
          // If we are in another section, calculate position.
          const navEl = navRef.current;
          if (navEl) {
              // Find the specific link (e.g., <a href="#about">) inside our nav.
              const activeLink = navEl.querySelector(`a[href="#${activeSection}"]`);
              if (activeLink) {
                  // Set the bubble's Left position and Width to match the link exactly.
                  setNavBubbleStyle({
                      left: activeLink.offsetLeft,
                      width: activeLink.offsetWidth,
                      opacity: 1 // Make it visible
                  });
              }
          }
      }
    };

    // Run immediately when activeSection changes.
    updateBubblePosition();

    // Also run whenever the window resizes (so the bubble doesn't get misplaced).
    window.addEventListener('resize', updateBubblePosition);
    
    // Cleanup listener on unmount.
    return () => window.removeEventListener('resize', updateBubblePosition);

  }, [activeSection, isMenuOpen]); // Runs whenever section changes or menu opens.

  // ====================================================================
  // 6. HOVER BUBBLE LOGIC
  // This handles the Grey Bubble that follows your mouse.
  // ====================================================================
  
  // When mouse enters a link: Move grey bubble to that link.
  const handleMouseEnter = (e) => {
    const { offsetLeft, offsetWidth } = e.currentTarget;
    setHoverBubbleStyle({ left: offsetLeft, width: offsetWidth, opacity: 1 });
  };

  // When mouse leaves the nav: Hide the grey bubble.
  const handleMouseLeave = () => {
    setHoverBubbleStyle(prev => ({ ...prev, opacity: 0 }));
  };

  // ====================================================================
  // 7. AUTO-SCROLL FOR BACK NAVIGATION
  // If you come back from a Project Page (e.g. /#projects), scroll there.
  // ====================================================================
  useEffect(() => {
    if (location.hash === '#projects') {
      const element = document.getElementById('projects');
      if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
    }
  }, [location]);

  // ====================================================================
  // 8. HELPER FUNCTIONS
  // ====================================================================

  // Toggles the mobile menu open/close.
  const toggleMenu = () => { setIsMenuOpen(!isMenuOpen); };
  
  // Scrolls smoothly to a specific ID (e.g., "contact") and closes menu.
  const scrollToSection = (id) => {
    setIsMenuOpen(false); 
    const element = document.getElementById(id);
    if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
  };

  // Scrolls smoothly to the very top of the page.
  const scrollToTop = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handles the form submission to Formspree.
  const handleContactSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading.
    
    // Validation: Ensure fields aren't empty.
    if (!userEmail || !userMessage) { alert("Please fill in both your email and a message."); return; }
    
    setIsSubmitting(true); // Start loading state.
    
    try {
        // Send data to Formspree using fetch API.
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail, message: userMessage })
        });
        
        // If success:
        if (response.ok) {
            setIsSubmitting(false); 
            setIsSuccess(true);     
            setUserEmail(''); // Clear form
            setUserMessage('');
            setTimeout(() => { setIsSuccess(false); }, 3000); // Reset success message after 3s
        } else { 
            setIsSubmitting(false); 
            alert("Oops! There was a problem sending your form."); 
        }
    } catch (error) { 
        setIsSubmitting(false); 
        alert("Oops! There was a network error."); 
    }
  }

  // Determines which class to add to the submit button (loading/success).
  const getButtonClass = () => {
    if (isSubmitting) return 'loading';
    if (isSuccess) return 'success';
    return '';
  };

  // ====================================================================
  // 9. RENDER (HTML STRUCTURE)
  // This is what actually appears on the screen.
  // ====================================================================
  return (
    <div className="overlay">
      
      {/* --- HEADER SECTION --- */}
      <header className="header">
        {/* Name Logo: Clicking it scrolls to top */}
        <a href="#" className={`logo ${activeSection === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
            Lwazi Mhlongo
        </a>

        {/* Mobile Hamburger Icon (Visible only on small screens) */}
        <div className="mobile-menu-icon" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        {/* --- NAVIGATION MENU (The Island) --- */}
        <div className={`nav-wrap ${isMenuOpen ? 'active' : ''}`}>
            {/* 'navRef' allows our Bubble Logic to measure this container */}
            <nav className="nav" ref={navRef} onMouseLeave={handleMouseLeave}>
                
                {/* 1. Active Bubble (White) */}
                <div 
                    className="bubble active" 
                    style={{ left: navBubbleStyle.left, width: navBubbleStyle.width, opacity: navBubbleStyle.opacity }}
                ></div>

                {/* 2. Hover Bubble (Grey) */}
                <div 
                    className="bubble hover" 
                    style={{ left: hoverBubbleStyle.left, width: hoverBubbleStyle.width, opacity: hoverBubbleStyle.opacity }}
                ></div>
                
                {/* Navigation Links */}
                <a 
                    href="#about" 
                    className={activeSection === 'about' ? 'active' : ''} 
                    onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} 
                    onMouseEnter={handleMouseEnter}
                >
                    About
                </a>
                <a 
                    href="#projects" 
                    className={activeSection === 'projects' ? 'active' : ''} 
                    onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} 
                    onMouseEnter={handleMouseEnter}
                >
                    Projects
                </a>
                <a 
                    href="#contact" 
                    className={activeSection === 'contact' ? 'active' : ''} 
                    onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} 
                    onMouseEnter={handleMouseEnter}
                >
                    Contact
                </a>
            </nav>
        </div>

        {/* Desktop "Visit Github" Button */}
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
             <button className="visit-btn" onClick={() => window.open('https://github.com/Lwazi-M', '_blank')}>
              Visit Github
            </button>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <img src={profileImg} alt="Profile" className="mobile-profile-img" />
        <div className="hero-content">
          <h3>Hello, I'm</h3>
          <h1>Nhlanzeko Lwazi Mhlongo</h1>
          <p className="subtitle">
            Welcome to my portfolio! I am a Junior Software Engineer creating innovative solutions.
            <br />
            <span className="instruction" style={{color: '#4a90e2', display: 'inline-block'}}>
                (Try dragging the lanyard!)
            </span>
          </p>
          <div className="btn-group">
            <button className="btn" onClick={() => alert("My Resume is currently being updated. Please check back soon!")}>
                Resume / CV
            </button>
            <button className="btn" onClick={() => scrollToSection('contact')}>Contact</button>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="about-section">
        <h2 className="section-title">About Me</h2>
        <div className="about-grid">
          
          {/* Education Card */}
          <div className="card">
            {/* loading="lazy" helps the page load faster by waiting until the image is needed */}
            <img src={educationIcon} alt="Education" loading="lazy" style={{height: '40px', marginBottom: '1rem'}}/>
            <h3>Education</h3>
            <p><strong>Eduvos</strong></p>
            <p>B.Sc. Information Technology<br/>(Software Engineering)</p>
            <br/>
            <a href="https://allqs.saqa.org.za/showQualification.php?id=120690" target="_blank" className="link-text" style={{color: '#4a90e2'}}>
                View Qualification
            </a>
          </div>

          {/* Tech Stack Card */}
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

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="projects-section">
        <h2 className="section-title">Recent Projects</h2>
        <div className="projects-grid">
          {/* Loop through the 'projects' array and create a card for each one */}
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
                        {/* Only show "View More" if there is a link, otherwise "Coming Soon" */}
                        {(project.link || project.repoLink) ? (
                            <Link to={`/project/${project.id}`} className="btn sm-btn">View More</Link>
                        ) : (
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

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="contact-section">
        <h2 className="section-title">Get in Touch</h2>
        <form className="input-box" onSubmit={handleContactSubmit}>
            {/* Email Input */}
            <input 
                type="email" 
                placeholder="Your Email" 
                value={userEmail} 
                onChange={(e) => setUserEmail(e.target.value)} 
                required 
            />
            {/* Message Input */}
            <textarea 
                className="message-box" 
                placeholder="Your Message..." 
                value={userMessage} 
                onChange={(e) => setUserMessage(e.target.value)} 
                required 
            />
            
            {/* Animated Submit Button */}
            <button 
                type="submit" 
                className={`kk-submit-container ${getButtonClass()}`} 
                disabled={isSubmitting || isSuccess}
            >
                <svg width="196" height="70" viewBox="0 0 196 70">
                    <rect className="btn-shape btn-bg" x="3" y="3" width="190" height="64" rx="32" ry="32" />
                    <rect className="btn-shape btn-color" x="3" y="3" width="190" height="64" rx="32" ry="32" />
                    <text className="kk-check" x="96" y="42" textAnchor="middle">✔</text>
                    <text className="kk-text" x="96" y="42" textAnchor="middle">Send Message</text>
                </svg>
            </button>
        </form>
        
        {/* Social Media Icons */}
        <div className="socials">
             <a href="mailto:nhlamhlongo.work@gmail.com" title="Email Me" className="social-icon"><FaEnvelope /></a>
             <a href="https://linkedin.com/in/nhlamhlongo" target="_blank" rel="noopener" className="social-icon"><FaLinkedin /></a>
             <a href="https://github.com/Lwazi-M" target="_blank" rel="noopener" className="social-icon"><FaGithub /></a>
        </div>
      </section>
    </div>
  )
}