import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { projects } from './projects';
import './App.css'; // Re-use styles

export default function AllProjects() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    window.scrollTo(0, 0); // Start at top
  }, []);

  // 1. Get unique tech stacks for filter buttons
  const allTech = ['All', ...new Set(projects.flatMap(p => p.techStack.map(t => t.name)))];

  // 2. Filter Logic
  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === 'All' || project.techStack.some(t => t.name === filter);
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) || 
                          project.shortDescription.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="project-page-container">
      
      {/* Nav */}
      <nav className="project-nav">
        <Link to="/#projects" className="back-link">
            <FaArrowLeft /> Back Home
        </Link>
      </nav>

      <div className="project-content" style={{width: '90%', maxWidth: '1200px'}}>
        
        {/* Hero Title */}
        <div style={{textAlign: 'center', margin: '4rem 0 3rem 0'}}>
            <h1 className="project-title" style={{fontSize: '3rem'}}>All Projects</h1>
            <p style={{color: '#aaa'}}>A complete archive of my development work.</p>
        </div>

        {/* --- CONTROLS SECTION (Search & Filter) --- */}
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '2rem', 
            marginBottom: '4rem' 
        }}>
            {/* Search Bar */}
            <div className="input-box" style={{marginTop: 0, width: '100%', maxWidth: '400px'}}>
                <input 
                    type="text" 
                    placeholder="Search projects..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{paddingLeft: '1.5rem'}}
                />
            </div>

            {/* Filter Pills */}
            <div className="tech-container" style={{gap: '0.8rem'}}>
                {allTech.map(tech => (
                    <button 
                        key={tech}
                        onClick={() => setFilter(tech)}
                        className={`btn sm-btn ${filter === tech ? 'active-filter' : 'outline-btn'}`}
                        style={{
                            backgroundColor: filter === tech ? 'white' : 'transparent',
                            color: filter === tech ? 'black' : 'white',
                            borderRadius: '20px',
                            textTransform: 'none'
                        }}
                    >
                        {tech}
                    </button>
                ))}
            </div>
        </div>

        {/* --- GRID --- */}
        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div className="project-card" key={index}>
                  <div className="card-image-container">
                      <img src={project.image} alt={project.title} className="card-image" />
                  </div>
                  <div className="card-content">
                      <h3>{project.title}</h3>
                      <p>{project.shortDescription}</p>
                      <div className="card-buttons">
                          <Link to={`/project/${project.id}`} className="btn sm-btn">View More</Link>
                      </div>
                  </div>
              </div>
            ))
          ) : (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#666'}}>
                <h3>No projects found matching that filter.</h3>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}