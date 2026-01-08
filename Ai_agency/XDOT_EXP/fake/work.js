// Work page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Work page JavaScript loaded');

    // Initialize custom cursor for work page
    if (window.customCursor) {
        console.log('Custom cursor already initialized');
    }

    /*
     * PROJECT DATABASE
     */
    const projectData = {
        "cosmetics-catalog": {
            category: "AI Catalog Maker",
            title: "Cosmetics Brand Catalog",
            beforeImage: "assets/powerpops.jpeg",
            afterImage: "assets/sweet_escape.jpeg",
            galleryImages: [
                { src: "assets/earring.jpeg", caption: "Product Detail", aspectRatio: "1:1" },
                { src: "assets/greenPower.png", caption: "Lifestyle Shot", aspectRatio: "16:9" },
                { src: "assets/sunpower.png", caption: "Studio Setup", aspectRatio: "4:3" },
                { src: "assets/water_bottle.jpeg", caption: "Contextual View", aspectRatio: "1:1" }
            ],
            description: "This client came to us with 50+ product photos taken on a standard smartphone. They needed a professional, consistent look for their new e-commerce store but had a very limited budget and timeline.<br><br>Our team used a combination of AI-powered background removal, generative fill for shadows and reflections, and expert color grading to transform every image. We delivered a complete, sales-ready catalog at <strong>80% less cost</strong> than a traditional photoshoot.",
            tags: ["AI Imaging", "Generative Fill", "Color Grading", "E-Commerce", "Photoshop"],
            demoUrl: null
        },

        "startup-landing": {
            category: "Rapid Web Development",
            title: "Startup Landing Page",
            beforeImage: null,
            afterImage: "assets/sunsscreen.jpeg",
            galleryImages: [],
            description: "This startup needed to go from idea to a live, professional landing page to capture investor interest—and they needed it *fast*.<br><br>Our rapid development team worked directly with the founder, finalizing the design, copy, and development in a single 24-hour sprint. The site is fully responsive, SEO-optimized, and features subtle animations to impress visitors.",
            tags: ["HTML", "TailwindCSS", "GSAP", "SEO", "24-Hour Delivery"],
            demoUrl: "#"
        },

        "lakme-campaign": {
            category: "AI Catalog Maker",
            title: "Lakme Beauty Campaign",
            beforeImage: "lakme/lk1.jpeg",
            afterImage: "lakme/lk2.jpeg",
            galleryImages: [
                { src: "lakme/lk3.jpeg", caption: "Product Range" },
                { src: "lakme/lk4.jpeg", caption: "Campaign Assets" }
            ],
            description: "Lakme approached us to create a stunning visual catalog for their latest beauty campaign. We transformed their raw product photos into high-end, professional images that perfectly captured the luxurious feel of their brand.<br><br>Using advanced AI tools and expert retouching, we created consistent lighting, removed backgrounds, and enhanced colors to create a cohesive, premium look across all products.",
            tags: ["AI Enhancement", "Brand Consistency", "Beauty Industry", "Campaign Assets"],
            demoUrl: null
        },

        "citaphil-skincare": {
            category: "AI Catalog Maker",
            title: "Cetaphil Skincare Line",
            beforeImage: "citaphel/cp1.jpeg",
            afterImage: "citaphel/cp2.jpeg",
            galleryImages: [
                { src: "citaphel/cp3.jpeg", caption: "Product Showcase" }
            ],
            description: "Cetaphil needed professional product photography for their skincare line launch. We took their existing product shots and transformed them into clean, clinical, and trustworthy images that conveyed the purity and effectiveness of their products.<br><br>Our AI-powered workflow ensured consistent backgrounds, proper lighting, and professional presentation while maintaining the authentic feel of the products.",
            tags: ["Skincare", "Clinical Photography", "Product Launch", "AI Processing"],
            demoUrl: null
        },

        "bobby-brown-makeup": {
            category: "AI Catalog Maker",
            title: "Bobbi Brown Makeup Collection",
            beforeImage: "bobby brown/bb1.jpeg",
            afterImage: "bobby brown/bb2.jpeg",
            galleryImages: [
                { src: "bobby brown/bb3.jpeg", caption: "Color Range" },
                { src: "bobby brown/bb4.jpeg", caption: "Application Shots" },
                { src: "bobby brown/bb5.jpeg", caption: "Lifestyle Integration" },
                { src: "bobby brown/bb6.jpeg", caption: "Detail Close-ups" }
            ],
            description: "Bobbi Brown wanted to refresh their entire makeup collection photography for their e-commerce platform. We worked with their existing product photography to enhance colors, improve lighting consistency, and create a more luxurious presentation.<br><br>The result was a cohesive catalog that maintained the brand's premium positioning while improving online conversion rates through better visual storytelling.",
            tags: ["Luxury Beauty", "E-commerce", "Color Enhancement", "Brand Positioning"],
            demoUrl: null
        },

        "peanut-butter-branding": {
            category: "AI Catalog Maker",
            title: "Peanut Butter Brand Campaign",
            beforeImage: "peanut/WhatsApp Image 2025-10-27 at 11.46.20 (3).jpeg",
            afterImage: "peanut/WhatsApp Image 2025-10-27 at 11.46.20 (4).jpeg",
            galleryImages: [],
            description: "This artisanal peanut butter brand needed compelling product photography to stand out in a crowded market. We transformed their simple product shots into mouthwatering, professional images that highlighted the quality and craftsmanship of their product.<br><br>Using AI tools for background enhancement and lighting optimization, we created images that told a story about the brand's commitment to quality ingredients and traditional production methods.",
            tags: ["Food Photography", "Brand Storytelling", "Artisanal Products", "Market Differentiation"],
            demoUrl: null
        }
    };

    /*
     * PROJECT CARDS RENDERING
     */
    let currentFilter = 'all';

    function renderProjectCards(filter = 'all') {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;

        const filteredProjects = filter === 'all'
            ? Object.keys(projectData)
            : Object.keys(projectData).filter(projectId => {
                const project = projectData[projectId];
                if (filter === 'ai-catalog') {
                    return project.category === 'AI Catalog Maker';
                } else if (filter === 'web-development') {
                    return project.category === 'Rapid Web Development';
                }
                return true;
            });

        const projectCards = filteredProjects.map(projectId => {
            const project = projectData[projectId];
            return `
                <div class="project-card" data-category="${project.category === 'AI Catalog Maker' ? 'ai-catalog' : 'web-development'}">
                    <div class="project-image">
                        <img src="${project.afterImage || project.beforeImage}" alt="${project.title}" class="project-img">
                        <div class="project-overlay">
                            <div class="project-category">${project.category}</div>
                            <button class="view-project-btn" data-project-id="${projectId}">
                                View Details
                            </button>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description.split('<br>')[0].substring(0, 80)}${project.description.split('<br>')[0].length > 80 ? '...' : ''}</p>
                        <div class="project-tech">
                            ${project.tags.slice(0, 3).map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        projectsGrid.innerHTML = projectCards;
    }

    /*
     * FILTER FUNCTIONALITY
     */
    function initFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                // Get filter value and apply filter
                const filterValue = button.dataset.filter;
                currentFilter = filterValue;
                renderProjectCards(filterValue);

                // Add smooth animation
                gsap.fromTo('#projectsGrid .project-card',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
                );
            });
        });
    }

    /*
     * MODAL FUNCTIONALITY
     */
    function initProjectModal() {
        const modalContainer = document.getElementById('projectModalContainer');
        const modalBody = document.getElementById('modalBody');
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        const modalOverlay = document.getElementById('modalOverlay');

        if (!modalContainer || !modalBody) return;

        function renderModalContent(project) {
            modalBody.innerHTML = '';

            let imageBlock = '';
            if (project.beforeImage && project.afterImage) {
                imageBlock = `
                    <div class="mb-6">
                        <h4 class="text-sm font-semibold text-gray-400 uppercase mb-3 text-center">Slide to Compare Before & After</h4>
                        <div class="diff-container" id="diffContainer">
                            <div class="diff-item-1">
                                <img src="${project.beforeImage}" alt="Before">
                            </div>
                            <div class="diff-item-2" id="diffAfter">
                                <img src="${project.afterImage}" alt="After">
                            </div>
                            <div class="diff-resizer" id="diffResizer"></div>
                        </div>
                    </div>
                `;
            } else if (project.afterImage) {
                imageBlock = `
                    <div class="mb-6">
                        <img src="${project.afterImage}" alt="${project.title}" class="rounded-lg border border-gray-700 w-full" style="aspect-ratio: 16/9; object-fit: cover;">
                    </div>
                `;
            }

            let galleryBlock = '';
            if (project.galleryImages && project.galleryImages.length > 0) {
                const galleryItems = project.galleryImages.map(img => `
                    <a href="${img.src}" target="_blank" class="gallery-item" title="View full size: ${img.caption}">
                        <img src="${img.src}" alt="${img.caption}">
                        <p class="text-center text-sm text-gray-400 mt-2">${img.caption}</p>
                    </a>
                `).join('');

                galleryBlock = `
                    <div class="mt-10 pt-8 border-t border-gray-700">
                        <h3 class="text-2xl font-bold text-white mb-6">More Project Images</h3>
                        <div class="image-gallery-grid">
                            ${galleryItems}
                        </div>
                    </div>
                `;
            }

            const tagsBlock = project.tags.map(tag =>
                `<span class="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">${tag}</span>`
            ).join('');

            const demoButton = project.demoUrl ?
                `<a href="${project.demoUrl}" target="_blank" class="inline-block bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-lg transition-transform hover:scale-105">
                    View Live Project
                </a>` : '';

            const modalHTML = `
                <div class="text-left">
                    <p class="text-sm font-semibold text-fuchsia-400 uppercase mb-2">${project.category}</p>
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">${project.title}</h2>

                    ${imageBlock}

                    <div class="text-gray-300 mb-8">
                        <p>${project.description}</p>
                    </div>

                    <div class="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-4 gap-y-6">
                        <div class="flex flex-wrap gap-2">
                            ${tagsBlock}
                        </div>
                        <div class="mt-2 sm:mt-0">
                            ${demoButton}
                        </div>
                    </div>

                    ${galleryBlock}
                </div>
            `;

            modalBody.innerHTML = modalHTML;
        }

        function openModal(projectId) {
            const project = projectData[projectId];
            if (!project) {
                console.error('Project data not found for ID:', projectId);
                return;
            }

            renderModalContent(project);
            modalContainer.classList.add('is-open');
            document.body.style.overflow = 'hidden';

            // Initialize diff slider if present
            const diffContainer = document.getElementById('diffContainer');
            if (diffContainer) {
                initDiffSlider();
            }
        }

        function closeModal() {
            modalContainer.classList.remove('is-open');
            document.body.style.overflow = 'auto';
        }

        function initDiffSlider() {
            const resizer = document.getElementById('diffResizer');
            const afterItem = document.getElementById('diffAfter');
            const container = document.getElementById('diffContainer');

            if (!resizer || !afterItem || !container) return;

            let isDragging = false;

            const onMove = (e) => {
                if (!isDragging) return;

                let x = e.clientX || (e.touches && e.touches[0].clientX);
                if (x === undefined) return;

                const rect = container.getBoundingClientRect();
                let percentage = ((x - rect.left) / rect.width) * 100;

                percentage = Math.max(0, Math.min(100, percentage));

                resizer.style.left = `${percentage}%`;
                afterItem.style.width = `${percentage}%`;
            };

            const onStop = () => {
                isDragging = false;
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onStop);
                document.removeEventListener('touchmove', onMove);
                document.removeEventListener('touchend', onStop);
            };

            const onStart = (e) => {
                isDragging = true;
                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onStop);
                document.addEventListener('touchmove', onMove, { passive: true });
                document.addEventListener('touchend', onStop);

                if (e.type === 'mousedown') {
                    e.preventDefault();
                }
            };

            resizer.addEventListener('mousedown', onStart);
            resizer.addEventListener('touchstart', onStart, { passive: true });
        }

        // Event listeners
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-project-btn')) {
                const projectId = e.target.dataset.projectId;
                openModal(projectId);
            }
        });

        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalContainer.classList.contains('is-open')) {
                closeModal();
            }
        });
    }

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

    // Initialize project functionality
    renderProjectCards();
    initProjectModal();
    initFilters();

    // Initialize animations
    initWorkPageAnimations();

    console.log('Work page functionality initialized');
});