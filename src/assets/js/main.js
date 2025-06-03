document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Active Navigation Link Highlight ---
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        // Check if the link's href matches the current path
        // Special handling for the home page ('/') and other pages
        if main.js(currentPath === '/' && link.getAttribute('href') === '/') {
            link.classList.add('active');
        } else if (currentPath !== '/' && link.getAttribute('href') !== '/' && currentPath.startsWith(link.getAttribute('href'))) {
            // For other pages, check if the path starts with the link's href
            link.classList.add('active');
        }
    });

    // --- 2. Mobile Navigation Toggle (Requires a button in header.njk) ---
    // You would typically add a button like this in your header.njk for mobile:
    // <button class="mobile-nav-toggle" aria-label="Toggle navigation">
    //     <i class="fas fa-bars"></i>
    // </button>
    // And then style .main-nav to hide/show on mobile.

    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav ul'); // Target the ul element

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active'); // Toggle a class to show/hide the menu
            // You'll need CSS rules for '.main-nav ul.active' to display it
            // For example:
            // @media (max-width: 768px) {
            //     .main-nav ul {
            //         display: none;
            //         flex-direction: column;
            //         width: 100%;
            //         background-color: var(--primary-color);
            //         position: absolute;
            //         top: 80px; // Adjust based on header height
            //         left: 0;
            //         z-index: 1000;
            //     }
            //     .main-nav ul.active {
            //         display: flex;
            //     }
            //     .main-nav ul li {
            //         text-align: center;
            //         margin: 10px 0;
            //     }
            // }
        });
    }

    // --- 3. Contact Form Handling ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            // Create a simple message box (instead of alert)
            const messageBox = document.createElement('div');
            messageBox.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #4CAF50; /* Green for success */
                color: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                font-size: 1.2em;
                text-align: center;
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
            `;
            messageBox.textContent = 'Thank you for your message! We will get back to you soon.';
            document.body.appendChild(messageBox);

            // Animate message box in
            setTimeout(() => {
                messageBox.style.opacity = '1';
            }, 10); // Small delay to allow reflow before transition

            // Animate message box out and remove after a few seconds
            setTimeout(() => {
                messageBox.style.opacity = '0';
                messageBox.addEventListener('transitionend', () => {
                    messageBox.remove();
                }, { once: true }); // Remove listener after it fires once
            }, 3000); // Display for 3 seconds

            // In a real application, you would send the form data here, e.g.:
            // const formData = new FormData(contactForm);
            // const response = await fetch('/your-form-submission-endpoint', {
            //     method: 'POST',
            //     body: formData
            // });
            // if (response.ok) {
            //     // Handle success
            // } else {
            //     // Handle error
            // }

            contactForm.reset(); // Clear the form fields
        });
    }
});
