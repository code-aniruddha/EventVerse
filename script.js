// ============================================
// EVENTVERSE - TECH FEST PORTAL JAVASCRIPT
// Focus: Accessibility, Dynamic Content, UX
// ============================================

const eventsData = [
    {
        id: 1,
        name: "Code Sprint",
        category: "technical",
        description: "24-hour competitive programming marathon",
        fullDescription: "Test your coding skills in this intense 24-hour programming competition. Solve algorithmic challenges, optimize solutions, and compete against the best programmers.",
        rules: [
            "Teams of 1-3 members allowed",
            "Any programming language permitted",
            "No external help or plagiarism",
            "Internet access provided for documentation only",
            "Submission deadline strictly enforced"
        ],
        date: "2026-03-15",
        time: "10:00 AM",
        day: 1,
        location: "Computer Lab A",
        prize: "₹50,000",
        fee: "₹299",
        prizeBreakdown: "1st: ₹30,000 | 2nd: ₹15,000 | 3rd: ₹5,000",
        contact: {
            name: "TBA",
            phone: "+91 12345 67890",
            email: "info@eventverse.tech"
        },
        image: "💻",
        registrationLink: "#register"
    },
    {
        id: 2,
        name: "Robo Wars",
        category: "technical",
        description: "Battle of the bots - Design, build, and fight",
        fullDescription: "Bring your custom-built robot to battle against other teams. Design strategies, build robust machines, and dominate the arena in this thrilling competition.",
        rules: [
            "Weight limit: 50kg maximum",
            "No chemical or flame-based weapons",
            "Remote control required (wired or wireless)",
            "Safety gear mandatory for operators",
            "Match duration: 3 minutes"
        ],
        date: "2026-03-16",
        time: "02:00 PM",
        day: 2,
        location: "Main Arena",
        prize: "₹75,000",
        fee: "₹499",
        prizeBreakdown: "1st: ₹45,000 | 2nd: ₹20,000 | 3rd: ₹10,000",
        contact: {
            name: "TBA",
            phone: "+91 12345 67890",
            email: "info@eventverse.tech"
        },
        image: "🤖",
        registrationLink: "#register"
    },
    {
        id: 3,
        name: "Web Design Challenge",
        category: "technical",
        description: "Create stunning websites in limited time",
        fullDescription: "Showcase your web development skills by creating a fully functional and aesthetically pleasing website within the given timeframe. Focus on UX, accessibility, and creativity.",
        rules: [
            "Individual participation only",
            "HTML, CSS, JavaScript allowed (no frameworks)",
            "Responsive design mandatory",
            "Accessibility standards (WCAG) required",
            "4-hour time limit"
        ],
        date: "2026-03-15",
        time: "02:00 PM",
        day: 1,
        location: "Computer Lab B",
        prize: "₹40,000",
        fee: "₹249",
        prizeBreakdown: "1st: ₹25,000 | 2nd: ₹10,000 | 3rd: ₹5,000",
        contact: {
            name: "TBA",
            phone: "+91 12345 67890",
            email: "info@eventverse.tech"
        },
        image: "🎨",
        registrationLink: "#register"
    },
    {
        id: 4,
        name: "AI/ML Workshop",
        category: "workshop",
        description: "Hands-on session on Machine Learning fundamentals",
        fullDescription: "Learn the fundamentals of Artificial Intelligence and Machine Learning from industry experts. Get hands-on experience with real-world datasets and popular ML frameworks.",
        rules: [
            "Laptop required (Python installed)",
            "Basic programming knowledge recommended",
            "Certificate of participation provided",
            "Limited seats (first come, first served)",
            "Workshop materials provided"
        ],
        date: "2026-03-15",
        time: "11:00 AM",
        day: 1,
        location: "Seminar Hall 1",
        prize: "Free Entry",
        prizeBreakdown: "Certificate of Participation",
        contact: {
            name: "TBA",
            phone: "+91 12345 67890",
            email: "info@eventverse.tech"
        },
        image: "🧠",
        registrationLink: "#register"
    },
    {
        id: 5,
        name: "Hackathon",
        category: "technical",
        description: "36-hour innovation challenge",
        fullDescription: "Build innovative solutions to real-world problems in this intensive 36-hour hackathon. Form teams, brainstorm ideas, and create working prototypes.",
        rules: [
            "Teams of 2-5 members",
            "All technologies and platforms allowed",
            "Original ideas only (no pre-built solutions)",
            "Mentorship sessions available",
            "Final presentation to judges required"
        ],
        date: "2026-03-16",
        time: "09:00 AM",
        day: 2,
        location: "Innovation Hub",
        prize: "₹1,00,000",
        fee: "₹599",
        prizeBreakdown: "1st: ₹60,000 | 2nd: ₹25,000 | 3rd: ₹15,000",
        contact: {
            name: "TBA",
            phone: "+91 12345 67890",
            email: "info@eventverse.tech"
        },
        image: "⚡",
        registrationLink: "#register"
    },
    {
        id: 6,
        name: "Tech Quiz",
        category: "technical",
        description: "Test your technology knowledge",
        fullDescription: "Compete in multiple rounds of technology trivia covering programming, hardware, software, and tech history. Fast thinking and broad knowledge are key!",
        rules: [
            "Teams of 2 members",
            "Multiple rounds (elimination format)",
            "No electronic devices allowed",
            "Questions cover all tech domains",
            "Fastest correct answer wins"
        ],
        date: "2026-03-17",
        time: "10:00 AM",
        day: 3,
        location: "Auditorium",
        prize: "₹30,000",
        fee: "₹199",
        prizeBreakdown: "1st: ₹20,000 | 2nd: ₹7,000 | 3rd: ₹3,000",
        contact: {
            name: "TBA",
            phone: "+91 12345 67890",
            email: "info@eventverse.tech"
        },
        image: "🧩",
        registrationLink: "#register"
    },
    {
        id: 7,
        name: "Dance Competition",
        category: "cultural",
        description: "Show your moves on the grand stage",
        fullDescription: "Express yourself through dance! Solo, duet, or group performances welcome. All dance styles from classical to contemporary are celebrated.",
        rules: [
            "Individual or group (max 15 members)",
            "Performance time: 5-8 minutes",
            "Own music required (USB/CD)",
            "Props allowed (must be safe)",
            "Appropriate costumes mandatory"
        ],
        date: "2026-03-16",
        time: "06:00 PM",
        day: 2,
        location: "Main Stage",
        prize: "₹45,000",
        fee: "₹299",
        prizeBreakdown: "1st: ₹25,000 | 2nd: ₹12,000 | 3rd: ₹8,000",
        contact: {
            name: "Priya Sharma",
            phone: "+91 98765 43211",
            email: "priya@eventverse.tech"
        },
        image: "💃",
        registrationLink: "#register"
    },
    {
        id: 8,
        name: "Fashion Show",
        category: "cultural",
        description: "Runway showcase of style and creativity",
        fullDescription: "Walk the ramp and showcase your fashion sense. Theme-based rounds will test your creativity, confidence, and style quotient.",
        rules: [
            "Solo participation",
            "Two rounds: Theme-based and Designer wear",
            "Music coordination with organizers",
            "Professional behavior expected",
            "Judging on walk, outfit, and confidence"
        ],
        date: "2026-03-17",
        time: "07:00 PM",
        day: 3,
        location: "Main Stage",
        prize: "₹35,000",
        fee: "₹249",
        prizeBreakdown: "1st: ₹20,000 | 2nd: ₹10,000 | 3rd: ₹5,000",
        contact: {
            name: "Priya Sharma",
            phone: "+91 98765 43211",
            email: "priya@eventverse.tech"
        },
        image: "👗",
        registrationLink: "#register"
    },
    {
        id: 9,
        name: "Band Performance",
        category: "cultural",
        description: "Live music battle of the bands",
        fullDescription: "Bring your band and rock the stage! Perform original compositions or covers. Showcase your musical talent and entertain the crowd.",
        rules: [
            "Bands of 3-7 members",
            "Performance time: 10-15 minutes",
            "Basic equipment provided",
            "Own instruments recommended",
            "Sound check timing will be communicated"
        ],
        date: "2026-03-15",
        time: "08:00 PM",
        day: 1,
        location: "Amphitheater",
        prize: "₹50,000",
        fee: "₹399",
        prizeBreakdown: "1st: ₹30,000 | 2nd: ₹15,000 | 3rd: ₹5,000",
        contact: {
            name: "Priya Sharma",
            phone: "+91 98765 43211",
            email: "priya@eventverse.tech"
        },
        image: "🎸",
        registrationLink: "#register"
    },
    {
        id: 10,
        name: "Stand-up Comedy",
        category: "cultural",
        description: "Make the audience laugh with your wit",
        fullDescription: "Take the mic and showcase your comedy skills. Original content, timing, and audience engagement are key to winning this competition.",
        rules: [
            "Solo performance only",
            "Performance time: 5-7 minutes",
            "Original content required",
            "Clean comedy (no offensive content)",
            "Props allowed but not mandatory"
        ],
        date: "2026-03-17",
        time: "05:00 PM",
        day: 3,
        location: "Cafe Arena",
        prize: "₹25,000",
        fee: "₹149",
        prizeBreakdown: "1st: ₹15,000 | 2nd: ₹7,000 | 3rd: ₹3,000",
        contact: {
            name: "Priya Sharma",
            phone: "+91 98765 43211",
            email: "priya@eventverse.tech"
        },
        image: "🎤",
        registrationLink: "#register"
    },
    {
        id: 11,
        name: "BGMI Tournament",
        category: "gaming",
        description: "Battle royale mobile gaming championship",
        fullDescription: "Compete in squad matches of Battlegrounds Mobile India. Strategic gameplay, teamwork, and survival skills will determine the champions.",
        rules: [
            "Squads of 4 players",
            "Own devices required",
            "Latest game version mandatory",
            "Multiple rounds (points-based)",
            "Fair play policy strictly enforced"
        ],
        date: "2026-03-15",
        time: "01:00 PM",
        day: 1,
        location: "Gaming Zone A",
        prize: "₹60,000",
        fee: "₹399",
        prizeBreakdown: "1st: ₹35,000 | 2nd: ₹15,000 | 3rd: ₹10,000",
        contact: {
            name: "TBA",
            phone: "+91 12345 67890",
            email: "info@eventverse.tech"
        },
        image: "🎮",
        registrationLink: "#register"
    },
    {
        id: 12,
        name: "FIFA Tournament",
        category: "gaming",
        description: "Virtual football championship",
        fullDescription: "Show your FIFA skills in this knockout tournament. Master tactics, team selection, and controls to become the champion.",
        rules: [
            "Solo participation (1v1 matches)",
            "Latest FIFA version",
            "Consoles and controllers provided",
            "10-minute matches",
            "Single elimination format"
        ],
        date: "2026-03-16",
        time: "11:00 AM",
        day: 2,
        location: "Gaming Zone B",
        prize: "₹40,000",
        fee: "₹299",
        prizeBreakdown: "1st: ₹25,000 | 2nd: ₹10,000 | 3rd: ₹5,000",
        contact: {
            name: "TBA",
            phone: "+91 12345 67890",
            email: "info@eventverse.tech"
        },
        image: "⚽",
        registrationLink: "#register"
    },
    {
        id: 13,
        name: "Valorant Tournament",
        category: "gaming",
        description: "5v5 tactical shooter competition",
        fullDescription: "Form your team and compete in this tactical FPS tournament. Communication, strategy, and aim will be tested in intense matches.",
        rules: [
            "Teams of 5 players",
            "Own gaming laptops required",
            "Stable internet connection needed",
            "Best of 3 format for matches",
            "Latest game patch required"
        ],
        date: "2026-03-17",
        time: "12:00 PM",
        day: 3,
        location: "Gaming Zone A",
        prize: "₹80,000",
        fee: "₹499",
        prizeBreakdown: "1st: ₹50,000 | 2nd: ₹20,000 | 3rd: ₹10,000",
        contact: {
            name: "TBA",
            phone: "+91 12345 67890",
            email: "info@eventverse.tech"
        },
        image: "🎯",
        registrationLink: "#register"
    },
    {
        id: 14,
        name: "Chess Tournament",
        category: "gaming",
        description: "Strategic board game championship",
        fullDescription: "Test your strategic thinking in classical chess matches. Play multiple rounds and prove your mastery of the ancient game.",
        rules: [
            "Individual participation",
            "Swiss format tournament",
            "Time control: 15+10 (rapid)",
            "FIDE rules applicable",
            "Chess clocks provided"
        ],
        date: "2026-03-16",
        time: "09:00 AM",
        day: 2,
        location: "Indoor Sports Complex",
        prize: "₹30,000",
        fee: "₹199",
        prizeBreakdown: "1st: ₹18,000 | 2nd: ₹8,000 | 3rd: ₹4,000",
        contact: {
            name: "TBA",
            phone: "+91 12345 67890",
            email: "info@eventverse.tech"
        },
        image: "♟️",
        registrationLink: "#register"
    },
    {
        id: 15,
        name: "Blockchain Workshop",
        category: "workshop",
        description: "Introduction to blockchain and cryptocurrency",
        fullDescription: "Learn about blockchain technology, cryptocurrency, smart contracts, and decentralized applications. Understand the future of digital transactions.",
        rules: [
            "Laptop recommended",
            "No prior blockchain knowledge required",
            "Hands-on session included",
            "Certificate provided",
            "Workshop materials available online"
        ],
        date: "2026-03-16",
        time: "03:00 PM",
        day: 2,
        location: "Seminar Hall 2",
        prize: "Free Entry",
        fee: "Free",
        prizeBreakdown: "Certificate of Participation",
        contact: {
            name: "TBA",
            phone: "+91 12345 67890",
            email: "info@eventverse.tech"
        },
        image: "⛓️",
        registrationLink: "#register"
    },
    {
        id: 16,
        name: "Cyber Security Workshop",
        category: "workshop",
        description: "Learn ethical hacking and security",
        fullDescription: "Explore the world of cybersecurity. Learn about common vulnerabilities, ethical hacking techniques, and how to protect systems from attacks.",
        rules: [
            "Laptop mandatory (Kali Linux preferred)",
            "Basic networking knowledge helpful",
            "Hands-on lab sessions",
            "Ethical guidelines must be followed",
            "Certificate of participation"
        ],
        date: "2026-03-17",
        time: "02:00 PM",
        day: 3,
        location: "Seminar Hall 1",
        prize: "Free Entry",
        fee: "Free",
        prizeBreakdown: "Certificate of Participation",
        contact: {
            name: "TBA",
            phone: "+91 12345 67890",
            email: "info@eventverse.tech"
        },
        image: "🔒",
        registrationLink: "#register"
    },
    {
        id: 17,
        name: "Drama Competition",
        category: "cultural",
        description: "Theatrical performance showcase",
        fullDescription: "Bring stories to life on stage through dramatic performances. Script, direction, acting, and stage presence will be judged.",
        rules: [
            "Groups of 5-12 members",
            "Performance time: 15-20 minutes",
            "Any language/theme allowed",
            "Props and costumes participant's responsibility",
            "Original or adapted scripts accepted"
        ],
        date: "2026-03-15",
        time: "05:00 PM",
        day: 1,
        location: "Theater Hall",
        prize: "₹40,000",
        fee: "₹299",
        prizeBreakdown: "1st: ₹25,000 | 2nd: ₹10,000 | 3rd: ₹5,000",
        contact: {
            name: "Priya Sharma",
            phone: "+91 98765 43211",
            email: "priya@eventverse.tech"
        },
        image: "🎭",
        registrationLink: "#register"
    },
    {
        id: 18,
        name: "Photography Contest",
        category: "cultural",
        description: "Capture moments through your lens",
        fullDescription: "Submit your best photographs across various themes. Creativity, composition, and storytelling through images will be evaluated.",
        rules: [
            "Individual participation",
            "3 photos per participant (different themes)",
            "Original work only (no stock photos)",
            "Digital submission (high resolution)",
            "Photo editing allowed (mention if edited)"
        ],
        date: "2026-03-17",
        time: "11:00 AM",
        day: 3,
        location: "Exhibition Hall",
        prize: "₹20,000",
        fee: "₹149",
        prizeBreakdown: "1st: ₹12,000 | 2nd: ₹5,000 | 3rd: ₹3,000",
        contact: {
            name: "Priya Sharma",
            phone: "+91 98765 43211",
            email: "priya@eventverse.tech"
        },
        image: "📷",
        registrationLink: "#register"
    }
];

