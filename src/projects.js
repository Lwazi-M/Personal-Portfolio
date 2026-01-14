// Import Project Images
import project1Img from './assets/37917.webp' 
import studyConnectLogo from './assets/studyconnect.webp'
import studyConnectScreen from './assets/studyconnectapp.webp'
import humblecoffeeLogo from './assets/humblecoffee.png'
import humblecoffeeScreen from './assets/humblecoffee-screen.png'

// Import Icons 
import htmlIcon from './assets/html.png'
import cssIcon from './assets/css.png'
import jsIcon from './assets/javascript.webp'
import gitIcon from './assets/git.png'
import reactIcon from './assets/react.webp'
import tailwindIcon from './assets/tailwind.webp'
import typescriptIcon from './assets/typescript.png'
import nextjsIcon from './assets/nextjs.webp'

export const projects = [
  {
    id: "project-1",
    title: "Project",
    shortDescription: "Coming Soon",
    fullDescription: "This project is currently under development.",
    image: project1Img,
    modalImage: project1Img,
    link: null,
    repoLink: null,
    techStack: []
  },
  {
    id: "studyconnect",
    title: "StudyConnect",
    shortDescription: "A comprehensive student connection platform built for educational resource management.",
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
  {
    id: "humble-coffee",
    title: "Humble Coffee",
    shortDescription: "A high-performance e-commerce application featuring dynamic pricing logic and real-time inventory.",
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
  }
];