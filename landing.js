// Landing Page JavaScript - Featured Events Display

document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedEvents();
    setupNavigation();
});

// Featured Events Selection (top 6 most popular/exciting events)
const featuredEventIds = [1, 2, 5, 7, 11, 13]; // CodeSprint, AI Challenge, Hackathon, E-Sports, Workshop, Tech Talk

function displayFeaturedEvents() {
    const featuredGrid = document.getElementById('featured-events-grid');

    if (!featuredGrid) return;

    // Get featured events from eventsData (defined in script.js)
    const featuredEvents = eventsData.filter(event => featuredEventIds.includes(event.id));

    // Clear existing content
    featuredGrid.innerHTML = '';

    // Create event cards
    featuredEvents.forEach((event, index) => {
        const eventCard = createEventCard(event, index);
        featuredGrid.appendChild(eventCard);
    });
}

function createEventCard(event, index) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.setAttribute('data-category', event.category);
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 100).toString());

    // Category badge color
    const categoryColors = {
        'technical': 'var(--highlight)',
        'cultural': 'var(--highlight-secondary)',
        'gaming': 'var(--interactive-glow)',
        'workshop': '#10b981'
    };

    card.innerHTML = `
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
    `;

    // Add click event listeners for both buttons
    const viewDetailsBtn = card.querySelector('.view-details-btn');
    const viewDetailsLink = card.querySelector('.view-details-link');

    if (viewDetailsBtn) {
        viewDetailsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openEventModal(event.id);
        });
    }

    if (viewDetailsLink) {
        viewDetailsLink.addEventListener('click', (e) => {
            e.stopPropagation();
            openEventModal(event.id);
        });
    }

    // Card click to open modal
    card.addEventListener('click', () => {
        openEventModal(event.id);
    });

    return card;
}

function openEventModal(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;

    const modal = document.getElementById('event-modal');
    const modalBody = document.getElementById('modal-body');

    // Category badge color
    const categoryColors = {
        'technical': 'var(--highlight)',
        'cultural': 'var(--highlight-secondary)',
        'gaming': 'var(--interactive-glow)',
        'workshop': '#10b981'
    };

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
}

// Setup Navigation
function setupNavigation() {
    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only prevent default for hash links on the same page
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();

                const target = document.querySelector(href);
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            navbar.classList.remove('scroll-down');
        } else if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll Down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll Up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });
}

// Modal Close Functionality (if not already in script.js)
const modal = document.getElementById('event-modal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
        closeModal();
    }
});

function closeModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all event cards
document.querySelectorAll('.event-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

console.log('Landing page initialized successfully');
