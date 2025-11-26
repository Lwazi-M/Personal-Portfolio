import { useState, useEffect } from 'react'
import Lanyard from './Lanyard'
import Overlay from './Overlay'
import './App.css'

function App() {
  const [isMobile, setIsMobile] = useState(false)
  
  // 1. Theme State Initialization (Read from localStorage or default to 'dark')
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Default to 'dark' if no saved theme is found
    return savedTheme || 'dark';
  });

  // 2. Global Theme Toggle Function
  const toggleTheme = () => {
      setTheme(currentTheme => currentTheme === 'dark' ? 'light' : 'dark');
  };
  
  // 3. Effect to enforce theme: Apply data-theme attribute to <body> and save to localStorage
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px matches CSS breakpoint
    }
    
    // Check on load
    checkMobile()
    
    // Check on resize
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  

  return (
    <div className="App">
      {/* Pass the toggle function and current theme down to Overlay */}
      <Overlay theme={theme} toggleTheme={toggleTheme} />
      
      {/* Only render 3D Lanyard if NOT on mobile */}
      {!isMobile && (
        <Lanyard 
            position={[0, 0, 10]} // PRESERVING YOUR POSITION
            gravity={[0, -40, 0]} 
            theme={theme} // 👈 PASS THE THEME DOWN TO LANYARD
        />
      )}
    </div>
  )
}

export default App