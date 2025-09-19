document.addEventListener('DOMContentLoaded', () => {
    console.log('skills.js loaded and DOMContentLoaded event fired');
    const skillProgressBars = document.querySelectorAll('.progress');

    const animateProgressBar = (progressBar) => {
        const skillLevel = progressBar.dataset.progress;
        console.log(`Animating progress bar for skill level: ${skillLevel}`);
        if (skillLevel) {
            // Reset width to 0% to ensure transition plays every time
            progressBar.style.width = '0%';
            // Force reflow to apply the 0% width before animating
            void progressBar.offsetWidth; 
            setTimeout(() => {
                progressBar.style.width = `${skillLevel}%`;
                // Update the tooltip content
                // const tooltip = progressBar.closest('.progress-bar').querySelector('.skill-level-tooltip');
                // if (tooltip) {
                //     tooltip.textContent = `${skillLevel}%`;
                // }
            }, 50); // Small delay to allow reflow and ensure transition
        }
    };

    const skillSection = document.querySelector('#skills');
    console.log('Skill section element:', skillSection);

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };
    console.log('IntersectionObserver options:', observerOptions);

    const observer = new IntersectionObserver((entries, observer) => {
        console.log('IntersectionObserver callback triggered.');
        entries.forEach(entry => {
            console.log('Entry intersecting status:', entry.isIntersecting);
            if (entry.isIntersecting) {
                console.log('Skills section intersecting, animating progress bars.');
                skillProgressBars.forEach(animateProgressBar);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (skillSection) {
        observer.observe(skillSection);
    }

    const categoryButtons = document.querySelectorAll('.category-button');
    const skillItems = document.querySelectorAll('.skill-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            skillItems.forEach(item => {
                const itemCategory = item.dataset.category;
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });

            // Re-observe the skills section to trigger animations for newly visible items
            if (skillSection) {
                observer.unobserve(skillSection);
                observer.observe(skillSection);
            }
        });
    });

    // Initial observation
    if (skillSection) {
        observer.observe(skillSection);
    }
});

    // Scroll-to-top button functionality
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }