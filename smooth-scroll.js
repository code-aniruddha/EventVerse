// Lightweight Smooth Scroll Implementation
// Using optimized Lenis with performance fixes

let lenis = null;
let rafId = null;
let isLenisReady = false;

// Initialize Lenis with performance-focused settings
function initLenis() {
    if (typeof Lenis === 'undefined') {
        console.warn('Lenis not available, using native scroll');
        return false;
    }

    try {
        lenis = new Lenis({
            duration: 1.0,
            easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 1.0,
            touchMultiplier: 2,
            normalizeWheel: true,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });

        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);
        isLenisReady = true;

        console.log('✅ Lenis smooth scroll active');
        return true;

    } catch (error) {
        console.error('Lenis error:', error);
        return false;
    }
}

// Initialize all features
function initAllFeatures() {
    const lenisLoaded = initLenis();

    // Wait a bit for Lenis to be ready
    setTimeout(() => {
        initSmoothScroll();
        initPageTransitions();
        initScrollIndicator();
        initBackToTop();
        initRevealOnScroll();
        initParallaxEffect();
    }, 100);
}

// Smooth anchor link scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - navHeight - 20;

                if (lenis && isLenisReady) {
                    lenis.scrollTo(targetPosition, {
                        offset: 0,
                        immediate: false,
                        duration: 1.0
                    });
                } else {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }

                closeNavigationMenu();
            }
        });
    });

    // Close menu on page navigation
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        if (!link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', closeNavigationMenu);
        }
    });
}

// Page transition with 3D animation
function initPageTransitions() {
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition';
    transitionOverlay.innerHTML = `
        <canvas id="transition-canvas"></canvas>
        <div class="page-transition-content">
            <div class="page-transition-spinner"></div>
            <p class="transition-text">Loading...</p>
        </div>
    `;
    document.body.appendChild(transitionOverlay);

    let transitionScene = null;

    function init3DTransition() {
        if (typeof THREE === 'undefined') return;

        const canvas = document.getElementById('transition-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.position.z = 5;

        const root = document.documentElement;
        const theme = root.getAttribute('data-theme') || 'dark';
        const primaryColor = theme === 'dark' ? 0x00FFFF : 0x0066FF;
        const secondaryColor = theme === 'dark' ? 0xFF3CAC : 0xFF4F9E;

        const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16);
        const edges = new THREE.EdgesGeometry(geometry);
        const material = new THREE.LineBasicMaterial({
            color: primaryColor,
            linewidth: 2,
            transparent: true,
            opacity: 0.8
        });
        const shape = new THREE.LineSegments(edges, material);
        scene.add(shape);

        const particleCount = 100;
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            color: secondaryColor,
            size: 0.05,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        let animationId;
        let time = 0;
        function animate() {
            animationId = requestAnimationFrame(animate);
            time += 0.02;

            shape.rotation.x += 0.01;
            shape.rotation.y += 0.015;
            particles.rotation.y += 0.002;

            const scale = 1 + Math.sin(time) * 0.1;
            shape.scale.set(scale, scale, scale);

            renderer.render(scene, camera);
        }

        animate();

        transitionScene = {
            stop: () => {
                cancelAnimationFrame(animationId);
                renderer.dispose();
                geometry.dispose();
                edges.dispose();
                material.dispose();
                particlesGeometry.dispose();
                particlesMaterial.dispose();
            }
        };
    }

    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href.startsWith('http') && !href.includes(window.location.hostname)) {
                return;
            }

            e.preventDefault();
            init3DTransition();

            if (lenis) {
                lenis.stop();
            }

            setTimeout(() => {
                transitionOverlay.classList.add('active');
            }, 50);

            setTimeout(() => {
                if (transitionScene) {
                    transitionScene.stop();
                }
                window.location.href = href;
            }, 600);
        });
    });

    window.addEventListener('load', () => {
        setTimeout(() => {
            transitionOverlay.classList.add('fade-out');
            setTimeout(() => {
                transitionOverlay.classList.remove('active', 'fade-out');
                if (transitionScene) {
                    transitionScene.stop();
                }
                if (lenis) {
                    lenis.start();
                }
            }, 400);
        }, 50);
    });
}

// Scroll progress indicator
function initScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);

    const updateProgress = () => {
        const scrollY = lenis ? (lenis.scroll || 0) : window.scrollY;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = windowHeight > 0 ? (scrollY / windowHeight) * 100 : 0;
        indicator.style.transform = `scaleX(${Math.min(scrolled / 100, 1)})`;
    };

    if (lenis && isLenisReady) {
        lenis.on('scroll', updateProgress);
    } else {
        window.addEventListener('scroll', updateProgress);
    }
}