// ============================================
// STATE MANAGEMENT
// ============================================

let currentFilter = 'all';
let currentSort = 'name';
let searchQuery = '';
let currentDay = 1;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeEventsCatalog();
    initializeSchedule();
    initializeRegistrationForm();
    initializeModal();
    initializeAccessibility();
});

// ============================================
// THEME MANAGEMENT
// ============================================

function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');

    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('eventverse-theme') || 'dark';
    setTheme(savedTheme);

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);

            // Announce theme change to screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.className = 'sr-only';
            announcement.textContent = `Theme changed to ${newTheme} mode`;
            document.body.appendChild(announcement);
            setTimeout(() => announcement.remove(), 1000);
        });

        // Keyboard support
        themeToggle.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('eventverse-theme', theme);

    // Update button aria-label
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const label = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
        themeToggle.setAttribute('aria-label', label);
        themeToggle.setAttribute('title', label);
    }
}

// ============================================
// NAVIGATION
// ============================================

function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Mobile menu toggle - both click and touch
    if (navToggle && navMenu) {
        function toggleMenu(e) {
            e.stopPropagation();
            e.preventDefault();
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('Nav toggle clicked, menu is now:', navMenu.classList.contains('active') ? 'open' : 'closed');
        }

        navToggle.addEventListener('click', toggleMenu);
        navToggle.addEventListener('touchstart', toggleMenu);

        // Close menu when clicking/tapping outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('touchstart', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Handle nav link clicks - both click and touch
    navLinks.forEach(link => {
        function handleLinkClick(e) {
            const href = link.getAttribute('href');

            // Close mobile menu
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }

            // Handle same-page anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }
            }
            // For other links (like events.html, register.html), allow normal navigation
        }

        link.addEventListener('click', handleLinkClick);
        link.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        });
        link.addEventListener('touchend', function(e) {
            handleLinkClick(e);
        });
    });
}

