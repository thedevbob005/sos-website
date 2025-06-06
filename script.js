// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.65)';
        header.style.boxShadow = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Stats counter animation
const observeStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                let currentValue = 0;
                
                // Extract number from text (remove + and other characters)
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                if (numericValue) {
                    const increment = numericValue / 100;
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            target.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            target.textContent = Math.floor(currentValue) + (finalValue.includes('+') ? '+' : '');
                        }
                    }, 20);
                }
                observer.unobserve(target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
};

// Initialize stats animation when DOM is loaded
document.addEventListener('DOMContentLoaded', observeStats);

// Fade in animation for elements
const observeFadeIn = () => {
    const elements = document.querySelectorAll('.team-card, .service-card, .portfolio-item, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Initialize fade in animation
document.addEventListener('DOMContentLoaded', observeFadeIn);

// Add loading class to body when page loads
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Testimonials slider functionality (if needed in the future)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

const showTestimonial = (index) => {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
};

// Initialize testimonials
if (testimonials.length > 0) {
    showTestimonial(currentTestimonial);
}

// Contact form validation (if form is added later)
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Add smooth reveal animation for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.15
    });

    sections.forEach(section => {
        observer.observe(section);
    });
};

document.addEventListener('DOMContentLoaded', revealSections);

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add typing effect to hero title (optional)
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Initialize typing effect for hero title
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the line below if you want typing effect
        // typeWriter(heroTitle, originalText, 50);
    }
});

// Add click to call functionality for phone numbers
document.addEventListener('DOMContentLoaded', () => {
    const phoneNumbers = document.querySelectorAll('.contact-details p');
    phoneNumbers.forEach(phone => {
        if (phone.textContent.match(/\d{10}/)) {
            phone.style.cursor = 'pointer';
            phone.addEventListener('click', () => {
                window.location.href = `tel:${phone.textContent.replace(/\D/g, '')}`;
            });
        }
    });
});

// Add email click functionality
document.addEventListener('DOMContentLoaded', () => {
    const emailElements = document.querySelectorAll('.contact-details p');
    emailElements.forEach(email => {
        if (email.textContent.includes('@')) {
            email.style.cursor = 'pointer';
            email.addEventListener('click', () => {
                window.location.href = `mailto:${email.textContent}`;
            });
        }
    });
});

// Download tracking and user feedback
document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add visual feedback
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            button.style.pointerEvents = 'none';
            
            // Reset button after a short delay
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                button.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))';
                    button.style.pointerEvents = 'auto';
                }, 2000);
            }, 500);
            
            // Track download (you can integrate with analytics here)
            const fileName = button.getAttribute('href').split('/').pop();
            console.log(`Download initiated: ${fileName}`);
        });
    });
});

// Add file type indicators
document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        const href = button.getAttribute('href');
        const fileExtension = href.split('.').pop().toUpperCase();
        
        // Add file type badge
        const badge = document.createElement('span');
        badge.textContent = fileExtension;
        badge.className = 'file-type-badge';
        
        // Insert badge before the button
        button.parentNode.insertBefore(badge, button);
    });
});

// Image modal functionality
function expandImage(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    modal.style.display = 'block';
    modalImg.src = img.src;
    modalImg.alt = img.alt;
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}); 