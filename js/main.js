// ===== CONFIGURATION =====
const CONFIG = {
    emailjs: {
        serviceId: 'service_your_id', // À configurer avec votre service EmailJS
        templateId: 'template_your_id', // À configurer avec votre template EmailJS
        publicKey: 'your_public_key' // À configurer avec votre clé publique EmailJS
    },
    animations: {
        duration: 300,
        easing: 'ease-in-out'
    }
};

// ===== UTILITY FUNCTIONS =====
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    static addLoadingClass(element) {
        element.classList.add('loading');
    }

    static removeLoadingClass(element) {
        element.classList.remove('loading');
    }
}

// ===== NAVIGATION MANAGER =====
class NavigationManager {
    constructor() {
        this.mobileNav = document.querySelector('.mobile-nav');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navOverlay = document.querySelector('.nav-overlay');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.header = document.querySelector('.header');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
        this.setActiveNavLink();
    }

    bindEvents() {
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileNav());
        }

        if (this.navOverlay) {
            this.navOverlay.addEventListener('click', () => this.closeMobileNav());
        }

        // Close mobile nav when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileNav());
        });

        // Handle scroll for header background
        window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 100));

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMobileNav();
        });
    }

    toggleMobileNav() {
        const isOpen = this.mobileNav.classList.contains('active');
        if (isOpen) {
            this.closeMobileNav();
        } else {
            this.openMobileNav();
        }
    }

    openMobileNav() {
        this.mobileNav.classList.add('active');
        this.navToggle.classList.add('active');
        this.navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add animation delay to nav items
        const navItems = this.mobileNav.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    closeMobileNav() {
        this.mobileNav.classList.remove('active');
        this.navToggle.classList.remove('active');
        this.navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove animation delays
        const navItems = this.mobileNav.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.style.transitionDelay = '';
        });
    }

    handleScroll() {
        if (!this.header) return;
        
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }

    setActiveNavLink() {
        const currentPath = window.location.pathname;
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath.includes(href) && href !== '/')) {
                link.classList.add('active');
            }
        });
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('[data-animate]');
        this.counters = document.querySelectorAll('[data-counter]');
        this.progressBars = document.querySelectorAll('[data-progress]');
        
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.handleScroll();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe animated elements
        this.animatedElements.forEach(element => {
            this.observer.observe(element);
        });

        // Observe counters
        this.counters.forEach(counter => {
            this.observer.observe(counter);
        });

        // Observe progress bars
        this.progressBars.forEach(bar => {
            this.observer.observe(bar);
        });
    }

    animateElement(element) {
        const animationType = element.dataset.animate;
        const delay = element.dataset.delay || 0;

        setTimeout(() => {
            element.classList.add('animate');
            
            // Handle specific animation types
            switch (animationType) {
                case 'counter':
                    this.animateCounter(element);
                    break;
                case 'progress':
                    this.animateProgressBar(element);
                    break;
                case 'fade-up':
                    element.classList.add('fade-up');
                    break;
                case 'fade-in':
                    element.classList.add('fade-in');
                    break;
                case 'slide-left':
                    element.classList.add('slide-left');
                    break;
                case 'slide-right':
                    element.classList.add('slide-right');
                    break;
            }
        }, delay);

        // Unobserve after animation
        this.observer.unobserve(element);
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.counter);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    animateProgressBar(element) {
        const progress = element.dataset.progress;
        const bar = element.querySelector('.progress-fill');
        
        if (bar) {
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 300);
        }
    }

    handleScroll() {
        // Parallax effect for hero sections
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', Utils.throttle(() => {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16));
    }
}

// ===== GALLERY MANAGER =====
class GalleryManager {
    constructor() {
        this.gallery = document.querySelector('.gallery');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.lightbox = null;
        
        if (this.gallery) {
            this.init();
        }
    }

    init() {
        this.bindEvents();
        this.createLightbox();
    }

