import { useState } from 'react' // 👈 Added this for the form
import './App.css'
import htmlIcon from './assets/html.png'
import cssIcon from './assets/css.png'
import jsIcon from './assets/javascript.png'
import gitIcon from './assets/git.png'
import pythonIcon from './assets/python.png'
import educationIcon from './assets/education.png'
import project1Img from './assets/37917.jpeg' 
import ProjectCard from './ProjectCard'

const projects = [
  {
    title: "Project 3",
    description: "In Progress",
    image: project1Img, 
    link: null
  },
  {
    title: "Project 3",
    description: "In Progress",
    image: project1Img,
    link: null
  },
  {
    title: "Project 3",
    description: "In Progress",
    image: project1Img,
    link: null
  }
]

export default function Overlay() {
  // ⬇️ LOGIC FOR CONTACT FORM ⬇️
  const [userEmail, setUserEmail] = useState('')

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
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="visit-btn" onClick={() => window.open('https://github.com/Lwazi-M', '_blank')}>
          Visit Github
        </button>
      </header>

      {/* HERO */}
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
            <a href="https://allqs.saqa.org.za/showQualification.php?id=120690" target="_blank" className="link-text">View Qualification</a>
          </div>

          <div className="card">
            <h3>My Tech Stack</h3>
            <div className="tech-container">
              <div className="tech-badge"><img src={htmlIcon} alt="HTML"/><span>HTML</span></div>
              <div className="tech-badge"><img src={cssIcon} alt="CSS"/><span>CSS</span></div>
              <div className="tech-badge"><img src={jsIcon} alt="JS"/><span>JS</span></div>
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

        <div className="footer-links">
             <a href="mailto:nhlamhlongo.work@gmail.com" title="Email Me">Email</a>
             <span>|</span>
             <a href="https://linkedin.com/in/nhlamhlongo" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </section>
      
    </div>
  )
}