// --- Shared State Management ---

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

    // Dispatch a custom event for page-specific logic to hook into
    window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
}

function setMode(mode) {
    document.body.classList.remove('mode-user', 'mode-provider');
    document.body.classList.add(`mode-${mode}`);

    const btnUser = document.getElementById('btn-user');
    const btnProvider = document.getElementById('btn-provider');

    if (btnUser) btnUser.classList.toggle('active', mode === 'user');
    if (btnProvider) btnProvider.classList.toggle('active', mode === 'provider');

    // Dispatch a custom event
    window.dispatchEvent(new CustomEvent('modeChanged', { detail: { mode } }));
}


document.addEventListener('DOMContentLoaded', () => {
    // --- Initial Load ---
    const savedLang = localStorage.getItem('sympleDay_language') || 'en';
    setLang(savedLang);

    // --- Burger Menu Logic ---
    const burgerBtn = document.getElementById('burgerMenu');
    const navMenu = document.getElementById('navMenu');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');

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

    // --- Event Listeners for Lang/Mode (Replacing inline onclicks) ---

    const btnUser = document.getElementById('btn-user');
    const btnProvider = document.getElementById('btn-provider');
    if (btnUser) btnUser.addEventListener('click', () => setMode('user'));
    if (btnProvider) btnProvider.addEventListener('click', () => setMode('provider'));

    const flagUs = document.querySelector('.flag-us');
    const flagAe = document.querySelector('.flag-ae');
    if (flagUs) flagUs.addEventListener('click', () => setLang('en'));
    if (flagAe) flagAe.addEventListener('click', () => setLang('ar'));
});

// Expose functions globally just in case
window.setLang = setLang;
window.setMode = setMode;

// --- Tilt Effect ---
function initTiltEffect() {
    const cards = document.querySelectorAll('.feature-card, .cat-card, .value-card, .contact-info-card');

    // Avoid running on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.1s ease-out';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (max 5 degrees)
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.5s ease-out';
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';

            setTimeout(() => {
                this.style.transition = '';
            }, 500);
        });
    });
}

document.addEventListener('DOMContentLoaded', initTiltEffect);
