// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Create particles
    createParticles();

    // Initialize cursor
    initCursor();

    // Set current year in footer
    document.querySelector('.copyright').innerHTML = `© ${new Date().getFullYear()} Kunal Patel. All rights reserved.`;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    // Initialize typing effect
    initTypingEffect();

    // Initialize animations on scroll
    initScrollAnimations();
});

// Particles Background
function createParticles() {
    const particlesBg = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random size
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;

        particlesBg.appendChild(particle);
    }
}

// Custom Cursor
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .education-card, .highlight-card, .social-link');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            follower.style.transform = 'scale(1.5)';
            follower.style.backgroundColor = 'rgba(56, 189, 248, 0.2)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
            follower.style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
        });
    });
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');

        // Save preference
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');

        // Update particles color
        updateParticlesColor();
    });
}

function updateParticlesColor() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.background = 'var(--gradient-accent)';
    });
}

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ?
            '<i class="fas fa-times"></i>' :
            '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Typing Effect
function initTypingEffect() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;

    const texts = ['Computer Science Engineering Student', 'Full Stack Developer', 'Problem Solver', 'Tech Enthusiast'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    // Start typing after 1 second
    setTimeout(type, 1000);
}

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', async(e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        // Show loading
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                if (formMessage) {
                    formMessage.textContent = '✅ Thank you! Your message has been sent successfully.';
                    formMessage.className = 'form-message success';
                }
                contactForm.reset();
            } else {
                if (formMessage) {
                    formMessage.textContent = '❌ Oops! There was a problem. Please try again.';
                    formMessage.className = 'form-message error';
                }
            }
        } catch (error) {
            if (formMessage) {
                formMessage.textContent = '❌ Network error. Please check your connection.';
                formMessage.className = 'form-message error';
            }
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Hide message after 5 seconds
            if (formMessage) {
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        }
    });
}

// Back to Top Button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.padding = '15px 0';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.padding = '20px 0';
            header.style.backdropFilter = 'blur(20px)';
        }
    }
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.about-text, .skills-container, .about-highlights > div, .timeline-item, .education-card, .project-card, .contact-info, .contact-form');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Floating card hover effect
const floatingCard = document.querySelector('.floating-card');
if (floatingCard) {
    floatingCard.addEventListener('mouseenter', () => {
        floatingCard.style.animationPlayState = 'paused';
    });

    floatingCard.addEventListener('mouseleave', () => {
        floatingCard.style.animationPlayState = 'running';
    });
}

// Image error fallback
const profileImg = document.querySelector('.profile-img img');
if (profileImg) {
    profileImg.onerror = function() {
        this.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80';
        this.alt = 'Kunal Patel - Default Profile Image';
    };
}