import './App.css'

export default function ProjectCard({ title, description, image, link }) {
  return (
    <div className="project-card">
      <div className="card-image-container">
        {/* If we have an image, show it. If not, show a colorful placeholder */}
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
            {/* Only show the button if a link exists */}
            {link && (
                <a href={link} target="_blank" rel="noopener noreferrer" className="btn sm-btn">
                    View Project
                </a>
            )}
        </div>
      </div>
    </div>
  )
}