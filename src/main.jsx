// ====================================================================
// 1. IMPORTS
// ====================================================================

// Import 'StrictMode' from the core React library.
// StrictMode is a helper that checks for potential problems in your app during development.
import { StrictMode } from 'react'

// Import 'createRoot' from the React DOM library.
// This is the function that tells React: "Take control of this specific HTML element."
import { createRoot } from 'react-dom/client'

// Import global styles.
// This applies the CSS rules from index.css to the entire application immediately.
import './index.css'

// Import the main App component.
// This is the "Mother" component that contains your Lanyard, Overlay, and everything else.
import App from './App.jsx'

// ====================================================================
// 2. MOUNTING THE APP
// ====================================================================

// Step 1: Find the HTML element with the id 'root'.
// If you look at your index.html file, you will see a <div id="root"></div>.
// This is where React will inject all your code.
createRoot(document.getElementById('root')).render(
  
  // Step 2: Wrap the App in StrictMode.
  // NOTE: StrictMode causes your components to render TWICE in development (on your local computer).
  // This is intentional! It helps catch bugs with side effects (like animations or data fetching).
  // It does NOT run twice when you deploy to the live internet.
  <StrictMode>
    
    {/* Step 3: Render the Main App Component */}
    <App />
    
  </StrictMode>,
)