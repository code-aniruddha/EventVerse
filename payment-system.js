// Enhanced Registration System with Event Selection and Payment
// Supports individual event registration with online payment

let selectedEvent = null;
let registrationData = {};

document.addEventListener('DOMContentLoaded', function() {
    initEventRegistration();
    setupPaymentGateway();
    handleURLParameters();
});

// Initialize event-specific registration
function initEventRegistration() {
    // Add "Register for this event" buttons to event modals
    const modalActions = document.querySelectorAll('.modal-actions');

    // Listen for modal opens to add register button
    const eventModal = document.getElementById('event-modal');
    if (eventModal) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'style') {
                    const isVisible = eventModal.style.display === 'flex';
                    if (isVisible) {
                        updateModalRegisterButton();
                    }
                }
            });
        });

        observer.observe(eventModal, { attributes: true });
    }
}

// Update modal register button with event info
function updateModalRegisterButton() {
    const modalTitle = document.querySelector('.modal-event-title');
    if (!modalTitle) return;

    const eventName = modalTitle.textContent;
    const event = eventsData.find(e => e.name === eventName);

    if (event) {
        selectedEvent = event;

        // Update register button in modal
        const registerBtn = document.querySelector('.modal-actions .btn-primary');
        if (registerBtn) {
            registerBtn.textContent = `Register for ${event.name}`;
            registerBtn.onclick = (e) => {
                e.preventDefault();
                openRegistrationForm(event);
            };
        }
    }
}

// Open registration form with pre-selected event
function openRegistrationForm(event) {
    selectedEvent = event;

    // Close event modal
    const eventModal = document.getElementById('event-modal');
    if (eventModal) {
        eventModal.style.display = 'none';
    }

    // Navigate to register page with event parameter
    window.location.href = `register.html?event=${encodeURIComponent(event.id)}&name=${encodeURIComponent(event.name)}&fee=${encodeURIComponent(event.fee)}`;
}

// Handle URL parameters on registration page
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event');
    const eventName = urlParams.get('name');
    const eventFee = urlParams.get('fee');

    if (eventId && eventName) {
        // Pre-populate registration form
        populateRegistrationForm(eventId, eventName, eventFee);
    } else {
        // Show event selector dropdown if no event specified
        addEventSelectorDropdown();
    }
}

// Populate registration form with event details
function populateRegistrationForm(eventId, eventName, eventFee) {
    const form = document.getElementById('registration-form');
    if (!form) return;

    // Add event selection section if not exists
    if (!document.getElementById('event-selection-section')) {
        const eventSection = document.createElement('div');
        eventSection.id = 'event-selection-section';
        eventSection.className = 'form-group event-selection';
        eventSection.innerHTML = `
            <label for="selected-event">Selected Event</label>
            <div class="selected-event-display">
                <div class="event-name-display">
                    <span class="icon">🎯</span>
                    <strong id="selected-event-name">${decodeURIComponent(eventName)}</strong>
                </div>
                <div class="event-fee-display">
                    <span class="icon">💰</span>
                    <span id="selected-event-fee">${decodeURIComponent(eventFee)}</span>
                </div>
                <button type="button" class="btn-link change-event" onclick="changeEvent()">Change Event</button>
            </div>
            <input type="hidden" id="selected-event-id" name="event-id" value="${eventId}">
        `;

        // Insert at the beginning of the form
        const firstInput = form.querySelector('.form-group');
        form.insertBefore(eventSection, firstInput);
    }

    // Add payment section
    addPaymentSection(eventFee);
}

