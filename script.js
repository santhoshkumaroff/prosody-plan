/**
 * Prosody Intelligence Framework v1.5
 * Premium Static Website Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initMetricsAccordion();
    initSmoothScroll();
    initRecordingProgression();
});

/**
 * Navigation Toggle (Mobile)
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
    // Add fade-in class to elements that should animate
    const animateElements = [
        '.section-header',
        '.recording-detail-card',
        '.metric-card',
        '.terminology-card',
        '.comparison-card',
        '.validation-card',
        '.flag-card',
        '.version-item',
        '.recommendation-card',
        '.final-statement'
    ];

    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Metrics Accordion
 */
function initMetricsAccordion() {
    const metricCards = document.querySelectorAll('.metric-card');

    metricCards.forEach(card => {
        const header = card.querySelector('.metric-card-header');
        
        header.addEventListener('click', () => {
            // Close all other cards
            metricCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });

            // Toggle current card
            card.classList.toggle('active');
        });
    });

    // Open first card by default
    if (metricCards.length > 0) {
        metricCards[0].classList.add('active');
    }
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Recording Progression Animation
 */
function initRecordingProgression() {
    const recordingCards = document.querySelectorAll('.recording-card');
    
    // Add staggered animation delay
    recordingCards.forEach((card, index) => {
        card.style.animationDelay = `${0.5 + index * 0.15}s`;
    });

    // Add hover effect for metric tags
    recordingCards.forEach(card => {
        const tags = card.querySelectorAll('.metric-tags span');
        
        card.addEventListener('mouseenter', () => {
            tags.forEach((tag, index) => {
                tag.style.transitionDelay = `${index * 0.05}s`;
                tag.style.transform = 'scale(1.05)';
                tag.style.background = 'rgba(59, 130, 246, 0.2)';
            });
        });

        card.addEventListener('mouseleave', () => {
            tags.forEach(tag => {
                tag.style.transitionDelay = '0s';
                tag.style.transform = 'scale(1)';
                tag.style.background = '';
            });
        });
    });
}

/**
 * Parallax Effect for Hero Background
 */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

/**
 * Add active state to navigation based on scroll position
 */
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/**
 * Add ripple effect to buttons
 */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple keyframe animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/**
 * Keyboard navigation support
 */
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

/**
 * Performance optimization: Throttle scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations are handled by Intersection Observer
    // This is for any additional scroll-based logic
}, 100));

/**
 * Console branding
 */
console.log('%c Prosody Intelligence Framework v1.5 ', 
    'background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;');
console.log('%c Production Candidate | Engineering Validated ', 
    'background: #22c55e; color: white; padding: 5px 10px; border-radius: 3px; font-size: 12px;');
