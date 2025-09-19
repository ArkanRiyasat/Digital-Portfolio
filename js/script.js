// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Remove 'active' class from all links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        // Add 'active' class to the clicked link
        this.classList.add('active');

        // Check if the link is an internal anchor or an external page
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
        // Navbar visibility on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

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

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Generic observer for all fade-in elements
    const fadeInElements = document.querySelectorAll('.fade-in, .scroll-caption-animate, .highlights-animate, .hero-text-animate, .hero-button-animate, .glassmorphed-tile');
    const heroLeftFadeInElement = document.querySelector('.hero-left-fade-in');

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a staggered delay for elements appearing after the hero section
                const delay = entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) : 0;
                setTimeout(() => {
                    entry.target.classList.add('appear');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => fadeInObserver.observe(el));

    if (heroLeftFadeInElement) {
        heroLeftFadeInElement.classList.add('appear');
    }

    // Observer for the underline animation of Featured Highlights
    const highlightsH2 = document.querySelector('.highlights h2');
    if (highlightsH2) {
        const highlightsH2Observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        highlightsH2Observer.observe(highlightsH2);
    }

    // Observer for the scroll caption underline animation
    const scrollCaptionElement = document.querySelector('.scroll-caption');
    if (scrollCaptionElement) {
        const scrollCaptionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        scrollCaptionObserver.observe(scrollCaptionElement);
    }

    // Scroll-triggered reveal effect
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-image');

    const revealObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Cinematic scroll effect
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        const heroHeight = heroSection.offsetHeight;
        const scrollY = window.scrollY;

        const reflectionGrid = document.getElementById('reflectionGrid');

        if (scrollY > heroHeight - 100) {
            if (reflectionGrid) {
                reflectionGrid.classList.add('tilted');
            }
        } else {
            if (reflectionGrid) {
                reflectionGrid.classList.remove('tilted');
            }
        }
    });

    // Contact form validation (basic example)
    const contactForm = document.querySelector('#contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
            } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                alert('Please enter a valid email address.');
            } else {
                alert('Message sent successfully!');
                contactForm.reset();
            }
        });
    }

    // Signature Hover Moment - Click to reveal mini bio
    const signatureContainer = document.querySelector('.signature-container');

    if (signatureContainer) {
        signatureContainer.addEventListener('click', () => {
            // Create mini bio modal
            const miniBioModal = document.createElement('div');
            miniBioModal.classList.add('mini-bio-modal');
            miniBioModal.innerHTML = `
                <div class="mini-bio-content">
                    <h3>About Hibah</h3>
                    <p>I am a passionate developer with a keen eye for design and a drive to create brilliant digital experiences. I specialize in web development, API integration, and UI/UX design.</p>
                    <p>Learn more <a href="about.html">here</a>.</p>
                    <button class="close-mini-bio">X</button>
                </div>
            `;
            document.body.appendChild(miniBioModal);

            // Close mini bio modal
            miniBioModal.querySelector('.close-mini-bio').addEventListener('click', () => {
                miniBioModal.remove();
            });

            // Close when clicking outside
            miniBioModal.addEventListener('click', (e) => {
                if (e.target === miniBioModal) {
                    miniBioModal.remove();
                }
            });
        });
    }
    // Accordion functionality for Featured Highlights
    const accordionToggles = document.querySelectorAll('.accordion-toggle');

    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            toggle.classList.toggle('active');
            if (toggle.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.classList.add('show');
            } else {
                content.style.maxHeight = null;
                content.classList.remove('show');
            }
        });
    });

});

// What I Do section cinematic scroll effect
const whatIDoCards = document.querySelectorAll('.what-i-do-item');
const whatIDoContainer = document.querySelector('.what-i-do-wrapper'); // Changed to .what-i-do-wrapper

if (whatIDoContainer) {
    // Add horizontal scroll functionality
    whatIDoContainer.addEventListener('wheel', (event) => {
        if (event.deltaY !== 0) {
            event.preventDefault();
            whatIDoContainer.scrollLeft += event.deltaY;
        }
    });

    whatIDoContainer.addEventListener('scroll', () => {
        whatIDoCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const containerCenter = whatIDoContainer.offsetWidth / 2;
            const cardCenter = rect.left + rect.width / 2;

            // Adjust the threshold for when a card becomes active
            if (Math.abs(containerCenter - cardCenter) < 20) { // Reduced threshold for more precise activation
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    });

    // Trigger initial check on load to set active class for the first visible card
    window.addEventListener('load', () => {
        whatIDoCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const containerCenter = whatIDoContainer.offsetWidth / 2;
            const cardCenter = rect.left + rect.width / 2;

            if (Math.abs(containerCenter - cardCenter) < 20) {
                card.classList.add('active');
            }
        });
    });
}

const accordions = document.querySelectorAll('.accordion-toggle');

accordions.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const parent = toggle.parentElement;
    parent.classList.toggle('open');
  });
});
