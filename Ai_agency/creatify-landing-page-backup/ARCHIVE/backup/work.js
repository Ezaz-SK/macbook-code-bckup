// Work page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Work page JavaScript loaded');

    // Initialize custom cursor for work page
    if (window.customCursor) {
        console.log('Custom cursor already initialized');
    }

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const sortSelect = document.querySelector('.sort-select');

    // Filter projects
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.dataset.filter;

            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'block';
                    gsap.fromTo(card,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                    );
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        y: 20,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });

    // Sort projects
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortValue = sortSelect.value;
            const projectsGrid = document.querySelector('.projects-grid');
            const cards = Array.from(projectCards);

            cards.sort((a, b) => {
                switch (sortValue) {
                    case 'newest':
                        return b.dataset.index - a.dataset.index;
                    case 'oldest':
                        return a.dataset.index - b.dataset.index;
                    case 'featured':
                        return (b.dataset.featured === 'true' ? 1 : 0) - (a.dataset.featured === 'true' ? 1 : 0);
                    default:
                        return 0;
                }
            });

            // Reorder DOM elements
            cards.forEach(card => {
                projectsGrid.appendChild(card);
            });

            // Animate reordering
            gsap.fromTo(cards,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
            );
        });
    }

    // Add index to project cards for sorting
    projectCards.forEach((card, index) => {
        card.dataset.index = index;
    });

    // Project modal functionality
    const modal = document.getElementById('projectModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');
    const viewProjectButtons = document.querySelectorAll('.view-project');

    // Project data
    const projectData = {
        'ecommerce': {
            title: 'E-Commerce Revolution',
            category: 'Web Development',
            description: 'Complete digital transformation for a retail giant, increasing online sales by 300% and reducing cart abandonment by 60%.',
            images: ['./assets/water_bottle.jpeg', './assets/sunsscreen.jpeg'],
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
            metrics: [
                { value: '300%', label: 'Sales Increase' },
                { value: '60%', label: 'Less Cart Abandonment' },
                { value: '2.1M', label: 'Active Users' }
            ],
            challenge: 'The client needed a modern, scalable e-commerce platform that could handle millions of users while maintaining fast load times and providing an exceptional user experience.',
            solution: 'We built a full-stack solution using React for the frontend, Node.js for the backend, and MongoDB for the database. The platform includes advanced features like real-time inventory management, AI-powered recommendations, and seamless payment integration.',
            results: 'The platform achieved a 300% increase in online sales, reduced cart abandonment by 60%, and now serves over 2.1 million active users monthly.',
            demoUrl: 'https://demo.ecommerce-platform.com'
        },
        'ai-analytics': {
            title: 'AI-Powered Analytics',
            category: 'AI Solutions',
            description: 'Revolutionary SaaS platform using machine learning to provide predictive insights, helping businesses make data-driven decisions.',
            images: ['./assets/sunsscreen.jpeg', './assets/earring.jpeg'],
            technologies: ['Python', 'TensorFlow', 'React', 'AWS', 'PostgreSQL'],
            metrics: [
                { value: '95%', label: 'Prediction Accuracy' },
                { value: '50K+', label: 'Predictions/Day' },
                { value: '120', label: 'Enterprise Clients' }
            ],
            challenge: 'Businesses were struggling with data overload and needed intelligent insights to make better decisions in real-time.',
            solution: 'We developed an AI-powered analytics platform that processes massive datasets using machine learning algorithms to provide actionable insights and predictive analytics.',
            results: 'The platform achieves 95% prediction accuracy, processes over 50,000 predictions daily, and serves 120 enterprise clients.',
            beforeAfter: ['./assets/earring.jpeg', './assets/sunsscreen.jpeg']
        },
        'mobile-banking': {
            title: 'Next-Gen Banking',
            category: 'UI/UX Design',
            description: 'Award-winning mobile banking application with biometric security and intuitive UX, setting new industry standards.',
            images: ['./assets/earring.jpeg', './assets/specs.jpeg'],
            technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Biometrics', 'AWS'],
            metrics: [
                { value: '4.9★', label: 'App Rating' },
                { value: '1M+', label: 'Downloads' },
                { value: '99.9%', label: 'Uptime' }
            ],
            challenge: 'Traditional banking apps lacked modern UX and security features that users expect from fintech applications.',
            solution: 'We designed and developed a mobile banking app with biometric authentication, intuitive navigation, and advanced security features.',
            results: 'The app achieved a 4.9-star rating, over 1 million downloads, and maintains 99.9% uptime.'
        },
        'brand-identity': {
            title: 'Brand Evolution',
            category: 'Branding',
            description: 'Complete brand identity redesign for a tech startup, establishing them as a market leader in their industry.',
            images: ['./assets/specs.jpeg', './assets/powerpops.jpeg'],
            technologies: ['Figma', 'Adobe Creative Suite', 'Brand Strategy', 'Design System'],
            metrics: [
                { value: '150%', label: 'Brand Recognition' },
                { value: '85%', label: 'Customer Trust' },
                { value: '3x', label: 'Market Share Growth' }
            ],
            challenge: 'The startup needed a cohesive brand identity that would differentiate them in a crowded market and build trust with enterprise clients.',
            solution: 'We conducted extensive brand research, developed a comprehensive design system, and created all brand assets including logo, typography, color palette, and marketing materials.',
            results: 'The rebrand increased brand recognition by 150%, improved customer trust by 85%, and contributed to 3x market share growth.',
            brandAssets: ['./assets/logo-brand.jpg', './assets/color-palette.jpg', './assets/typography-brand.jpg']
        },
        'saas-dashboard': {
            title: 'SaaS Dashboard',
            category: 'Web Development',
            description: 'Comprehensive analytics dashboard for enterprise clients with real-time data visualization and advanced reporting features.',
            images: ['./assets/powerpops.jpeg', './assets/princles.jpeg'],
            technologies: ['Vue.js', 'D3.js', 'Python', 'AWS', 'PostgreSQL'],
            metrics: [
                { value: '99.5%', label: 'Data Accuracy' },
                { value: '500ms', label: 'Response Time' },
                { value: '50+', label: 'Enterprise Clients' }
            ],
            challenge: 'Enterprise clients needed a powerful yet user-friendly dashboard to monitor complex business metrics and KPIs.',
            solution: 'We built a comprehensive SaaS dashboard with advanced data visualization, real-time updates, and customizable reporting features.',
            results: 'The dashboard maintains 99.5% data accuracy, sub-500ms response times, and serves over 50 enterprise clients.',
            demoUrl: 'https://demo.saas-dashboard.com'
        },
        'ai-chatbot': {
            title: 'AI Customer Support',
            category: 'AI Solutions',
            description: 'Intelligent chatbot system that handles customer inquiries 24/7, reducing support tickets by 70%.',
            images: ['./assets/princles.jpeg', './assets/water_bottle.jpeg'],
            technologies: ['NLP', 'Python', 'FastAPI', 'React', 'MongoDB'],
            metrics: [
                { value: '70%', label: 'Ticket Reduction' },
                { value: '24/7', label: 'Availability' },
                { value: '95%', label: 'Customer Satisfaction' }
            ],
            challenge: 'The company was overwhelmed with customer support requests and needed an automated solution that could handle complex inquiries.',
            solution: 'We developed an AI-powered chatbot using natural language processing that can understand context, provide accurate responses, and escalate complex issues to human agents.',
            results: 'The chatbot reduced support tickets by 70%, provides 24/7 availability, and maintains 95% customer satisfaction.',
            beforeAfter: ['./assets/before-chatbot.jpg', './assets/after-chatbot.jpg']
        }
    };

    // Open modal function
    function openModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        // Populate modal content as single scrollable page
        modalBody.innerHTML = `
            <div class="project-detail">
                <div class="project-detail-header">
                    <div class="project-category-badge">${project.category}</div>
                    <h2 class="project-detail-title">${project.title}</h2>
                    <p class="project-detail-description">${project.description}</p>
                </div>

                <div class="project-detail-content">
                    <div class="project-detail-gallery">
                        ${project.images.map(img => `<img src="${img}" alt="${project.title}" class="gallery-image">`).join('')}
                    </div>

                    <div class="project-metrics-grid">
                        ${project.metrics.map(metric => `
                            <div class="metric-card">
                                <div class="metric-value">${metric.value}</div>
                                <div class="metric-label">${metric.label}</div>
                            </div>
                        `).join('')}
                    </div>

                    ${project.category === 'Web Development' && project.demoUrl ? `
                        <div class="demo-section">
                            <button class="demo-button" data-demo-url="${project.demoUrl}">View Live Demo</button>
                        </div>
                    ` : ''}

                    ${project.category === 'AI Solutions' ? `
                        <div class="ai-image-gallery">
                            <div class="gallery-container">
                                <div class="gallery-main-image">
                                    <img src="${project.images[0]}" alt="${project.title}" class="gallery-display-image" id="galleryMainImage">
                                </div>
                                <button class="gallery-nav gallery-prev" id="galleryPrev">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="15,18 9,12 15,6"></polyline>
                                    </svg>
                                </button>
                                <button class="gallery-nav gallery-next" id="galleryNext">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="9,18 15,12 9,6"></polyline>
                                    </svg>
                                </button>
                            </div>
                            <div class="gallery-thumbnails">
                                ${project.images.map((img, index) => `
                                    <div class="thumbnail-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                                        <img src="${img}" alt="${project.title} ${index + 1}" class="thumbnail-image">
                                    </div>
                                `).join('')}
                            </div>
                            <div class="gallery-indicators">
                                ${project.images.map((_, index) => `
                                    <span class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${project.beforeAfter ? `
                        <div class="before-after-slider">
                            <div class="slider-container" data-before="${project.beforeAfter[0]}" data-after="${project.beforeAfter[1]}">
                                <img src="${project.beforeAfter[0]}" alt="Before" class="before-image">
                                <img src="${project.beforeAfter[1]}" alt="After" class="after-image">
                                <div class="slider-handle"></div>
                                <div class="slider-labels">
                                    <div class="slider-label">Before</div>
                                    <div class="slider-label">After</div>
                                </div>
                            </div>
                        </div>
                    ` : ''}

                    ${project.category === 'Branding' && project.brandAssets ? `
                        <div class="brand-assets-gallery">
                            <h3>Brand Assets</h3>
                            <div class="brand-assets-grid">
                                ${project.brandAssets.map(asset => `<img src="${asset}" alt="Brand Asset" class="brand-asset-image">`).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <div class="project-details-sections">
                        <div class="detail-section">
                            <h3 class="section-title">Challenge</h3>
                            <p class="section-content">${project.challenge}</p>
                        </div>

                        <div class="detail-section">
                            <h3 class="section-title">Solution</h3>
                            <p class="section-content">${project.solution}</p>
                        </div>

                        <div class="detail-section">
                            <h3 class="section-title">Results</h3>
                            <p class="section-content">${project.results}</p>
                        </div>
                    </div>

                    <div class="project-technologies">
                        <h3 class="technologies-title">Technologies Used</h3>
                        <div class="technologies-list">
                            ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Ensure modal body is scrollable within full-screen container
        modalBody.style.overflowY = 'auto';
        modalBody.style.maxHeight = 'calc(100vh - 80px)'; // Account for header height

        // Add demo button functionality
        const demoButton = modalBody.querySelector('.demo-button');
        if (demoButton) {
            demoButton.addEventListener('click', () => {
                window.open(demoButton.dataset.demoUrl, '_blank');
            });
        }

        // Initialize AI image gallery functionality
        if (project.category === 'AI Solutions') {
            initializeGallery();
        }

        // Initialize before-after slider functionality
        if (project.beforeAfter) {
            initializeBeforeAfterSlider();
        }

        function initializeGallery() {
            const galleryMainImage = modalBody.querySelector('#galleryMainImage');
            const galleryPrev = modalBody.querySelector('#galleryPrev');
            const galleryNext = modalBody.querySelector('#galleryNext');
            const thumbnailItems = modalBody.querySelectorAll('.thumbnail-item');
            const indicators = modalBody.querySelectorAll('.indicator');

            let currentIndex = 0;
            const images = project.images;

            function updateGallery(index) {
                currentIndex = index;
                galleryMainImage.src = images[currentIndex];

                // Update thumbnails
                thumbnailItems.forEach((thumb, i) => {
                    thumb.classList.toggle('active', i === currentIndex);
                });

                // Update indicators
                indicators.forEach((indicator, i) => {
                    indicator.classList.toggle('active', i === currentIndex);
                });
            }

            // Previous button
            galleryPrev.addEventListener('click', () => {
                const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
                updateGallery(newIndex);
            });

            // Next button
            galleryNext.addEventListener('click', () => {
                const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
                updateGallery(newIndex);
            });

            // Thumbnail click
            thumbnailItems.forEach((thumb, index) => {
                thumb.addEventListener('click', () => {
                    updateGallery(index);
                });
            });

            // Indicator click
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    updateGallery(index);
                });
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (modal.classList.contains('active')) {
                    if (e.key === 'ArrowLeft') {
                        galleryPrev.click();
                    } else if (e.key === 'ArrowRight') {
                        galleryNext.click();
                    }
                }
            });
        }

        function initializeBeforeAfterSlider() {
            const sliderContainer = modalBody.querySelector('.slider-container');
            if (!sliderContainer) return;

            const sliderHandle = sliderContainer.querySelector('.slider-handle');
            const afterImage = sliderContainer.querySelector('.after-image');
            let isDragging = false;
            let startX = 0;
            let sliderPosition = 50; // Start at 50%

            function updateSlider(position) {
                sliderPosition = Math.max(0, Math.min(100, position));
                const percentage = sliderPosition + '%';
                sliderHandle.style.left = percentage;
                afterImage.style.clipPath = `inset(0 0 0 ${percentage})`;
            }

            function handleStart(e) {
                isDragging = true;
                startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
                sliderHandle.classList.add('dragging');
                document.body.style.userSelect = 'none';
                e.preventDefault();
            }

            function handleMove(e) {
                if (!isDragging) return;

                const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
                const rect = sliderContainer.getBoundingClientRect();
                const position = ((clientX - rect.left) / rect.width) * 100;
                updateSlider(position);
                e.preventDefault();
            }

            function handleEnd() {
                if (!isDragging) return;
                isDragging = false;
                sliderHandle.classList.remove('dragging');
                document.body.style.userSelect = '';
            }

            // Mouse events
            sliderHandle.addEventListener('mousedown', handleStart);
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleEnd);

            // Touch events for mobile
            sliderHandle.addEventListener('touchstart', handleStart, { passive: false });
            document.addEventListener('touchmove', handleMove, { passive: false });
            document.addEventListener('touchend', handleEnd);

            // Click on container to jump to position
            sliderContainer.addEventListener('click', (e) => {
                if (e.target === sliderHandle || e.target.closest('.slider-handle')) return;
                const rect = sliderContainer.getBoundingClientRect();
                const position = ((e.clientX - rect.left) / rect.width) * 100;
                updateSlider(position);
            });

            // Initialize at center position
            updateSlider(50);
        }

        // Show modal with animation
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        gsap.fromTo(modal,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: "power2.out" }
        );

        gsap.fromTo(modal.querySelector('.modal-content'),
            { scale: 0.9, y: 50 },
            { scale: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
    }

    // Close modal function
    function closeModal() {
        gsap.to(modal.querySelector('.modal-content'),
            { scale: 0.9, y: 50, duration: 0.3, ease: "power2.in" }
        );

        gsap.to(modal,
            { opacity: 0, duration: 0.3, ease: "power2.in", onComplete: () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                modalBody.innerHTML = '';
            }}
        );
    }

    // Event listeners for modal
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.dataset.project;
            openModal(projectId);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // CTA button functionality
    const startProjectBtn = document.getElementById('startProjectBtn');
    const viewServicesBtn = document.getElementById('viewServicesBtn');

    if (startProjectBtn) {
        startProjectBtn.addEventListener('click', () => {
            // Scroll to contact section or open contact modal
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: "#simpleBtn" },
                ease: "power2.inOut"
            });
        });
    }

    if (viewServicesBtn) {
        viewServicesBtn.addEventListener('click', () => {
            // Navigate to services section (could be on index.html or separate page)
            window.location.href = 'index.html#manifesto-section';
        });
    }

    // Initialize GSAP animations for work page
    function initWorkPageAnimations() {
        // Hero section animation
        const heroSection = document.querySelector('.work-hero-section');
        if (heroSection) {
            gsap.fromTo(heroSection.querySelector('h1'),
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
            );

            gsap.fromTo(heroSection.querySelector('p'),
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
            );
        }

        // Filter section animation
        const filterSection = document.querySelector('.filter-section');
        if (filterSection) {
            gsap.fromTo(filterSection,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power2.out" }
            );
        }

        // Projects grid animation
        const projectCards = document.querySelectorAll('.project-card');
        gsap.fromTo(projectCards,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.8, ease: "power2.out" }
        );

        // Testimonials animation
        const testimonialsSection = document.querySelector('.testimonials-section');
        if (testimonialsSection) {
            const testimonialObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        gsap.fromTo(testimonialsSection.querySelector('h2'),
                            { opacity: 0, y: 30 },
                            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
                        );

                        gsap.fromTo(testimonialsSection.querySelectorAll('.testimonial-card'),
                            { opacity: 0, y: 30 },
                            { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, delay: 0.3, ease: "power2.out" }
                        );

                        testimonialObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            testimonialObserver.observe(testimonialsSection);
        }

        // CTA section animation
        const ctaSection = document.querySelector('.work-cta-section');
        if (ctaSection) {
            const ctaObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        gsap.fromTo(ctaSection.querySelector('h2'),
                            { opacity: 0, y: 30 },
                            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
                        );

                        gsap.fromTo(ctaSection.querySelector('p'),
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
                        );

                        gsap.fromTo(ctaSection.querySelector('.cta-buttons'),
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power2.out" }
                        );

                        ctaObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            ctaObserver.observe(ctaSection);
        }
    }

    // Initialize animations
    initWorkPageAnimations();

    // Add hover effects for project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    console.log('Work page functionality initialized');
});