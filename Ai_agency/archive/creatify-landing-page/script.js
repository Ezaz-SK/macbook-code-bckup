
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

// Custom Cursor Tracking
class CustomCursor {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.init();
    }

    init() {
        if (!customCursor) return;

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Animate cursor following mouse
        this.animateCursor();

        // Add hover effects for interactive elements
        this.addHoverEffects();

        // Hide default cursor on interactive elements
        this.hideDefaultCursor();
    }

    animateCursor() {
        const animate = () => {
            // Smooth cursor following with lerp
            this.cursorX += (this.mouseX - this.cursorX) * 0.15;
            this.cursorY += (this.mouseY - this.cursorY) * 0.15;

            if (customCursor) {
                customCursor.style.left = `${this.cursorX}px`;
                customCursor.style.top = `${this.cursorY}px`;
            }

            requestAnimationFrame(animate);
        };
        animate();
    }

    addHoverEffects() {
        const interactiveElements = document.querySelectorAll('button, a, .nav-link, .play-button, .simple-btn');

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (customCursor) {
                    customCursor.classList.add('hover');
                }
            });

            element.addEventListener('mouseleave', () => {
                if (customCursor) {
                    customCursor.classList.remove('hover');
                }
            });
        });
    }

    hideDefaultCursor() {
        // Ensure custom cursor works properly
        document.body.style.cursor = 'none';

        // Handle cursor visibility on window events
        document.addEventListener('mouseleave', () => {
            if (customCursor) {
                customCursor.style.opacity = '0';
            }
        });

        document.addEventListener('mouseenter', () => {
            if (customCursor) {
                customCursor.style.opacity = '1';
            }
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
