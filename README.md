**🌐 Nhlanzeko Lwazi Mhlongo - Portfolio v2.0**
www.lwazimhlongo.com

A responsive, interactive personal portfolio showcasing my skills and projects as a Junior Software Engineer. This version marks a migration from static HTML to a modern React architecture featuring **3D physics interaction** for a unique user experience.

✨ **Key Features & Behavioral Highlights**
1. Interactive 3D Hero Element (Desktop Only)
- **Physics Simulation**: The central identification card is a 3D object simulated with real-world physics (gravity and damping). Users can click and drag the card using their mouse, watching it swing and react realistically.
- **Custom Texture Mapping**: The card features a custom texture created dynamically using **RenderTexture**, displaying the user's profile image and title on the front, and a GitHub QR code on the back.
- **Performance Optimization**: The 3D scene is automatically **disabled** on mobile devices to ensure excellent load times and conserve battery, switching to a static image for mobile users.

**2. Modern UI/UX**
- **Glassmorphism Navigation**: The header uses a translucent, frosted glass effect (_backdrop-filter_) that remains fixed at the top of the screen.
- **Responsive Design**: The layout adapts fully, transforming into a clean, mobile-first view below 768px.
- **Hamburger Menu**: A functional hamburger menu (_FaBars_/_FaTimes_ from _react-icons_) ensures easy navigation on small screens.
- Nested Border Radius: Project cards implement an advanced nested border radius technique (_calc()_) for a premium, framed aesthetic.

**3. CI/CD & Deployment**
- **GitHub Actions**: The project uses a dedicated workflow (_deploy.yml_) to automatically build the production version (using _npm run build_) and deploy the static assets to GitHub Pages immediately upon every merge to the _main_ branch.

<img width="719" height="553" alt="image" src="https://github.com/user-attachments/assets/3b7bfbd6-5698-4315-bcfb-208fd00efaa7" />

🚀 **Local Development**
To run this project on your local machine, follow these steps:

**Prerequisites**
- Node.js (LTS version recommended)
- Git

**Setup**
1. **Clone the Repository (or ensure you are on the** _main_ **branch):**

git clone [https://github.com/Lwazi-M/Personal-Portfolio.git](https://github.com/Lwazi-M/Personal-Portfolio.git)
cd Personal-Portfolio

2. **Install Dependencies:** You need to install the standard React dependencies plus the heavy 3D/Physics packages:

_npm install_

(Note: This includes _three_, _@react-three/fiber_, _@react-three/rapier_, and _meshline_.)

3. **Run Development Server:**

_npm run dev_

The application will be available at **http://localhost:5173**.

⚙️ **Customizing the 3D Lanyard**
The behavior and appearance of the Lanyard are controlled in src/Lanyard.jsx.

<img width="717" height="329" alt="image" src="https://github.com/user-attachments/assets/17b8e27b-16f6-4bdf-9c9c-b772863eabe5" />


📬 **Contact & Links**
I am actively looking for opportunities in **Software Development and Engineering**. Feel free to connect!

**Platforms & Links**

GitHub : [Lwazi-M](https://github.com/Lwazi-M)

LinkedIn: [Nhlanzeko (Lwazi) Mhlongo](https://www.linkedin.com/in/nhlamhlongo/)

Email: nhlamhlongo.work@gmail.com

Live Site: lwazimhlongo.com