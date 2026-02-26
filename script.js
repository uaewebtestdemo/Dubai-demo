/**
 * Common Logic for sympleDay
 * Handles:
 * - Language Switching
 * - Mode Switching (User/Provider)
 * - Burger Menu
 * - Nav Shrink Effect
 * - Scroll Reveal Animations
 */

// --- Language Toggle Logic (Saved to LocalStorage) ---
function setLang(lang) {
    localStorage.setItem('sympleDay_language', lang);

    const root = document.getElementById('root');
    const flagUs = document.querySelector('.flag-us');
    const flagAe = document.querySelector('.flag-ae');

    if (root) {
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
    }

    // Dispatch event so other scripts can react
    document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
}

// --- Master Toggle Logic ---
function setMode(mode) {
    document.body.className = `mode-${mode}`;
    const btnUser = document.getElementById('btn-user');
    const btnProvider = document.getElementById('btn-provider');

    if (btnUser) btnUser.classList.toggle('active', mode === 'user');
    if (btnProvider) btnProvider.classList.toggle('active', mode === 'provider');

    // Dispatch event so other scripts can react
    document.dispatchEvent(new CustomEvent('modeChanged', { detail: { mode } }));
}

document.addEventListener('DOMContentLoaded', () => {
    // --- On Page Load: Read saved language from LocalStorage ---
    const savedLang = localStorage.getItem('sympleDay_language') || 'en';
    setLang(savedLang);

    // --- Burger Menu Logic ---
    const burgerBtn = document.getElementById('burgerMenu');
    const navMenu = document.getElementById('navMenu');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Toggle icon from hamburger to 'X'
            const icon = burgerBtn.querySelector('i');
            if (icon) {
                if(navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // --- Nav Shrink Effect ---
    const nav = document.getElementById('navbar');
    const logo = document.getElementById('nav-logo');

    if (nav && logo) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.padding = '10px 5%';
                logo.style.height = '90px';
            } else {
                nav.style.padding = '15px 5%';
                logo.style.height = '120px';
            }
        });
    }

    // --- Scroll Reveal Animations ---
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- Event Listeners for Buttons ---
    // Language Buttons
    const flagUsBtn = document.querySelector('.flag-us');
    const flagAeBtn = document.querySelector('.flag-ae');

    if (flagUsBtn) {
        flagUsBtn.addEventListener('click', () => setLang('en'));
    }
    if (flagAeBtn) {
        flagAeBtn.addEventListener('click', () => setLang('ar'));
    }

    // Mode Buttons
    const btnUser = document.getElementById('btn-user');
    const btnProvider = document.getElementById('btn-provider');

    if (btnUser) {
        btnUser.addEventListener('click', () => setMode('user'));
    }
    if (btnProvider) {
        btnProvider.addEventListener('click', () => setMode('provider'));
    }
});
