// ====================================================================
// 1. IMAGE ASSET IMPORTS
// ====================================================================
// In React/Vite, we import images like variables.
// This ensures that when the site is built, the images are optimized
// and placed in the correct folder automatically.

// Project Screenshots & Logos
import project1Img from './assets/37917.webp' 
import assetCompassLogo from './assets/assetCompassLogo.webp' 
import assetCompassScreen from './assets/assetCompassScreen.webp' 
import studyConnectLogo from './assets/studyconnect.webp'
import studyConnectScreen from './assets/studyconnectapp.webp'
import humblecoffeeLogo from './assets/humblecoffee.png'
import humblecoffeeScreen from './assets/humblecoffee-screen.webp'
import atomicLedgerLogo from './assets/atomic-ledger.jpg'
import atomicLedgerScreen from './assets/atomic-ledger-screen.png'
import loansysLogo from './assets/loansystemlogo.webp'
import loansysScreen from './assets/loansystem-screen.webp'

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
import pythonIcon from './assets/python.svg'
import sqliteIcon from './assets/sqlite.svg'

// ====================================================================
// 2. MANUAL TECH STACK (Shows up on Home Page regardless of projects)
// ====================================================================
// 👇 NEW: This array allows you to manually force any technology to appear 
// in your Home Page tech stack, even if it's not listed inside a specific project.
export const manualTechStack = [
  { name: 'HTML', icon: htmlIcon },
  { name: 'CSS', icon: cssIcon },
  { name: 'JavaScript', icon: jsIcon },
  { name: 'React', icon: reactIcon },
  { name: 'Python', icon: pythonIcon }
];

// ====================================================================
// 3. PROJECT DATA ARRAY
// ====================================================================
// This array is the "Single Source of Truth" for your portfolio.
// The ProjectPage.jsx and Overlay.jsx files loop through this array
// to generate the cards and detail pages dynamically.

