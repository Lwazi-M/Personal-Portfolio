import './App.css'
// Make sure these images are in your src/assets folder!
import htmlIcon from './assets/html.png'
import cssIcon from './assets/css.png'
import jsIcon from './assets/javascript.png'
import gitIcon from './assets/git.png'
import pythonIcon from './assets/python.png'
import educationIcon from './assets/education.png'

export default function Overlay() {
  return (
    <div className="overlay">
      {/* --- HEADER --- */}
      <header className="header">
        <a href="#" className="logo">Lwazi Mhlongo</a>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="visit-btn" onClick={() => window.open('https://github.com/Lwazi-M', '_blank')}>
          Visit Github
        </button>
      </header>

      {/* --- SECTION 1: HERO --- */}
      <section className="hero-section">
        <div className="hero-content">
          <h3>Hello, I'm</h3>
          <h1>Nhlanzeko Lwazi Mhlongo</h1>
          <p className="subtitle">
            Welcome to my portfolio! I am a passionate developer with a keen interest in creating innovative solutions.
            <br /> <span style={{color: '#4a90e2'}}>(Try dragging the lanyard!)</span>
          </p>
          <div className="btn-group">
            <button className="btn">Download CV</button>
            <a href="#contact" className="btn">Contact</a>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: ABOUT --- */}
      <section id="about" className="about-section">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-grid">
          {/* Education Card */}
          <div className="card">
            <img src={educationIcon} alt="Education" style={{height: '40px', marginBottom: '1rem'}}/>
            <h3>Education</h3>
            <p><strong>Eduvos</strong></p>
            <p>B.Sc. Information Technology<br/>(Software Engineering)</p>
            <br/>
            <a href="https://allqs.saqa.org.za/showQualification.php?id=120690" target="_blank" style={{color: '#4a90e2'}}>View Qualification</a>
          </div>

          {/* Tech Stack Card */}
          <div className="card">
            <h3>My Tech Stack</h3>
            <div className="tech-container">
              <div className="tech-badge"><img src={htmlIcon} alt="HTML"/><span>HTML</span></div>
              <div className="tech-badge"><img src={cssIcon} alt="CSS"/><span>CSS</span></div>
              <div className="tech-badge"><img src={jsIcon} alt="JavaScript"/><span>JavaScript</span></div>
              <div className="tech-badge"><img src={gitIcon} alt="Git"/><span>Git</span></div>
              <div className="tech-badge"><img src={pythonIcon} alt="Python"/><span>Python</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: Projects (Placeholder for now) --- */}
      <section id="projects" style={{ height: '100vh' }}>
        <h2 className="section-title">Projects Coming Soon...</h2>
      </section>

    </div>
  )
}