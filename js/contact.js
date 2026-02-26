document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Message sent successfully!');
        });
    }
});