// ============================================
// EVENTS CATALOG
// ============================================

function initializeEventsCatalog() {
    const searchInput = document.getElementById('event-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchQuery = e.target.value.toLowerCase();
            renderEvents();
        });
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');

            // Update filter
            currentFilter = this.getAttribute('data-category');
            renderEvents();
        });
    });

    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', function(e) {
            currentSort = e.target.value;
            renderEvents();
        });
    }

    // Initial render
    renderEvents();
}

function renderEvents() {
    const eventsGrid = document.getElementById('events-grid');
    const noEventsMessage = document.getElementById('no-events-message');

    if (!eventsGrid) return;

    // Filter events
    let filteredEvents = eventsData.filter(event => {
        const matchesCategory = currentFilter === 'all' || event.category === currentFilter;
        const matchesSearch = event.name.toLowerCase().includes(searchQuery) ||
                            event.description.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    // Sort events
    filteredEvents.sort((a, b) => {
        switch (currentSort) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'date':
                return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
            case 'prize':
                const prizeA = parseInt(a.prize.replace(/[^0-9]/g, '')) || 0;
                const prizeB = parseInt(b.prize.replace(/[^0-9]/g, '')) || 0;
                return prizeB - prizeA;
            default:
                return 0;
        }
    });

    // Render events or show no results message
    if (filteredEvents.length === 0) {
        eventsGrid.style.display = 'none';
        noEventsMessage.style.display = 'block';
    } else {
        eventsGrid.style.display = 'grid';
        noEventsMessage.style.display = 'none';

        eventsGrid.innerHTML = filteredEvents.map(event => `
            <article class="event-card" role="listitem" tabindex="0" data-event-id="${event.id}">
                <div class="event-image" aria-hidden="true">${event.image}</div>
                <div class="event-content">
                    <span class="event-category">${capitalizeFirst(event.category)}</span>
                    <h3 class="event-title">${event.name}</h3>
                    <p class="event-description">${event.description}</p>
                    <div class="event-meta">
                        <span class="event-date">
                            <span aria-hidden="true">📅</span>
                            ${formatDate(event.date)}
                        </span>
                        <span class="event-prize">
                            <span aria-hidden="true">🏆</span>
                            ${event.prize}
                        </span>
                    </div>
                    <div class="event-fee">
                        <span aria-hidden="true">💰</span>
                        Entry: <strong>${event.fee || 'Free'}</strong>
                    </div>
                </div>
            </article>
        `).join('');

        // Add click handlers to event cards
        document.querySelectorAll('.event-card').forEach(card => {
            card.addEventListener('click', function() {
                const eventId = parseInt(this.getAttribute('data-event-id'));
                openEventModal(eventId);
            });

            card.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const eventId = parseInt(this.getAttribute('data-event-id'));
                    openEventModal(eventId);
                }
            });
        });
    }
}

