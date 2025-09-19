document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const projectDetailsModal = document.getElementById('projectDetailsModal');
    const closeButton = projectDetailsModal.querySelector('.close-button');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechStack = document.getElementById('modalTechStack');
    const modalScreenshots = document.getElementById('modalScreenshots');
    const modalLiveLink = document.getElementById('modalLiveLink');
    const modalSourceLink = document.getElementById('modalSourceLink');

    // Function to open modal
    const openModal = () => {
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        projectDetailsModal.classList.add('active');
        setTimeout(() => {
            projectDetailsModal.querySelector('.modal-content-wrapper').style.opacity = '1';
            projectDetailsModal.querySelector('.modal-content-wrapper').style.transform = 'translateY(0)';
        }, 10);
    };

    // Function to close modal
    const closeModal = () => {
        document.body.style.overflow = ''; // Restore background scrolling
        projectDetailsModal.querySelector('.modal-content-wrapper').style.opacity = '0';
        projectDetailsModal.querySelector('.modal-content-wrapper').style.transform = 'translateY(-20px)';
        setTimeout(() => {
            projectDetailsModal.classList.remove('active');
        }, 300); // Match the CSS transition duration
    };

    const projectsData = [
        {
            id: '1',
            title: 'Learning Management System – NSTI Ramanthapur',
            description: 'A comprehensive LMS with custom dashboard views for students, instructors, and admins. Features include secure login, role-based access control, course management, assignment uploads, and progress tracking. The UI is responsive and optimized for desktop and mobile. Frontend hosted on Vercel, backend deployed via Render, and domain integration with Hostinger using .htaccess redirects and DNS routing.',
            techStack: ['HTML', 'CSS', 'JavaScript', 'React', 'PostgreSQL', 'Render', 'Vercel', 'Github'],
            screenshots: ['../img/p1.png', '../img/p2.png', '../img/p3.png', '../img/p4.png'],
            liveLink: 'https://elearning.nstihyderabad.in/',
            sourceLink: 'https://github.com/ArkanRiyasat/LMS_NSTI_Project.git',
        },
        {
            id: '2',
            title: 'Text-to-Speech App',
            description: 'A text-to-speech application that converts written text into spoken audio. Users can input text and listen to the synthesized audio. The app features a clean and intuitive user interface. The frontend is developed using React. The app is deployed on Streamlit and Vercel for easy access.',
            techStack: ['HTML', 'CSS', 'JavaScript', 'Python', 'gTTs', 'Streamlit','Vercel', 'Github'],
            screenshots: ['../img/sc.png'],
            liveLink: 'https://example.com/text-to-speech-live',
            sourceLink: 'https://github.com/ArkanRiyasat/Text-to-Speech-App.git',
        },
        {
            id: '3',
            title: 'Digital Portfolio',
            description: 'This digital portfolio showcases a collection of my best work, highlighting my skills in web development, UI/UX design, and project management. It includes various projects with detailed descriptions, tech stacks, and links to live demos and source code. The portfolio is designed to be responsive and visually appealing, providing an immersive experience for visitors.',
            techStack: ['HTML', 'CSS', 'JavaScript', 'Vercel', 'Github'],
            screenshots: ['../img/dp.png'],
            liveLink: 'https://example.com/digital-portfolio-live',
            sourceLink: 'https://github.com/ArkanRiyasat/Digital-Portfolio.git',
        },
        {
            id: '4',
            title: 'Travel Explorer',
            description: 'A social media analytics dashboard providing insights into user engagement, post performance, and trend analysis. Features real-time data visualization.',
            techStack: ['HTML', 'CSS', 'JavaScript', 'Vercel', 'SQL', 'MySQL', 'Github'],
            screenshots: ['../img/te1.png', '../img/te2.png'],
            liveLink: 'https://example.com/travel-explorer-live',
            sourceLink: 'https://github.com/ArkanRiyasat/Travel-Explorer.git',
        }
    ];

    // Function to generate tech stack badges
    const generateTechStackBadges = (techStackArray, isModal = false) => {
        const badgeClass = isModal ? 'modal-tech-badge' : 'tech-badge';
        return techStackArray.map(tech => `<span class="${badgeClass}">${tech}</span>`).join('');
    };

    projectCards.forEach(card => {
        const projectId = card.dataset.projectId;
        const project = projectsData.find(p => p.id === projectId);

        if (project) {
            const techStackBadgesContainer = card.querySelector('.tech-stack-badges');
            if (techStackBadgesContainer) {
                techStackBadgesContainer.innerHTML = generateTechStackBadges(project.techStack);
            }
        }

        const exploreButton = card.querySelector('.project-details-btn');
        exploreButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            
            if (project) {
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;
                modalLiveLink.href = project.liveLink;
                modalSourceLink.href = project.sourceLink;

                modalTechStack.innerHTML = '<h4>Tech Stack:</h4><div class="tech-stack-items">' + 
                    generateTechStackBadges(project.techStack, true) + 
                    '</div>';

                modalScreenshots.innerHTML = '<h4>Take a look:</h4><div class="screenshots-container">' +
                    project.screenshots.map(src => `<img src="${src}" alt="Project Screenshot" class="screenshot-img">`).join('') +
                    '</div>';

                openModal();
            }
        });
    });

    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === projectDetailsModal) {
            closeModal();
        }
    });

    // Prevent closing when clicking inside modal content
    projectDetailsModal.querySelector('.modal-content-wrapper').addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const projectCardObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    projectCards.forEach(card => {
        card.classList.add('animate-entry'); // Add base animation class
        projectCardObserver.observe(card);

        // Mousemove effect for glow
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', x + 'px');
            card.style.setProperty('--y', y + 'px');
        });
    });
});
