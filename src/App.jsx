// =========================================
// 1. IMPORTS
// =========================================
import { useState, useEffect } from 'react'

// React Router handles navigation between pages without reloading the browser.
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import your custom components DIRECTLY (No Lazy Loading to prevent crashes)
import Lanyard from './Lanyard'       // The 3D Physics Card
import Overlay from './Overlay'       // The Main Portfolio UI (Home)
import ProjectPage from './ProjectPage' // The Detail Page for specific projects
import AllProjects from './AllProjects' // The "View All" page

// Import global styles
import './App.css'

// =========================================
// 2. CONTENT COMPONENT
// =========================================
function Content() {
  
  // -- STATE MANAGEMENT --
  // false = default assumption is desktop.
  const [isMobile, setIsMobile] = useState(false)
  
  // -- URL TRACKING --
  const location = useLocation(); 

  // -- SCREEN SIZE LISTENER --
  useEffect(() => {
    
    // Function to check window width
    const checkMobile = () => {
      // 1200px is the breakpoint we set in App.css for tablet/desktop views.
      const isSmallScreen = window.innerWidth < 1200;

      // OPTIMIZATION: Only update state if the value actually changes.
      setIsMobile(prev => (prev === isSmallScreen ? prev : isSmallScreen));
    }
    
    // Run the check immediately when page loads
    checkMobile();

    // Add an "Event Listener" to the window. 
    window.addEventListener('resize', checkMobile);

    // CLEANUP FUNCTION:
    return () => window.removeEventListener('resize', checkMobile);
  }, []); 

  // -- LOGIC: 3D VISIBILITY --
  // 1. Is it a desktop? (If yes, we load the 3D engine)
  const isDesktop = !isMobile;

  // 2. Are we on the home page? (If yes, we show it. If no, we hide it but keep it loaded)
  const isHome = location.pathname === '/';

  // -- RENDER HTML --
  return (
    <>
      <Routes>
        
        {/* HOME PAGE */}
        <Route path="/" element={<Overlay />} />
        
        {/* ARCHIVE PAGE */}
        <Route path="/all-projects" element={<AllProjects />} />

        {/* DYNAMIC PROJECT PAGE */}
        <Route path="/project/:id" element={<ProjectPage />} />
        
      </Routes>

      {/* PERFORMANCE FIX:
          We only unmount (remove) the Lanyard if the user is on Mobile (to save battery).
          On Desktop, we keep it mounted but hide it using CSS opacity/visibility.
          This prevents the "Lag" caused by restarting the physics engine.
      */}
      {isDesktop && (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            // 👇 VISIBILITY TOGGLE instead of unmounting
            opacity: isHome ? 1 : 0,
            pointerEvents: isHome ? 'all' : 'none', // Prevents clicking when hidden
            transition: 'opacity 0.5s ease' // Smooth fade in/out
        }}>
            <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} />
        </div>
      )}
    </>
  );
}

// =========================================
// 3. MAIN APP COMPONENT
// =========================================
function App() {
  return (
    <Router>
      <Content />
    </Router>
  )
}

export default App