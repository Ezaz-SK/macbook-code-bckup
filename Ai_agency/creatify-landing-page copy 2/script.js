// DOM Elements
const playButton = document.getElementById('playButton');
const cookieNotice = document.getElementById('cookieNotice');
const acceptCookies = document.getElementById('acceptCookies');
const declineCookies = document.getElementById('declineCookies');
const customCursor = document.getElementById('customCursor');

// Video Player Functionality
class VideoPlayer {
    constructor() {
        this.isPlaying = false;
        this.init();
    }

    init() {
        if (playButton) {
            playButton.addEventListener('click', () => this.playVideo());
        }
    }

    playVideo() {
        this.isPlaying = !this.isPlaying;

        // Simulate video play functionality
        if (this.isPlaying) {
            this.showVideoPlaying();
        } else {
            this.showVideoPreview();
        }
    }

    showVideoPlaying() {
        const videoPlaceholder = playButton.closest('.video-placeholder');
        const videoPreview = videoPlaceholder.querySelector('.video-preview');
        const videoOverlay = videoPlaceholder.querySelector('.video-overlay');

        // Hide play button and overlay text
        playButton.style.display = 'none';
        if (videoOverlay) {
            videoOverlay.style.opacity = '0';
        }

        // Add playing state visual feedback
        videoPlaceholder.style.background = 'linear-gradient(45deg, #000, #1a1a1a)';
        videoPlaceholder.innerHTML = `
            <div style="color: white; font-size: 1.2rem; font-weight: 500;">
                Video is playing... (Demo Mode)
            </div>
        `;

        // Auto-stop after 3 seconds for demo
        setTimeout(() => {
            this.showVideoPreview();
        }, 3000);
    }

    showVideoPreview() {
        this.isPlaying = false;
        const videoPlaceholder = document.querySelector('.video-placeholder');

        // Restore original preview state
        videoPlaceholder.innerHTML = `
            <div class="video-preview">
                <div class="play-button" id="playButton">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="30" fill="rgba(255,255,255,0.9)"/>
                        <polygon points="25,20 25,40 40,30" fill="#8B5CF6"/>
                    </svg>
                </div>
            </div>
            <div class="video-overlay">
                <p>Watch how Creatify transforms your product photography workflow</p>
            </div>
        `;

        // Reinitialize play button
        this.init();
    }
}

// Cookie Consent Functionality
class CookieConsent {
    constructor() {
        this.init();
    }

    init() {
        // Check if user has already made a choice
        if (localStorage.getItem('cookieConsent')) {
            this.hideCookieNotice();
            return;
        }

        // Show cookie notice
        this.showCookieNotice();

        // Add event listeners
        if (acceptCookies) {
            acceptCookies.addEventListener('click', () => this.acceptCookies());
        }

        if (declineCookies) {
            declineCookies.addEventListener('click', () => this.declineCookies());
        }
    }

    showCookieNotice() {
        if (cookieNotice) {
            cookieNotice.style.display = 'block';
            // Animate in
            setTimeout(() => {
                cookieNotice.style.transform = 'translateY(0)';
                cookieNotice.style.opacity = '1';
            }, 100);
        }
    }

    hideCookieNotice() {
        if (cookieNotice) {
            cookieNotice.style.transform = 'translateY(100%)';
            cookieNotice.style.opacity = '0';
            setTimeout(() => {
                cookieNotice.style.display = 'none';
            }, 300);
        }
    }

    acceptCookies() {
        localStorage.setItem('cookieConsent', 'accepted');
        this.hideCookieNotice();
        console.log('Cookies accepted');
    }

    declineCookies() {
        localStorage.setItem('cookieConsent', 'declined');
        this.hideCookieNotice();
        console.log('Cookies declined');
    }
}

// Navigation Enhancements
class NavigationEnhancements {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling for any anchor links
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

        // Add hover effects to buttons
        this.enhanceButtons();
    }

    enhanceButtons() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
}

// Loading Animation
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        // Add fade-in animation to main content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(20px)';

            setTimeout(() => {
                mainContent.style.transition = 'all 0.8s ease-out';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }, 200);
        }
    }
}

// Custom Cursor Implementation
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector(".custom-cursor");
        this.links = document.querySelectorAll("a, button, .play-button, .simple-btn");
        this.isCursorInited = false;
        this.init();
    }

    init() {
        if (!this.cursor) return;

        // Add event listeners for links
        this.links.forEach((link) => {
            link.addEventListener("mouseover", () => {
                this.cursor.classList.add("custom-cursor--link");
            });

            link.addEventListener("mouseout", () => {
                this.cursor.classList.remove("custom-cursor--link");
            });
        });

        // Track mouse movement
        document.addEventListener("mousemove", (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            if (!this.isCursorInited) {
                this.initCursor();
            }

            this.cursor.style = `translate: ${mouseX}px ${mouseY}px`;
        });

        document.addEventListener("mouseout", this.destroyCursor.bind(this));
    }

    initCursor() {
        this.cursor.classList.add("custom-cursor--init");
        this.isCursorInited = true;
    }

    destroyCursor() {
        this.cursor.classList.remove("custom-cursor--init");
        this.isCursorInited = false;
    }
}

// Scroll-triggered Animations and Parallax Effects
class ScrollAnimations {
    constructor() {
        this.elements = [];
        this.parallaxElements = [];
        this.init();
    }

