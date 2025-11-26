import './App.css'

export default function ProjectCard({ title, description, image, link, repoLink }) {
  return (
    <div className="project-card">
      <div className="card-image-container">
        {image ? (
          <img src={image} alt={title} className="card-image" />
        ) : (
          <div className="card-placeholder"></div>
        )}
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="card-buttons">
            {/* Live Demo Button */}
            {link && (
                <a href={link} target="_blank" rel="noopener noreferrer" className="btn sm-btn">
                    Live Demo
                </a>
            )}
            {/* View Repo Button */}
             {repoLink && (
                <a href={repoLink} target="_blank" rel="noopener noreferrer" className="btn sm-btn outline-btn">
                    View Repo
                </a>
            )}
        </div>
      </div>
    </div>
  )
}