// ============================================
// EVENT MODAL
// ============================================

function initializeModal() {
    const modal = document.getElementById('event-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Close modal handlers
    if (modalClose) {
        modalClose.addEventListener('click', closeEventModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeEventModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display !== 'none') {
            closeEventModal();
        }
    });
}

function openEventModal(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;

    const modal = document.getElementById('event-modal');
    const modalBody = document.getElementById('modal-body');

    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <h2 class="modal-title" id="modal-title">${event.name}</h2>
        <div class="modal-meta">
            <span class="modal-meta-item">
                <span aria-hidden="true">📅</span>
                <strong>Date:</strong> ${formatDate(event.date)}
            </span>
            <span class="modal-meta-item">
                <span aria-hidden="true">⏰</span>
                <strong>Time:</strong> ${event.time}
            </span>
            <span class="modal-meta-item">
                <span aria-hidden="true">📍</span>
                <strong>Location:</strong> ${event.location}
            </span>
            <span class="modal-meta-item">
                <span aria-hidden="true">🏆</span>
                <strong>Prize:</strong> ${event.prize}
            </span>
            <span class="modal-meta-item entry-fee-highlight">
                <span aria-hidden="true">💰</span>
                <strong>Entry Fee:</strong> <span class="fee-amount">${event.fee || 'Free'}</span>
            </span>
        </div>

        <div class="modal-section">
            <h3>About This Event</h3>
            <p>${event.fullDescription}</p>
        </div>

        <div class="modal-section">
            <h3>Rules & Regulations</h3>
            <ul>
                ${event.rules.map(rule => `<li>${rule}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-section">
            <h3>Prize Distribution</h3>
            <p>${event.prizeBreakdown}</p>
        </div>

        <div class="modal-section">
            <h3>Contact Person</h3>
            <div class="modal-contact">
                <p><strong>Name:</strong> ${event.contact.name}</p>
                <p><strong>Phone:</strong> <a href="tel:${event.contact.phone}">${event.contact.phone}</a></p>
                <p><strong>Email:</strong> <a href="mailto:${event.contact.email}">${event.contact.email}</a></p>
            </div>
        </div>

        <div class="modal-actions">
            <a href="register.html?event=${event.id}&name=${encodeURIComponent(event.name)}&fee=${encodeURIComponent(event.fee || 'Free')}" class="btn btn-large btn-primary">Register for ${event.name}</a>
            <button onclick="closeEventModal()" class="btn btn-large btn-secondary">Close</button>
        </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Set focus to modal
    setTimeout(() => {
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) closeButton.focus();
    }, 100);
}

function closeEventModal() {
    const modal = document.getElementById('event-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Make closeEventModal available globally for inline onclick
window.closeEventModal = closeEventModal;

// ============================================
// SCHEDULE
// ============================================

function initializeSchedule() {
    const dayButtons = document.querySelectorAll('.day-btn');

    dayButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            dayButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');

            // Update day
            currentDay = parseInt(this.getAttribute('data-day'));
            renderSchedule();
        });
    });

    // Initial render
    renderSchedule();
}

function renderSchedule() {
    const scheduleTimeline = document.getElementById('schedule-timeline');
    if (!scheduleTimeline) return;

    // Filter events by day and sort by time
    const dayEvents = eventsData
        .filter(event => event.day === currentDay)
        .sort((a, b) => {
            const timeA = new Date('2026-01-01 ' + a.time);
            const timeB = new Date('2026-01-01 ' + b.time);
            return timeA - timeB;
        });

    if (dayEvents.length === 0) {
        scheduleTimeline.innerHTML = '<p class="no-results">No events scheduled for this day.</p>';
        return;
    }

    scheduleTimeline.innerHTML = dayEvents.map(event => `
        <div class="schedule-item" role="row">
            <div class="schedule-time" role="cell">
                <time datetime="${event.date}T${event.time}">${event.time}</time>
            </div>
            <div class="schedule-details" role="cell">
                <div class="schedule-event-name">${event.name}</div>
                <div class="schedule-location">${event.location} • ${capitalizeFirst(event.category)}</div>
            </div>
        </div>
    `).join('');
}

// ============================================
// REGISTRATION FORM
// ============================================

function initializeRegistrationForm() {
    const form = document.getElementById('registration-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        clearFormErrors();

        // Validate form
        const isValid = validateForm();

        if (isValid) {
            // Show success message
            form.style.display = 'none';
            const successMessage = document.getElementById('success-message');
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Set focus to success message for screen readers
                successMessage.setAttribute('tabindex', '-1');
                successMessage.focus();
            }

            // Reset form
            form.reset();

            // Hide success message and show form after 5 seconds
            setTimeout(() => {
                if (successMessage) successMessage.style.display = 'none';
                form.style.display = 'block';
            }, 5000);
        }
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateForm() {
    const name = document.getElementById('reg-name');
    const email = document.getElementById('reg-email');
    const phone = document.getElementById('reg-phone');
    const college = document.getElementById('reg-college');
    const category = document.getElementById('reg-category');

    let isValid = true;

    if (!validateField(name)) isValid = false;
    if (!validateField(email)) isValid = false;
    if (!validateField(phone)) isValid = false;
    if (!validateField(college)) isValid = false;
    if (!validateField(category)) isValid = false;

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const errorSpan = document.getElementById(field.name + '-error');
    let isValid = true;
    let errorMessage = '';

    // Check if empty
    if (value === '') {
        isValid = false;
        errorMessage = 'This field is required';
    } else {
        // Field-specific validation
        switch (field.name) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'phone':
                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(value.replace(/[\s-]/g, ''))) {
                    isValid = false;
                    errorMessage = 'Please enter a valid 10-digit phone number';
                }
                break;
            case 'name':
                if (value.length < 3) {
                    isValid = false;
                    errorMessage = 'Name must be at least 3 characters long';
                }
                break;
            case 'college':
                if (value.length < 3) {
                    isValid = false;
                    errorMessage = 'Please enter your college name';
                }
                break;
        }
    }

    // Update UI
    if (!isValid) {
        field.classList.add('error');
        if (errorSpan) {
            errorSpan.textContent = errorMessage;
        }
    } else {
        field.classList.remove('error');
        if (errorSpan) {
            errorSpan.textContent = '';
        }
    }

    return isValid;
}

function clearFormErrors() {
    const errorFields = document.querySelectorAll('.error');
    const errorMessages = document.querySelectorAll('.error-message');

    errorFields.forEach(field => field.classList.remove('error'));
    errorMessages.forEach(message => message.textContent = '');
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

function initializeAccessibility() {
    // Add keyboard navigation to focusable elements
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');

    // Track focus for visual feedback
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focused');
        });

        element.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });

    // Announce dynamic content changes to screen readers
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.target.hasAttribute('aria-live')) {
                // Content change announced automatically by aria-live
            }
        });
    });

    // Observe elements with aria-live
    document.querySelectorAll('[aria-live]').forEach(element => {
        observer.observe(element, {
            childList: true,
            subtree: true
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ============================================
// SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS
// ============================================

if (!('scrollBehavior' in document.documentElement.style)) {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// CONSOLE LOG FOR DEVELOPERS
// ============================================

console.log('%cEventVerse Portal', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with accessibility in mind ♿', 'color: #00ff88; font-size: 14px;');
console.log('Total Events:', eventsData.length);
console.log('Categories:', [...new Set(eventsData.map(e => e.category))]);
