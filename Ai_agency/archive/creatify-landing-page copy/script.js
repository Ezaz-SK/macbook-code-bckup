// DOM Elements
const playButton = document.getElementById('playButton');
const cookieNotice = document.getElementById('cookieNotice');
const acceptCookies = document.getElementById('acceptCookies');
const declineCookies = document.getElementById('declineCookies');

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
        
        // Initialize creative button effects
        this.initCreativeButton();
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

    initCreativeButton() {
        const creativeBtn = document.getElementById('creativeBtn');
        if (!creativeBtn) return;

        this.addMouseTracking(creativeBtn);
        this.addParticleEffects(creativeBtn);
    }

    addMouseTracking(button) {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Update CSS custom properties for glow effect
            button.style.setProperty('--mouse-x', `${x}px`);
            button.style.setProperty('--mouse-y', `${y}px`);
        });

        button.addEventListener('mouseleave', () => {
            // Reset glow position when mouse leaves
            button.style.setProperty('--mouse-x', '50%');
            button.style.setProperty('--mouse-y', '50%');
        });
    }

    addParticleEffects(button) {
        const particles = button.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            // Add random movement to particles
            particle.style.animationDelay = `${index * 0.2}s`;
            particle.style.animationDuration = `${2 + Math.random() * 2}s`;
        });

        // Add click effect
        button.addEventListener('click', (e) => {
            this.createRippleEffect(button, e);
        });

        // Add keyboard support
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    }

    createRippleEffect(button, event) {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Create ripple element
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x - 10}px;
            top: ${y - 10}px;
            width: 20px;
            height: 20px;
            pointer-events: none;
        `;

        button.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
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

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    new VideoPlayer();
    new CookieConsent();
    new NavigationEnhancements();
    new LoadingAnimation();

    console.log('Creatify landing page initialized successfully!');
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
        utils
    };
}