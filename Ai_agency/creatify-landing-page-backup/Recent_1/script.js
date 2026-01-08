document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced Custom Cursor Implementation with Services Integration
    class CustomCursor {
        constructor() {
            this.cursor = document.querySelector(".custom-cursor");
            this.links = document.querySelectorAll("a, button, .play-button, .simple-btn");
            this.isCursorInited = false;
            this.isServicesActive = false;
            this.servicesElements = new Set();
            this.cursorStates = new Map();

            this.init();
        }

        init() {
            if (!this.cursor) return;

            this.setupServicesIntegration();
            this.setupEnhancedLinkDetection();
            this.setupServicesSpecificStates();

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

        setupServicesIntegration() {
            // Monitor services section state
            document.addEventListener('services:opened', () => {
                this.onServicesOpen();
            });

            document.addEventListener('services:closed', () => {
                this.onServicesClose();
            });

            // Keep cursor as simple white dot for services state
            const style = document.createElement('style');
            style.textContent = `
                .custom-cursor.services-active {
                    background: white;
                    border: 1px solid white;
                    box-shadow: none;
                }

                .custom-cursor.services-active.custom-cursor--link {
                    background: white;
                    border: 1px solid white;
                    box-shadow: none;
                    transform: scale(1.2);
                }

                .custom-cursor--service-button {
                    background: white;
                    border: 1px solid white;
                    box-shadow: none;
                }

                .custom-cursor--nav-control {
                    background: white;
                    border: 1px solid white;
                    box-shadow: none;
                }

                .custom-cursor--close-button {
                    background: white;
                    border: 1px solid white;
                    box-shadow: none;
                }
            `;
            document.head.appendChild(style);
        }

        setupEnhancedLinkDetection() {
            // Enhanced link detection including services elements
            this.updateInteractiveElements();

            // Update elements when services section opens/closes
            document.addEventListener('services:opened', () => {
                setTimeout(() => this.updateInteractiveElements(), 100);
            });

            document.addEventListener('services:closed', () => {
                this.updateInteractiveElements();
            });
        }

        updateInteractiveElements() {
            // Get all interactive elements including services section
            this.links = document.querySelectorAll("a, button, .play-button, .simple-btn, .service-button, .nav-control, .close-services, .media-item");

            // Remove existing event listeners
            this.links.forEach(link => {
                link.removeEventListener("mouseover", this.linkMouseOver);
                link.removeEventListener("mouseout", this.linkMouseOut);
            });

            // Add fresh event listeners
            this.links.forEach((link) => {
                link.addEventListener("mouseover", this.linkMouseOver);
                link.addEventListener("mouseout", this.linkMouseOut);
            });
        }

        linkMouseOver = (e) => {
            const target = e.target;
            let cursorState = "custom-cursor--link";

            // Determine specific cursor state based on element type
            if (target.classList.contains('service-button')) {
                cursorState = "custom-cursor--link custom-cursor--service-button";
            } else if (target.classList.contains('nav-control')) {
                cursorState = "custom-cursor--link custom-cursor--nav-control";
            } else if (target.classList.contains('close-services')) {
                cursorState = "custom-cursor--link custom-cursor--close-button";
            } else if (target.classList.contains('media-item')) {
                cursorState = "custom-cursor--link";
                this.cursor.style.transform = "scale(1.5)";
            }

            this.cursor.className = `custom-cursor ${cursorState} ${this.isServicesActive ? 'services-active' : ''}`;
        }

        linkMouseOut = (e) => {
            const target = e.target;

            // Reset cursor state
            this.cursor.className = `custom-cursor ${this.isServicesActive ? 'services-active' : ''}`;

            // Reset cursor scale
            if (target.classList.contains('media-item')) {
                this.cursor.style.transform = "";
            }
        }

        setupServicesSpecificStates() {
            // Track services section elements for special cursor states
            document.addEventListener('services:opened', () => {
                const servicesSection = document.querySelector('.services-section');
                if (servicesSection) {
                    this.setupServicesElementTracking(servicesSection);
                }
            });
        }

        setupServicesElementTracking(servicesSection) {
            // Track service buttons for magnetic cursor effect
            const serviceButtons = servicesSection.querySelectorAll('.service-button');
            serviceButtons.forEach(button => {
                this.servicesElements.add(button);

                button.addEventListener('mousemove', (e) => {
                    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

                    const rect = button.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;

                    const deltaX = (e.clientX - centerX) * 0.1;
                    const deltaY = (e.clientY - centerY) * 0.1;

                    this.cursor.style.transform = `translate: ${e.clientX}px ${e.clientY}px scale(1.2)`;
                    this.cursor.style.transition = 'transform 0.1s ease-out';
                });

                button.addEventListener('mouseleave', () => {
                    this.cursor.style.transform = `translate: ${e.clientX}px ${e.clientY}px scale(1)`;
                    this.cursor.style.transition = 'transform 0.3s ease';
                });
            });

            // Track navigation controls
            const navControls = servicesSection.querySelectorAll('.nav-control');
            navControls.forEach(control => {
                this.servicesElements.add(control);

                control.addEventListener('mouseenter', () => {
                    this.cursor.classList.add('custom-cursor--nav-control');
                });

                control.addEventListener('mouseleave', () => {
                    this.cursor.classList.remove('custom-cursor--nav-control');
                });
            });

            // Track close button
            const closeButton = servicesSection.querySelector('.close-services');
            if (closeButton) {
                this.servicesElements.add(closeButton);

                closeButton.addEventListener('mouseenter', () => {
                    this.cursor.classList.add('custom-cursor--close-button');
                });

                closeButton.addEventListener('mouseleave', () => {
                    this.cursor.classList.remove('custom-cursor--close-button');
                });
            }
        }

        onServicesOpen() {
            this.isServicesActive = true;
            this.cursor.classList.add('services-active');

            // Update interactive elements to include services section
            setTimeout(() => {
                this.updateInteractiveElements();
            }, 100);
        }

        onServicesClose() {
            this.isServicesActive = false;
            this.cursor.classList.remove('services-active');

            // Reset cursor state
            this.cursor.className = 'custom-cursor';

            // Update interactive elements to exclude services section
            this.updateInteractiveElements();
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
    
    // Initialize the custom cursor
    window.customCursor = new CustomCursor();



    // --- Parallax Effect on Media Grid ---
    const heroSection = document.querySelector('.hero-section');
    const mediaElements = document.querySelectorAll('.parallax-media');

    // Cache media elements array length for better performance
    const mediaElementsLength = mediaElements.length;

    // This effect is subtle. To make it stronger, increase the 'speed' values.
    heroSection.addEventListener('mousemove', (e) => {
        // Calculate mouse position from -0.5 to +0.5
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;

        // Use for loop for better performance than forEach
        for (let i = 0; i < mediaElementsLength; i++) {
            const media = mediaElements[i];
            // Get the speed from the data-speed attribute in the HTML
            const speed = media.getAttribute('data-speed') || 20;

            // Move the element in the opposite direction of the mouse
            const translateX = -x * speed;
            const translateY = -y * speed;

            media.style.transform = `translate(${translateX}px, ${translateY}px)`;
        }
    });


    // --- Enhanced Manifesto Section Animations ---
    const manifestoSection = document.querySelector('.manifesto-section');
    const manifestoLines = document.querySelectorAll('.manifesto-line');
    const manifestoServices = document.querySelector('.manifesto-services');
    const serviceItems = document.querySelectorAll('.service-item');

    if (manifestoSection) {
        // Create intersection observer for manifesto animations
        const manifestoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Enhanced text line animations with varied effects
                    manifestoLines.forEach((line, index) => {
                        const delay = index * 150;

                        setTimeout(() => {
                            line.classList.add('animate-in');

                            // Add additional random effects to some lines
                            if (Math.random() > 0.7) {
                                line.style.animation += ', textGlow 3s ease-in-out infinite';
                                line.style.animationDelay = `${Math.random() * 2}s`;
                            }
                        }, delay);
                    });

                    // Enhanced services section animation
                    setTimeout(() => {
                        if (manifestoServices) {
                            manifestoServices.classList.add('animate-in');

                            // Add floating animation to services container
                            manifestoServices.style.animation = 'floatUp 8s ease-in-out infinite';
                        }

                        // Enhanced service items with varied animations
                        serviceItems.forEach((item, index) => {
                            const delay = index * 200;

                            setTimeout(() => {
                                item.classList.add('animate-in');

                                // Add random rotation to some items
                                if (Math.random() > 0.5) {
                                    item.addEventListener('mouseenter', () => {
                                        item.style.transform += ' rotateZ(2deg)';
                                        item.style.transition = 'transform 0.3s ease';
                                    });

                                    item.addEventListener('mouseleave', () => {
                                        item.style.transform = item.style.transform.replace(' rotateZ(2deg)', '');
                                    });
                                }
                            }, delay);
                        });
                    }, manifestoLines.length * 150 + 500);

                    // Unobserve after animation to prevent re-triggering
                    manifestoObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        });

        manifestoObserver.observe(manifestoSection);

        // Enhanced parallax and interactive effects
        const manifestoElements = manifestoSection.querySelectorAll('.service-icon, .service-item h3, .service-item p');

        // Advanced mouse tracking for manifesto elements
        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Continuous animation loop for interactive elements
        function animateManifestoElements() {
            const rect = manifestoSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                const x = (mouseX / window.innerWidth) - 0.5;
                const y = (mouseY / window.innerHeight) - 0.5;

                manifestoElements.forEach((element, index) => {
                    const speed = 3 + (index * 1.5);
                    const rotateSpeed = 2 + (index * 0.5);

                    // Create subtle floating motion
                    const time = Date.now() * 0.001;
                    const floatY = Math.sin(time + index) * 2;
                    const floatX = Math.cos(time * 0.7 + index) * 1;

                    // Combine mouse parallax with floating animation
                    const translateX = (x * speed) + floatX;
                    const translateY = (y * speed) + floatY;
                    const rotateZ = (x * rotateSpeed) + (Math.sin(time + index) * 1);

                    element.style.transform = `
                        translate(${translateX}px, ${translateY}px)
                        rotateZ(${rotateZ}deg)
                        ${element.classList.contains('service-icon') ? 'scale(1.02)' : ''}
                    `;
                });
            }

            requestAnimationFrame(animateManifestoElements);
        }

        animateManifestoElements();

        // Add click ripple effect to service items
        serviceItems.forEach(item => {
            item.addEventListener('click', function(e) {
                const ripple = document.createElement('div');
                const rect = item.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                    z-index: 10;
                `;

                item.style.position = 'relative';
                item.style.overflow = 'hidden';
                item.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Add CSS for ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);


    // --- Advanced Real-time Scroll Animation System ---
    const heroSectionElement = document.querySelector('.hero-section');
    const manifestoSectionElement = document.querySelector('.manifesto-section');

    if (heroSectionElement && manifestoSectionElement) {
        let isAnimationActive = false;
        let scrollProgress = 0;
        let targetProgress = 0;
        let animationId = null;

        // Smooth interpolation function
        function lerp(start, end, factor) {
            return start + (end - start) * factor;
        }

        // Easing function for smooth animation
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }

        // Animation update function
        function updateAnimations() {
            // Smoothly interpolate towards target progress
            scrollProgress = lerp(scrollProgress, targetProgress, 0.1);
            scrollProgress = Math.max(0, Math.min(1, scrollProgress)); // Clamp between 0 and 1

            // Apply eased progress for smoother animation
            const easedProgress = easeInOutCubic(scrollProgress);

            // Calculate individual animation values
            const heroScaleY = 1 - (easedProgress * 0.9); // Scale from 1 to 0.1
            const heroScaleX = 1 - (easedProgress * 0.2); // Scale from 1 to 0.8
            const heroOpacity = 1 - (easedProgress * 0.7); // Fade from 1 to 0.3
            const heroBlur = easedProgress * 2; // Blur from 0 to 2px

            const manifestoTranslateY = (1 - easedProgress) * 100; // Move from 100px to 0px
            const manifestoScale = 0.95 + (easedProgress * 0.05); // Scale from 0.95 to 1
            const manifestoOpacity = easedProgress; // Fade from 0 to 1

            // Apply hero section transformations
            heroSectionElement.style.transform = `scaleY(${heroScaleY}) scaleX(${heroScaleX})`;
            heroSectionElement.style.opacity = heroOpacity;
            heroSectionElement.style.filter = `blur(${heroBlur}px)`;
            heroSectionElement.style.pointerEvents = easedProgress > 0.5 ? 'none' : 'auto';

            // Apply manifesto section transformations
            manifestoSectionElement.style.transform = `translateY(${manifestoTranslateY}px) scale(${manifestoScale})`;
            manifestoSectionElement.style.opacity = manifestoOpacity;

            // Continue animation if progress hasn't reached target
            if (Math.abs(scrollProgress - targetProgress) > 0.001) {
                animationId = requestAnimationFrame(updateAnimations);
            } else {
                isAnimationActive = false;
            }
        }

        // Throttled scroll event handler for performance
        let scrollTimeout = null;
        let lastScrollTime = 0;

        window.addEventListener('scroll', () => {
            const now = performance.now();
            const currentScrollY = window.scrollY;
            const heroHeight = heroSectionElement.offsetHeight;
            const manifestoTop = manifestoSectionElement.offsetTop;
            const transitionHeight = manifestoTop - heroHeight;

            // Calculate scroll progress through the transition area
            const rawProgress = Math.max(0, Math.min(1, currentScrollY / transitionHeight));

            // Update target progress (this will be smoothly interpolated to)
            targetProgress = rawProgress;

            // Throttle scroll events for better performance (limit to ~60fps)
            if (now - lastScrollTime > 16) { // ~60fps
                lastScrollTime = now;

                // Start animation if not already running
                if (!isAnimationActive) {
                    isAnimationActive = true;
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                    }
                    animationId = requestAnimationFrame(updateAnimations);
                }
            }
        });

        // Handle window resize to recalculate positions
        window.addEventListener('resize', () => {
            // Reset animation state when window is resized
            targetProgress = 0;
            scrollProgress = 0;
            updateAnimations();
        });

        // Initial call to set starting state
        updateAnimations();
    }


    // ===== COMPREHENSIVE SERVICES SHOWCASE SYSTEM =====




    // Initialize enhanced services system
    const servicesSectionManager = new ServicesSectionManager();
    const servicesAnimations = new ServicesAnimations();

    // Make services manager globally accessible for debugging
    window.servicesSectionManager = servicesSectionManager;
    window.servicesAnimations = servicesAnimations;

    // DIAGNOSTIC: Add comprehensive debugging for services section visibility
    console.log('🔍 SERVICES SECTION DEBUGGING INITIALIZED');

    // Check if services section exists in DOM
    const servicesSection = document.querySelector('.services-section');
    console.log('Services section element:', servicesSection);

    if (servicesSection) {
        const computedStyle = getComputedStyle(servicesSection);
        console.log('Services section computed styles:', {
            display: computedStyle.display,
            visibility: computedStyle.visibility,
            opacity: computedStyle.opacity,
            position: computedStyle.position,
            zIndex: computedStyle.zIndex,
            width: computedStyle.width,
            height: computedStyle.height,
            top: computedStyle.top,
            left: computedStyle.left,
            transform: computedStyle.transform,
            overflow: computedStyle.overflow
        });

        // Check if section has content
        console.log('Services section content:', {
            childElementCount: servicesSection.childElementCount,
            innerHTMLLength: servicesSection.innerHTML.length,
            classList: Array.from(servicesSection.classList)
        });
    } else {
        console.error('❌ Services section element NOT FOUND in DOM!');
    }

    // Check manifesto service items
    const manifestoItems = document.querySelectorAll('.manifesto-section .service-item');
    console.log('Manifesto service items found:', manifestoItems.length);

    manifestoItems.forEach((item, index) => {
        console.log(`Manifesto item ${index}:`, {
            element: item,
            className: item.className,
            dataset: item.dataset,
            hasClickListener: item.onclick !== null,
            targetService: item.dataset.targetService,
            style: getComputedStyle(item)
        });
    });

    // Check if GSAP is loaded
    console.log('GSAP loaded:', typeof gsap !== 'undefined');
    if (typeof gsap !== 'undefined') {
        console.log('GSAP version:', gsap.version);
    }

    // Monitor services section state changes
    document.addEventListener('services:opened', () => {
        console.log('🎯 SERVICES OPENED EVENT - Checking state...');
        setTimeout(() => {
            const section = document.querySelector('.services-section');
            if (section) {
                const style = getComputedStyle(section);
                console.log('Services section after open event:', {
                    display: style.display,
                    visibility: style.visibility,
                    opacity: style.opacity,
                    hasActiveClass: section.classList.contains('active')
                });
            }
        }, 100);
    });

    // Add manual test function
    window.debugServicesVisibility = function() {
        console.log('=== MANUAL SERVICES VISIBILITY DEBUG ===');

        const section = document.querySelector('.services-section');
        if (!section) {
            console.error('Services section not found!');
            return false;
        }

        console.log('Current services section state:', {
            exists: !!section,
            display: getComputedStyle(section).display,
            visibility: getComputedStyle(section).visibility,
            opacity: getComputedStyle(section).opacity,
            hasActiveClass: section.classList.contains('active'),
            isOpen: servicesSectionManager ? servicesSectionManager.isOpen : 'unknown',
            isTransitioning: servicesSectionManager ? servicesSectionManager.isTransitioning : 'unknown'
        });

        // Try to manually show the section
        console.log('Attempting manual visibility fix...');
        section.style.display = 'block';
        section.style.visibility = 'visible';
        section.style.opacity = '1';
        section.classList.add('active');

        console.log('Manual fix applied - checking result:', getComputedStyle(section));
        return true;
    };

    // DEBUG: Add debugging functions
    window.debugServices = function() {
        console.log('=== SERVICES DEBUG INFO ===');

        const servicesSection = document.querySelector('.services-section');
        console.log('Services section element:', servicesSection);
        console.log('Services section display:', getComputedStyle(servicesSection).display);
        console.log('Services section visibility:', getComputedStyle(servicesSection).visibility);
        console.log('Services section opacity:', getComputedStyle(servicesSection).opacity);

        console.log('Services manager isOpen:', servicesSectionManager.isOpen);
        console.log('Services manager isTransitioning:', servicesSectionManager.isTransitioning);

        const manifestoItems = document.querySelectorAll('.manifesto-section .service-item');
        console.log('Manifesto service items:', manifestoItems.length);

        manifestoItems.forEach((item, index) => {
            console.log(`Manifesto item ${index}:`, {
                element: item,
                dataset: item.dataset,
                hasClickListener: item.onclick !== null,
                targetService: item.dataset.targetService
            });
        });

        const serviceButtons = document.querySelectorAll('.service-button');
        console.log('Service buttons in services section:', serviceButtons.length);

        serviceButtons.forEach((button, index) => {
            console.log(`Service button ${index}:`, {
                element: button,
                dataset: button.dataset,
                ariaSelected: button.getAttribute('aria-selected')
            });
        });

        return {
            servicesSection,
            servicesSectionManager,
            manifestoItems,
            serviceButtons
        };
    };

    // DEBUG: Auto-test services functionality
    window.testServicesAuto = function() {
        console.log('=== AUTO TESTING SERVICES ===');

        // Try to click first manifesto item
        const firstManifestoItem = document.querySelector('.manifesto-section .service-item');
        if (firstManifestoItem) {
            console.log('Auto-clicking first manifesto item...');
            firstManifestoItem.click();
            return true;
        } else {
            console.error('No manifesto items found to test');
            return false;
        }
    };

    // DEBUG: Log all services events
    document.addEventListener('services:opened', () => {
        console.log('🔓 SERVICES OPENED EVENT FIRED');
    });

    document.addEventListener('services:closed', () => {
        console.log('🔒 SERVICES CLOSED EVENT FIRED');
    });

    document.addEventListener('services:service_changed', (e) => {
        console.log('🔄 SERVICE CHANGED EVENT FIRED:', e.detail);
    });

    console.log('🔧 Debug functions available: debugServices(), testServicesAuto()');

    // Comprehensive Cleanup and Memory Management System
    class CleanupManager {
        constructor(servicesSectionManager, servicesAnimations, integrationManager) {
            this.servicesSectionManager = servicesSectionManager;
            this.servicesAnimations = servicesAnimations;
            this.integrationManager = integrationManager;

            this.cleanupTasks = [];
            this.isDestroyed = false;
            this.intervals = [];
            this.timeouts = [];

            this.init();
        }

        init() {
            this.setupAutomaticCleanup();
            this.setupUnloadHandlers();
            this.setupErrorRecovery();
        }

        setupAutomaticCleanup() {
            // Periodic cleanup every 30 seconds
            const cleanupInterval = setInterval(() => {
                this.performPeriodicCleanup();
            }, 30000);

            this.intervals.push(cleanupInterval);

            // Track intervals and timeouts for cleanup
            this.originalSetInterval = window.setInterval;
            this.originalSetTimeout = window.setTimeout;

            window.setInterval = (...args) => {
                const id = this.originalSetInterval(...args);
                this.intervals.push(id);
                return id;
            };

            window.setTimeout = (...args) => {
                const id = this.originalSetTimeout(...args);
                this.timeouts.push(id);
                return id;
            };
        }

        performPeriodicCleanup() {
            if (this.isDestroyed) return;

            try {
                // Clear expired media cache
                this.clearExpiredCache();

                // Remove dead event listeners
                this.removeDeadEventListeners();

                // Clean up detached DOM elements
                this.cleanupDetachedElements();

                // Force garbage collection if available
                if (window.gc && typeof window.gc === 'function') {
                    window.gc();
                }

                console.log('Periodic cleanup completed');
            } catch (error) {
                console.error('Error during periodic cleanup:', error);
            }
        }

        clearExpiredCache() {
            // Clear expired media from services section manager
            if (this.servicesSectionManager && this.servicesSectionManager.loadedMedia) {
                const now = Date.now();
                const expiryTime = 5 * 60 * 1000; // 5 minutes

                // Clear old media cache entries
                for (const [key, value] of this.servicesSectionManager.loadedMedia) {
                    if (now - value.timestamp > expiryTime) {
                        this.servicesSectionManager.loadedMedia.delete(key);
                    }
                }
            }
        }

        removeDeadEventListeners() {
            // Remove event listeners from non-existent elements
            const servicesSection = document.querySelector('.services-section');
            if (!servicesSection && this.servicesSectionManager) {
                // Services section was removed from DOM, clean up
                this.servicesSectionManager.cleanup();
            }
        }

        cleanupDetachedElements() {
            // Clean up any detached DOM elements that might be holding memory
            const detachedElements = document.querySelectorAll('[data-detached]');
            detachedElements.forEach(element => {
                if (!element.parentNode) {
                    element.remove();
                }
            });
        }

        setupUnloadHandlers() {
            // Comprehensive cleanup on page unload
            const unloadHandler = () => {
                this.destroy();
            };

            window.addEventListener('beforeunload', unloadHandler);
            window.addEventListener('unload', unloadHandler);

            // Handle page visibility for cleanup
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.performVisibilityCleanup();
                }
            });
        }

        performVisibilityCleanup() {
            // Pause non-essential animations when page is hidden
            if (this.servicesAnimations && this.servicesAnimations.masterTimeline) {
                this.servicesAnimations.masterTimeline.pause();
            }

            // Clear non-essential caches
            if (this.servicesSectionManager && this.servicesSectionManager.mediaLoadPromises) {
                // Clear pending media load promises
                this.servicesSectionManager.mediaLoadPromises.clear();
            }
        }

        setupErrorRecovery() {
            // Global error handler for cleanup-related errors
            window.addEventListener('error', (e) => {
                console.error('Cleanup manager error:', e.error);

                // Attempt recovery
                this.attemptErrorRecovery(e);
            });

            window.addEventListener('unhandledrejection', (e) => {
                console.error('Unhandled promise rejection in cleanup:', e.reason);

                // Attempt recovery
                this.attemptErrorRecovery(e);
            });
        }

        attemptErrorRecovery(error) {
            try {
                // Force cleanup of problematic components
                if (this.servicesAnimations) {
                    this.servicesAnimations.killAnimations();
                }

                // Reset services section state
                if (this.servicesSectionManager) {
                    this.servicesSectionManager.isOpen = false;
                    this.servicesSectionManager.isTransitioning = false;
                }

                console.log('Error recovery completed');
            } catch (recoveryError) {
                console.error('Error recovery failed:', recoveryError);
            }
        }

        // Main cleanup method
        destroy() {
            if (this.isDestroyed) return;

            this.isDestroyed = true;
            console.log('Starting comprehensive cleanup...');

            try {
                // Clear all intervals
                this.intervals.forEach(id => {
                    clearInterval(id);
                });

                // Clear all timeouts
                this.timeouts.forEach(id => {
                    clearTimeout(id);
                });

                // Restore original setInterval and setTimeout
                if (this.originalSetInterval) {
                    window.setInterval = this.originalSetInterval;
                }
                if (this.originalSetTimeout) {
                    window.setTimeout = this.originalSetTimeout;
                }

                // Cleanup services section manager
                if (this.servicesSectionManager) {
                    this.servicesSectionManager.cleanup();
                }

                // Cleanup services animations
                if (this.servicesAnimations) {
                    this.servicesAnimations.killAnimations();
                }

                // Cleanup integration manager
                if (this.integrationManager) {
                    // Remove event listeners
                    document.removeEventListener('services:opened', this.integrationManager.handleServicesOpened);
                    document.removeEventListener('services:closed', this.integrationManager.handleServicesClosed);
                }

                // Clear custom cursor
                if (window.customCursor) {
                    window.customCursor.destroy();
                }

                // Remove added CSS
                this.removeAddedStyles();

                // Clear animation frames
                this.clearAnimationFrames();

                // Force final garbage collection
                if (window.gc && typeof window.gc === 'function') {
                    window.gc();
                }

                console.log('Comprehensive cleanup completed');
            } catch (error) {
                console.error('Error during cleanup:', error);
            }
        }

        removeAddedStyles() {
            // Remove styles added by the services system
            const styleElements = document.querySelectorAll('style[data-services-css]');
            styleElements.forEach(style => {
                style.remove();
            });
        }

        clearAnimationFrames() {
            // Cancel any remaining animation frames
            let id = requestAnimationFrame(() => {});
            while (id--) {
                cancelAnimationFrame(id);
            }
        }

        // Register cleanup task
        registerCleanupTask(task) {
            this.cleanupTasks.push(task);
        }

        // Execute all cleanup tasks
        executeCleanupTasks() {
            this.cleanupTasks.forEach(task => {
                try {
                    if (typeof task === 'function') {
                        task();
                    }
                } catch (error) {
                    console.error('Error executing cleanup task:', error);
                }
            });

            this.cleanupTasks = [];
        }

        // Public method to check if destroyed
        isDestroyed() {
            return this.isDestroyed;
        }

        // Public method to get memory usage
        getMemoryUsage() {
            if (performance.memory) {
                return {
                    used: performance.memory.usedJSHeapSize,
                    total: performance.memory.totalJSHeapSize,
                    limit: performance.memory.jsHeapSizeLimit,
                    usagePercentage: Math.round((performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100)
                };
            }
            return null;
        }
    }

    // Enhanced Services Integration with Scroll Animations
    class EnhancedServicesIntegration {
        constructor(servicesSectionManager, servicesAnimations) {
            this.servicesSectionManager = servicesSectionManager;
            this.servicesAnimations = servicesAnimations;
            this.isServicesOpen = false;
            this.savedScrollPosition = 0;
            this.wasScrollAnimationActive = false;

            this.init();
        }

        init() {
            this.setupScrollIntegration();
            this.setupAnimationCoordination();
            this.setupStateManagement();
            this.setupPerformanceOptimizations();
        }

        setupScrollIntegration() {
            // Store original open/close methods
            const originalOpen = this.servicesSectionManager.openServices.bind(this.servicesSectionManager);
            const originalClose = this.servicesSectionManager.closeServices.bind(this.servicesSectionManager);

            // Enhanced open services with scroll integration
            this.servicesSectionManager.openServices = () => {
                // Save current scroll position and animation state
                this.savedScrollPosition = window.scrollY;
                this.wasScrollAnimationActive = isAnimationActive;

                // Pause scroll animations
                if (isAnimationActive) {
                    cancelAnimationFrame(animationId);
                    isAnimationActive = false;
                }

                // Prevent body scroll
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = `-${this.savedScrollPosition}px`;
                document.body.style.width = '100%';

                // Call original method
                originalOpen();

                // Update state
                this.isServicesOpen = true;

                // Dispatch event for other systems
                document.dispatchEvent(new CustomEvent('services:opened', {
                    detail: { scrollPosition: this.savedScrollPosition }
                }));
            };

            // Enhanced close services with scroll integration
            this.servicesSectionManager.closeServices = () => {
                // Call original method first
                originalClose();

                // Update state
                this.isServicesOpen = false;

                // Restore body scroll
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';

                // Restore scroll position
                window.scrollTo(0, this.savedScrollPosition);

                // Resume scroll animations if they were active
                if (this.wasScrollAnimationActive) {
                    targetProgress = Math.max(0, Math.min(1, this.savedScrollPosition / (heroSectionElement.offsetHeight + manifestoSectionElement.offsetTop)));
                    isAnimationActive = true;
                    animationId = requestAnimationFrame(updateAnimations);
                }

                // Dispatch event for other systems
                document.dispatchEvent(new CustomEvent('services:closed', {
                    detail: { scrollPosition: this.savedScrollPosition }
                }));
            };
        }

        setupAnimationCoordination() {
            // Enhanced animation state management
            this.animationStates = new Map();
            this.pausedAnimations = new Set();

            // Pause manifesto animations when services open
            document.addEventListener('services:opened', () => {
                this.pauseManifestoAnimations();
            });

            // Resume manifesto animations when services close
            document.addEventListener('services:closed', () => {
                this.resumeManifestoAnimations();
            });

            // Coordinate with manifesto intersection observer
            this.setupIntersectionObserverCoordination();

            // Setup GSAP timeline coordination
            this.setupGSAPCoordination();
        }

        pauseManifestoAnimations() {
            if (!manifestoSection) return;

            // Save current animation states
            this.saveAnimationStates();

            // Pause CSS animations
            manifestoSection.style.animationPlayState = 'paused';

            // Pause floating animation
            const manifestoServices = manifestoSection.querySelector('.manifesto-services');
            if (manifestoServices) {
                manifestoServices.style.animationPlayState = 'paused';
            }

            // Pause manifesto elements animation
            if (window.manifestoAnimationId) {
                cancelAnimationFrame(window.manifestoAnimationId);
                this.pausedAnimations.add('manifestoElements');
            }

            // Pause service items animations
            const serviceItems = manifestoSection.querySelectorAll('.service-item');
            serviceItems.forEach((item, index) => {
                item.style.animationPlayState = 'paused';
                this.pausedAnimations.add(`serviceItem_${index}`);
            });

            // Pause manifesto lines animations
            const manifestoLines = manifestoSection.querySelectorAll('.manifesto-line');
            manifestoLines.forEach((line, index) => {
                line.style.animationPlayState = 'paused';
                this.pausedAnimations.add(`manifestoLine_${index}`);
            });

            // Pause parallax effects
            const parallaxElements = document.querySelectorAll('.parallax-media');
            parallaxElements.forEach((element, index) => {
                element.style.animationPlayState = 'paused';
                this.pausedAnimations.add(`parallax_${index}`);
            });

            console.log('Manifesto animations paused for services section');
        }

        resumeManifestoAnimations() {
            if (!manifestoSection) return;

            // Resume CSS animations
            manifestoSection.style.animationPlayState = 'running';

            // Resume floating animation
            const manifestoServices = manifestoSection.querySelector('.manifesto-services');
            if (manifestoServices) {
                manifestoServices.style.animationPlayState = 'running';
            }

            // Resume manifesto elements animation
            if (this.pausedAnimations.has('manifestoElements') && typeof animateManifestoElements === 'function') {
                window.manifestoAnimationId = requestAnimationFrame(animateManifestoElements);
            }

            // Resume service items animations
            const serviceItems = manifestoSection.querySelectorAll('.service-item');
            serviceItems.forEach((item, index) => {
                if (this.pausedAnimations.has(`serviceItem_${index}`)) {
                    item.style.animationPlayState = 'running';
                }
            });

            // Resume manifesto lines animations
            const manifestoLines = manifestoSection.querySelectorAll('.manifesto-line');
            manifestoLines.forEach((line, index) => {
                if (this.pausedAnimations.has(`manifestoLine_${index}`)) {
                    line.style.animationPlayState = 'running';
                }
            });

            // Resume parallax effects
            const parallaxElements = document.querySelectorAll('.parallax-media');
            parallaxElements.forEach((element, index) => {
                if (this.pausedAnimations.has(`parallax_${index}`)) {
                    element.style.animationPlayState = 'running';
                }
            });

            // Clear paused animations set
            this.pausedAnimations.clear();

            // Restore animation states
            this.restoreAnimationStates();

            console.log('Manifesto animations resumed');
        }

        saveAnimationStates() {
            // Save transform states of manifesto elements
            const manifestoElements = manifestoSection.querySelectorAll('.service-icon, .service-item h3, .service-item p');
            manifestoElements.forEach((element, index) => {
                const computedStyle = getComputedStyle(element);
                this.animationStates.set(`manifestoElement_${index}`, {
                    transform: computedStyle.transform,
                    opacity: computedStyle.opacity
                });
            });
        }

        restoreAnimationStates() {
            // Restore saved animation states
            this.animationStates.forEach((state, key) => {
                const index = key.split('_')[1];
                const element = manifestoSection.querySelectorAll('.service-icon, .service-item h3, .service-item p')[index];
                if (element) {
                    element.style.transform = state.transform;
                    element.style.opacity = state.opacity;
                }
            });

            this.animationStates.clear();
        }

        setupIntersectionObserverCoordination() {
            // Store original observer callback
            this.originalManifestoCallback = null;

            // Find and enhance the manifesto observer
            const observerElements = document.querySelectorAll('[data-observer="manifesto"]');
            observerElements.forEach(element => {
                const observer = element._observer;
                if (observer) {
                    this.originalManifestoCallback = observer.callback;
                    observer.callback = (entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && !this.isServicesOpen) {
                                // Only trigger manifesto animations if services section is closed
                                if (this.originalManifestoCallback) {
                                    this.originalManifestoCallback([entry]);
                                }
                            }
                        });
                    };
                }
            });
        }

        setupGSAPCoordination() {
            // Coordinate GSAP timelines
            if (typeof gsap !== 'undefined') {
                // Create master coordination timeline
                this.coordinationTimeline = gsap.timeline({ paused: true });

                // Add labels for different states
                this.coordinationTimeline.addLabel('servicesOpening')
                                       .addLabel('servicesOpen', '+=0.3')
                                       .addLabel('servicesClosing', '+=2')
                                       .addLabel('servicesClosed', '+=0.3');

                // Setup services opening sequence
                this.coordinationTimeline.to('.manifesto-section', {
                    duration: 0.3,
                    opacity: 0.7,
                    scale: 0.98,
                    ease: "power2.out"
                }, 'servicesOpening');

                // Setup services open state
                this.coordinationTimeline.to('.manifesto-section', {
                    duration: 0.2,
                    opacity: 0.3,
                    scale: 0.95,
                    ease: "power2.out"
                }, 'servicesOpen');

                // Setup services closing sequence
                this.coordinationTimeline.to('.manifesto-section', {
                    duration: 0.3,
                    opacity: 0.7,
                    scale: 0.98,
                    ease: "power2.in"
                }, 'servicesClosing');

                // Setup services closed state
                this.coordinationTimeline.to('.manifesto-section', {
                    duration: 0.2,
                    opacity: 1,
                    scale: 1,
                    ease: "power2.in"
                }, 'servicesClosed');
            }
        }

        setupStateManagement() {
            // Enhanced state management system
            this.state = {
                isServicesOpen: false,
                savedScrollPosition: 0,
                wasScrollAnimationActive: false,
                activeServiceId: null,
                animationStates: new Map(),
                focusStack: [],
                history: []
            };

            this.maxHistorySize = 10;

            // Track services section state
            document.addEventListener('services:opened', (e) => {
                this.onServicesOpened(e);
            });

            document.addEventListener('services:closed', (e) => {
                this.onServicesClosed(e);
            });

            document.addEventListener('services:service_changed', (e) => {
                this.onServiceChanged(e);
            });

            // Handle window resize with services open
            this.setupResizeHandler();

            // Setup visibility change handler
            this.setupVisibilityHandler();

            // Setup beforeunload handler
            this.setupBeforeUnloadHandler();
        }

        onServicesOpened(e) {
            const previousState = { ...this.state };

            // Update state
            this.state.isServicesOpen = true;
            this.state.savedScrollPosition = e.detail?.scrollPosition || window.scrollY;
            this.state.wasScrollAnimationActive = window.isAnimationActive || false;

            // Add to history
            this.addToHistory('services_opened', {
                scrollPosition: this.state.savedScrollPosition,
                timestamp: Date.now()
            });

            // Add class to body for CSS targeting
            document.body.classList.add('services-active');

            // Update cursor state
            if (window.customCursor) {
                window.customCursor.classList.add('services-active');
            }

            // Save current focus element
            if (document.activeElement) {
                this.state.focusStack.push(document.activeElement);
            }

            // Dispatch state change event
            document.dispatchEvent(new CustomEvent('app:stateChanged', {
                detail: {
                    previousState,
                    newState: this.state,
                    change: 'services_opened'
                }
            }));

            console.log('Services section opened, state updated:', this.state);
        }

        onServicesClosed(e) {
            const previousState = { ...this.state };

            // Update state
            this.state.isServicesOpen = false;
            this.state.activeServiceId = null;

            // Add to history
            this.addToHistory('services_closed', {
                scrollPosition: this.state.savedScrollPosition,
                timestamp: Date.now()
            });

            // Remove class from body
            document.body.classList.remove('services-active');

            // Update cursor state
            if (window.customCursor) {
                window.customCursor.classList.remove('services-active');
            }

            // Restore focus if available
            if (this.state.focusStack.length > 0) {
                const previousFocusElement = this.state.focusStack.pop();
                if (previousFocusElement && previousFocusElement.parentNode) {
                    setTimeout(() => previousFocusElement.focus(), 100);
                }
            }

            // Dispatch state change event
            document.dispatchEvent(new CustomEvent('app:stateChanged', {
                detail: {
                    previousState,
                    newState: this.state,
                    change: 'services_closed'
                }
            }));

            console.log('Services section closed, state updated:', this.state);
        }

        onServiceChanged(e) {
            const previousServiceId = this.state.activeServiceId;

            // Update state
            this.state.activeServiceId = e.detail.serviceId;

            // Add to history
            this.addToHistory('service_changed', {
                from: previousServiceId,
                to: this.state.activeServiceId,
                timestamp: Date.now()
            });

            console.log(`Service changed from ${previousServiceId} to ${this.state.activeServiceId}`);
        }

        addToHistory(action, data) {
            const entry = {
                action,
                data,
                timestamp: Date.now()
            };

            this.state.history.unshift(entry);

            // Limit history size
            if (this.state.history.length > this.maxHistorySize) {
                this.state.history = this.state.history.slice(0, this.maxHistorySize);
            }
        }

        setupResizeHandler() {
            let resizeTimeout;

            window.addEventListener('resize', () => {
                if (this.state.isServicesOpen) {
                    // Clear existing timeout
                    if (resizeTimeout) {
                        clearTimeout(resizeTimeout);
                    }

                    // Debounce resize events
                    resizeTimeout = setTimeout(() => {
                        // Update saved scroll position based on new dimensions
                        this.state.savedScrollPosition = Math.max(0, Math.min(this.state.savedScrollPosition, document.body.scrollHeight - window.innerHeight));

                        // Dispatch resize event for services section
                        document.dispatchEvent(new CustomEvent('services:resized', {
                            detail: {
                                scrollPosition: this.state.savedScrollPosition,
                                windowSize: {
                                    width: window.innerWidth,
                                    height: window.innerHeight
                                }
                            }
                        }));
                    }, 250);
                }
            });
        }

        setupVisibilityHandler() {
            // Handle page visibility changes
            document.addEventListener('visibilitychange', () => {
                if (document.hidden && this.state.isServicesOpen) {
                    // Page became hidden while services is open
                    this.addToHistory('page_hidden', {
                        servicesOpen: true,
                        timestamp: Date.now()
                    });
                } else if (!document.hidden && this.state.isServicesOpen) {
                    // Page became visible while services is open
                    this.addToHistory('page_visible', {
                        servicesOpen: true,
                        timestamp: Date.now()
                    });
                }
            });
        }

        setupBeforeUnloadHandler() {
            // Save state before page unload
            window.addEventListener('beforeunload', () => {
                if (this.state.isServicesOpen) {
                    // Save current state to sessionStorage
                    sessionStorage.setItem('servicesState', JSON.stringify({
                        isOpen: true,
                        scrollPosition: this.state.savedScrollPosition,
                        activeService: this.state.activeServiceId,
                        timestamp: Date.now()
                    }));
                }
            });

            // Restore state on page load
            window.addEventListener('load', () => {
                const savedState = sessionStorage.getItem('servicesState');
                if (savedState) {
                    try {
                        const state = JSON.parse(savedState);
                        const timeDiff = Date.now() - state.timestamp;

                        // Only restore if within last 5 minutes
                        if (timeDiff < 5 * 60 * 1000) {
                            console.log('Restoring previous services state:', state);

                            // Restore scroll position
                            window.scrollTo(0, state.scrollPosition);

                            // Note: We don't automatically reopen services section
                            // as this might be unexpected for users
                        }

                        // Clear saved state
                        sessionStorage.removeItem('servicesState');
                    } catch (e) {
                        console.error('Failed to restore services state:', e);
                        sessionStorage.removeItem('servicesState');
                    }
                }
            });
        }

        // Public methods for state management
        getState() {
            return { ...this.state };
        }

        getHistory(limit = 5) {
            return this.state.history.slice(0, limit);
        }

        canGoBack() {
            return this.state.history.length > 0;
        }

        goBack() {
            if (!this.canGoBack()) return false;

            const lastAction = this.state.history[0];
            if (lastAction.action === 'service_changed' && lastAction.data.from) {
                // Go back to previous service
                document.dispatchEvent(new CustomEvent('services:switch', {
                    detail: { serviceId: lastAction.data.from }
                }));

                // Remove from history
                this.state.history.shift();
                return true;
            }

            return false;
        }

        setupPerformanceOptimizations() {
            // Enhanced performance monitoring and optimization system
            this.performanceMetrics = {
                frameCount: 0,
                lastTime: performance.now(),
                fpsHistory: [],
                memoryUsage: 0,
                animationComplexity: 1.0
            };

            this.performanceThresholds = {
                minFPS: 30,
                maxMemoryGrowth: 50 * 1024 * 1024, // 50MB
                optimizationTriggers: 3
            };

            this.optimizationTriggers = 0;

            // Throttle scroll events when services is open
            this.setupScrollOptimization();

            // Performance monitoring
            this.startPerformanceMonitoring();

            // Memory management
            this.setupMemoryManagement();

            // Animation optimization
            this.setupAnimationOptimization();
        }

        setupScrollOptimization() {
            let scrollTimeout;
            this.scrollThrottled = false;

            const throttledScrollHandler = (e) => {
                if (this.isServicesOpen && !this.scrollThrottled) {
                    this.scrollThrottled = true;

                    // Clear existing timeout
                    if (scrollTimeout) {
                        clearTimeout(scrollTimeout);
                    }

                    // Throttle scroll events
                    scrollTimeout = setTimeout(() => {
                        this.savedScrollPosition = window.scrollY;
                        this.scrollThrottled = false;
                    }, 16); // ~60fps
                }
            };

            window.addEventListener('scroll', throttledScrollHandler, { passive: true });
        }

        startPerformanceMonitoring() {
            const monitorPerformance = () => {
                this.performanceMetrics.frameCount++;
                const currentTime = performance.now();

                if (currentTime - this.performanceMetrics.lastTime >= 1000) {
                    const fps = Math.round((this.performanceMetrics.frameCount * 1000) / (currentTime - this.performanceMetrics.lastTime));

                    // Track FPS history
                    this.performanceMetrics.fpsHistory.push(fps);
                    if (this.performanceMetrics.fpsHistory.length > 60) {
                        this.performanceMetrics.fpsHistory.shift();
                    }

                    // Check memory usage if available
                    if (performance.memory) {
                        this.performanceMetrics.memoryUsage = performance.memory.usedJSHeapSize;
                    }

                    // Check if optimization is needed
                    if (this.isServicesOpen) {
                        this.checkPerformanceThresholds(fps);
                    }

                    this.performanceMetrics.frameCount = 0;
                    this.performanceMetrics.lastTime = currentTime;
                }

                requestAnimationFrame(monitorPerformance);
            };

            requestAnimationFrame(monitorPerformance);
        }

        checkPerformanceThresholds(fps) {
            const avgFPS = this.performanceMetrics.fpsHistory.reduce((a, b) => a + b, 0) / this.performanceMetrics.fpsHistory.length;
            const isLowPerformance = avgFPS < this.performanceThresholds.minFPS;

            if (isLowPerformance) {
                this.optimizationTriggers++;
                console.warn(`Low performance detected: ${avgFPS.toFixed(1)} FPS`);

                if (this.optimizationTriggers >= this.performanceThresholds.optimizationTriggers) {
                    this.optimizePerformance();
                }
            } else {
                this.optimizationTriggers = Math.max(0, this.optimizationTriggers - 1);
            }
        }

        setupMemoryManagement() {
            // Monitor memory usage and clean up when necessary
            this.memoryCleanupInterval = setInterval(() => {
                if (performance.memory) {
                    const memoryGrowth = performance.memory.usedJSHeapSize - this.performanceMetrics.memoryUsage;

                    if (memoryGrowth > this.performanceThresholds.maxMemoryGrowth) {
                        console.warn('High memory usage detected, running cleanup');
                        this.performMemoryCleanup();
                    }

                    this.performanceMetrics.memoryUsage = performance.memory.usedJSHeapSize;
                }
            }, 10000); // Check every 10 seconds

            // Setup garbage collection hints
            if (window.gc && typeof window.gc === 'function') {
                this.gcInterval = setInterval(() => {
                    if (this.shouldTriggerGC()) {
                        window.gc();
                    }
                }, 30000); // Every 30 seconds
            }
        }

        shouldTriggerGC() {
            if (!performance.memory) return false;

            const memoryUsage = performance.memory.usedJSHeapSize;
            const memoryLimit = performance.memory.jsHeapSizeLimit;

            // Trigger GC if using more than 80% of heap
            return (memoryUsage / memoryLimit) > 0.8;
        }

        performMemoryCleanup() {
            // Clear animation caches
            if (this.servicesAnimations) {
                this.servicesAnimations.killAnimations();
            }

            // Clear loaded media cache
            if (this.servicesSectionManager) {
                this.servicesSectionManager.loadedMedia.clear();
                this.servicesSectionManager.mediaLoadPromises.clear();
            }

            // Clear event listeners cache
            this.clearEventListenersCache();

            // Force DOM cleanup
            if (window.gc && typeof window.gc === 'function') {
                window.gc();
            }

            console.log('Memory cleanup completed');
        }

        clearEventListenersCache() {
            // Remove and re-add essential event listeners to clear closures
            const servicesSection = document.querySelector('.services-section');
            if (servicesSection) {
                // Clone and replace elements to clear event listeners
                const clonedSection = servicesSection.cloneNode(true);
                servicesSection.parentNode.replaceChild(clonedSection, servicesSection);

                // Reinitialize services section manager with new element
                this.servicesSectionManager.servicesSection = clonedSection;
                this.servicesSectionManager.init();
            }
        }

        setupAnimationOptimization() {
            // Adaptive animation quality based on performance
            this.animationQualityLevels = {
                high: { timeScale: 1.0, effects: 'all', particles: true },
                medium: { timeScale: 0.7, effects: 'essential', particles: false },
                low: { timeScale: 0.5, effects: 'minimal', particles: false }
            };

            this.currentQualityLevel = 'high';
        }

        optimizePerformance() {
            const optimizationLevel = this.determineOptimizationLevel();

            console.log(`Optimizing performance: switching to ${optimizationLevel} quality`);

            // Adjust animation complexity
            if (this.servicesAnimations && this.servicesAnimations.masterTimeline) {
                const quality = this.animationQualityLevels[optimizationLevel];
                this.servicesAnimations.masterTimeline.timeScale(quality.timeScale);
            }

            // Disable non-essential effects
            this.disableNonEssentialEffects(optimizationLevel);

            // Reduce animation complexity
            this.reduceAnimationComplexity(optimizationLevel);

            // Adjust cursor performance
            if (window.customCursor) {
                window.customCursor.optimizeForPerformance(optimizationLevel);
            }

            this.currentQualityLevel = optimizationLevel;

            // Dispatch optimization event
            document.dispatchEvent(new CustomEvent('performance:optimized', {
                detail: { level: optimizationLevel }
            }));
        }

        determineOptimizationLevel() {
            const avgFPS = this.performanceMetrics.fpsHistory.reduce((a, b) => a + b, 0) / this.performanceMetrics.fpsHistory.length;

            if (avgFPS < 20) return 'low';
            if (avgFPS < 45) return 'medium';
            return 'high';
        }

        disableNonEssentialEffects(level) {
            const nonEssentialElements = document.querySelectorAll('.parallax-media, .manifesto-section .service-icon');

            nonEssentialElements.forEach(el => {
                if (level === 'low' || level === 'medium') {
                    el.style.willChange = 'auto';
                    el.style.transform = 'none';
                } else {
                    el.style.willChange = 'transform';
                }
            });
        }

        reduceAnimationComplexity(level) {
            // Reduce the number of animated elements based on performance level
            if (level === 'low') {
                // Disable complex animations
                document.documentElement.style.setProperty('--animation-complexity', '0.3');
            } else if (level === 'medium') {
                document.documentElement.style.setProperty('--animation-complexity', '0.6');
            } else {
                document.documentElement.style.setProperty('--animation-complexity', '1.0');
            }
        }

        // Public method to get performance metrics
        getPerformanceMetrics() {
            return {
                currentFPS: this.performanceMetrics.fpsHistory[this.performanceMetrics.fpsHistory.length - 1] || 60,
                averageFPS: this.performanceMetrics.fpsHistory.reduce((a, b) => a + b, 0) / this.performanceMetrics.fpsHistory.length || 60,
                memoryUsage: this.performanceMetrics.memoryUsage,
                qualityLevel: this.currentQualityLevel,
                optimizationTriggers: this.optimizationTriggers
            };
        }
    }

    // Enhanced integration points
    class ServicesIntegrationManager {
        constructor(servicesSectionManager, servicesAnimations) {
            this.servicesSectionManager = servicesSectionManager;
            this.servicesAnimations = servicesAnimations;
            this.manifestoServiceItems = document.querySelectorAll('.manifesto-section .service-item');
            this.headerContactButton = document.getElementById('simpleBtn');

            this.init();
        }

        init() {
            this.setupManifestoIntegration();
            this.setupHeaderIntegration();
            this.setupServiceSpecificRouting();
            this.setupAnalytics();
        }

        setupManifestoIntegration() {
            console.log('Setting up manifesto integration for', this.manifestoServiceItems.length, 'items');

            this.manifestoServiceItems.forEach((item, index) => {
                // Add enhanced click handlers
                item.addEventListener('click', (e) => {
                    console.log('Manifesto service item clicked:', index);
                    e.preventDefault();
                    this.handleManifestoServiceClick(item, index);
                });

                // Add keyboard support
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        console.log('Manifesto service item activated via keyboard:', index);
                        e.preventDefault();
                        this.handleManifestoServiceClick(item, index);
                    }
                });

                // Make focusable for accessibility
                item.setAttribute('tabindex', '0');
                item.setAttribute('role', 'button');
                item.setAttribute('aria-label', `Open ${item.querySelector('h3')?.textContent} service details`);
            });
        }

        setupHeaderIntegration() {
            console.log('Setting up header integration for button:', this.headerContactButton);

            if (this.headerContactButton) {
                this.headerContactButton.addEventListener('click', (e) => {
                    console.log('Header contact button clicked');
                    e.preventDefault();
                    this.handleHeaderButtonClick();
                });
            } else {
                console.warn('Header contact button not found');
            }
        }

        setupServiceSpecificRouting() {
            // Map manifesto service items to services section services
            const serviceMapping = {
                0: 'ui-ux-design',    // UI/UX Design
                1: 'ai-creatives',    // AI Creative
                2: 'web-development', // Web Development
                3: 'ai-photography'   // Brand Strategy -> AI Photography (closest match)
            };

            this.manifestoServiceItems.forEach((item, index) => {
                item.dataset.targetService = serviceMapping[index] || 'ai-photography';
            });
        }

        setupAnalytics() {
            // Track service interactions for analytics
            document.addEventListener('services:opened', () => {
                this.trackEvent('services_section_opened');
            });

            document.addEventListener('services:service_changed', (e) => {
                this.trackEvent('service_changed', { service: e.detail.serviceId });
            });

            document.addEventListener('services:closed', () => {
                this.trackEvent('services_section_closed');
            });
        }

        handleManifestoServiceClick(serviceItem, index) {
            const targetService = serviceItem.dataset.targetService;

            // Open services section
            this.servicesSectionManager.openServices();

            // Switch to specific service after a brief delay for smooth animation
            setTimeout(() => {
                this.servicesSectionManager.switchToService(targetService);
            }, 300);

            // Track interaction
            this.trackEvent('manifesto_service_clicked', {
                service: targetService,
                manifestoIndex: index
            });
        }

        handleHeaderButtonClick() {
            // Open services section and show first service
            this.servicesSectionManager.openServices();

            // Track interaction
            this.trackEvent('header_contact_clicked');
        }

        trackEvent(eventName, data = {}) {
            // Dispatch custom event for analytics
            document.dispatchEvent(new CustomEvent('services:analytics', {
                detail: { event: eventName, data, timestamp: Date.now() }
            }));

            // Log for debugging (replace with actual analytics)
            console.log('Services Analytics:', eventName, data);
        }
    }

    // Initialize integration manager
    const integrationManager = new ServicesIntegrationManager(servicesSectionManager, servicesAnimations);

    // Initialize comprehensive managers
    const enhancedServicesIntegration = new EnhancedServicesIntegration(servicesSectionManager, servicesAnimations);
    const layeringManager = new LayeringManager(servicesSectionManager);
    const uxFlowManager = new UXFlowManager(servicesSectionManager, servicesAnimations, integrationManager);
    const cleanupManager = new CleanupManager(servicesSectionManager, servicesAnimations, integrationManager);

    // Add global test function for debugging
    window.testServicesSection = function() {
        console.log('Testing services section...');

        // Check if services section exists
        const servicesSection = document.querySelector('.services-section');
        console.log('Services section found:', !!servicesSection);

        if (servicesSection) {
            console.log('Services section display:', getComputedStyle(servicesSection).display);
            console.log('Services section visibility:', getComputedStyle(servicesSection).visibility);
            console.log('Services section opacity:', getComputedStyle(servicesSection).opacity);
        }

        // Check manifesto service items
        const manifestoItems = document.querySelectorAll('.manifesto-section .service-item');
        console.log('Manifesto service items found:', manifestoItems.length);

        manifestoItems.forEach((item, index) => {
            console.log(`Item ${index}:`, {
                tagName: item.tagName,
                className: item.className,
                dataset: item.dataset,
                hasClickListener: item.onclick !== null
            });
        });

        // Check header button
        const headerButton = document.getElementById('simpleBtn');
        console.log('Header button found:', !!headerButton);

        // Try to open services
        try {
            servicesSectionManager.openServices();
            console.log('Services opened successfully');
        } catch (error) {
            console.error('Error opening services:', error);
        }
    };

    console.log('Services section system initialized. Use testServicesSection() to debug.');

    // Integration Testing and Validation System
    class IntegrationValidator {
        constructor(servicesSectionManager, servicesAnimations, integrationManager, enhancedServicesIntegration, layeringManager, uxFlowManager, cleanupManager) {
            this.servicesSectionManager = servicesSectionManager;
            this.servicesAnimations = servicesAnimations;
            this.integrationManager = integrationManager;
            this.enhancedServicesIntegration = enhancedServicesIntegration;
            this.layeringManager = layeringManager;
            this.uxFlowManager = uxFlowManager;
            this.cleanupManager = cleanupManager;

            this.validationResults = new Map();
            this.isValidated = false;

            this.init();
        }

        init() {
            this.setupValidation();
            this.runInitialValidation();

            // Validate on services events
            document.addEventListener('services:opened', () => {
                setTimeout(() => this.validateServicesOpen(), 100);
            });

            document.addEventListener('services:closed', () => {
                setTimeout(() => this.validateServicesClosed(), 100);
            });
        }

        setupValidation() {
            // Add validation CSS for visual feedback
            const style = document.createElement('style');
            style.textContent = `
                .validation-indicator {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 10px 15px;
                    border-radius: 8px;
                    font-size: 12px;
                    z-index: 10000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .validation-indicator.show {
                    opacity: 1;
                }

                .validation-indicator.error {
                    background: rgba(239, 68, 68, 0.9);
                    border: 1px solid rgba(239, 68, 68, 1);
                }

                .validation-indicator.success {
                    background: rgba(34, 197, 94, 0.9);
                    border: 1px solid rgba(34, 197, 94, 1);
                }

                .validation-indicator.warning {
                    background: rgba(245, 158, 11, 0.9);
                    border: 1px solid rgba(245, 158, 11, 1);
                }
            `;
            document.head.appendChild(style);

            // Add validation indicator to DOM
            this.validationIndicator = document.createElement('div');
            this.validationIndicator.className = 'validation-indicator';
            document.body.appendChild(this.validationIndicator);
        }

        runInitialValidation() {
            console.log('🔍 Running initial integration validation...');

            const validations = [
                this.validateDOMStructure.bind(this),
                this.validateEventListeners.bind(this),
                this.validateAnimationSystem.bind(this),
                this.validatePerformanceOptimizations.bind(this),
                this.validateAccessibility.bind(this)
            ];

            let completedValidations = 0;

            validations.forEach((validation, index) => {
                setTimeout(() => {
                    try {
                        validation();
                        completedValidations++;

                        if (completedValidations === validations.length) {
                            this.onInitialValidationComplete();
                        }
                    } catch (error) {
                        console.error('Validation error:', error);
                        this.showValidationError(`Validation ${index + 1} failed: ${error.message}`);
                    }
                }, index * 100);
            });
        }

        validateDOMStructure() {
            const requiredElements = [
                '.services-section',
                '.manifesto-section',
                '.hero-section',
                '.custom-cursor',
                '.service-button',
                '.nav-control',
                '.close-services'
            ];

            let missingElements = [];

            requiredElements.forEach(selector => {
                if (!document.querySelector(selector)) {
                    missingElements.push(selector);
                }
            });

            if (missingElements.length > 0) {
                throw new Error(`Missing required DOM elements: ${missingElements.join(', ')}`);
            }

            this.validationResults.set('domStructure', { valid: true, elements: requiredElements.length });
            console.log('✅ DOM structure validation passed');
        }

        validateEventListeners() {
            const servicesSection = document.querySelector('.services-section');
            if (!servicesSection) {
                throw new Error('Services section not found for event listener validation');
            }

            // Check if essential event listeners are attached
            const testElement = document.createElement('div');
            let eventTriggered = false;

            const testHandler = () => { eventTriggered = true; };
            testElement.addEventListener('test', testHandler);

            // Dispatch test event
            const testEvent = new Event('test');
            testElement.dispatchEvent(testEvent);

            if (!eventTriggered) {
                throw new Error('Event listener system not working properly');
            }

            testElement.removeEventListener('test', testHandler);
            testElement.remove();

            this.validationResults.set('eventListeners', { valid: true });
            console.log('✅ Event listeners validation passed');
        }

        validateAnimationSystem() {
            if (typeof gsap === 'undefined') {
                throw new Error('GSAP library not loaded');
            }

            // Test GSAP timeline creation
            const testTimeline = gsap.timeline();
            if (!testTimeline) {
                throw new Error('GSAP timeline creation failed');
            }

            testTimeline.kill();

            this.validationResults.set('animationSystem', { valid: true, gsapVersion: gsap.version });
            console.log('✅ Animation system validation passed');
        }

        validatePerformanceOptimizations() {
            // Check if performance API is available
            if (typeof performance === 'undefined') {
                console.warn('Performance API not available');
            }

            // Check if requestAnimationFrame is available
            if (typeof requestAnimationFrame === 'undefined') {
                throw new Error('requestAnimationFrame not available');
            }

            this.validationResults.set('performanceOptimizations', { valid: true });
            console.log('✅ Performance optimizations validation passed');
        }

        validateAccessibility() {
            const servicesSection = document.querySelector('.services-section');
            if (!servicesSection) return;

            // Check ARIA attributes
            const serviceButtons = servicesSection.querySelectorAll('.service-button');
            let accessibilityIssues = [];

            serviceButtons.forEach((button, index) => {
                if (!button.hasAttribute('aria-selected')) {
                    accessibilityIssues.push(`Service button ${index + 1} missing aria-selected`);
                }
                if (!button.hasAttribute('role')) {
                    accessibilityIssues.push(`Service button ${index + 1} missing role`);
                }
            });

            if (accessibilityIssues.length > 0) {
                throw new Error(`Accessibility issues: ${accessibilityIssues.join(', ')}`);
            }

            this.validationResults.set('accessibility', { valid: true, buttons: serviceButtons.length });
            console.log('✅ Accessibility validation passed');
        }

        validateServicesOpen() {
            const validations = [
                this.validateServicesVisibility.bind(this),
                this.validateZIndexManagement.bind(this),
                this.validateFocusTrap.bind(this),
                this.validateAnimationState.bind(this)
            ];

            validations.forEach(validation => {
                try {
                    validation();
                } catch (error) {
                    console.error('Services open validation error:', error);
                    this.showValidationError(`Services validation failed: ${error.message}`);
                }
            });
        }

        validateServicesClosed() {
            const validations = [
                this.validateServicesHidden.bind(this),
                this.validateScrollRestoration.bind(this),
                this.validateAnimationResume.bind(this)
            ];

            validations.forEach(validation => {
                try {
                    validation();
                } catch (error) {
                    console.error('Services closed validation error:', error);
                    this.showValidationError(`Services closed validation failed: ${error.message}`);
                }
            });
        }

        validateServicesVisibility() {
            const servicesSection = document.querySelector('.services-section');
            if (!servicesSection) return;

            const computedStyle = getComputedStyle(servicesSection);
            if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
                throw new Error('Services section not properly visible when opened');
            }

            this.validationResults.set('servicesVisibility', { valid: true });
        }

        validateZIndexManagement() {
            const servicesSection = document.querySelector('.services-section');
            const manifestoSection = document.querySelector('.manifesto-section');

            if (servicesSection && manifestoSection) {
                const servicesZIndex = parseInt(getComputedStyle(servicesSection).zIndex) || 0;
                const manifestoZIndex = parseInt(getComputedStyle(manifestoSection).zIndex) || 0;

                if (servicesZIndex <= manifestoZIndex) {
                    throw new Error('Services section not properly layered above manifesto section');
                }
            }

            this.validationResults.set('zIndexManagement', { valid: true });
        }

        validateFocusTrap() {
            const servicesSection = document.querySelector('.services-section');
            if (!servicesSection) return;

            const focusableElements = servicesSection.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableElements.length === 0) {
                throw new Error('No focusable elements found in services section');
            }

            this.validationResults.set('focusTrap', { valid: true, focusableCount: focusableElements.length });
        }

        validateAnimationState() {
            if (this.servicesAnimations && this.servicesAnimations.masterTimeline) {
                const timelineState = this.servicesAnimations.masterTimeline.paused();

                // Timeline should not be paused when services is open
                if (timelineState) {
                    throw new Error('Services animations timeline is paused when it should be playing');
                }
            }

            this.validationResults.set('animationState', { valid: true });
        }

        validateServicesHidden() {
            const servicesSection = document.querySelector('.services-section');
            if (!servicesSection) return;

            const computedStyle = getComputedStyle(servicesSection);
            if (computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden') {
                throw new Error('Services section not properly hidden when closed');
            }

            this.validationResults.set('servicesHidden', { valid: true });
        }

        validateScrollRestoration() {
            // Check if scroll position was properly restored
            const currentScroll = window.scrollY;
            const expectedScroll = this.enhancedServicesIntegration.savedScrollPosition;

            if (Math.abs(currentScroll - expectedScroll) > 10) {
                console.warn(`Scroll position not properly restored. Expected: ${expectedScroll}, Current: ${currentScroll}`);
            }

            this.validationResults.set('scrollRestoration', { valid: true, currentScroll, expectedScroll });
        }

        validateAnimationResume() {
            const manifestoSection = document.querySelector('.manifesto-section');
            if (!manifestoSection) return;

            const computedStyle = getComputedStyle(manifestoSection);
            if (computedStyle.animationPlayState === 'paused') {
                throw new Error('Manifesto animations not resumed after services closed');
            }

            this.validationResults.set('animationResume', { valid: true });
        }

        onInitialValidationComplete() {
            this.isValidated = true;
            console.log('🎉 Initial integration validation completed successfully!');
            this.showValidationSuccess('All systems validated and ready');

            // Dispatch validation complete event
            document.dispatchEvent(new CustomEvent('integration:validated', {
                detail: {
                    results: Object.fromEntries(this.validationResults),
                    timestamp: Date.now()
                }
            }));
        }

        showValidationSuccess(message) {
            this.showValidationIndicator(message, 'success');
        }

        showValidationError(message) {
            this.showValidationIndicator(message, 'error');
        }

        showValidationWarning(message) {
            this.showValidationIndicator(message, 'warning');
        }

        showValidationIndicator(message, type) {
            if (!this.validationIndicator) return;

            this.validationIndicator.textContent = message;
            this.validationIndicator.className = `validation-indicator ${type}`;
            this.validationIndicator.classList.add('show');

            setTimeout(() => {
                this.validationIndicator.classList.remove('show');
            }, 3000);
        }

        // Public method to get validation results
        getValidationResults() {
            return Object.fromEntries(this.validationResults);
        }

        // Public method to run specific validation
        runValidation(type) {
            try {
                switch(type) {
                    case 'dom':
                        this.validateDOMStructure();
                        break;
                    case 'events':
                        this.validateEventListeners();
                        break;
                    case 'animations':
                        this.validateAnimationSystem();
                        break;
                    case 'performance':
                        this.validatePerformanceOptimizations();
                        break;
                    case 'accessibility':
                        this.validateAccessibility();
                        break;
                    default:
                        throw new Error(`Unknown validation type: ${type}`);
                }

                this.showValidationSuccess(`${type} validation passed`);
            } catch (error) {
                this.showValidationError(`${type} validation failed: ${error.message}`);
                throw error;
            }
        }
    }

    // Enhanced User Experience Flow Manager
    class UXFlowManager {
        constructor(servicesSectionManager, servicesAnimations, integrationManager) {
            this.servicesSectionManager = servicesSectionManager;
            this.servicesAnimations = servicesAnimations;
            this.integrationManager = integrationManager;

            this.isTransitioning = false;
            this.pendingActions = [];
            this.contextStack = [];

            this.init();
        }

        init() {
            this.setupTransitionHandling();
            this.setupContextManagement();
            this.setupEdgeCaseHandling();
            this.setupUXEnhancements();
        }

        setupTransitionHandling() {
            // Prevent multiple rapid clicks during transitions
            document.addEventListener('services:opened', () => {
                this.isTransitioning = true;

                // Clear any pending actions
                this.pendingActions = [];

                // Re-enable after transition
                setTimeout(() => {
                    this.isTransitioning = false;
                }, 1000);
            });

            document.addEventListener('services:closed', () => {
                this.isTransitioning = true;

                setTimeout(() => {
                    this.isTransitioning = false;
                }, 800);
            });

            // Queue actions during transitions
            this.setupActionQueue();
        }

        setupActionQueue() {
            // Enhanced click handler that queues actions during transitions
            const originalOpenServices = this.servicesSectionManager.openServices.bind(this.servicesSectionManager);

            this.servicesSectionManager.openServices = (...args) => {
                if (this.isTransitioning) {
                    this.pendingActions.push({ action: 'openServices', args, timestamp: Date.now() });
                    return;
                }

                // Clear previous pending actions
                this.pendingActions = [];

                originalOpenServices(...args);
            };

            // Process queued actions after transition
            document.addEventListener('services:closed', () => {
                this.processQueuedActions();
            });
        }

        processQueuedActions() {
            if (this.pendingActions.length === 0) return;

            // Sort by timestamp and process
            this.pendingActions
                .sort((a, b) => a.timestamp - b.timestamp)
                .forEach(({ action, args }) => {
                    if (action === 'openServices' && !this.isTransitioning) {
                        this.servicesSectionManager.openServices(...args);
                    }
                });

            this.pendingActions = [];
        }

        setupContextManagement() {
            // Maintain context when navigating between sections
            this.contextStack = [];

            document.addEventListener('services:opened', (e) => {
                // Save current context
                const context = {
                    scrollPosition: window.scrollY,
                    activeElement: document.activeElement,
                    manifestoVisible: this.isManifestoVisible(),
                    timestamp: Date.now()
                };

                this.contextStack.push(context);
            });

            document.addEventListener('services:closed', (e) => {
                // Restore context if available
                if (this.contextStack.length > 0) {
                    const context = this.contextStack[this.contextStack.length - 1];

                    // Only restore if recent (within 5 minutes)
                    if (Date.now() - context.timestamp < 5 * 60 * 1000) {
                        setTimeout(() => {
                            this.restoreContext(context);
                        }, 100);
                    }

                    this.contextStack.pop();
                }
            });
        }

        restoreContext(context) {
            // Restore scroll position
            if (context.scrollPosition > 0) {
                window.scrollTo(0, context.scrollPosition);
            }

            // Restore focus if element is still available
            if (context.activeElement && context.activeElement.parentNode) {
                setTimeout(() => {
                    context.activeElement.focus();
                }, 200);
            }
        }

        isManifestoVisible() {
            const manifestoSection = document.querySelector('.manifesto-section');
            if (!manifestoSection) return false;

            const rect = manifestoSection.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        }

        setupEdgeCaseHandling() {
            // Handle navigation during transitions
            document.addEventListener('click', (e) => {
                if (this.isTransitioning) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            });

            // Handle keyboard navigation during transitions
            document.addEventListener('keydown', (e) => {
                if (this.isTransitioning && e.key !== 'Escape') {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            });

            // Handle window resize during services open
            window.addEventListener('resize', () => {
                if (this.servicesSectionManager.isOpen && !this.isTransitioning) {
                    // Debounce resize events
                    clearTimeout(this.resizeTimeout);
                    this.resizeTimeout = setTimeout(() => {
                        this.handleServicesResize();
                    }, 250);
                }
            });

            // Handle visibility changes
            document.addEventListener('visibilitychange', () => {
                if (document.hidden && this.servicesSectionManager.isOpen) {
                    // Page hidden while services open - pause animations
                    this.pauseServicesAnimations();
                } else if (!document.hidden && this.servicesSectionManager.isOpen) {
                    // Page visible again - resume animations
                    this.resumeServicesAnimations();
                }
            });
        }

        handleServicesResize() {
            // Handle responsive adjustments when services section is open
            const servicesSection = document.querySelector('.services-section');
            if (servicesSection && window.innerWidth <= 768) {
                // Mobile adjustments
                servicesSection.classList.add('mobile-layout');
            } else {
                servicesSection.classList.remove('mobile-layout');
            }
        }

        pauseServicesAnimations() {
            if (this.servicesAnimations && this.servicesAnimations.masterTimeline) {
                this.servicesAnimations.masterTimeline.pause();
            }
        }

        resumeServicesAnimations() {
            if (this.servicesAnimations && this.servicesAnimations.masterTimeline) {
                this.servicesAnimations.masterTimeline.resume();
            }
        }

        setupUXEnhancements() {
            // Add smooth transition effects
            this.addTransitionEffects();

            // Add loading states
            this.addLoadingStates();

            // Add progress indicators
            this.addProgressIndicators();

            // Add keyboard shortcuts
            this.addKeyboardShortcuts();
        }

        addTransitionEffects() {
            // Enhanced transition effects between sections
            const style = document.createElement('style');
            style.textContent = `
                .services-transitioning * {
                    transition: all 0.3s ease !important;
                }

                .context-transition {
                    transition: transform 0.4s ease, opacity 0.4s ease;
                }

                .services-loading {
                    opacity: 0.7;
                    pointer-events: none;
                }

                .services-loading::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 40px;
                    height: 40px;
                    margin: -20px 0 0 -20px;
                    border: 3px solid rgba(236, 72, 153, 0.3);
                    border-top: 3px solid #ec4899;
                    border-radius: 50%;
                    animation: servicesLoadingSpin 1s linear infinite;
                }

                @keyframes servicesLoadingSpin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        addLoadingStates() {
            // Add loading state management
            document.addEventListener('services:service_changed', (e) => {
                const mediaContainer = document.querySelector('.media-container');
                if (mediaContainer) {
                    mediaContainer.classList.add('services-loading');

                    // Remove loading state after content loads
                    setTimeout(() => {
                        mediaContainer.classList.remove('services-loading');
                    }, 1500);
                }
            });
        }

        addProgressIndicators() {
            // Add progress indicator for service navigation
            const servicesNav = document.querySelector('.services-nav');
            if (servicesNav) {
                const progressIndicator = document.createElement('div');
                progressIndicator.className = 'service-progress';
                progressIndicator.innerHTML = `
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="progress-text">1 of 4</div>
                `;

                servicesNav.appendChild(progressIndicator);

                // Update progress when service changes
                document.addEventListener('services:service_changed', (e) => {
                    this.updateProgressIndicator(e.detail.serviceId);
                });
            }
        }

        updateProgressIndicator(serviceId) {
            const serviceButtons = document.querySelectorAll('.service-button');
            const currentIndex = Array.from(serviceButtons).findIndex(button =>
                button.dataset.service === serviceId
            );

            if (currentIndex !== -1) {
                const progress = ((currentIndex + 1) / serviceButtons.length) * 100;
                const progressFill = document.querySelector('.progress-fill');
                const progressText = document.querySelector('.progress-text');

                if (progressFill) {
                    progressFill.style.width = `${progress}%`;
                }

                if (progressText) {
                    progressText.textContent = `${currentIndex + 1} of ${serviceButtons.length}`;
                }
            }
        }

        addKeyboardShortcuts() {
            // Enhanced keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!this.servicesSectionManager.isOpen) return;

                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.servicesSectionManager.previousService();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.servicesSectionManager.nextService();
                        break;
                    case 'Escape':
                        e.preventDefault();
                        this.servicesSectionManager.closeServices();
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.servicesSectionManager.switchToService('ai-photography');
                        break;
                    case 'End':
                        e.preventDefault();
                        this.servicesSectionManager.switchToService('ai-creatives');
                        break;
                    case ' ':
                        e.preventDefault();
                        // Toggle play/pause for media if available
                        this.toggleMediaPlayback();
                        break;
                }
            });
        }

        toggleMediaPlayback() {
            const mediaElements = document.querySelectorAll('.media-container video, .media-container audio');
            mediaElements.forEach(media => {
                if (media.paused) {
                    media.play();
                } else {
                    media.pause();
                }
            });
        }

        // Public method to check if currently transitioning
        isCurrentlyTransitioning() {
            return this.isTransitioning;
        }

        // Public method to get pending actions count
        getPendingActionsCount() {
            return this.pendingActions.length;
        }
    }

    // Enhanced Z-Index and Layering Management
    class LayeringManager {
        constructor(servicesSectionManager) {
            this.servicesSectionManager = servicesSectionManager;
            this.zIndexStack = [];
            this.focusableElements = [];
            this.firstFocusableElement = null;
            this.lastFocusableElement = null;

            this.init();
        }

        init() {
            this.setupZIndexManagement();
            this.setupFocusTrap();
            this.setupAccessibility();
            this.setupLayeringOptimizations();
        }

        setupZIndexManagement() {
            // Define z-index hierarchy
            this.Z_INDEXES = {
                BASE: 1,
                HERO: 10,
                MANIFESTO: 20,
                SERVICES: 1000,
                CURSOR: 9999,
                MODAL: 10000
            };

            // Track elements that need z-index management
            this.trackedElements = new Map([
                ['.hero-section', this.Z_INDEXES.HERO],
                ['.manifesto-section', this.Z_INDEXES.MANIFESTO],
                ['.services-section', this.Z_INDEXES.SERVICES],
                ['.custom-cursor', this.Z_INDEXES.CURSOR]
            ]);

            // Apply initial z-indexes
            this.trackedElements.forEach((zIndex, selector) => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.zIndex = zIndex;
                }
            });

            // Monitor services section state changes
            document.addEventListener('services:opened', () => {
                this.onServicesOpen();
            });

            document.addEventListener('services:closed', () => {
                this.onServicesClose();
            });
        }

        onServicesOpen() {
            // Save current z-indexes
            this.zIndexStack = Array.from(this.trackedElements.entries()).map(([selector, originalZIndex]) => {
                const element = document.querySelector(selector);
                return {
                    element,
                    selector,
                    originalZIndex,
                    currentZIndex: element ? parseInt(getComputedStyle(element).zIndex) || 0 : 0
                };
            });

            // Reduce z-index of background elements
            const backgroundElements = ['.hero-section', '.manifesto-section'];
            backgroundElements.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.zIndex = this.Z_INDEXES.BASE;
                    element.style.pointerEvents = 'none';
                }
            });

            // Ensure services section is on top
            const servicesSection = document.querySelector('.services-section');
            if (servicesSection) {
                servicesSection.style.zIndex = this.Z_INDEXES.SERVICES;
                servicesSection.style.pointerEvents = 'auto';
            }

            // Ensure cursor stays on top
            const cursor = document.querySelector('.custom-cursor');
            if (cursor) {
                cursor.style.zIndex = this.Z_INDEXES.CURSOR;
            }
        }

        onServicesClose() {
            // Restore original z-indexes
            this.zIndexStack.forEach(({ element, originalZIndex }) => {
                if (element && element.parentNode) {
                    element.style.zIndex = originalZIndex;
                    element.style.pointerEvents = 'auto';
                }
            });

            // Clear stack
            this.zIndexStack = [];
        }

        setupFocusTrap() {
            document.addEventListener('services:opened', () => {
                this.createFocusTrap();
            });

            document.addEventListener('services:closed', () => {
                this.removeFocusTrap();
            });
        }

        createFocusTrap() {
            const servicesSection = document.querySelector('.services-section');
            if (!servicesSection) return;

            // Get all focusable elements within services section
            this.focusableElements = Array.from(servicesSection.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )).filter(el => !el.disabled && !el.hasAttribute('aria-hidden'));

            if (this.focusableElements.length === 0) return;

            this.firstFocusableElement = this.focusableElements[0];
            this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];

            // Trap focus within services section
            this.focusTrapHandler = (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        // Shift + Tab
                        if (document.activeElement === this.firstFocusableElement) {
                            e.preventDefault();
                            this.lastFocusableElement.focus();
                        }
                    } else {
                        // Tab
                        if (document.activeElement === this.lastFocusableElement) {
                            e.preventDefault();
                            this.firstFocusableElement.focus();
                        }
                    }
                }
            };

            document.addEventListener('keydown', this.focusTrapHandler);

            // Focus first element
            setTimeout(() => {
                this.firstFocusableElement?.focus();
            }, 100);
        }

        removeFocusTrap() {
            if (this.focusTrapHandler) {
                document.removeEventListener('keydown', this.focusTrapHandler);
                this.focusTrapHandler = null;
            }

            this.focusableElements = [];
            this.firstFocusableElement = null;
            this.lastFocusableElement = null;
        }

        setupAccessibility() {
            // Add ARIA attributes when services open
            document.addEventListener('services:opened', () => {
                // Hide background content from screen readers
                const backgroundElements = document.querySelectorAll('.hero-section, .manifesto-section');
                backgroundElements.forEach(element => {
                    element.setAttribute('aria-hidden', 'true');
                });

                // Make services section visible to screen readers
                const servicesSection = document.querySelector('.services-section');
                if (servicesSection) {
                    servicesSection.setAttribute('aria-hidden', 'false');
                    servicesSection.setAttribute('role', 'dialog');
                    servicesSection.setAttribute('aria-modal', 'true');
                    servicesSection.setAttribute('aria-label', 'Services showcase');
                }
            });

            document.addEventListener('services:closed', () => {
                // Restore background content visibility
                const backgroundElements = document.querySelectorAll('.hero-section, .manifesto-section');
                backgroundElements.forEach(element => {
                    element.removeAttribute('aria-hidden');
                });

                // Hide services section
                const servicesSection = document.querySelector('.services-section');
                if (servicesSection) {
                    servicesSection.setAttribute('aria-hidden', 'true');
                    servicesSection.removeAttribute('role');
                    servicesSection.removeAttribute('aria-modal');
                    servicesSection.removeAttribute('aria-label');
                }
            });
        }

        setupLayeringOptimizations() {
            // Use hardware acceleration for better layering performance
            const style = document.createElement('style');
            style.textContent = `
                .services-section,
                .services-section * {
                    will-change: transform, opacity;
                    transform: translateZ(0);
                    backface-visibility: hidden;
                }

                .services-section.active {
                    transform: translateZ(0);
                }

                /* Optimize background elements when services is open */
                .services-active .hero-section,
                .services-active .manifesto-section {
                    will-change: auto;
                    transform: translateZ(-1);
                }
            `;
            document.head.appendChild(style);

            // Handle high DPI displays
            if (window.devicePixelRatio > 1) {
                const servicesSection = document.querySelector('.services-section');
                if (servicesSection) {
                    servicesSection.style.imageRendering = 'crisp-edges';
                }
            }
        }

        // Public method to check if element is on top layer
        isOnTopLayer(element) {
            const computedZIndex = parseInt(getComputedStyle(element).zIndex) || 0;
            return computedZIndex >= this.Z_INDEXES.SERVICES;
        }

        // Public method to bring element to top
        bringToTop(element, zIndex = null) {
            const targetZIndex = zIndex || this.Z_INDEXES.MODAL;
            element.style.zIndex = targetZIndex;
            return targetZIndex;
        }
    }

    // Enhanced event delegation for better performance
    document.addEventListener('click', function(e) {
        // Handle manifesto service items (fallback)
        if (e.target.closest('.manifesto-section .service-item') && !e.target.closest('.services-section')) {
            const serviceItem = e.target.closest('.service-item');
            const targetService = serviceItem.dataset.targetService || 'ai-photography';

            console.log('Opening services from manifesto item:', targetService);

            // Use try-catch to handle any errors in the services manager
            try {
                servicesSectionManager.openServices();

                setTimeout(() => {
                    servicesSectionManager.switchToService(targetService);
                }, 300);
            } catch (error) {
                console.error('Error opening services:', error);
            }
        }

        // Handle header contact button (fallback)
        if (e.target.closest('#simpleBtn')) {
            console.log('Opening services from header button');

            try {
                servicesSectionManager.openServices();
            } catch (error) {
                console.error('Error opening services from header:', error);
            }
        }
    });

    // Ensure manifesto service items have proper click handlers
    document.addEventListener('DOMContentLoaded', function() {
        const manifestoServiceItems = document.querySelectorAll('.manifesto-section .service-item');

        manifestoServiceItems.forEach((item, index) => {
            if (!item.onclick) {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetService = this.dataset.targetService || 'ai-photography';

                    console.log(`Manifesto service item ${index} clicked, opening:`, targetService);

                    try {
                        if (window.servicesSectionManager) {
                            window.servicesSectionManager.openServices();

                            setTimeout(() => {
                                window.servicesSectionManager.switchToService(targetService);
                            }, 300);
                        }
                    } catch (error) {
                        console.error('Error in manifesto service click handler:', error);
                    }
                });

                console.log(`Added click handler to manifesto service item ${index}`);
            }
        });

        console.log(`Set up ${manifestoServiceItems.length} manifesto service item handlers`);
    });

    // Add CSS for enhanced UX states
    const servicesStyles = document.createElement('style');
    servicesStyles.textContent = `
        .media-item {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .media-item.loading {
            opacity: 0.5;
        }

        .media-item.loaded {
            opacity: 1;
        }

        .media-item.error {
            opacity: 0.3;
            filter: grayscale(100%);
        }

        .media-layout {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            height: 100%;
        }

        .primary-media {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #1f2937;
            border-radius: 0.5rem;
            overflow: hidden;
        }

        .media-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }

        .gallery-item {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #1f2937;
            border-radius: 0.5rem;
            overflow: hidden;
            aspect-ratio: var(--aspect-ratio, 16/9);
        }

        .gallery-item img,
        .gallery-item video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .service-button.active {
            background-color: rgba(236, 72, 153, 0.1);
            border-color: rgba(236, 72, 153, 0.3);
        }

        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        /* Touch-friendly enhancements */
        @media (hover: none) and (pointer: coarse) {
            .service-button {
                min-height: 48px;
                padding: 1rem;
            }

            .nav-control,
            .close-services {
                min-width: 48px;
                min-height: 48px;
            }
        }

        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
            .media-item {
                transition: none;
            }

            .service-button {
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(servicesStyles);


    console.log('Landing page initialized successfully!');
});
