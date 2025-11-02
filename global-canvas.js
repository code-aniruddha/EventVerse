// Global 3D Canvas Background for All Pages
// Uses Three.js to create animated geometric shapes

let globalScene, globalCamera, globalRenderer;
let globalShapes = [];
let globalParticles = [];
let globalMouse = { x: 0, y: 0 };
let globalAnimationId;

// Initialize global canvas when DOM is ready
function initGlobalCanvas() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded. Global canvas disabled.');
        return;
    }

    const container = document.getElementById('global-canvas-container');
    const canvas = document.getElementById('global-canvas');

    if (!container || !canvas) {
        console.warn('Global canvas elements not found');
        return;
    }

    // Scene setup
    globalScene = new THREE.Scene();

    // Camera setup
    globalCamera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    globalCamera.position.z = 5;

    // Renderer setup
    globalRenderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    globalRenderer.setSize(window.innerWidth, window.innerHeight);
    globalRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Get theme colors
    const colors = getThemeColors();

    // Create main icosahedron
    const icosahedronGeometry = new THREE.IcosahedronGeometry(2, 0);
    const icosahedronMaterial = new THREE.MeshBasicMaterial({
        color: colors.primary,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    globalScene.add(icosahedron);
    globalShapes.push({ mesh: icosahedron, rotationSpeed: { x: 0.001, y: 0.002 } });

    // Create inner octahedron
    const octahedronGeometry = new THREE.OctahedronGeometry(1.2, 0);
    const octahedronMaterial = new THREE.MeshBasicMaterial({
        color: colors.secondary,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    globalScene.add(octahedron);
    globalShapes.push({ mesh: octahedron, rotationSpeed: { x: -0.002, y: -0.001 } });

    // Create particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: colors.tertiary,
        size: 0.05,
        transparent: true,
        opacity: 0.6
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    globalScene.add(particleSystem);
    globalParticles.push(particleSystem);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    globalScene.add(ambientLight);

    // Add point lights
    const pointLight1 = new THREE.PointLight(colors.primary, 1, 100);
    pointLight1.position.set(5, 5, 5);
    globalScene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(colors.secondary, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    globalScene.add(pointLight2);

    // Mouse move listener
    document.addEventListener('mousemove', onGlobalMouseMove);

    // Handle window resize
    window.addEventListener('resize', onGlobalWindowResize);

    // Start animation
    animateGlobalCanvas();

    // Mark body as having global canvas
    document.body.classList.add('has-global-canvas');

    console.log('Global 3D canvas initialized');
}

// Get theme-appropriate colors
function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    return {
        primary: isDark ? 0x00FFFF : 0x0066FF,
        secondary: isDark ? 0xFF3CAC : 0xFF4F9E,
        tertiary: isDark ? 0x8B5CF6 : 0x00E0FF
    };
}

// Update colors when theme changes
function updateGlobalCanvasTheme() {
    if (!globalScene) return;

    const colors = getThemeColors();

    // Update shapes
    if (globalShapes.length >= 2) {
        globalShapes[0].mesh.material.color.setHex(colors.primary);
        globalShapes[1].mesh.material.color.setHex(colors.secondary);
    }

    // Update particles
    if (globalParticles.length > 0) {
        globalParticles[0].material.color.setHex(colors.tertiary);
    }
}

// Mouse move handler
function onGlobalMouseMove(event) {
    globalMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    globalMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Window resize handler
function onGlobalWindowResize() {
    if (!globalCamera || !globalRenderer) return;

    globalCamera.aspect = window.innerWidth / window.innerHeight;
    globalCamera.updateProjectionMatrix();
    globalRenderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animateGlobalCanvas() {
    globalAnimationId = requestAnimationFrame(animateGlobalCanvas);

    // Rotate shapes
    globalShapes.forEach(shape => {
        shape.mesh.rotation.x += shape.rotationSpeed.x;
        shape.mesh.rotation.y += shape.rotationSpeed.y;
    });

    // Rotate particles slowly
    globalParticles.forEach(particles => {
        particles.rotation.y += 0.0005;
    });

    // Mouse interaction - subtle movement
    if (globalShapes.length > 0) {
        globalShapes[0].mesh.rotation.x += globalMouse.y * 0.001;
        globalShapes[0].mesh.rotation.y += globalMouse.x * 0.001;
    }

    // Render
    if (globalRenderer && globalScene && globalCamera) {
        globalRenderer.render(globalScene, globalCamera);
    }
}

// Cleanup function
function cleanupGlobalCanvas() {
    if (globalAnimationId) {
        cancelAnimationFrame(globalAnimationId);
    }

    document.removeEventListener('mousemove', onGlobalMouseMove);
    window.removeEventListener('resize', onGlobalWindowResize);

    if (globalRenderer) {
        globalRenderer.dispose();
    }

    globalShapes = [];
    globalParticles = [];
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalCanvas);
} else {
    initGlobalCanvas();
}

// Listen for theme changes
if (typeof MutationObserver !== 'undefined') {
    const themeObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'data-theme') {
                updateGlobalCanvasTheme();
            }
        });
    });

    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
}