    init() {
        // Initialize scroll-triggered animations
        this.setupScrollReveals();
        this.setupParallax();
        this.bindEvents();
    }

    setupScrollReveals() {
        const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-scale');

        revealElements.forEach((element, index) => {
            // Add slight delay for staggered animations
            element.style.transitionDelay = `${index * 0.1}s`;
            this.elements.push(element);
        });
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');

        parallaxElements.forEach(element => {
            this.parallaxElements.push(element);
        });
    }

    bindEvents() {
        let ticking = false;

        const updateAnimations = () => {
            this.updateScrollReveals();
            this.updateParallax();
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        };

        // Throttled scroll event
        window.addEventListener('scroll', utils.debounce(requestTick, 16));
        // Initial call
        updateAnimations();
    }

    updateScrollReveals() {
        this.elements.forEach(element => {
            if (this.isElementInViewport(element, 0.1)) {
                element.classList.add('revealed');
            }
        });
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        this.parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    isElementInViewport(element, threshold = 0) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const elementTop = rect.top;
        const elementBottom = rect.bottom;

        return (
            elementTop <= windowHeight * (1 - threshold) &&
            elementBottom >= windowHeight * threshold
        );
    }
}

// Enhanced Loading Animation with Stagger Effects
class EnhancedLoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        // Enhanced page load animation
        this.animatePageLoad();
        this.setupLoadingElements();
    }

    animatePageLoad() {
        const mainContent = document.querySelector('.main-content');
        const subtitle = document.querySelector('.subtitle');
        const mainHeading = document.querySelector('.main-heading');
        const description = document.querySelector('.description');

        if (mainContent) {
            // Initial state
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(30px)';

            // Animate in with stagger
            setTimeout(() => {
                if (subtitle) {
                    subtitle.style.opacity = '1';
                    subtitle.style.transform = 'translateY(0)';
                }
            }, 200);

            setTimeout(() => {
                if (mainHeading) {
                    mainHeading.style.opacity = '1';
                    mainHeading.style.transform = 'translateY(0)';
                }
            }, 400);

            setTimeout(() => {
                if (description) {
                    description.style.opacity = '1';
                    description.style.transform = 'translateY(0)';
                }
            }, 600);

            setTimeout(() => {
                mainContent.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }, 800);
        }
    }

    setupLoadingElements() {
        // Add loading animations to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';

            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 1000 + (index * 200));
        });

        // Animate transformation showcase
        const transformationShowcase = document.querySelector('.transformation-showcase');
        if (transformationShowcase) {
            transformationShowcase.style.opacity = '0';
            transformationShowcase.style.transform = 'translateY(50px)';

            setTimeout(() => {
                transformationShowcase.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                transformationShowcase.style.opacity = '1';
                transformationShowcase.style.transform = 'translateY(0)';
            }, 1500);
        }
    }
}

// Enhanced Hover Interactions
class EnhancedHoverEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupServiceCardHovers();
        this.setupButtonHovers();
        this.setupNavigationHovers();
    }

    setupServiceCardHovers() {
        const serviceCards = document.querySelectorAll('.service-card');

        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.animateServiceCard(card, 'enter');
            });

            card.addEventListener('mouseleave', (e) => {
                this.animateServiceCard(card, 'leave');
            });
        });
    }

    animateServiceCard(card, action) {
        const icon = card.querySelector('.service-icon');
        const overlay = card.querySelector('.ui-process-elements, .ai-process-viz, .photo-process-elements');

        if (action === 'enter') {
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(2deg)';
                icon.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }

            if (overlay) {
                overlay.style.opacity = '0.3';
                overlay.style.transition = 'opacity 0.4s ease';
            }

            // Add subtle glow effect
            card.style.boxShadow = `
                0 20px 40px rgba(0, 0, 0, 0.4),
                0 0 60px rgba(255, 255, 255, 0.08),
                inset 0 1px 0 rgba(255, 255, 255, 0.15)
            `;
        } else {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }

            if (overlay) {
                overlay.style.opacity = '1';
            }

            // Reset glow effect
            card.style.boxShadow = '';
        }
    }

    setupButtonHovers() {
        const buttons = document.querySelectorAll('.btn, .simple-btn');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.animateButton(button, 'enter');
            });

            button.addEventListener('mouseleave', (e) => {
                this.animateButton(button, 'leave');
            });
        });
    }

    animateButton(button, action) {
        if (action === 'enter') {
            button.style.transform = 'translateY(-3px) scale(1.05)';
            button.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.2)';
        } else {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '';
        }
    }

    setupNavigationHovers() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                link.style.transform = 'translateY(-2px)';
                link.style.transition = 'all 0.3s ease';
            });

            link.addEventListener('mouseleave', (e) => {
                link.style.transform = 'translateY(0)';
            });
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    new VideoPlayer();
    new CookieConsent();
    new NavigationEnhancements();
    new LoadingAnimation();
    new CustomCursor();
    new ScrollAnimations();
    new EnhancedLoadingAnimation();
    new EnhancedHoverEffects();

    console.log('Creatify landing page with enhanced animations initialized successfully!');
});

// Add some utility functions
const utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        VideoPlayer,
        CookieConsent,
        NavigationEnhancements,
        LoadingAnimation,
        CustomCursor,
        utils
    };
}