// Add payment options section
function addPaymentSection(eventFee) {
    const form = document.getElementById('registration-form');
    if (!form || document.getElementById('payment-section')) return;

    const paymentSection = document.createElement('div');
    paymentSection.id = 'payment-section';
    paymentSection.className = 'payment-section glass-morph';
    paymentSection.innerHTML = `
        <h3>Payment Details</h3>
        <div class="payment-summary">
            <div class="payment-row">
                <span>Registration Fee:</span>
                <strong id="payment-amount">${decodeURIComponent(eventFee)}</strong>
            </div>
            <div class="payment-row total">
                <span>Total Amount:</span>
                <strong id="payment-total">${decodeURIComponent(eventFee)}</strong>
            </div>
        </div>

        <div class="form-group">
            <label for="payment-method">Payment Method</label>
            <select id="payment-method" name="payment-method" required>
                <option value="">Select Payment Method</option>
                <option value="razorpay">Razorpay (UPI/Card/Net Banking)</option>
                <option value="stripe">Credit/Debit Card (International)</option>
                <option value="paytm">Paytm</option>
                <option value="gpay">Google Pay</option>
                <option value="phonepe">PhonePe</option>
            </select>
            <span class="error-message"></span>
        </div>

        <div class="payment-note">
            <p><span class="icon">🔒</span> Your payment is secured with industry-standard encryption</p>
            <p><span class="icon">✅</span> Instant confirmation upon successful payment</p>
        </div>
    `;

    // Insert before submit button
    const submitBtn = form.querySelector('.btn-submit');
    form.insertBefore(paymentSection, submitBtn);

    // Update submit button text
    if (submitBtn) {
        submitBtn.textContent = 'Proceed to Payment';
    }
}

// Change event selection
function changeEvent() {
    window.location.href = 'events.html';
}

// Add event selector dropdown when no event is pre-selected
function addEventSelectorDropdown() {
    const form = document.getElementById('registration-form');
    if (!form || document.getElementById('event-selection-section')) return;

    // Check if eventsData is available
    if (typeof eventsData === 'undefined') {
        console.error('eventsData not loaded yet');
        // Retry after a short delay
        setTimeout(addEventSelectorDropdown, 100);
        return;
    }

    const eventSection = document.createElement('div');
    eventSection.id = 'event-selection-section';
    eventSection.className = 'form-group event-selection full-width';

    // Group events by category
    const eventsByCategory = {
        technical: [],
        cultural: [],
        gaming: [],
        workshop: []
    };

    eventsData.forEach(event => {
        if (eventsByCategory[event.category]) {
            eventsByCategory[event.category].push(event);
        }
    });

    eventSection.innerHTML = `
        <label for="event-selector">Select Event <span class="required">*</span></label>
        <select id="event-selector" name="event-id" required>
            <option value="">Choose an event to register</option>
            <optgroup label="Technical Events">
                ${eventsByCategory.technical.map(e =>
                    `<option value="${e.id}" data-fee="${e.prize}">${e.name} - ${e.prize}</option>`
                ).join('')}
            </optgroup>
            <optgroup label="Cultural Events">
                ${eventsByCategory.cultural.map(e =>
                    `<option value="${e.id}" data-fee="${e.prize}">${e.name} - ${e.prize}</option>`
                ).join('')}
            </optgroup>
            <optgroup label="Gaming Events">
                ${eventsByCategory.gaming.map(e =>
                    `<option value="${e.id}" data-fee="${e.prize}">${e.name} - ${e.prize}</option>`
                ).join('')}
            </optgroup>
            <optgroup label="Workshops">
                ${eventsByCategory.workshop.map(e =>
                    `<option value="${e.id}" data-fee="${e.prize}">${e.name} - ${e.prize}</option>`
                ).join('')}
            </optgroup>
        </select>
        <span class="error-message"></span>
        <div id="selected-event-info" class="selected-event-display" style="display: none; margin-top: 1rem;">
            <div class="event-name-display">
                <span class="icon">🎯</span>
                <strong id="selected-event-name"></strong>
            </div>
            <div class="event-fee-display">
                <span class="icon">💰</span>
                <span id="selected-event-fee"></span>
            </div>
        </div>
    `;

    // Insert at the beginning of the form
    const firstInput = form.querySelector('.form-group');
    form.insertBefore(eventSection, firstInput);

    // Add event listener for dropdown change
    const eventSelector = document.getElementById('event-selector');
    eventSelector.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const eventId = selectedOption.value;

        if (eventId) {
            const event = eventsData.find(e => e.id == eventId);
            if (event) {
                // Show selected event info
                document.getElementById('selected-event-name').textContent = event.name;
                document.getElementById('selected-event-fee').textContent = event.prize;
                document.getElementById('selected-event-info').style.display = 'block';

                // Add or update payment section
                const existingPaymentSection = document.getElementById('payment-section');
                if (existingPaymentSection) {
                    existingPaymentSection.remove();
                }
                addPaymentSection(event.prize);
            }
        } else {
            document.getElementById('selected-event-info').style.display = 'none';
            const paymentSection = document.getElementById('payment-section');
            if (paymentSection) {
                paymentSection.remove();
            }
        }
    });
}

