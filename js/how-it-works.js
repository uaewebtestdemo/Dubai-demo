document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Logic for Traveling Ball & Pop-ups ---
    const timeline = document.getElementById('timeline');
    const progressLine = document.getElementById('progress-line');
    const lineBg = document.getElementById('line-bg');
    const steps = document.querySelectorAll('.timeline-step');
    const ctaPopup = document.getElementById('cta-popup');

    function updateTimeline() {
        if(!steps.length || !timeline || !progressLine || !lineBg) return;

        // timeline-container is positioned relative, so offsetTop works relative to it
        if (!ctaPopup) return;

        const timelineRect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate exactly where the CTA pop-up is relative to the container.
        const maxLineHeight = ctaPopup.offsetTop + 30;

        // Set the background grey line so it stops exactly at the CTA box
        lineBg.style.height = `${maxLineHeight}px`;

        // Calculate user's scroll progress in pixels
        // Formula: (windowHeight / 1.5) - timelineRect.top
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

    if (timeline) {
        window.addEventListener('scroll', updateTimeline);
        window.addEventListener('resize', updateTimeline);

        // Initial call
        updateTimeline();

        // Listen for language/mode changes to recalculate (as content height might change)
        window.addEventListener('langChanged', () => setTimeout(updateTimeline, 50));
        window.addEventListener('modeChanged', () => setTimeout(updateTimeline, 50));
    }
});
