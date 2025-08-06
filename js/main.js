// ===== CONFIGURATION EMAILJS =====
// Remplacez ces valeurs par vos propres clés EmailJS
const EMAILJS_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID', // À remplacer par votre Service ID
    templateId: 'YOUR_TEMPLATE_ID', // À remplacer par votre Template ID
    publicKey: 'YOUR_PUBLIC_KEY' // À remplacer par votre Public Key
};

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
    
    // Initialiser les fonctionnalités
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    initGallery();
});

// ===== MENU MOBILE =====
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animation du menu burger
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
        });
        
        // Fermer le menu en cliquant sur un lien
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const bars = mobileMenu.querySelectorAll('.bar');
                    bars.forEach(bar => bar.classList.remove('active'));
                }
            });
        });
    }
}

// ===== SCROLL FLUIDE =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Hauteur de la navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== FORMULAIRE DE CONTACT =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject') || 'Contact depuis le site web',
        message: formData.get('message')
    };
    
    // Validation basique
    if (!data.name || !data.email || !data.message) {
        showMessage('Veuillez remplir tous les champs obligatoires.', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showMessage('Veuillez entrer une adresse email valide.', 'error');
        return;
    }
    
    // Désactiver le bouton de soumission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    
    // Envoyer avec EmailJS
    if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.serviceId !== 'YOUR_SERVICE_ID') {
        sendEmailWithEmailJS(data, form, submitBtn, originalText);
    } else {
        // Fallback - simulation d'envoi réussi (à des fins de démonstration)
        setTimeout(() => {
            showMessage('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.', 'success');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 1000);
    }
}

function sendEmailWithEmailJS(data, form, submitBtn, originalText) {
    const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_name: 'Club de Badminton' // Nom du destinataire
    };
    
    emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
        .then(function(response) {
            console.log('Email envoyé avec succès:', response);
            showMessage('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.', 'success');
            form.reset();
        })
        .catch(function(error) {
            console.error('Erreur lors de l\'envoi:', error);
            showMessage('Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.', 'error');
        })
        .finally(function() {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
}

function showMessage(message, type) {
    // Supprimer les anciens messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Créer le nouveau message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    
    // Insérer le message avant le formulaire
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Faire défiler jusqu'au message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Supprimer le message après 5 secondes
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== GALERIE =====
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
    });
}

function openLightbox(src, alt) {
    // Créer la lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${src}" alt="${alt}">
            <div class="lightbox-caption">${alt}</div>
        </div>
    `;
    
    // Ajouter les styles de la lightbox
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    lightboxContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    `;
    
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 8px;
    `;
    
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    lightboxClose.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
        z-index: 2001;
    `;
    
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    lightboxCaption.style.cssText = `
        color: white;
        margin-top: 15px;
        font-size: 16px;
    `;
    
    document.body.appendChild(lightbox);
    
    // Animation d'apparition
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Fermer la lightbox
    const closeLightbox = () => {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
        }, 300);
    };
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Fermer avec Escape
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', handleKeyDown);
        }
    };
    document.addEventListener('keydown', handleKeyDown);
}

// ===== ANIMATIONS AU SCROLL AVANCÉES =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Animation avec délai progressif
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observer différents types d'éléments avec des animations variées
    const elementsToAnimate = document.querySelectorAll('.info-block, .gallery-item, .section-header, .contact-item');
    elementsToAnimate.forEach((el, index) => {
        // Ajouter différents types d'animations selon l'élément
        if (el.classList.contains('info-block')) {
            el.classList.add('fade-up-animation');
        } else if (el.classList.contains('gallery-item')) {
            el.classList.add('scale-animation');
        } else if (el.classList.contains('section-header')) {
            el.classList.add('slide-down-animation');
        } else {
            el.classList.add('slide-left-animation');
        }
        
        observer.observe(el);
    });
}

// ===== ANIMATIONS DE PARTICULES =====
function createParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Créer le conteneur de particules
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    hero.appendChild(particleContainer);
    
    // Créer les particules
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (3 + Math.random() * 4) + 's';
        particleContainer.appendChild(particle);
    }
}

// ===== EFFET DE TYPING =====
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50 + Math.random() * 50);
            }
        };
        
        // Commencer l'animation quand l'élément est visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// ===== CURSEUR PERSONNALISÉ SUPPRIMÉ =====

// ===== EFFET PARALLAX =====
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Initialiser toutes les animations au scroll
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initScrollAnimations();
        createParticleEffect();
        initTypingEffect();
        // initCustomCursor(); // Supprimé - effet moche
        initParallaxEffect();
    }, 100);
});

// ===== NAVIGATION ACTIVE =====
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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
}

// Initialiser la navigation active
document.addEventListener('DOMContentLoaded', updateActiveNavigation);

// ===== INSTRUCTIONS POUR EMAILJS =====
console.log(`
🔧 CONFIGURATION EMAILJS REQUISE
================================

Pour que le formulaire de contact fonctionne, vous devez :

1. Créer un compte sur https://www.emailjs.com/
2. Créer un service email (Gmail, Outlook, etc.)
3. Créer un template d'email
4. Remplacer les valeurs dans EMAILJS_CONFIG :
   - serviceId: Votre Service ID
   - templateId: Votre Template ID  
   - publicKey: Votre Public Key

Template suggéré pour EmailJS :
===============================
Sujet: {{subject}}

Nom: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

Envoyé depuis le site du Club de Badminton
===============================

En attendant, le formulaire simule un envoi réussi.
`);
