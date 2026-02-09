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

  // -- LOGIC: WHEN TO SHOW THE 3D LANYARD --
  // We only want the heavy 3D element to appear if:
  // 1. !isMobile: The user is on a large screen (Desktop/Tablet).
  // 2. location.pathname === '/': The user is on the Home page.
  const showLanyard = !isMobile && location.pathname === '/';

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

      {/* CONDITIONAL RENDERING:
          We load the Lanyard normally here. No Suspense wrapper to avoid the crash.
      */}
      {showLanyard && (
        <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} />
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