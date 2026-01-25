// ====================================================================
// 1. IMPORTS
// ====================================================================
// Import global styles so the card looks correct (borders, shadows, etc.)
import './App.css'

// ====================================================================
// 2. PROJECT CARD COMPONENT
// This component represents a single box in your "Recent Projects" grid.
// It receives data via "props" (inputs) from the parent component.
// ====================================================================
export default function ProjectCard({ title, description, image, onViewMore }) {
  return (
    <div className="project-card">
      
      {/* --- IMAGE AREA --- */}
      <div className="card-image-container">
        {/* Conditional Rendering (Ternary Operator):
            Condition ? (If True) : (If False)
            
            1. Check if 'image' prop exists.
            2. If yes, render the <img /> tag.
            3. If no, render a generic <div className="card-placeholder" />.
        */}
        {image ? (
          <img src={image} alt={title} className="card-image" />
        ) : (
          <div className="card-placeholder"></div>
        )}
      </div>

      {/* --- TEXT CONTENT AREA --- */}
      <div className="card-content">
        <h3>{title}</h3>
        
        {/* Text Truncation:
            We don't want a long description breaking the card height.
            .substring(0, 80) takes characters from index 0 to 80.
            We add "..." at the end to show there is more to read.
        */}
        <p>{description.substring(0, 80)}...</p>
        
        <div className="card-buttons">
            {/* Button Action:
                When clicked, this fires the 'onViewMore' function passed 
                down from the parent component. This usually triggers 
                navigation to the Project Page.
            */}
            <button onClick={onViewMore} className="btn sm-btn">
                View More
            </button>
        </div>
      </div>
    </div>
  )
}