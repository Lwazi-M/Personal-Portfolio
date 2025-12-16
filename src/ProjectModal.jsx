import { useState, useEffect } from 'react';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './App.css';

export default function ProjectModal({ project, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Lock scrolling on the body while modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    
    // SAFETY FALLBACK: If CSS animation fails to trigger onAnimationEnd,
    // this timeout ensures the modal still closes after 500ms.
    setTimeout(() => {
        onClose();
    }, 550); 
  };

  // This usually handles the close, but the timer above is the backup plan
  const onAnimationEnd = () => {
    if (isClosing) {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup-overlay')) {
      handleClose();
    }
  };

  if (!project) return null;

  return (
    <section 
      className={`popup-overlay ${isClosing ? 'close' : 'open'}`} 
      onAnimationEnd={onAnimationEnd}
      onClick={handleOverlayClick}
    >
      <div className="container-wrapper" onClick={(e) => e.stopPropagation()}>
        
        {/* Sticky Header */}
        <div className="modal-head">
            <h2 className="modal-title">{project.title}</h2>
            <div className="closeModalButton" onClick={handleClose}>
                <FaTimes size={22} />
            </div>
        </div>

        {/* Scrollable Body */}
        <div className="modal-body">
            
            {/* Image Section */}
            <div className="image-wrapper">
                <img 
                    src={project.modalImage || project.image} 
                    alt={project.title} 
                    className="modal-image-preview" 
                />
            </div>

            {/* Description & Buttons */}
            <div className="content-wrapper">
                <p className="modal-description">{project.description}</p>
                
                <div className="modal-actions">
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn modal-btn">
                            View Live <FaExternalLinkAlt />
                        </a>
                    )}
                    {project.repoLink && (
                        <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="btn outline-btn modal-btn">
                            View Repo <FaGithub />
                        </a>
                    )}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}