/* ================= NAVIGATION MENU ================= */

// Grab elements
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

/* ================= THEME TOGGLE (Dark/Light) ================= */

// Grab toggle buttons (desktop + mobile)
const themeToggle = document.getElementById("theme-toggle");
const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
const body = document.body;

// Prevents double-click spam when switching themes
let isSwitching = false;

// Grab icons inside toggles
const themeIcon = themeToggle.querySelector("i");
const mobileThemeIcon = mobileThemeToggle.querySelector("i");

/**
 * Function: toggleThemeWithDelay
 * - Adds a 1s delay before switching theme
 * - Updates icons (moon ↔ sun)
 * - Saves preference in localStorage
 */
function toggleThemeWithDelay() {
    if (isSwitching) return; // block multiple clicks
    isSwitching = true;

    // Temporary CSS class to allow smooth transition
    body.classList.add("theme-switching");

    setTimeout(() => {
        // Toggle dark mode class
        body.classList.toggle("dark-mode");

        // Update icons + save preference
        if (body.classList.contains("dark-mode")) {
            themeIcon.classList.replace("fa-moon", "fa-sun");
            mobileThemeIcon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "dark");
        } else {
            themeIcon.classList.replace("fa-sun", "fa-moon");
            mobileThemeIcon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "light");
        }

        // Remove transition class & re-enable clicking
        body.classList.remove("theme-switching");
        isSwitching = false;
    }, 1000); // 1 second delay
}

/* ================= APPLY SAVED THEME ================= */

// Check saved theme in localStorage when page loads
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
    mobileThemeIcon.classList.replace("fa-moon", "fa-sun");
}

/* ================= EVENT LISTENERS ================= */

// Desktop theme toggle
themeToggle.addEventListener("click", toggleThemeWithDelay);

// Mobile theme toggle
mobileThemeToggle.addEventListener("click", toggleThemeWithDelay);

// Open/close mobile menu
menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
};

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

/* ================= CONTACT FORM ================= */

/**
 * When "Submit" is clicked:
 * - Check if user entered email
 * - If yes → open mail app with pre-filled subject & body
 * - If no → show alert
 */
document.querySelector(".submit-btn").addEventListener("click", () => {
    const userEmail = document.querySelector(".input-box input").value;

    if (userEmail) {
        const subject = "Portfolio Contact";
        const body = `Hi Lwazi, I was viewing your portfolio page and I would love to get in contact with you. From: ${userEmail}`;
        
        // Replace with your real email
        window.location.href = `mailto:nhlamhlongo.work@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
        alert("⚠️ Please enter your email first.");
    }
});
