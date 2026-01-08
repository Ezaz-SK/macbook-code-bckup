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
            images: [{src: './assets/water_bottle.jpeg', width: '350px', height: '250px'}, {src: './assets/sunsscreen.jpeg', width: '400px', height: '300px'}],
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
            metrics: [
                { value: '300%', label: 'Sales Increase' },
                { value: '60%', label: 'Less Cart Abandonment' },
                { value: '2.1M', label: 'Active Users' }
            ],
            challenge: 'The client needed a modern, scalable e-commerce platform that could handle millions of users while maintaining fast load times and providing an exceptional user experience.',
            solution: 'We built a full-stack solution using React for the frontend, Node.js for the backend, and MongoDB for the database. The platform includes advanced features like real-time inventory management, AI-powered recommendations, and seamless payment integration.',
            results: 'The platform achieved a 300% increase in online sales, reduced cart abandonment by 60%, and now serves over 2.1 million active users monthly.',
            demoUrl: 'https://demo.ecommerce-platform.com',
            imageSizes: {
                gallery: { width: '350px', height: '250px' },
                aiGallery: { width: '450px', height: '350px' },
                beforeAfter: { width: '600px', height: '400px' },
                brandAssets: { width: '250px', height: '180px' }
            }
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
            beforeAfter: ['./assets/earring.jpeg', './assets/sunsscreen.jpeg'],
            images: [{src: './assets/sunsscreen.jpeg', width: '350px', height: '250px'}, {src: './assets/earring.jpeg', width: '400px', height: '300px'}, {src: './assets/earring.jpeg', width: '450px', height: '350px'}],
            imageSizes: {
                gallery: { width: '400px', height: '300px' },
                beforeAfter: { width: '800px', height: '450px' },
                brandAssets: { width: '300px', height: '200px' }
            }
        },
        'mobile-banking': {
            title: 'Next-Gen Banking',
            category: 'UI/UX Design',
            description: 'Award-winning mobile banking application with biometric security and intuitive UX, setting new industry standards.',
            images: [{src: './assets/earring.jpeg', width: '350px', height: '250px'}, {src: './assets/specs.jpeg', width: '400px', height: '300px'}],
            technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Biometrics', 'AWS'],
            metrics: [
                { value: '4.9★', label: 'App Rating' },
                { value: '1M+', label: 'Downloads' },
                { value: '99.9%', label: 'Uptime' }
            ],
            challenge: 'Traditional banking apps lacked modern UX and security features that users expect from fintech applications.',
            solution: 'We designed and developed a mobile banking app with biometric authentication, intuitive navigation, and advanced security features.',
            results: 'The app achieved a 4.9-star rating, over 1 million downloads, and maintains 99.9% uptime.',
            imageSizes: {
                gallery: { width: '320px', height: '240px' },
                aiGallery: { width: '420px', height: '320px' },
                beforeAfter: { width: '550px', height: '380px' },
                brandAssets: { width: '220px', height: '160px' }
            }
        },
        'brand-identity': {
            title: 'Brand Evolution',
            category: 'Branding',
            description: 'Complete brand identity redesign for a tech startup, establishing them as a market leader in their industry.',
            images: [{src: './assets/specs.jpeg', width: '350px', height: '250px'}, {src: './assets/powerpops.jpeg', width: '400px', height: '300px'}],
            technologies: ['Figma', 'Adobe Creative Suite', 'Brand Strategy', 'Design System'],
            metrics: [
                { value: '150%', label: 'Brand Recognition' },
                { value: '85%', label: 'Customer Trust' },
                { value: '3x', label: 'Market Share Growth' }
            ],
            challenge: 'The startup needed a cohesive brand identity that would differentiate them in a crowded market and build trust with enterprise clients.',
            solution: 'We conducted extensive brand research, developed a comprehensive design system, and created all brand assets including logo, typography, color palette, and marketing materials.',
            results: 'The rebrand increased brand recognition by 150%, improved customer trust by 85%, and contributed to 3x market share growth.',
            brandAssets: ['./assets/specs.jpeg', './assets/powerpops.jpeg', './assets/earring.jpeg'],
            imageSizes: {
                gallery: { width: '380px', height: '280px' },
                aiGallery: { width: '480px', height: '360px' },
                beforeAfter: { width: '650px', height: '420px' },
                brandAssets: { width: '280px', height: '190px' }
            }
        },
        'saas-dashboard': {
            title: 'SaaS Dashboard',
            category: 'Web Development',
            description: 'Comprehensive analytics dashboard for enterprise clients with real-time data visualization and advanced reporting features.',
            images: [{src: './assets/powerpops.jpeg', width: '350px', height: '250px'}, {src: './assets/princles.jpeg', width: '400px', height: '300px'}],
            technologies: ['Vue.js', 'D3.js', 'Python', 'AWS', 'PostgreSQL'],
            metrics: [
                { value: '99.5%', label: 'Data Accuracy' },
                { value: '500ms', label: 'Response Time' },
                { value: '50+', label: 'Enterprise Clients' }
            ],
            challenge: 'Enterprise clients needed a powerful yet user-friendly dashboard to monitor complex business metrics and KPIs.',
            solution: 'We built a comprehensive SaaS dashboard with advanced data visualization, real-time updates, and customizable reporting features.',
            results: 'The dashboard maintains 99.5% data accuracy, sub-500ms response times, and serves over 50 enterprise clients.',
            demoUrl: 'https://demo.saas-dashboard.com',
            imageSizes: {
                gallery: { width: '360px', height: '260px' },
                aiGallery: { width: '460px', height: '340px' },
                beforeAfter: { width: '620px', height: '410px' },
                brandAssets: { width: '260px', height: '175px' }
            }
        },
        'ai-chatbot': {
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
            beforeAfter: ['./assets/earring.jpeg', './assets/sunsscreen.jpeg'],
            images: [{src: './assets/sunsscreen.jpeg', width: '350px', height: '350px'}, {src: './assets/earring.jpeg', width: '200px', height: '350px'}, {src: './assets/earring.jpeg', width: '500px', height: '350px'},{src: './assets/earring.jpeg', width: '350px', height: '350px'},{src: './assets/earring.jpeg', width: '350px', height: '350px'},{src: './assets/earring.jpeg', width: '350px', height: '350px'}],
            imageSizes: {
                gallery: { width: '400px', height: '300px' },
                beforeAfter: { width: '800px', height: '450px' },
                brandAssets: { width: '300px', height: '200px' }
            }
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


                 ${project.beforeAfter ? `
                        <div class="before-after-slider">
                             <div class="slider-container" data-before="${project.beforeAfter[0]}" data-after="${project.beforeAfter[1]}" style="width: ${project.imageSizes?.beforeAfter?.width || '600px'}; height: ${project.imageSizes?.beforeAfter?.height || '400px'};">
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


                     <div class="project-metrics-grid">
                        ${project.metrics.map(metric => `
                            <div class="metric-card">
                                <div class="metric-value">${metric.value}</div>
                                <div class="metric-label">${metric.label}</div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="project-detail-gallery">
                        ${project.images.map(img => `<img src="${img.src}" alt="${project.title}" class="gallery-image" style="width: ${img.width || '350px'}; height: ${img.height || '250px'};">`).join('')}
                    </div>

                    

                    ${project.category === 'Web Development' && project.demoUrl ? `
                        <div class="demo-section">
                            <button class="demo-button" data-demo-url="${project.demoUrl}">View Live Demo</button>
                        </div>
                    ` : ''}

                   

                   

                    ${project.aiImages ? `
                        <div class="ai-images-gallery">
                            <h3>AI Generated Images</h3>
                            <div class="ai-images-grid">
                                ${project.aiImages.map(img => `<img src="${img}" alt="AI Generated Image" class="ai-gallery-image" style="width: ${project.imageSizes?.aiGallery?.width || '500px'}; height: ${project.imageSizes?.aiGallery?.height || '200px'};">`).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${project.category === 'Branding' && project.brandAssets ? `
                        <div class="brand-assets-gallery">
                            <h3>Brand Assets</h3>
                            <div class="brand-assets-grid">
                                ${project.brandAssets.map(asset => `<img src="${asset}" alt="Brand Asset" class="brand-asset-image" style="width: ${project.imageSizes?.brandAssets?.width || '250px'}; height: ${project.imageSizes?.brandAssets?.height || '180px'};">`).join('')}
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

        // Initialize before-after slider functionality
        if (project.beforeAfter) {
            initializeBeforeAfterSlider();
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