document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Simulate loading
            const btnSubmit = contactForm.querySelector('.btn-submit');
            btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
            btnSubmit.disabled = true;

            setTimeout(() => {
                // Hide Form Content
                const formGroups = contactForm.querySelectorAll('.form-group, .btn-submit');
                formGroups.forEach(el => el.style.display = 'none');

                // Show Success Message
                const successMsg = contactForm.querySelector('.success-message');
                if (successMsg) {
                    successMsg.style.display = 'block';
                }
            }, 1500);
        });
    }
});
