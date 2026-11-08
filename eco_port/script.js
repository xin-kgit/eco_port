"use strict";
console.log("🐸 Eco-Brutalist Script Loaded!");
// --- 1. Theme Toggle Management ---
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const bodyElement = document.body;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        bodyElement.setAttribute('data-theme', 'dark');
        if (themeToggleBtn)
            themeToggleBtn.textContent = 'Forest Mode';
    }
    else {
        bodyElement.setAttribute('data-theme', 'light');
        if (themeToggleBtn)
            themeToggleBtn.textContent = 'Meadow Mode';
    }
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = bodyElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                bodyElement.setAttribute('data-theme', 'light');
                themeToggleBtn.textContent = 'Meadow Mode';
                localStorage.setItem('theme', 'light');
            }
            else {
                bodyElement.setAttribute('data-theme', 'dark');
                themeToggleBtn.textContent = 'Forest Mode';
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}
// --- 2. Live Stats Fetching ---
async function fetchPortfolioStats() {
    const statusElement = document.getElementById('backend-status');
    if (!statusElement)
        return;
    try {
        const response = await fetch('http://127.0.0.1:8000/api/portfolio-stats');
        if (!response.ok)
            throw new Error(`Server error: ${response.status}`);
        const data = await response.json();
        statusElement.innerHTML = `  
            <div class="metric-item"><strong>Role:</strong> <span>${data.role}</span></div>
            <div class="metric-item"><strong>Projects Built:</strong> <span>${data.projects_completed}</span></div>
            <div class="metric-item"><strong>CO2 Saved:</strong> <span>${data.co2_saved}</span></div>
            <div class="metric-item"><strong>Mascot Vibe:</strong> <span>${data.mascot_mood}</span></div>
        `;
    }
    catch (error) {
        statusElement.innerHTML = `<span style="color: #ff6b6b; font-weight: bold;">⚠️ Backend offline. Run "python -m uvicorn main:app --reload"</span>`;
    }
}
// --- 3. Mascot Interaction ---
function setupMascotInteraction() {
    const mascot = document.getElementById('mascot');
    const statusText = document.getElementById('mascot-status');
    if (!mascot || !statusText)
        return;
    mascot.addEventListener('click', () => {
        mascot.classList.toggle('bounce');
        const currentMood = mascot.getAttribute('data-mood');
        if (currentMood === 'happy') {
            mascot.setAttribute('data-mood', 'hyped');
            statusText.innerText = '🐸 🔥 Canopy Hype Mode!';
        }
        else {
            mascot.setAttribute('data-mood', 'happy');
            statusText.innerText = '🐸 Thriving in the Forest Canopy';
        }
    });
}
// --- 4. Contact Form Handler ---
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm)
        return;
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('name').value;
        const emailInput = document.getElementById('email').value;
        const messageInput = document.getElementById('message').value;
        try {
            const res = await fetch('http://127.0.0.1:8000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: nameInput, email: emailInput, message: messageInput })
            });
            if (!res.ok)
                throw new Error(`Server error: ${res.status}`);
            const result = await res.json();
            alert(result.response); // Corrected property from 'responsive'
            contactForm.reset();
        }
        catch (err) {
            alert('⚠️ Could not send message. Check if your FastAPI server is running.');
        }
    });
}
// Initialization on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    fetchPortfolioStats();
    setupMascotInteraction();
    setupContactForm();
});
