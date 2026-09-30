// Smooth scroll for navigation links
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

// Navbar scroll effect - sticky with background on scroll
const navbar = document.querySelector('.navbar');
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const heroHeight = hero ? hero.offsetHeight : 0;
    
    // Add scrolled class when past the hero section
    if (currentScroll > heroHeight - 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add animation on scroll for sections
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

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Product button interactions
document.querySelectorAll('.btn-product').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.closest('.product-info').querySelector('h3').textContent;
        alert(`${productName} added to cart!`);
    });
});

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Add subtle parallax effect to hero bottles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const bottles = document.querySelectorAll('.bottle');
    
    bottles.forEach((bottle, index) => {
        const speed = 0.1 + (index * 0.05);
        const rotate = (index - 1) * 5;
        bottle.style.transform = `translateY(${scrolled * speed}px) rotate(${rotate}deg)`;
    });
});

// Water Drops Animation
function createWaterDrop() {
    const container = document.getElementById('waterDrops');
    if (!container) return;
    
    const drop = document.createElement('div');
    drop.className = 'water-drop';
    
    // Random position
    const left = Math.random() * 100;
    drop.style.left = `${left}%`;
    
    // Random size
    const size = Math.random() * 4 + 2;
    drop.style.width = `${size}px`;
    drop.style.height = `${size}px`;
    
    // Random duration
    const duration = Math.random() * 3 + 2;
    drop.style.animationDuration = `${duration}s`;
    
    // Random delay
    const delay = Math.random() * 2;
    drop.style.animationDelay = `${delay}s`;
    
    container.appendChild(drop);
    
    // Remove drop after animation
    setTimeout(() => {
        drop.remove();
    }, (duration + delay) * 1000);
}

// Create water drops continuously
function startWaterDrops() {
    // Create initial drops
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createWaterDrop(), i * 100);
    }
    
    // Continue creating drops
    setInterval(createWaterDrop, 200);
}

// Start water drops when page loads
window.addEventListener('load', startWaterDrops);

// Enhanced hover effects for cards
document.querySelectorAll('.about-card, .product-card, .stat-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Button ripple effect
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-product, .nav-cta').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple effect dynamically
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

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect to hero subtitle when visible
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    const subtitleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter(heroSubtitle, originalText, 30);
                subtitleObserver.unobserve(entry.target);
            }
        });
    });
    subtitleObserver.observe(heroSubtitle);
}
