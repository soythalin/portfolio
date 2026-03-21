// ================================
// PORTFOLIO SCRIPT
// ================================

document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeContactForm();
    initializeNavigation();
    initializeScrollToTop();
});

// ================================
// SCROLL ANIMATIONS
// ================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe skill cards and project cards
    document.querySelectorAll('.skill-card, .project-card').forEach(el => {
        el.classList.add('observation-target');
        observer.observe(el);
    });
}

// ================================
// CONTACT FORM HANDLING
// ================================

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !subject || !message) {
            showAlert('Please fill in all fields', 'warning');
            return;
        }

        // Email validation
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address', 'warning');
            return;
        }

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        showAlert('Thank you for your message! I will get back to you soon.', 'success');
        
        // Reset form
        form.reset();

        // Log form data (remove in production)
        console.log({
            name: name,
            email: email,
            subject: subject,
            message: message,
            timestamp: new Date().toISOString()
        });
    });
}

// ================================
// NAVIGATION HIGHLIGHTING
// ================================

function initializeNavigation() {
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ================================
// SCROLL TO TOP BUTTON
// ================================

function initializeScrollToTop() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    // Smooth scroll for back to top link
    const backToTopLink = footer.querySelector('a[href="#home"]');
    if (backToTopLink) {
        backToTopLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ================================
// UTILITY FUNCTIONS
// ================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showAlert(message, type) {
    // Create alert div
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Find a suitable location to insert the alert
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.parentNode.insertBefore(alertDiv, navbar.nextSibling);
    } else {
        document.body.prepend(alertDiv);
    }

    // Auto-remove alert after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// ================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// ADD ANIMATION CLASS ON SCROLL
// ================================

const style = document.createElement('style');
style.textContent = `
    .observation-target {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .observation-target.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ================================
// KEYBOARD ACCESSIBILITY
// ================================

document.addEventListener('keydown', function(event) {
    // Skip to main content on Ctrl+Alt+M
    if (event.ctrlKey && event.altKey && event.key === 'm') {
        const mainContent = document.querySelector('section#home');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView();
        }
    }
});
