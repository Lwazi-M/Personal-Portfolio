// ====================================================================
// 1. IMAGE ASSET IMPORTS
// ====================================================================
// In React/Vite, we import images like variables.
// This ensures that when the site is built, the images are optimized
// and placed in the correct folder automatically.

// Project Screenshots & Logos
import project1Img from './assets/37917.webp' 
import studyConnectLogo from './assets/studyconnect.webp'
import studyConnectScreen from './assets/studyconnectapp.webp'
import humblecoffeeLogo from './assets/humblecoffee.png'
import humblecoffeeScreen from './assets/humblecoffee-screen.png'
import atomicLedgerLogo from './assets/atomic-ledger.jpg'
import atomicLedgerScreen from './assets/atomic-ledger-screen.png'

// Tech Stack Icons
import htmlIcon from './assets/html.svg'
import cssIcon from './assets/css.svg'
import jsIcon from './assets/javascript.svg'
import gitIcon from './assets/git.svg'
import reactIcon from './assets/react-native.svg'
import tailwindIcon from './assets/tailwindcss.svg'
import typescriptIcon from './assets/typescript.svg'
import nextjsIcon from './assets/next.js.svg'
import javaIcon from './assets/java.svg'
import springBootIcon from './assets/spring-boot.svg' 
import postgresIcon from './assets/postgresql.svg'
import dockerIcon from './assets/docker.svg'

// ====================================================================
// 2. PROJECT DATA ARRAY
// ====================================================================
// This array is the "Single Source of Truth" for your portfolio.
// The ProjectPage.jsx and Overlay.jsx files loop through this array
// to generate the cards and detail pages dynamically.

