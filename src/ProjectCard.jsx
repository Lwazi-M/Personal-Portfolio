import './App.css'

export default function ProjectCard({ title, description, image, onViewMore }) {
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
        {/* Show a shorter version of description on the card */}
        <p>{description.substring(0, 80)}...</p>
        
        <div className="card-buttons">
            {/* Opens the modal */}
            <button onClick={onViewMore} className="btn sm-btn">
                View More
            </button>
        </div>
      </div>
    </div>
  )
}