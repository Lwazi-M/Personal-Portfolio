import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lanyard from './Lanyard'
import Overlay from './Overlay' 
import ProjectPage from './ProjectPage' // 👈 Import the new page
import './App.css'

// We create a "Content" component so we can use the 'useLocation' hook
// (Hooks only work inside a Router, so we can't use them in the main App component directly)
function Content() {
  const [isMobile, setIsMobile] = useState(false)
  
  // Get the current URL path (e.g., "/" or "/project/studyconnect")
  const location = useLocation(); 

  useEffect(() => {
    // 1200px matches your CSS "Tablet/Desktop" breakpoint logic
    const checkMobile = () => setIsMobile(window.innerWidth < 1200)
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Logic: Only show the 3D Lanyard if we are on the Home Page ("/") AND not on mobile
  const showLanyard = !isMobile && location.pathname === '/';

  return (
    <>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Overlay />} />
        
        {/* Project Detail Page (Dynamic ID) */}
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>

      {/* Render Lanyard conditionally based on URL and screen size */}
      {showLanyard && (
        <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} />
      )}
    </>
  );
}

function App() {
  return (
    // The Router must wrap everything
    <Router>
      <Content />
    </Router>
  )
}

export default App