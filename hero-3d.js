// Three.js 3D Hero Animation
// Creates an animated 3D tech scene with geometric shapes and particles

(function() {
    'use strict';

    // Wait for DOM and Three.js to load
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded');
        return;
    }

    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // Scene setup
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

    // Get current theme colors
    function getThemeColors() {
        const root = document.documentElement;
        const theme = root.getAttribute('data-theme') || 'dark';

        if (theme === 'dark') {
            return {
                primary: 0x00FFFF,    // Electric Cyan
                secondary: 0xFF3CAC,   // Neon Magenta
                tertiary: 0x8B5CF6     // Soft Violet
            };
        } else {
            return {
                primary: 0x0066FF,     // Vibrant Blue
                secondary: 0xFF4F9E,   // Neon Pink
                tertiary: 0x00E0FF     // Cyan Tint
            };
        }
    }

    let colors = getThemeColors();

    // Create main geometric shape - Icosahedron with wireframe
    const geometry = new THREE.IcosahedronGeometry(1.5, 0);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
        color: colors.primary,
        linewidth: 2,
        transparent: true,
        opacity: 0.8
    });
    const mainShape = new THREE.LineSegments(edges, material);
    scene.add(mainShape);

    // Create inner rotating shape
    const innerGeometry = new THREE.OctahedronGeometry(1, 0);
    const innerEdges = new THREE.EdgesGeometry(innerGeometry);
    const innerMaterial = new THREE.LineBasicMaterial({
        color: colors.secondary,
        linewidth: 2,
        transparent: true,
        opacity: 0.6
    });
    const innerShape = new THREE.LineSegments(innerEdges, innerMaterial);
    scene.add(innerShape);

    // Create particle system
    const particleCount = 150;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 15;
        positions[i3 + 1] = (Math.random() - 0.5) * 15;
        positions[i3 + 2] = (Math.random() - 0.5) * 15;

        velocities.push({
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
        });
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        color: colors.tertiary,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create connecting lines between shapes
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
        color: colors.secondary,
        transparent: true,
        opacity: 0.3
    });
    const connectingLine = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(connectingLine);

    // Add ambient light effect with point lights
    const light1 = new THREE.PointLight(colors.primary, 1, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(colors.secondary, 1, 100);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    document.addEventListener('mousemove', (event) => {
        targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Update theme colors when theme changes
    function updateThemeColors() {
        colors = getThemeColors();
        material.color.setHex(colors.primary);
        innerMaterial.color.setHex(colors.secondary);
        particlesMaterial.color.setHex(colors.tertiary);
        lineMaterial.color.setHex(colors.secondary);
        light1.color.setHex(colors.primary);
        light2.color.setHex(colors.secondary);
    }

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                updateThemeColors();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Smooth mouse movement
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Rotate main shape
        mainShape.rotation.x += 0.003;
        mainShape.rotation.y += 0.005;
        mainShape.rotation.x += mouseY * 0.01;
        mainShape.rotation.y += mouseX * 0.01;

        // Rotate inner shape in opposite direction
        innerShape.rotation.x -= 0.004;
        innerShape.rotation.y -= 0.006;
        innerShape.rotation.z += 0.002;

        // Animate particles
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] += velocities[i].x;
            positions[i3 + 1] += velocities[i].y;
            positions[i3 + 2] += velocities[i].z;

            // Boundary check
            if (Math.abs(positions[i3]) > 7.5) velocities[i].x *= -1;
            if (Math.abs(positions[i3 + 1]) > 7.5) velocities[i].y *= -1;
            if (Math.abs(positions[i3 + 2]) > 7.5) velocities[i].z *= -1;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        // Pulse effect
        const scale = 1 + Math.sin(time) * 0.05;
        mainShape.scale.set(scale, scale, scale);

        // Animate lights
        light1.position.x = Math.sin(time) * 5;
        light1.position.y = Math.cos(time) * 5;
        light2.position.x = Math.cos(time) * 5;
        light2.position.y = Math.sin(time) * 5;

        // Update connecting line
        const linePos = connectingLine.geometry.attributes.position.array;
        linePos[0] = mainShape.position.x;
        linePos[1] = mainShape.position.y;
        linePos[2] = mainShape.position.z;
        linePos[3] = innerShape.position.x;
        linePos[4] = innerShape.position.y;
        linePos[5] = innerShape.position.z;
        connectingLine.geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    // Handle window resize
    function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Reduce motion for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        mainShape.rotation.x = 0;
        mainShape.rotation.y = 0;
        innerShape.rotation.x = 0;
        innerShape.rotation.y = 0;
        innerShape.rotation.z = 0;
    }

})();
