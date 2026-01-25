// =========================================
// 1. IMPORTS
// =========================================
import { useState, useEffect } from 'react'

// React Router handles navigation between pages without reloading the browser.
// BrowserRouter: The main wrapper that enables routing.
// Routes: A container for all your individual page definitions.
// Route: Defines a specific URL path and what component to show.
// useLocation: A "Hook" that tells us which URL we are currently on.
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import your custom components
import Lanyard from './Lanyard'       // The 3D Physics Card
import Overlay from './Overlay'       // The Main Portfolio UI (Home)
import ProjectPage from './ProjectPage' // The Detail Page for specific projects

// Import global styles
import './App.css'

// =========================================
// 2. CONTENT COMPONENT
// =========================================
// We define this inner component because 'useLocation' ONLY works if it is 
// used *inside* the <Router> component. We cannot use it in the main App() 
// function because App() is the one *creating* the Router.
function Content() {
  
  // -- STATE MANAGEMENT --
  // useState creates a variable 'isMobile' that triggers a re-render when changed.
  // false = default assumption is desktop.
  const [isMobile, setIsMobile] = useState(false)
  
  // -- URL TRACKING --
  // This hook gives us the 'location' object.
  // location.pathname tells us the current path (e.g., "/" or "/project/1")
  const location = useLocation(); 

  // -- SCREEN SIZE LISTENER --
  // useEffect runs code when the component mounts (loads) for the first time.
  useEffect(() => {
    
    // Function to check window width
    const checkMobile = () => {
      // 1200px is the breakpoint we set in App.css for tablet/desktop views.
      const isSmallScreen = window.innerWidth < 1200;

      // OPTIMIZATION: Only update state if the value actually changes.
      // If we are already in mobile mode, and we resize but stay small,
      // we don't want to trigger a re-render.
      setIsMobile(prev => (prev === isSmallScreen ? prev : isSmallScreen));
    }
    
    // Run the check immediately when page loads
    checkMobile();

    // Add an "Event Listener" to the window. 
    // Whenever the user resizes the browser, 'checkMobile' runs.
    window.addEventListener('resize', checkMobile);

    // CLEANUP FUNCTION:
    // When this component is removed (unmounted), we remove the listener
    // so we don't cause memory leaks or errors.
    return () => window.removeEventListener('resize', checkMobile);
  }, []); // Empty dependency array [] means this runs once on mount.

  // -- LOGIC: WHEN TO SHOW THE 3D LANYARD --
  // We only want the heavy 3D element to appear if:
  // 1. !isMobile: The user is on a large screen (Desktop/Tablet).
  // 2. location.pathname === '/': The user is on the Home page, not a project page.
  const showLanyard = !isMobile && location.pathname === '/';

  // -- RENDER HTML --
  return (
    <>
      {/* <Routes> acts like a Switch statement. 
          It looks at the URL and renders the first matching <Route>.
      */}
      <Routes>
        
        {/* HOME PAGE: Shows the Overlay (Hero, About, Contact) */}
        <Route path="/" element={<Overlay />} />
        
        {/* DYNAMIC PROJECT PAGE:
            ":id" is a variable. It matches anything like:
            /project/studyconnect
            /project/weather-app
            The ProjectPage component can then read this "id".
        */}
        <Route path="/project/:id" element={<ProjectPage />} />
        
      </Routes>

      {/* CONDITIONAL RENDERING:
          The '&&' operator means: If 'showLanyard' is true, THEN render the <Lanyard />.
          If false, render nothing. This saves performance on mobile.
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
    // The Router must wrap the entire application so that Links and Routes work.
    <Router>
      <Content />
    </Router>
  )
}

export default App