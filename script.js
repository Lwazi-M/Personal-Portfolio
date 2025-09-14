const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

// Toggle menu
menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
};

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Contact form submit button
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
