// SDLC Phase Interactions
document.addEventListener('DOMContentLoaded', () => {
    const sdlcPhases = document.querySelectorAll('.sdlc-phase');
    
    sdlcPhases.forEach(phase => {
        phase.addEventListener('click', () => {
            // Remove active class from all phases
            sdlcPhases.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked phase
            phase.classList.add('active');
            
            // Add pulse animation
            phase.style.animation = 'phasePulse 0.6s ease-out';
            setTimeout(() => {
                phase.style.animation = '';
            }, 600);
        });
        
        // Add hover effects
        phase.addEventListener('mouseenter', () => {
            phase.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        phase.addEventListener('mouseleave', () => {
            if (!phase.classList.contains('active')) {
                phase.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
});

// Add CSS animations for SDLC interactions
const sdlcStyle = document.createElement('style');
sdlcStyle.textContent = `
    @keyframes phasePulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .sdlc-phase.active {
        background: rgba(96, 165, 250, 0.1);
        border-color: rgba(96, 165, 250, 0.3);
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 50px rgba(96, 165, 250, 0.2);
    }
    
    .sdlc-phase.active::before {
        opacity: 1;
    }
    
    .sdlc-phase.active .phase-icon {
        animation: iconGlow 2s ease-in-out infinite;
    }
    
    @keyframes iconGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(96, 165, 250, 0.5); }
        50% { box-shadow: 0 0 30px rgba(96, 165, 250, 0.8); }
    }
`;
document.head.appendChild(sdlcStyle);

// Animate SDLC phases on scroll
const sdlcObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const phases = entry.target.querySelectorAll('.sdlc-phase');
            phases.forEach((phase, index) => {
                setTimeout(() => {
                    phase.style.opacity = '1';
                    phase.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const sdlcSection = document.querySelector('.sdlc');
    if (sdlcSection) {
        sdlcObserver.observe(sdlcSection);
        
        // Set initial state for animation
        const phases = sdlcSection.querySelectorAll('.sdlc-phase');
        phases.forEach(phase => {
            phase.style.opacity = '0';
            phase.style.transform = 'translateY(30px)';
            phase.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });
    }
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link
        const mailtoLink = `mailto:abhishekkumarraj2057@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Thank you! Your email client should open with the message ready to send.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .education-card, .leadership-card, .skill-category');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Skill tags animation
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        tag.style.transition = `opacity 0.3s ease-out ${index * 0.05}s, transform 0.3s ease-out ${index * 0.05}s`;
        
        const tagObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        tagObserver.observe(tag);
    });
});

// Add click-to-copy functionality for contact info
document.addEventListener('DOMContentLoaded', () => {
    const contactItems = document.querySelectorAll('.contact-item a');
    
    contactItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (item.href.startsWith('mailto:') || item.href.startsWith('tel:')) {
                e.preventDefault();
                
                const text = item.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    showNotification(`${text} copied to clipboard!`, 'success');
                }).catch(() => {
                    // Fallback for older browsers
                    window.location.href = item.href;
                });
            }
        });
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);