export const projects = [
  
  // --- PROJECT 1: Atomic Ledger ---
  {
    id: 'atomic-ledger',
    title: 'Atomic Ledger',
    category: "Backend API",
    shortDescription: 'A secure financial transaction dashboard built with a Java Spring Boot N-Tier architecture.',
    aiAnalysis: "Atomic Ledger demonstrates advanced backend engineering capabilities. The architecture leverages Java 21 and Spring Boot 3 to execute a clean N-Tier design, separating concerns between API routing, business logic, external AI integrations, and database persistence. The implementation of in-memory caching for third-party API calls drastically reduces latency. Furthermore, the use of Dependency Injection for thread safety and environment variables for secrets management highlights a strong command of enterprise-level security and scalability principles.",
    fullDescription: `Atomic Ledger is a comprehensive financial application that simulates real-world banking infrastructure through a strict N-Tier Layered Design. 

The architecture includes:
• A RESTful API Presentation Layer that intercepts HTTP requests and deserializes JSON payloads.
• A core Business Logic Layer that acts as the central orchestrator, executing pre-condition fraud checks and account-based routing.
• An Integration Layer that constructs synchronous HTTP requests to the Google Gemini API for intelligent transaction categorization, optimized with an in-memory caching abstraction layer for instant retrieval.
• A robust Data Access Layer utilizing Spring Data JPA and Hibernate to map objects to a PostgreSQL relational database, ensuring ACID compliance.

The system was developed with Java 21 and Spring Boot 3, employing constructor-based Dependency Injection for immutability and the "12-Factor App" methodology to secure credentials via environment variables. Everything is containerized via Docker for reliable deployment.`,
    
    image: atomicLedgerLogo, 
    modalImage: atomicLedgerScreen, 
    
    link: 'https://your-render-url-here.onrender.com', // Update with your live Render link
    repoLink: 'https://github.com/Lwazi-M/atomic-ledger', 
    
    techStack: [
      { name: 'Java', icon: javaIcon },
      { name: 'Spring Boot', icon: springBootIcon },
      { name: 'PostgreSQL', icon: postgresIcon },
      { name: 'Docker', icon: dockerIcon }
    ]
  },

  // --- PROJECT 2: StudyConnect ---
  {
    id: "studyconnect",
    title: "StudyConnect",
    category: "Web App",
    shortDescription: "A comprehensive student connection platform built for educational resource management.",
    aiAnalysis: "Analysis: Think of this as a social network designed strictly for studying. Its purpose is to solve the isolation students feel when studying alone. It helps by instantly connecting you with classmates, allowing you to share notes, chat, and form study groups so no one has to struggle with difficult modules on their own.",
    fullDescription: `StudyConnect was born from a simple realization: students often feel isolated and frustrated when wrestling with tough academic concepts late at night. 
    
    The Mission:
    Our goal is to bridge the gap between students and academic success. We turn lonely study struggles into shared victories by allowing students to:
    • Connect: Instantly chat with peers tackling the same modules.
    • Share: Access a "Resource Hub" treasure chest of notes and past papers.
    • Collaborate: Join study groups to organize sessions and defeat procrastination.

    The Evolution (v1.0 to v2.0):
    The original StudyConnect was a native Android application built with Java and Firebase to ensure real-time performance. 
    
    However, to solve the challenge of accessibility and remove the barrier of APK downloads, StudyConnect 2.0 evolves into a Progressive Web App (PWA). We migrated to a modern stack using Next.js (React), TypeScript, and Tailwind CSS. 
    
    This version features a custom "Digital Phone" chassis with Glassmorphism aesthetics, simulating a premium native mobile experience that runs instantly in any web browser.`,
    image: studyConnectLogo,
    modalImage: studyConnectScreen, 
    link: "https://studyconnect-lovat.vercel.app/",
    repoLink: "https://github.com/Lwazi-M/studyconnect-2.0",
    techStack: [
      { name: "TypeScript", icon: typescriptIcon },
      { name: "CSS", icon: cssIcon },
      { name: "Javascript", icon: jsIcon },
      { name: "Git", icon: gitIcon }
    ]
  },

  // --- PROJECT 3: Humble Coffee ---
  {
    id: "humble-coffee",
    title: "Humble Coffee",
    category: "E-Commerce",
    shortDescription: "A high-performance e-commerce application featuring dynamic pricing logic and real-time inventory.",
    aiAnalysis: "Analysis: This is a digital storefront for a premium coffee brand. The goal was to make buying specialized coffee online as easy as walking into a shop. It helps customers by allowing them to pick the exact weight of coffee they want (like 250g or 1kg) and automatically updates the price, all while working super fast on mobile phones so you don't use up all your data.",
    fullDescription: `The Challenge:
    To design and build a modern digital storefront for an artisanal coffee brand that reflects their premium in-store atmosphere while solving complex e-commerce challenges—specifically non-linear product pricing (e.g., 1kg vs 250g bags) and mobile performance constraints.

    The Solution:
    I built a full-stack application using Next.js 14 and Supabase. Unlike standard templates, I engineered a custom pricing algorithm to handle specific product variants (Gift Cards vs. Weighted Coffee).
    I implemented a "Performance First" hero section that intelligently swaps heavy video backgrounds for optimized WebP images on mobile devices, significantly improving Core Web Vitals.

    Key Features:
    • Advanced Cart Logic: Custom global state management with LocalStorage persistence.
    • Dynamic Pricing Engine: Backend logic that parses non-standard product variants.
    • Adaptive Media: Responsive media loading for optimal mobile data usage.
    • Real-Time Database: Connected to Supabase (PostgreSQL) for live inventory.`,
    image: humblecoffeeLogo,
    modalImage: humblecoffeeScreen, 
    link: "https://humblecoffee-shop.vercel.app/",
    repoLink: "https://github.com/Lwazi-M/humble-coffee-redesign",
    techStack: [
        { name: "Next.js", icon: nextjsIcon },
        { name: "TypeScript", icon: typescriptIcon },
        { name: "Tailwind CSS", icon: tailwindIcon },
        { name: "Git", icon: gitIcon }
    ]
  },

  // --- PROJECT 4 (Placeholder) ---
  {
    id: "project-4",
    title: "Project",
    category: "In Development",
    shortDescription: "Coming Soon",
    aiAnalysis: "Analysis: This project is currently being built. Check back soon to see how it solves real-world problems!",
    fullDescription: "This project is currently under development. Detailed specifications will be updated upon completion.",
    image: project1Img,
    modalImage: project1Img,
    link: null,      
    repoLink: null,  
    techStack: []
  },

  // --- PROJECT 5 (Placeholder) ---
  {
    id: "project-5",
    title: "Project",
    category: "In Development",
    shortDescription: "Coming Soon",
    aiAnalysis: "Analysis: This project is currently being built. Check back soon to see how it solves real-world problems!",
    fullDescription: "This project is currently under development. Detailed specifications will be updated upon completion.",
    image: project1Img,
    modalImage: project1Img,
    link: null,      
    repoLink: null,  
    techStack: []
  },

  // --- PROJECT 6 (Placeholder) ---
  {
    id: "project-6",
    title: "Project",
    category: "In Development",
    shortDescription: "Coming Soon",
    aiAnalysis: "Analysis: This project is currently being built. Check back soon to see how it solves real-world problems!",
    fullDescription: "This project is currently under development. Detailed specifications will be updated upon completion.",
    image: project1Img,
    modalImage: project1Img,
    link: null,      
    repoLink: null,  
    techStack: []
  }
];