export const projects = [
  
  // --- PROJECT 1: Asset Compass ---
  {
    id: 'asset-compass',
    title: "Asset Compass",
    category: "Full-Stack FinTech",
    shortDescription: "A professional financial tracking dashboard featuring real-time market data and secure stateless authentication.",
    aiAnalysis: "Analysis: Think of this as a digital control center for personal wealth. Instead of checking ten different apps to see how your stocks or savings are doing, this app brings it all together in one clear dashboard. The standout feature is its 'safety net'—if the live stock market data provider crashes or limits access, the app automatically switches to backup data, ensuring the user is never left staring at a broken screen.",
    fullDescription: `Asset Compass is a comprehensive financial tracking platform designed to help users monitor their net worth across various asset classes in real-time.

The architecture is built on a modern, decoupled stack:
• Frontend: A responsive, dark-themed dashboard built with Next.js 15, Tailwind CSS, and Recharts for interactive data visualization.
• Backend: A robust Java Spring Boot API utilizing Spring Security for stateless JWT authentication and Spring Data JPA for data persistence.
• Database: Hosted on Neon (Serverless PostgreSQL) with customized HikariCP connection pooling to handle idle timeouts gracefully.

Key Engineering Highlights:
• Real-Time Market Data: Integrated with the AlphaVantage API to fetch live stock prices and foreign exchange rates (USD/ZAR).
• Resilient Design (Circuit Breaker): Engineered a custom fallback mechanism. If the third-party financial API hits its rate limit, the backend seamlessly catches the exception and serves deterministic mock data, ensuring the user experience is never interrupted.
• Automated Audit Trail: Every asset purchase and price refresh automatically generates an immutable transaction log, powering the historical performance charts.`,
    image: assetCompassLogo,
    modalImage: assetCompassScreen,
    link: 'https://asset-compass-beta.vercel.app',       
    repoLink: 'https://github.com/Lwazi-M/asset-compass',  
    techStack: [
      { name: 'Next.js', icon: nextjsIcon },
      { name: 'TypeScript', icon: typescriptIcon },
      { name: 'Tailwind CSS', icon: tailwindIcon },
      { name: 'Java', icon: javaIcon },
      { name: 'Spring Boot', icon: springBootIcon },
      { name: 'PostgreSQL', icon: postgresIcon }
    ]
  },

  // --- PROJECT 2: Atomic Ledger ---
  {
    id: 'atomic-ledger',
    title: 'Atomic Ledger',
    category: "Backend API",
    shortDescription: 'A secure financial transaction dashboard built with a Java Spring Boot N-Tier architecture.',
    aiAnalysis: "Analysis: This project focuses on the invisible engine that powers modern banking. It's essentially the 'traffic controller' for money, ensuring every transaction goes exactly where it needs to safely and instantly. I built it using strict, enterprise-level rules so that even if thousands of transactions happen at once, the system remains secure, organized, and lightning-fast—partly by 'remembering' common requests to save time.",
    fullDescription: `Atomic Ledger is a comprehensive financial application that simulates real-world banking infrastructure through a strict N-Tier Layered Design. 

The architecture includes:
• A RESTful API Presentation Layer that intercepts HTTP requests and deserializes JSON payloads.
• A core Business Logic Layer that acts as the central orchestrator, executing pre-condition fraud checks and account-based routing.
• An Integration Layer that constructs synchronous HTTP requests to the Google Gemini API for intelligent transaction categorization, optimized with an in-memory caching abstraction layer for instant retrieval.
• A robust Data Access Layer utilizing Spring Data JPA and Hibernate to map objects to a PostgreSQL relational database, ensuring ACID compliance.

The system was developed with Java 21 and Spring Boot 3, employing constructor-based Dependency Injection for immutability and the "12-Factor App" methodology to secure credentials via environment variables. Everything is containerized via Docker for reliable deployment.`,
    
    image: atomicLedgerLogo, 
    modalImage: atomicLedgerScreen, 
    
    link: 'http://206.189.57.159:8080/',
    repoLink: 'https://github.com/Lwazi-M/atomic-ledger', 
    
    techStack: [
      { name: 'Java', icon: javaIcon },
      { name: 'Spring Boot', icon: springBootIcon },
      { name: 'PostgreSQL', icon: postgresIcon },
      { name: 'Docker', icon: dockerIcon }
    ]
  },

  // --- PROJECT 3: StudyConnect ---
  {
    id: "studyconnect",
    title: "StudyConnect",
    category: "Web App",
    shortDescription: "A comprehensive student connection platform built for educational resource management.",
    aiAnalysis: "Analysis: This is essentially a specialized social network built just for studying. It solves the isolation students often feel by instantly connecting them with classmates taking the same courses. Users can share notes, chat, and form study groups online, ensuring no one has to struggle through difficult modules alone.",
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

  // --- PROJECT 4: Humble Coffee ---
  {
    id: "humble-coffee",
    title: "Humble Coffee",
    category: "E-Commerce",
    shortDescription: "A high-performance e-commerce application featuring dynamic pricing logic and real-time inventory.",
    aiAnalysis: "Analysis: This is a digital storefront designed to make buying premium coffee online feel as seamless as ordering in a cafe. The main challenge was handling complex pricing—like changing the cost automatically if a customer chooses a 1kg bag instead of a 250g bag. It's also optimized to load incredibly fast on mobile devices, preventing users from wasting mobile data while browsing.",
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

  // --- PROJECT 5: FinTech Loan Scorer ---
  {
    id: "project-5",
    title: "FinTech Loan Scorer",
    category: "Full-Stack FinTech",
    shortDescription: "A credit risk assessment engine featuring weighted scoring logic and high-traffic stress testing.",
    aiAnalysis: "Analysis: Imagine a bank's 'invisible brain' that decides who gets a loan in seconds. Instead of a human looking at a single number, this app acts like a digital scale. On one side, it weighs your history of paying bills; on the other, it weighs how much money you have left after expenses. I built this to be 'stress-proof'—meaning it can handle a huge rush of thousands of people applying at the exact same time without slowing down or making a mistake. It’s essentially an automated, high-speed security guard for a bank's money.",
    fullDescription: `The FinTech Loan Scorer is a high-performance credit assessment engine designed to replicate the rigorous risk-analysis workflows used by major South African financial institutions like Investec and Discovery Bank.

    The system is built on a modern, decoupled full-stack architecture:
    • Frontend: A dark-themed React.js interface featuring a dynamic, real-time 'Risk Gauge' and specialized CSS transitions that provide immediate visual feedback on applicant eligibility.
    • Backend: A high-concurrency Python API built with FastAPI, implementing strict input sanitization and business logic to prevent 'garbage data' from influencing financial decisions.
    • Database: An SQLite persistence layer that maintains an immutable audit trail of every loan decision, ensuring data integrity for future reporting and compliance.

    Key Engineering Highlights:
    • Weighted Scoring Algorithm: Engineered a complex heuristic engine that balances Credit History (60% weight) against Debt-to-Income (DTI) ratios (40%) to generate a nuanced Financial Health Score out of 100.
    • Resilience & Stress Testing: Developed a custom automated testing utility (stress_test.py) to simulate high-traffic scenarios, successfully processing 100+ concurrent API requests without a single failure or drop in response time.
    • Self-Healing Infrastructure: Implemented an asynchronous 'lifespan' event in the FastAPI backend that automatically creates necessary SQL table structures upon cloud deployment, ensuring zero-configuration scalability on platforms like Railway.
    • Secure Coding: Utilized SQL placeholders to mitigate SQL Injection risks and implemented CORS middleware to secure cross-origin communication between the Vercel-hosted UI and the Railway-hosted API.`,
    image: loansysLogo,
    modalImage: loansysScreen,
    link: 'https://mini-fintech-loan-system.vercel.app/',       
    repoLink: 'https://github.com/Lwazi-M/mini-fintech-loan-system',  
    techStack: [
        { name: "React", icon: reactIcon },
        { name: "Python", icon: pythonIcon },
        { name: "JavaScript", icon: jsIcon },
        { name: "HTML", icon: htmlIcon }, 
        { name: "Git", icon: gitIcon },
        { name: "SQLite", icon: sqliteIcon } 
    ]
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
  },

  // --- PROJECT 7 (Placeholder) ---
  {
    id: "project-7",
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

    // --- PROJECT 8 (Placeholder) ---
  {
    id: "project-8",
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

    // --- PROJECT 9 (Placeholder) ---
  {
    id: "project-9",
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