    bindEvents() {
        // Filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.dataset.filter;
                this.filterGallery(filter);
                this.updateActiveFilter(button);
            });
        });

        // Gallery items click
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openLightbox(index);
            });
        });
    }

    filterGallery(filter) {
        this.galleryItems.forEach(item => {
            const itemCategory = item.dataset.category;
            
            if (filter === 'all' || itemCategory === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('show');
                }, 50);
            } else {
                item.classList.remove('show');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    updateActiveFilter(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    createLightbox() {
        // Create lightbox HTML
        const lightboxHTML = `
            <div class="lightbox" id="lightbox">
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <button class="lightbox-prev">&#8249;</button>
                    <button class="lightbox-next">&#8250;</button>
                    <img class="lightbox-image" src="" alt="">
                    <div class="lightbox-caption"></div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        this.lightbox = document.getElementById('lightbox');
        
        // Bind lightbox events
        this.bindLightboxEvents();
    }

    bindLightboxEvents() {
        const overlay = this.lightbox.querySelector('.lightbox-overlay');
        const closeBtn = this.lightbox.querySelector('.lightbox-close');
        const prevBtn = this.lightbox.querySelector('.lightbox-prev');
        const nextBtn = this.lightbox.querySelector('.lightbox-next');

        // Close lightbox
        [overlay, closeBtn].forEach(element => {
            element.addEventListener('click', () => this.closeLightbox());
        });

        // Navigation
        prevBtn.addEventListener('click', () => this.prevImage());
        nextBtn.addEventListener('click', () => this.nextImage());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.prevImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });
    }

    openLightbox(index) {
        this.currentIndex = index;
        this.updateLightboxImage();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    prevImage() {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.galleryItems.length - 1;
        this.updateLightboxImage();
    }

    nextImage() {
        this.currentIndex = this.currentIndex < this.galleryItems.length - 1 ? this.currentIndex + 1 : 0;
        this.updateLightboxImage();
    }

    updateLightboxImage() {
        const currentItem = this.galleryItems[this.currentIndex];
        const img = currentItem.querySelector('img');
        const lightboxImg = this.lightbox.querySelector('.lightbox-image');
        const caption = this.lightbox.querySelector('.lightbox-caption');

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        caption.textContent = img.alt;
    }
}

// ===== CONTACT FORM MANAGER =====
class ContactFormManager {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.submitBtn = document.querySelector('.contact-submit');
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.bindEvents();
        this.initEmailJS();
    }

    initEmailJS() {
        if (window.emailjs && CONFIG.emailjs.publicKey) {
            emailjs.init(CONFIG.emailjs.publicKey);
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        this.setLoadingState(true);

        try {
            await this.sendEmail();
            this.showSuccess();
            this.form.reset();
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            this.showError('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            this.setLoadingState(false);
        }
    }

    async sendEmail() {
        if (!window.emailjs) {
            throw new Error('EmailJS non initialisé');
        }

        const formData = new FormData(this.form);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_name: 'Club de Badminton'
        };

        return emailjs.send(
            CONFIG.emailjs.serviceId,
            CONFIG.emailjs.templateId,
            templateParams
        );
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name;

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'Ce champ est requis');
            return false;
        }

        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Veuillez entrer une adresse email valide');
                return false;
            }
        }

        // Phone validation
        if (name === 'phone' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                this.showFieldError(field, 'Veuillez entrer un numéro de téléphone valide');
                return false;
            }
        }

        return true;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.disabled = true;
            this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
        }
    }

    showSuccess() {
        this.showNotification('Message envoyé avec succès!', 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification__close">&times;</button>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        // Manual close
        notification.querySelector('.notification__close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
}

// ===== PAGE SPECIFIC MANAGERS =====
class PageSpecificManager {
    constructor() {
        this.init();
    }

    init() {
        // Calendar functionality for competition pages
        this.initCalendar();
        
        // Statistics animation
        this.initStatsAnimation();
        
        // Tab functionality
        this.initTabs();
    }

    initCalendar() {
        const calendarTabs = document.querySelectorAll('.calendar-tab');
        const calendarContents = document.querySelectorAll('.calendar-content');

        calendarTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.dataset.calendar;
                
                // Update active tab
                calendarTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Update active content
                calendarContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === targetId) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }

    initStatsAnimation() {
        const statCards = document.querySelectorAll('.stat-card');
        
        statCards.forEach(card => {
            const counter = card.querySelector('[data-counter]');
            if (counter) {
                // Will be handled by ScrollAnimations class
                counter.dataset.animate = 'counter';
            }
        });
    }

    initTabs() {
        const tabGroups = document.querySelectorAll('.tabs');
        
        tabGroups.forEach(group => {
            const tabs = group.querySelectorAll('.tab-button');
            const contents = group.querySelectorAll('.tab-content');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const targetId = tab.dataset.tab;
                    
                    // Update active tab
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    // Update active content
                    contents.forEach(content => {
                        content.classList.remove('active');
                        if (content.id === targetId) {
                            content.classList.add('active');
                        }
                    });
                });
            });
        });
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalImages();
        this.handleImageErrors();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => {
                img.classList.add('lazy');
                imageObserver.observe(img);
            });
        }
    }

    preloadCriticalImages() {
        const criticalImages = document.querySelectorAll('img[loading="eager"]');
        criticalImages.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src;
            document.head.appendChild(link);
        });
    }

    handleImageErrors() {
        // Handle broken images by providing fallbacks
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', (e) => {
                console.warn(`Image failed to load: ${img.src}`);
                
                // Create a placeholder SVG
                const placeholderSvg = this.createPlaceholderSvg(img.alt || 'Image');
                img.src = placeholderSvg;
                img.classList.add('placeholder-image');
            });

            // Ensure all images have alt text for accessibility
            if (!img.alt) {
                img.alt = 'Image du club de badminton';
            }
        });
    }

    createPlaceholderSvg(text = 'Image') {
        const svg = `
            <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#f3f4f6"/>
                <rect x="20" y="20" width="360" height="260" fill="#e5e7eb" stroke="#d1d5db" stroke-width="2" stroke-dasharray="5,5"/>
                <text x="200" y="140" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="16">${text}</text>
                <text x="200" y="160" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="12">Image indisponible</text>
            </svg>
        `;
        return 'data:image/svg+xml;base64,' + btoa(svg);
    }
}

// ===== MAIN INITIALIZATION =====
class App {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Initialize core components
            this.components.navigation = new NavigationManager();
            this.components.scrollAnimations = new ScrollAnimations();
            this.components.performance = new PerformanceManager();
            
            // Initialize conditional components
            if (document.querySelector('.gallery')) {
                this.components.gallery = new GalleryManager();
            }
            
            if (document.querySelector('.contact-form')) {
                this.components.contactForm = new ContactFormManager();
            }
            
            // Initialize page-specific features
            this.components.pageSpecific = new PageSpecificManager();
            
            console.log('App initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }
}

// Initialize the application
const app = new App();

// Export for potential external use
window.ClubApp = app;
