// =========================================
// 1. IMPORTS
// =========================================
// 👇 FIX: Added Suspense and lazy for Performance Phase 3
import { useState, useEffect, Suspense, lazy } from 'react'

// 👇 FIX: Use HashRouter to prevent 404 errors on GitHub Pages
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import custom components (Home page needs to load instantly)
import Lanyard from './Lanyard'       
import Overlay from './Overlay'       

// 👇 FIX: Lazy Load extra pages so they don't block the initial load
const ProjectPage = lazy(() => import('./ProjectPage'));
const AllProjects = lazy(() => import('./AllProjects'));

// Import global styles
import './App.css'

// =========================================
// 2. CONTENT COMPONENT
// =========================================
function Content() {
  
  // -- STATE MANAGEMENT --
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation(); 

  // -- SCREEN SIZE LISTENER --
  useEffect(() => {
    const checkMobile = () => {
      const isSmallScreen = window.innerWidth < 1200;
      setIsMobile(prev => (prev === isSmallScreen ? prev : isSmallScreen));
    }
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []); 

  // -- LOGIC: 3D VISIBILITY --
  const isDesktop = !isMobile;
  const isHome = location.pathname === '/';

  // -- RENDER HTML --
  return (
    // 👇 FIX: Replaced <> with <main> for Accessibility Phase 1 (Landmarks)
    <main>
      
      {/* 👇 FIX: Suspense wrapper catches the lazy-loaded pages while they download */}
      <Suspense fallback={<div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Overlay />} />
          <Route path="/all-projects" element={<AllProjects />} />
          <Route path="/project/:id" element={<ProjectPage />} />
        </Routes>
      </Suspense>

      {/* PERFORMANCE FIX:
          We keep the Lanyard mounted on Desktop but toggle its visibility.
      */}
      {isDesktop && (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            // 👇 CRITICAL: Set to 0 so it is visible above the background
            zIndex: 0, 
            // 👇 VISIBILITY TOGGLE: Hide it when not on home
            opacity: isHome ? 1 : 0,
            // 👇 CLICK FIX: When hidden, let clicks pass through to the buttons below
            pointerEvents: isHome ? 'auto' : 'none', 
            transition: 'opacity 0.5s ease'
        }}>
            <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} />
        </div>
      )}
    </main>
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