document.addEventListener('DOMContentLoaded', () => {

    // --- Shared State & Helpers ---

    // Placeholder for timeline update function (overwritten on How-it-Works page)
    let updateTimeline = () => {};

    function setLang(lang) {
        localStorage.setItem('sympleDay_language', lang);
        const root = document.getElementById('root');

        // Update all flag buttons
        document.querySelectorAll('.flag-us').forEach(el => {
            if(lang === 'en') el.classList.add('active');
            else el.classList.remove('active');
        });
        document.querySelectorAll('.flag-ae').forEach(el => {
            if(lang === 'ar') el.classList.add('active');
            else el.classList.remove('active');
        });

        if (lang === 'ar') {
            root.setAttribute('lang', 'ar');
            root.setAttribute('dir', 'rtl');
        } else {
            root.setAttribute('lang', 'en');
            root.setAttribute('dir', 'ltr');
        }

        // Recalculate layout if needed
        setTimeout(updateTimeline, 50);
    }

    function setMode(mode) {
        document.body.className = `mode-${mode}`;

        const btnUser = document.getElementById('btn-user');
        const btnProvider = document.getElementById('btn-provider');

        if (btnUser) btnUser.classList.toggle('active', mode === 'user');
        if (btnProvider) btnProvider.classList.toggle('active', mode === 'provider');

        // Recalculate layout if needed
        setTimeout(updateTimeline, 50);
    }

    // --- Initialization ---
    const savedLang = localStorage.getItem('sympleDay_language') || 'en';
    setLang(savedLang);

    // --- Global Event Listeners ---

    // Language Flags
    document.querySelectorAll('.flag-us').forEach(btn => {
        btn.addEventListener('click', () => setLang('en'));
    });
    document.querySelectorAll('.flag-ae').forEach(btn => {
        btn.addEventListener('click', () => setLang('ar'));
    });

    // Mode Toggles
    const btnUser = document.getElementById('btn-user');
    const btnProvider = document.getElementById('btn-provider');
    if (btnUser) btnUser.addEventListener('click', () => setMode('user'));
    if (btnProvider) btnProvider.addEventListener('click', () => setMode('provider'));

    // Burger Menu
    const burgerBtn = document.getElementById('burgerMenu');
    const navMenu = document.getElementById('navMenu');
    if (burgerBtn && navMenu) {
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

    // Nav Shrink
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

    // Scroll Reveal
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


    // --- INDEX PAGE LOGIC ---

    // 3D Phone
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

    // Carousel
    const slider = document.getElementById('carousel');
    const track = document.getElementById('carousel-track');
    if (slider && track) {
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

    // --- HOW IT WORKS LOGIC ---
    if (document.getElementById('timeline')) {
        const timeline = document.getElementById('timeline');
        const progressLine = document.getElementById('progress-line');
        const lineBg = document.getElementById('line-bg');
        const steps = document.querySelectorAll('.timeline-step');
        const ctaPopup = document.getElementById('cta-popup');

        updateTimeline = function() {
            if(!steps.length) return;

            const timelineRect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const maxLineHeight = ctaPopup.offsetTop + 30;

            lineBg.style.height = `${maxLineHeight}px`;

            let currentScrollPx = (windowHeight / 1.5) - timelineRect.top;
            currentScrollPx = Math.max(0, Math.min(maxLineHeight, currentScrollPx));

            progressLine.style.height = `${currentScrollPx}px`;

            steps.forEach(step => {
                const nodeRect = step.querySelector('.step-node').getBoundingClientRect();
                if (windowHeight / 1.5 > nodeRect.top) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });

            const ctaRect = ctaPopup.getBoundingClientRect();
            if (windowHeight / 1.2 > ctaRect.top) {
                ctaPopup.classList.add('active');
            } else {
                ctaPopup.classList.remove('active');
            }
        };

        window.addEventListener('scroll', updateTimeline);
        window.addEventListener('resize', updateTimeline);
        updateTimeline(); // Initial call
    }

    // --- CONTACT LOGIC ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Message sent successfully!');
        });
    }

});
