// Import Project Images
import project1Img from './assets/37917.jpeg' 
import studyConnectLogo from './assets/studyconnect.png'
import studyConnectScreen from './assets/studyconnectapp.png'

// Import Icons 
import htmlIcon from './assets/html.png'
import cssIcon from './assets/css.png'
import jsIcon from './assets/javascript.png'
import gitIcon from './assets/git.png'
import reactIcon from './assets/react.png'
import tailwindIcon from './assets/tailwind.png'
import typescriptIcon from './assets/typescript.png'
import nextjsIcon from './assets/nextjs.png'

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
    
    image: studyConnectLogo,        // 👈 FIXED: Matches the import name above
    modalImage: studyConnectScreen, 
    
    link: "https://studyconnect-lovat.vercel.app/",
    repoLink: "https://github.com/Lwazi-M/studyconnect-2.0",
    
    techStack: [
      { name: "Next.js", icon: nextjsIcon },
      { name: "React", icon: reactIcon },
      { name: "TypeScript", icon: typescriptIcon },
      { name: "Tailwind", icon: tailwindIcon },
      { name: "Git", icon: gitIcon }
    ]
  },
  {
    id: "project-3",
    title: "Project",
    shortDescription: "Coming Soon",
    fullDescription: "This project is currently under development.",
    image: project1Img,
    modalImage: project1Img,
    link: null,
    repoLink: null,
    techStack: []
  }
];