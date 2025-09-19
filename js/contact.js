// contact.js

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formMessages = document.getElementById('form-messages');
    const modalEnvelope = document.querySelector('.modal-envelope');
    const okButton = document.querySelector('.modal-envelope .ok-button');

    const nameInput = contactForm.name;
    const emailInput = contactForm.email;
    const subjectInput = contactForm.subject;
    const messageInput = contactForm.message;

    // Validation functions
    function validateInput(inputElement, minLength = 1) {
        if (inputElement.value.trim().length >= minLength) {
            inputElement.classList.remove('is-invalid');
            inputElement.classList.add('is-valid');
            return true;
        } else {
            inputElement.classList.remove('is-valid');
            inputElement.classList.add('is-invalid');
            return false;
        }
    }

    function validateEmail(inputElement) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (emailRegex.test(inputElement.value.trim())) {
            inputElement.classList.remove('is-invalid');
            inputElement.classList.add('is-valid');
            return true;
        } else {
            inputElement.classList.remove('is-valid');
            inputElement.classList.add('is-invalid');
            return false;
        }
    }

    // Real-time validation on input
    nameInput.addEventListener('input', () => validateInput(nameInput));
    emailInput.addEventListener('input', () => validateEmail(emailInput));
    subjectInput.addEventListener('input', () => validateInput(subjectInput));
    messageInput.addEventListener('input', () => validateInput(messageInput, 10)); // Message requires a minimum length of 10

    function showModal() {
        modalEnvelope.classList.add('show');
        document.body.classList.add('no-scroll'); // Add no-scroll class to body

        // Update modal content for success
        const modalTitle = modalEnvelope.querySelector('.card h3');
        const modalMessage = modalEnvelope.querySelector('.card p');
        if (modalTitle) modalTitle.textContent = 'Message Sent!';
        if (modalMessage) modalMessage.textContent = "Thank you for reaching out! I'll get back to you shortly.";

        // Step 1: Card appears directly
        modalEnvelope.classList.add('card-out');
    }

    function closeModal() {
        // Step 2: User clicks OK - handled by event listener

        // Step 3: Message card slides back in and fades out
        modalEnvelope.classList.remove('card-out');

        // Step 4: Envelope fades out
        setTimeout(() => {
            modalEnvelope.classList.remove('show');
            document.body.classList.remove('no-scroll'); // Remove no-scroll class from body
        }, 500); // Adjust delay as needed for fade out
    }

    contactForm.addEventListener('submit', function(event) {
        // event.preventDefault();
        console.log('Form submission prevented.');

        // Clear previous messages
        formMessages.textContent = '';

        // Perform all validations on submit
        const isNameValid = validateInput(nameInput);
        const isEmailValid = validateEmail(emailInput);
        const isSubjectValid = validateInput(subjectInput);
        const isMessageValid = validateInput(messageInput, 10);

        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            displayMessage('Please correct the errors in the form.', 'error');
            return;
        }

        // Simulate form submission
        setTimeout(() => {
            showModal();
            contactForm.reset();
            // Clear validation styles after successful submission
            nameInput.classList.remove('is-valid');
            emailInput.classList.remove('is-valid');
            subjectInput.classList.remove('is-valid');
            messageInput.classList.remove('is-valid');
        }, 1000);
    });

    function displayMessage(msg, type) {
        formMessages.textContent = msg;
        formMessages.classList.remove('success', 'error');
        formMessages.classList.add(type);
    }

    okButton.addEventListener('click', closeModal);

    modalEnvelope.addEventListener('click', (event) => {
        if (event.target === modalEnvelope) {
            closeModal();
        }
    });
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