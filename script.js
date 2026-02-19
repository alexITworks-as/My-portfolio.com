// === NAVIGATION SCROLL EFFECT ===
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// === SMOOTH SCROLL & ACTIVE NAV LINK ===
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// === MOBILE MENU TOGGLE ===
const burger = document.getElementById('burger');
const navLinksContainer = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinksContainer.classList.remove('active');
    });
});

// === TYPING EFFECT ===
const typingText = document.querySelector('.typing-effect');
const text = 'console.log("Hello World");';
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingText.textContent = text.substring(0, index + 1);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// === SKILL BARS ANIMATION ===
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                bar.style.width = bar.style.getPropertyValue('--progress');
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    skillsObserver.observe(category);
});

// === FADE IN ANIMATION ON SCROLL ===
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all sections for fade-in effect
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeObserver.observe(section);
});

// === PROJECT CARDS STAGGER ANIMATION ===
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// === PARALLAX EFFECT FOR HERO ===
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }
});

// === INTERACTIVE CURSOR EFFECT ===
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.classList.add('cursor-follower');
document.body.appendChild(cursorFollower);

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;
    
    followerX += distX / 10;
    followerY += distY / 10;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
}

animateFollower();

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .about-card, .service-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// === FORM SUBMISSION WITH EMAILJS ===
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span>Надсилання...</span>';
    submitBtn.disabled = true;
    
    // Отримуємо дані з форми
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Відправка через EmailJS
    emailjs.send('service_7zneuza', 'template_dtfo8af', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            submitBtn.innerHTML = '<span>✓ Надіслано!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, function(error) {
            console.error('FAILED...', error);
            
            // Show error message
            submitBtn.innerHTML = '<span>❌ Помилка!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        });
});

// === 3D TILT EFFECT FOR PROJECT CARDS ===
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// === ANIMATED COUNTER FOR ABOUT CARDS ===
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const text = card.querySelector('p').textContent;
            const match = text.match(/(\d+)/);
            
            if (match) {
                const number = parseInt(match[0]);
                const counterElement = document.createElement('span');
                card.querySelector('p').textContent = card.querySelector('p').textContent.replace(match[0], '');
                card.querySelector('p').prepend(counterElement);
                animateCounter(counterElement, number);
            }
            
            counterObserver.unobserve(card);
        }
    });
}, observerOptions);

const aboutCards = document.querySelectorAll('.about-card');
aboutCards.forEach(card => {
    counterObserver.observe(card);
});

// === FLOATING ANIMATION FOR CODE ELEMENTS ===
const floatItems = document.querySelectorAll('.float-item');
floatItems.forEach((item, index) => {
    item.style.setProperty('--delay', `${index * 0.5}s`);
});

// === GRADIENT BACKGROUND MOUSE MOVEMENT ===
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const moveX = (x - 0.5) * speed;
        const moveY = (y - 0.5) * speed;
        
        orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// === SCROLL REVEAL ANIMATIONS ===
const revealElements = document.querySelectorAll('.about-card, .skill-category, .service-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0.9)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    revealObserver.observe(el);
});

// === PARTICLE EFFECT ON CLICK ===
function createParticles(x, y) {
    const colors = ['#667eea', '#764ba2', '#f093fb'];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 12;
        const velocity = 2 + Math.random() * 3;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        const animate = () => {
            posX += vx;
            posY += vy;
            opacity -= 0.02;
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// Add particle effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A' || e.target.getAttribute('href') === '#') {
            createParticles(e.clientX, e.clientY);
        }
    });
});

// === ADD GLITCH EFFECT TO TITLE ===
const heroTitle = document.querySelector('.hero-title');
let glitchInterval;

