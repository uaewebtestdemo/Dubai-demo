// --- On Page Load: Read saved language from LocalStorage ---
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('sympleDay_language') || 'en';
    setLang(savedLang);
    updateTimeline(); // Initialize line heights on load

    // Add event listeners for language toggle
    const flagUs = document.querySelector('.flag-us');
    if (flagUs) {
        flagUs.addEventListener('click', () => setLang('en'));
    }
    const flagAe = document.querySelector('.flag-ae');
    if (flagAe) {
        flagAe.addEventListener('click', () => setLang('ar'));
    }

    // Add event listeners for mode toggle
    const btnUser = document.getElementById('btn-user');
    if (btnUser) {
        btnUser.addEventListener('click', () => setMode('user'));
    }
    const btnProvider = document.getElementById('btn-provider');
    if (btnProvider) {
        btnProvider.addEventListener('click', () => setMode('provider'));
    }
});

// --- Burger Menu Logic ---
const burgerBtn = document.getElementById('burgerMenu');
const navMenu = document.getElementById('navMenu');

if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = burgerBtn.querySelector('i');
        if(navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
}

// --- Nav Shrink Effect ---
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    const logo = document.getElementById('nav-logo');
    if (nav && logo) {
        if (window.scrollY > 50) {
            nav.style.padding = '10px 5%';
            logo.style.height = '90px';
        } else {
            nav.style.padding = '15px 5%';
            logo.style.height = '120px';
        }
    }
});

// --- Master Toggle Logic ---
function setMode(mode) {
    document.body.className = `mode-${mode}`;
    const btnUser = document.getElementById('btn-user');
    const btnProvider = document.getElementById('btn-provider');

    if (btnUser) btnUser.classList.toggle('active', mode === 'user');
    if (btnProvider) btnProvider.classList.toggle('active', mode === 'provider');

    // Recalculate heights because text volume might change
    setTimeout(updateTimeline, 50);
}

// --- Language Toggle Logic (Saved to LocalStorage) ---
function setLang(lang) {
    localStorage.setItem('sympleDay_language', lang);

    const root = document.getElementById('root');
    const flagUs = document.querySelector('.flag-us');
    const flagAe = document.querySelector('.flag-ae');

    if (lang === 'ar') {
        root.setAttribute('lang', 'ar');
        root.setAttribute('dir', 'rtl');
        if (flagAe) flagAe.classList.add('active');
        if (flagUs) flagUs.classList.remove('active');
    } else {
        root.setAttribute('lang', 'en');
        root.setAttribute('dir', 'ltr');
        if (flagUs) flagUs.classList.add('active');
        if (flagAe) flagAe.classList.remove('active');
    }

    // Recalculate heights because translating might shift layout
    setTimeout(updateTimeline, 50);
}

// --- Scroll Logic for Traveling Ball & Pop-ups ---
const timeline = document.getElementById('timeline');
const progressLine = document.getElementById('progress-line');
const lineBg = document.getElementById('line-bg');
const steps = document.querySelectorAll('.timeline-step');
const ctaPopup = document.getElementById('cta-popup');

function updateTimeline() {
    if(!steps.length || !timeline || !progressLine || !lineBg || !ctaPopup) return;

    const timelineRect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate exactly where the CTA pop-up is relative to the container.
    // Adding a small padding so the ball enters the box and stops neatly behind its top border.
    const maxLineHeight = ctaPopup.offsetTop + 30;

    // Set the background grey line so it stops exactly at the CTA box
    lineBg.style.height = `${maxLineHeight}px`;

    // Calculate user's scroll progress in pixels
    let currentScrollPx = (windowHeight / 1.5) - timelineRect.top;

    // Cap the progress so it never goes past the CTA box or goes below zero
    currentScrollPx = Math.max(0, Math.min(maxLineHeight, currentScrollPx));

    // Apply the capped pixel height to the green line
    progressLine.style.height = `${currentScrollPx}px`;

    // Trigger Steps popping up
    steps.forEach(step => {
        const stepNode = step.querySelector('.step-node');
        if (stepNode) {
            const nodeRect = stepNode.getBoundingClientRect();
            if (windowHeight / 1.5 > nodeRect.top) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        }
    });

    // Trigger Final CTA pop up
    const ctaRect = ctaPopup.getBoundingClientRect();
    if (windowHeight / 1.2 > ctaRect.top) {
        ctaPopup.classList.add('active');
    } else {
        ctaPopup.classList.remove('active');
    }
}

window.addEventListener('scroll', updateTimeline);
window.addEventListener('resize', updateTimeline);
