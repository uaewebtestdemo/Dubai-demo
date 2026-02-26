// --- On Page Load: Read saved language from LocalStorage ---
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('sympleDay_language') || 'en';
    setLang(savedLang);

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

    // Add event listener for contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Message sent successfully!');
        });
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