// Back to top button
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    const updateVisibility = () => {
        const scrollY = lenis ? (lenis.scroll || 0) : window.scrollY;
        if (scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };

    if (lenis && isLenisReady) {
        lenis.on('scroll', updateVisibility);
    } else {
        window.addEventListener('scroll', updateVisibility);
    }

    backToTop.addEventListener('click', () => {
        if (lenis && isLenisReady) {
            lenis.scrollTo(0, { duration: 1.0 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// Reveal elements on scroll with IntersectionObserver
function initRevealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal, [data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        element.classList.add('reveal');
        revealObserver.observe(element);
    });
}

// Parallax scrolling effect
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (!parallaxElements.length) return;

    const updateParallax = () => {
        const scrollY = lenis ? (lenis.scroll || 0) : window.scrollY;
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    };

    if (lenis && isLenisReady) {
        lenis.on('scroll', updateParallax);
    } else {
        window.addEventListener('scroll', updateParallax);
    }
}

// Helper function to close navigation menu
function closeNavigationMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');

    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
    if (navToggle) {
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllFeatures);
} else {
    initAllFeatures();
}

// Expose Lenis instance
window.getLenis = () => lenis;

console.log('🎯 Smooth scroll module loaded');

// Page transition effect when navigating between pages
function initPageTransitions() {
    // Create transition overlay with 3D canvas
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition';
    transitionOverlay.innerHTML = `
        <canvas id="transition-canvas"></canvas>
        <div class="page-transition-content">
            <div class="page-transition-spinner"></div>
            <p class="transition-text">Loading...</p>
        </div>
    `;
    document.body.appendChild(transitionOverlay);

    // Initialize 3D scene for transition
    let transitionScene = null;

    function init3DTransition() {
        if (typeof THREE === 'undefined') return;

        const canvas = document.getElementById('transition-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.position.z = 5;

        // Get theme colors
        const root = document.documentElement;
        const theme = root.getAttribute('data-theme') || 'dark';
        const primaryColor = theme === 'dark' ? 0x00FFFF : 0x0066FF;
        const secondaryColor = theme === 'dark' ? 0xFF3CAC : 0xFF4F9E;

        // Create rotating geometric shape
        const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16);
        const edges = new THREE.EdgesGeometry(geometry);
        const material = new THREE.LineBasicMaterial({
            color: primaryColor,
            linewidth: 2,
            transparent: true,
            opacity: 0.8
        });
        const shape = new THREE.LineSegments(edges, material);
        scene.add(shape);

        // Add particles
        const particleCount = 100;
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            color: secondaryColor,
            size: 0.05,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // Animation loop
        let animationId;
        let time = 0;
        function animate() {
            animationId = requestAnimationFrame(animate);
            time += 0.02;

            shape.rotation.x += 0.01;
            shape.rotation.y += 0.015;

            particles.rotation.y += 0.002;

            const scale = 1 + Math.sin(time) * 0.1;
            shape.scale.set(scale, scale, scale);

            renderer.render(scene, camera);
        }

        animate();

        transitionScene = {
            stop: () => {
                cancelAnimationFrame(animationId);
                renderer.dispose();
                geometry.dispose();
                edges.dispose();
                material.dispose();
                particlesGeometry.dispose();
                particlesMaterial.dispose();
            }
        };
    }

    // Add transition to internal page links
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip external links
            if (href.startsWith('http') && !href.includes(window.location.hostname)) {
                return;
            }

            e.preventDefault();

            // Initialize 3D scene
            init3DTransition();

            // Show transition with delay for smooth appearance
            setTimeout(() => {
                transitionOverlay.classList.add('active');
            }, 50);

            // Navigate after animation
            setTimeout(() => {
                if (transitionScene) {
                    transitionScene.stop();
                }
                window.location.href = href;
            }, 800);
        });
    });

    // Smooth fade in page on load
    window.addEventListener('load', () => {
        setTimeout(() => {
            transitionOverlay.classList.add('fade-out');

            setTimeout(() => {
                transitionOverlay.classList.remove('active', 'fade-out');
                if (transitionScene) {
                    transitionScene.stop();
                }
            }, 600);
        }, 100);
    });
}

// Scroll progress indicator
function initScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        indicator.style.transform = `scaleX(${scrolled / 100})`;
    });
}

// Back to top button
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Reveal elements on scroll
function initRevealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal, [data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        element.classList.add('reveal');
        revealObserver.observe(element);
    });
}

// Parallax scrolling effect
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(window.scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Enhanced card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.event-card, .stat-card, .organizer-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add stagger animation to grids
document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.events-grid, .stats-grid');
    grids.forEach(grid => grid.classList.add('stagger-animation'));
});

// Smooth modal transitions
function enhanceModalTransitions() {
    const modals = document.querySelectorAll('.modal');

    modals.forEach(modal => {
        const originalDisplay = modal.style.display;

        // Override modal show function
        const showModal = () => {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        };

        // Override modal hide function
        const hideModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        };

        // Store functions for external use
        modal.showModal = showModal;
        modal.hideModal = hideModal;
    });
}

// Initialize modal transitions
document.addEventListener('DOMContentLoaded', enhanceModalTransitions);

// Magnetic button effect (cursor follows)
document.addEventListener('DOMContentLoaded', () => {
    const magneticButtons = document.querySelectorAll('.btn-primary, .hero-primary-cta');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
});

// Add loading animation to images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

console.log('Smooth scroll and transitions initialized ✨');
