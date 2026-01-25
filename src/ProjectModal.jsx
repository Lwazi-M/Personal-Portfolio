// ====================================================================
// 1. IMPORTS
// ====================================================================
// useState: Tracks data (like if the modal is currently closing).
// useEffect: Runs code when the modal opens or closes (used for scroll locking).
import { useState, useEffect } from 'react';

// Icons for the Close button, GitHub link, and Live Demo link.
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// Import CSS for styling the modal popup.
import './App.css';

// ====================================================================
// 2. PROJECT MODAL COMPONENT
// This component receives two "props" (inputs):
// - project: The data object containing title, description, images, etc.
// - onClose: A function provided by the parent to actually remove this modal.
// ====================================================================
export default function ProjectModal({ project, onClose }) {
  
  // -- STATE: IS CLOSING? --
  // We need this state to play the "Exit Animation" (fade out/slide down).
  // If we just unmounted the component immediately, it would disappear instantly.
  const [isClosing, setIsClosing] = useState(false);

  // -- SCROLL LOCKING --
  // This useEffect runs ONCE when the modal opens (mounts).
  useEffect(() => {
    // 1. Lock scrolling on the main browser body so the background doesn't move.
    document.body.style.overflow = 'hidden';
    
    // 2. The Cleanup Function:
    // This runs automatically when the modal is closed (unmounted).
    // It restores scrolling so the user isn't stuck.
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // -- CLOSE HANDLER --
  // This function starts the closing process.
  const handleClose = () => {
    // 1. Tell React "We are closing now", which triggers the CSS 'close' animation class.
    setIsClosing(true);
    
    // 2. SAFETY FALLBACK: 
    // Sometimes CSS animations fail to fire the 'onAnimationEnd' event.
    // This timer forces the modal to close after 550ms (slightly longer than the 500ms animation)
    // just in case the browser misses the event.
    setTimeout(() => {
        onClose();
    }, 550); 
  };

  // -- ANIMATION END HANDLER --
  // This event fires exactly when the CSS animation finishes.
  const onAnimationEnd = () => {
    // Only actually remove the modal (call onClose) if we were in the closing state.
    if (isClosing) {
      onClose();
    }
  };

  // -- OVERLAY CLICK HANDLER --
  // Detects if the user clicked the dark background (Overlay) vs the white box (Modal).
  const handleOverlayClick = (e) => {
    // If the element clicked has the class 'popup-overlay', it means they clicked outside.
    if (e.target.classList.contains('popup-overlay')) {
      handleClose();
    }
  };

  // -- SAFETY CHECK --
  // If for some reason 'project' data is missing, don't render anything (prevent crashes).
  if (!project) return null;

  // ====================================================================
  // 3. RENDER (HTML STRUCTURE)
  // ====================================================================
  return (
    // The Section is the full-screen overlay.
    // We dynamically add the 'close' or 'open' class based on state.
    <section 
      className={`popup-overlay ${isClosing ? 'close' : 'open'}`} 
      onAnimationEnd={onAnimationEnd} // Listens for CSS animation finish
      onClick={handleOverlayClick}    // Listens for clicks on the background
    >
      
      {/* The Wrapper is the actual visible Modal Box. 
          onClick={e => e.stopPropagation()} prevents a click inside the box 
          from bubbling up to the overlay and closing the modal.
      */}
      <div className="container-wrapper" onClick={(e) => e.stopPropagation()}>
        
        {/* --- STICKY HEADER --- */}
        {/* Keeps the title and close button visible even if you scroll down long text */}
        <div className="modal-head">
            <h2 className="modal-title">{project.title}</h2>
            
            {/* The "X" Button */}
            <div className="closeModalButton" onClick={handleClose}>
                <FaTimes size={22} />
            </div>
        </div>

        {/* --- SCROLLABLE BODY --- */}
        {/* This area scrolls if the content is too long for the screen */}
        <div className="modal-body">
            
            {/* Image Section */}
            <div className="image-wrapper">
                {/* Checks if there is a specific 'modalImage', otherwise falls back to the main 'image' */}
                <img 
                    src={project.modalImage || project.image} 
                    alt={project.title} 
                    className="modal-image-preview" 
                />
            </div>

            {/* Content Section: Description & Action Buttons */}
            <div className="content-wrapper">
                <p className="modal-description">{project.description}</p>
                
                <div className="modal-actions">
                    
                    {/* CONDITIONAL RENDERING: Live Link 
                        Only renders this button if project.link exists (is true/not empty) 
                    */}
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn modal-btn">
                            View Live <FaExternalLinkAlt />
                        </a>
                    )}

                    {/* CONDITIONAL RENDERING: Repo Link 
                        Only renders this button if project.repoLink exists
                    */}
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