function addGlitchEffect() {
    const originalText = heroTitle.innerHTML;
    
    glitchInterval = setInterval(() => {
        if (Math.random() > 0.95) {
            heroTitle.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(102, 126, 234, 0.7),
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(240, 147, 251, 0.7)
            `;
            
            setTimeout(() => {
                heroTitle.style.textShadow = '';
            }, 50);
        }
    }, 100);
}

// Start glitch effect occasionally
setInterval(() => {
    if (Math.random() > 0.7) {
        addGlitchEffect();
        setTimeout(() => {
            clearInterval(glitchInterval);
        }, 500);
    }
}, 5000);

// === CUSTOM CURSOR STYLES ===
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 10px;
        height: 10px;
        border: 2px solid #667eea;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.2s ease, border-color 0.2s ease;
        transform: translate(-50%, -50%);
    }
    
    .cursor-follower {
        width: 30px;
        height: 30px;
        border: 1px solid rgba(102, 126, 234, 0.3);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.3s ease, border-color 0.3s ease;
        transform: translate(-50%, -50%);
    }
    
    .custom-cursor.hover {
        transform: translate(-50%, -50%) scale(1.5);
        border-color: #f093fb;
    }
    
    .cursor-follower.hover {
        transform: translate(-50%, -50%) scale(1.8);
        border-color: rgba(240, 147, 251, 0.5);
        background: rgba(240, 147, 251, 0.1);
    }
    
    @media (max-width: 968px) {
        .custom-cursor,
        .cursor-follower {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// === LAZY LOAD IMAGES ===
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// === PERFORMANCE: Throttle scroll events ===
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function(...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime < delay) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                lastExecTime = currentTime;
                func.apply(this, args);
            }, delay);
        } else {
            lastExecTime = currentTime;
            func.apply(this, args);
        }
    };
}

// Apply throttle to scroll-heavy functions
window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

// === DOWNLOAD CV AS ZIP ===
document.getElementById('downloadCV').addEventListener('click', async function(e) {
    e.preventDefault();
    
    try {
        // Показуємо повідомлення про завантаження
        console.log('Preparing download...');
        
        // Створюємо новий ZIP архів
        const zip = new JSZip();
        
        // Читаємо вміст поточних файлів
        const htmlContent = await fetch('index.html').then(r => r.text());
        const cssContent = await fetch('styles.css').then(r => r.text());
        const jsContent = await fetch('script.js').then(r => r.text());
        
        // Додаємо файли до архіву
        zip.file('index.html', htmlContent);
        zip.file('styles.css', cssContent);
        zip.file('script.js', jsContent);
        
        // Додаємо README файл з інструкцією
        const readmeContent = `# Alex Portfolio Website

## Як використовувати:

1. Розпакуйте всі файли в одну папку
2. Відкрийте файл index.html у браузері
3. Всі стилі та функціонал працюватимуть автоматично

## Файли:
- index.html - головна сторінка
- styles.css - стилі сайту
- script.js - JavaScript функціонал

Насолоджуйтесь! 🚀
`;
        zip.file('README.txt', readmeContent);
        
        // Генеруємо ZIP файл
        const content = await zip.generateAsync({type: 'blob'});
        
        // Зберігаємо файл
        saveAs(content, 'alex-portfolio.zip');
        
        console.log('✅ Download complete!');
    } catch (error) {
        console.error('Error creating zip:', error);
        alert('Помилка при створенні архіву. Спробуйте ще раз.');
    }
});

console.log('🚀 Portfolio loaded successfully!');
console.log('Built with ❤️ using HTML, CSS & JavaScript');

// EMAIL POPUP
const emailIcon = document.getElementById("emailIcon");
const emailPopup = document.getElementById("emailPopup");
const copyBtn = document.getElementById("copyEmailBtn");
const emailText = document.getElementById("emailText");

// open popup
emailIcon.addEventListener("click", (e) => {
    e.preventDefault();
    emailPopup.style.display = "flex";
});

// close popup when clicking background
emailPopup.addEventListener("click", (e) => {
    if (e.target === emailPopup) {
        emailPopup.style.display = "none";
    }
});
// copy email
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(emailText.textContent).then(() => {
        copyBtn.textContent = "Copied ✅";
        setTimeout(() => {
            emailPopup.style.display = "none";
            copyBtn.textContent = "Copy email";
        }, 1000);
    });
});
// === EMAIL POPUP FOR CONTACT SECTION (універсальний) ===
// Знаходимо всі можливі email посилання в Contact секції
const contactEmailElements = document.querySelectorAll('.contact-item a[href="#"], .contact-item a[href*="email"], .contact-item .social-link');

contactEmailElements.forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('emailPopup').style.display = 'flex';
    });
});
// === EMAIL POPUP FOR FOOTER ===
const footerEmailIcon = document.querySelector('.footer-social a[aria-label="Email"]');

if (footerEmailIcon) {
    footerEmailIcon.addEventListener('click', (e) => {
        e.preventDefault();
        emailPopup.style.display = 'flex';
    });
}