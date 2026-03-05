document.addEventListener('DOMContentLoaded', () => {
    // Mock Data for Best Reviewed
    const bestReviewedData = [
        { nameEn: "The Golden Blade", nameAr: "الشفرة الذهبية", categoryEn: "Barbershop", categoryAr: "صالون حلاقة", score: "4.9", unitEn: "/ 5", unitAr: "/ 5", icon: "fa-solid fa-scissors" },
        { nameEn: "Elite Home Cleaning", nameAr: "النخبة لتنظيف المنازل", categoryEn: "Home Cleaning", categoryAr: "تنظيف منازل", score: "4.8", unitEn: "/ 5", unitAr: "/ 5", icon: "fa-solid fa-broom" },
        { nameEn: "Perfect Smiles Clinic", nameAr: "عيادة الابتسامة المثالية", categoryEn: "Dentist", categoryAr: "طبيب أسنان", score: "4.8", unitEn: "/ 5", unitAr: "/ 5", icon: "fa-solid fa-tooth" },
        { nameEn: "Pro Auto Fix", nameAr: "برو لإصلاح السيارات", categoryEn: "Auto Mechanic", categoryAr: "ميكانيكي سيارات", score: "4.7", unitEn: "/ 5", unitAr: "/ 5", icon: "fa-solid fa-wrench" },
        { nameEn: "Zen Spa & Massage", nameAr: "زين سبا ومساج", categoryEn: "Spa", categoryAr: "منتجع صحي", score: "4.6", unitEn: "/ 5", unitAr: "/ 5", icon: "fa-solid fa-spa" }
    ];

    // Mock Data for Most Reservations
    const mostReservationsData = [
        { nameEn: "Quick Fix Plumbers", nameAr: "السباك السريع", categoryEn: "Plumbing", categoryAr: "سباكة", score: "342", unitEn: " bookings", unitAr: " حجز", icon: "fa-solid fa-faucet-drip" },
        { nameEn: "Fresh Look Salon", nameAr: "صالون الإطلالة الجديدة", categoryEn: "Salon", categoryAr: "صالون", score: "289", unitEn: " bookings", unitAr: " حجز", icon: "fa-solid fa-spray-can" },
        { nameEn: "Master Painters", nameAr: "خبراء الطلاء", categoryEn: "Painters", categoryAr: "صباغون", score: "215", unitEn: " bookings", unitAr: " حجز", icon: "fa-solid fa-paint-roller" },
        { nameEn: "FitLife Personal Training", nameAr: "فيت لايف للتدريب الشخصي", categoryEn: "Fitness", categoryAr: "لياقة بدنية", score: "198", unitEn: " bookings", unitAr: " حجز", icon: "fa-solid fa-dumbbell" },
        { nameEn: "Happy Paws Grooming", nameAr: "هابي باوز للعناية بالحيوانات", categoryEn: "Pet Grooming", categoryAr: "عناية بالحيوانات", score: "176", unitEn: " bookings", unitAr: " حجز", icon: "fa-solid fa-paw" }
    ];

    const btnBestReviewed = document.getElementById('btn-best-reviewed');
    const btnMostReservations = document.getElementById('btn-most-reservations');
    const leaderboardContent = document.getElementById('leaderboard-content');

    let currentType = 'best'; // 'best' or 'most'

    function renderLeaderboard(data, type) {
        if (!leaderboardContent) return;

        const htmlString = data.map((item, index) => {
            const rank = index + 1;
            let rankClass = '';
            if (rank === 1) rankClass = 'rank-gold';
            else if (rank === 2) rankClass = 'rank-silver';
            else if (rank === 3) rankClass = 'rank-bronze';
            else rankClass = 'rank-standard';

            const scoreIcon = type === 'best' ? '<i class="fa-solid fa-star" style="color: #FFD700;"></i>' : '<i class="fa-solid fa-calendar-check" style="color: var(--accent-color);"></i>';

            return `
                <div class="leaderboard-row card-3d">
                    <div class="rank-badge ${rankClass}">${rank}</div>
                    <div class="row-icon"><i class="${item.icon}"></i></div>
                    <div class="row-details">
                        <h3 class="only-en">${item.nameEn}</h3>
                        <h3 class="only-ar">${item.nameAr}</h3>
                        <p class="only-en">${item.categoryEn}</p>
                        <p class="only-ar">${item.categoryAr}</p>
                    </div>
                    <div class="row-score">
                        <div class="score-number">${scoreIcon} ${item.score}</div>
                        <div class="score-unit only-en">${item.unitEn}</div>
                        <div class="score-unit only-ar">${item.unitAr}</div>
                    </div>
                </div>
            `;
        }).join('');

        leaderboardContent.innerHTML = htmlString;

        // Re-initialize tilt effect for newly added elements
        if (typeof initTiltEffect === 'function') {
            initTiltEffect();
        }
    }

    function setActiveButton(activeBtn, inactiveBtn) {
        activeBtn.classList.add('btn-green');
        activeBtn.classList.remove('btn-dark');

        inactiveBtn.classList.add('btn-dark');
        inactiveBtn.classList.remove('btn-green');
    }

    if (btnBestReviewed && btnMostReservations) {
        btnBestReviewed.addEventListener('click', () => {
            currentType = 'best';
            setActiveButton(btnBestReviewed, btnMostReservations);
            renderLeaderboard(bestReviewedData, currentType);
        });

        btnMostReservations.addEventListener('click', () => {
            currentType = 'most';
            setActiveButton(btnMostReservations, btnBestReviewed);
            renderLeaderboard(mostReservationsData, currentType);
        });
    }

    // Event listeners to handle language/mode changes and re-render the view
    window.addEventListener('langChanged', () => {
        const data = currentType === 'best' ? bestReviewedData : mostReservationsData;
        renderLeaderboard(data, currentType);
    });

    // Initial render
    renderLeaderboard(bestReviewedData, 'best');
});