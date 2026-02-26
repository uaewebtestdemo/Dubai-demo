// --- Common Logic ---

// --- On Page Load: Read saved language from LocalStorage ---
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('sympleDay_language') || 'en';
    setLang(savedLang); // Apply the saved language immediately

    // Initialize Scroll Reveal Animations
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Initialize Timeline if present
    updateTimeline();
});

// --- Burger Menu Logic ---
const burgerBtn = document.getElementById('burgerMenu');
const navMenu = document.getElementById('navMenu');

if (burgerBtn && navMenu) {
    burgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Toggle icon from hamburger to 'X'
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

    // Recalculate heights because text volume might change (for how-it-works page)
    setTimeout(updateTimeline, 50);
}

// --- Language Toggle Logic (Updated with LocalStorage) ---
function setLang(lang) {
    // Save the language choice so it remembers it for other pages
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

    // Recalculate heights because translating might shift layout (for how-it-works page)
    setTimeout(updateTimeline, 50);
}

// --- Page Specific Logic: Index (Home) ---

// --- 3D Phone Parallax Effect ---
const heroInteractive = document.getElementById('hero-interactive');
const phone3D = document.getElementById('phone-3d');

if (heroInteractive && phone3D) {
    heroInteractive.addEventListener('mousemove', (e) => {
        const rect = heroInteractive.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateY = x / 30;
        const rotateX = -(y / 30);
        phone3D.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });

    heroInteractive.addEventListener('mouseleave', () => {
        phone3D.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
}

// --- Endless Swiping Carousel Logic ---
const track = document.getElementById('carousel-track');
const slider = document.getElementById('carousel');

if (track && slider) {
    const professions = [
        { img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600", enTitle: "Barbers & Salons", arTitle: "صالونات وحلاقين", enSub: "Top-rated grooming", arSub: "عناية شخصية فائقة", proEn: "Fill your chairs", proAr: "املأ كراسيك" },
        { img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600", enTitle: "Home Cleaning", arTitle: "تنظيف المنازل", enSub: "Trusted local maids", arSub: "عاملات موثوقات", proEn: "Manage dispatch zones", proAr: "إدارة مناطق الإرسال" },
        { img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600", enTitle: "Dentists & Clinics", arTitle: "أطباء الأسنان", enSub: "Book check-ups easily", arSub: "احجز مواعيدك بسهولة", proEn: "Streamline patient flow", proAr: "تنظيم تدفق المرضى" },
        { img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600", enTitle: "Painters & Decor", arTitle: "صباغون ودهانات", enSub: "Refresh your home", arSub: "جدد منزلك", proEn: "Book bigger projects", proAr: "احجز مشاريع أكبر" },
        { img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600", enTitle: "Auto Mechanics", arTitle: "ميكانيكا السيارات", enSub: "Mobile & garage repairs", arSub: "إصلاح السيارات", proEn: "Schedule service bays", proAr: "جدولة مواعيد الصيانة" },
        { img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600", enTitle: "Expert Plumbers", arTitle: "خدمات السباكة", enSub: "Fast emergency fixes", arSub: "إصلاحات سريعة", proEn: "Optimize travel routes", proAr: "تحسين مسارات السفر" },
        { img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600", enTitle: "Personal Fitness", arTitle: "اللياقة البدنية", enSub: "Private trainers", arSub: "مدربون شخصيون", proEn: "Schedule client sessions", proAr: "جدولة جلسات العملاء" },
        { img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600", enTitle: "Pet Grooming", arTitle: "العناية بالحيوانات", enSub: "Pamper your pets", arSub: "دلل حيواناتك الأليفة", proEn: "Automate booking slots", proAr: "أتمتة فترات الحجز" },
        { img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600", enTitle: "Photographers", arTitle: "مصورون محترفون", enSub: "Capture the moment", arSub: "التقط اللحظة", proEn: "Manage photoshoot times", proAr: "إدارة أوقات التصوير" },
        { img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600", enTitle: "Private Tutors", arTitle: "دروس خصوصية", enSub: "Learn from the best", arSub: "تعلم من الأفضل", proEn: "Organize student lessons", proAr: "تنظيم دروس الطلاب" },
    ];

    const generateCards = () => professions.map(p => `
        <a href="#" class="cat-card">
            <div class="cat-bg" style="background-image: url('${p.img}');"></div>
            <div class="cat-overlay"></div>
            <div class="cat-content">
                <h3 class="only-en">${p.enTitle}</h3><h3 class="only-ar">${p.arTitle}</h3>
                <p class="only-en only-user">${p.enSub}</p><p class="only-ar only-user">${p.arSub}</p>
                <p class="only-en only-provider">${p.proEn}</p><p class="only-ar only-provider">${p.proAr}</p>
            </div>
        </a>`).join('');

    track.innerHTML = generateCards() + generateCards();

    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScrollSpeed = 1.2;

    function animateCarousel() {
        if (!isDown) {
            const isRTL = document.documentElement.dir === 'rtl';

            if (isRTL) {
                slider.scrollLeft -= autoScrollSpeed;
                if (Math.abs(slider.scrollLeft) >= track.scrollWidth / 2) {
                    slider.scrollLeft = 0;
                }
            } else {
                slider.scrollLeft += autoScrollSpeed;
                if (slider.scrollLeft >= track.scrollWidth / 2) {
                    slider.scrollLeft = 0;
                }
            }
        }
        requestAnimationFrame(animateCarousel);
    }
    animateCarousel();

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => { isDown = false; slider.style.cursor = 'grab'; });
    slider.addEventListener('mouseup', () => { isDown = false; slider.style.cursor = 'grab'; });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('touchend', () => { isDown = false; });
    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

// --- Page Specific Logic: How It Works (Timeline) ---

function updateTimeline() {
    const timeline = document.getElementById('timeline');
    const progressLine = document.getElementById('progress-line');
    const lineBg = document.getElementById('line-bg');
    const steps = document.querySelectorAll('.timeline-step');
    const ctaPopup = document.getElementById('cta-popup');

    if(!timeline || !steps.length) return;

    const timelineRect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate exactly where the CTA pop-up is relative to the container.
    // Adding a small padding so the ball enters the box and stops neatly behind its top border.
    const maxLineHeight = ctaPopup.offsetTop + 30;

    // Set the background grey line so it stops exactly at the CTA box
    if (lineBg) lineBg.style.height = `${maxLineHeight}px`;

    // Calculate user's scroll progress in pixels
    let currentScrollPx = (windowHeight / 1.5) - timelineRect.top;

    // Cap the progress so it never goes past the CTA box or goes below zero
    currentScrollPx = Math.max(0, Math.min(maxLineHeight, currentScrollPx));

    // Apply the capped pixel height to the green line
    if (progressLine) progressLine.style.height = `${currentScrollPx}px`;

    // Trigger Steps popping up
    steps.forEach(step => {
        const nodeRect = step.querySelector('.step-node').getBoundingClientRect();
        if (windowHeight / 1.5 > nodeRect.top) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
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

// Add event listeners for timeline if timeline exists
if (document.getElementById('timeline')) {
    window.addEventListener('scroll', updateTimeline);
    window.addEventListener('resize', updateTimeline);
}