// Setup payment gateway integration
function setupPaymentGateway() {
    const registrationForm = document.getElementById('registration-form');
    if (!registrationForm) return;

    registrationForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate form
        if (!validateRegistrationForm()) {
            return;
        }

        // Collect form data
        const formData = new FormData(this);
        registrationData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            college: formData.get('college'),
            category: formData.get('category'),
            eventId: formData.get('event-id'),
            paymentMethod: formData.get('payment-method')
        };

        // Check if event is selected
        if (!registrationData.eventId) {
            alert('Please select an event to register for');
            return;
        }

        // Get payment amount
        const feeText = document.getElementById('payment-total')?.textContent || '₹0';
        const amount = parseInt(feeText.replace(/[₹,]/g, '')) || 0;

        // Process payment
        if (amount > 0) {
            processPayment(amount, registrationData);
        } else {
            // Free event - direct registration
            completeRegistration(null);
        }
    });
}

// Validate registration form
function validateRegistrationForm() {
    const form = document.getElementById('registration-form');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        const errorMsg = input.parentElement.querySelector('.error-message');

        if (!input.value.trim()) {
            if (errorMsg) errorMsg.textContent = 'This field is required';
            input.classList.add('error');
            isValid = false;
        } else {
            if (errorMsg) errorMsg.textContent = '';
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Process payment based on selected method
async function processPayment(amount, data) {
    const paymentMethod = data.paymentMethod;

    // Show loading
    showPaymentLoading();

    try {
        switch (paymentMethod) {
            case 'razorpay':
                await initiateRazorpay(amount, data);
                break;
            case 'stripe':
                await initiateStripe(amount, data);
                break;
            case 'paytm':
            case 'gpay':
            case 'phonepe':
                await initiateUPIPayment(paymentMethod, amount, data);
                break;
            default:
                throw new Error('Invalid payment method');
        }
    } catch (error) {
        console.error('Payment error:', error);
        showPaymentError(error.message);
    }
}

// Razorpay integration (most popular in India)
function initiateRazorpay(amount, data) {
    // In production, load Razorpay SDK
    // For demo, simulate payment

    const options = {
        key: 'YOUR_RAZORPAY_KEY', // Replace with actual key
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'EventVerse Tech Fest',
        description: `Registration for ${selectedEvent?.name || 'Event'}`,
        image: '/path/to/logo.png',
        prefill: {
            name: data.name,
            email: data.email,
            contact: data.phone
        },
        theme: {
            color: '#00FFFF'
        },
        handler: function(response) {
            completeRegistration(response);
        }
    };

    // Demo mode - simulate successful payment
    setTimeout(() => {
        const mockResponse = {
            razorpay_payment_id: 'pay_' + Math.random().toString(36).substr(2, 9),
            razorpay_order_id: 'order_' + Math.random().toString(36).substr(2, 9),
            razorpay_signature: 'sig_' + Math.random().toString(36).substr(2, 9)
        };
        completeRegistration(mockResponse);
    }, 2000);
}

// Stripe integration (international cards)
function initiateStripe(amount, data) {
    // Simulate Stripe payment
    setTimeout(() => {
        const mockResponse = {
            stripe_payment_id: 'pi_' + Math.random().toString(36).substr(2, 9),
            status: 'succeeded'
        };
        completeRegistration(mockResponse);
    }, 2000);
}

// UPI payment simulation
function initiateUPIPayment(method, amount, data) {
    // Simulate UPI payment
    setTimeout(() => {
        const mockResponse = {
            upi_transaction_id: 'upi_' + Math.random().toString(36).substr(2, 9),
            method: method,
            status: 'success'
        };
        completeRegistration(mockResponse);
    }, 2000);
}

// Show payment loading
function showPaymentLoading() {
    const overlay = document.createElement('div');
    overlay.id = 'payment-overlay';
    overlay.className = 'payment-overlay';
    overlay.innerHTML = `
        <div class="payment-loading glass-morph">
            <div class="spinner"></div>
            <h3>Processing Payment...</h3>
            <p>Please wait while we securely process your payment</p>
            <div class="security-badges">
                <span>🔒 SSL Secured</span>
                <span>✓ PCI Compliant</span>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

// Hide payment loading
function hidePaymentLoading() {
    const overlay = document.getElementById('payment-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Show payment error
function showPaymentError(message) {
    hidePaymentLoading();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'payment-error glass-morph';
    errorDiv.innerHTML = `
        <span class="icon">❌</span>
        <h3>Payment Failed</h3>
        <p>${message}</p>
        <button class="btn btn-primary" onclick="this.parentElement.remove()">Try Again</button>
    `;

    document.body.appendChild(errorDiv);

    setTimeout(() => errorDiv.remove(), 5000);
}

// Complete registration after successful payment
function completeRegistration(paymentResponse) {
    hidePaymentLoading();

    // Store registration data (in production, send to backend)
    const registrationId = 'REG_' + Date.now();
    const registration = {
        ...registrationData,
        registrationId,
        paymentResponse,
        timestamp: new Date().toISOString(),
        status: 'confirmed'
    };

    // Save to localStorage (demo purpose)
    localStorage.setItem('lastRegistration', JSON.stringify(registration));

    // Show success message
    showRegistrationSuccess(registration);
}

// Show registration success
function showRegistrationSuccess(registration) {
    const successDiv = document.createElement('div');
    successDiv.className = 'registration-success';
    successDiv.innerHTML = `
        <div class="success-content glass-morph">
            <div class="success-icon">✓</div>
            <h2>Registration Successful!</h2>
            <p>Thank you for registering for <strong>${selectedEvent?.name || 'the event'}</strong></p>

            <div class="registration-details">
                <div class="detail-row">
                    <span>Registration ID:</span>
                    <strong>${registration.registrationId}</strong>
                </div>
                <div class="detail-row">
                    <span>Name:</span>
                    <strong>${registration.name}</strong>
                </div>
                <div class="detail-row">
                    <span>Email:</span>
                    <strong>${registration.email}</strong>
                </div>
                ${registration.paymentResponse ? `
                <div class="detail-row">
                    <span>Payment ID:</span>
                    <strong>${Object.values(registration.paymentResponse)[0]}</strong>
                </div>
                ` : ''}
            </div>

            <div class="success-actions">
                <p>✉️ A confirmation email has been sent to ${registration.email}</p>
                <button class="btn btn-primary" onclick="window.location.href='index.html'">Back to Home</button>
                <button class="btn btn-secondary" onclick="downloadReceipt()">Download Receipt</button>
            </div>
        </div>
    `;

    document.body.appendChild(successDiv);

    // Clear form
    const form = document.getElementById('registration-form');
    if (form) form.reset();
}

// Download payment receipt
function downloadReceipt() {
    const registration = JSON.parse(localStorage.getItem('lastRegistration'));
    if (!registration) return;

    alert('Receipt download would start here!\n\nRegistration ID: ' + registration.registrationId);
}

console.log('Enhanced registration system initialized 💳');
