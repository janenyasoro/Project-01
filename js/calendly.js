// Calendly Integration Module

// Your Calendly links - REPLACE WITH YOUR ACTUAL CALENDLY LINKS
const CALENDLY_CONFIG = {
    // Replace 'your-username' with your actual Calendly username
    // Sign up at https://calendly.com to get your links
    baseUrl: 'https://calendly.com/your-username',
    eventTypes: {
        'initial-consultation': '/30min',
        'rhinoplasty': '/rhinoplasty-consultation',
        'facelift': '/facelift-consultation',
        'liposuction': '/liposuction-consultation',
        'breast-augmentation': '/breast-augmentation-consultation'
    }
};

// Initialize Calendly
export function initCalendly() {
    setupCalendlyTabs();
    setupProcedureSelector();
    setupPopupWidget();
    setupCalendlyEventTracking();
}

// Setup tab switching between Calendly and traditional form
function setupCalendlyTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    if (tabs.length === 0) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show active content
            contents.forEach(content => content.classList.remove('active'));
            const activeTab = document.getElementById(`${tabId}-tab`);
            if (activeTab) activeTab.classList.add('active');
            
            // Refresh Calendly widget when switching to it
            if (tabId === 'calendly') {
                setTimeout(() => refreshCalendlyWidget(), 100);
            }
        });
    });
}

// Refresh Calendly widget based on selected procedure
function refreshCalendlyWidget() {
    const procedureSelect = document.getElementById('calendly-procedure');
    if (!procedureSelect) return;
    
    const selectedProcedure = procedureSelect.value;
    const eventPath = CALENDLY_CONFIG.eventTypes[selectedProcedure] || CALENDLY_CONFIG.eventTypes['initial-consultation'];
    const calendlyUrl = CALENDLY_CONFIG.baseUrl + eventPath;
    
    // Get the widget container
    const widgetContainer = document.querySelector('.calendly-inline-widget');
    if (!widgetContainer) return;
    
    // Update the data-url attribute
    widgetContainer.setAttribute('data-url', calendlyUrl);
    
    // Re-initialize the widget if Calendly is loaded
    if (typeof Calendly !== 'undefined') {
        // Clear and rebuild the widget
        widgetContainer.innerHTML = '';
        Calendly.initInlineWidget({
            url: calendlyUrl,
            parentElement: widgetContainer,
            prefill: {}
        });
    }
}

// Setup procedure selector change event
function setupProcedureSelector() {
    const procedureSelect = document.getElementById('calendly-procedure');
    if (procedureSelect) {
        procedureSelect.addEventListener('change', () => {
            refreshCalendlyWidget();
        });
    }
}

// Setup floating popup button for Calendly
export function createCalendlyPopupButton() {
    // Check if button already exists
    if (document.getElementById('calendly-popup-btn')) return;
    
    const button = document.createElement('button');
    button.id = 'calendly-popup-btn';
    button.className = 'calendly-popup-btn';
    button.innerHTML = '📅 Book Now';
    document.body.appendChild(button);
    
    button.addEventListener('click', () => {
        const procedureSelect = document.getElementById('calendly-procedure');
        const selectedProcedure = procedureSelect ? procedureSelect.value : 'initial-consultation';
        const eventPath = CALENDLY_CONFIG.eventTypes[selectedProcedure] || CALENDLY_CONFIG.eventTypes['initial-consultation'];
        const calendlyUrl = CALENDLY_CONFIG.baseUrl + eventPath;
        
        if (typeof Calendly !== 'undefined') {
            Calendly.showPopupWidget(calendlyUrl);
        } else {
            // Fallback - open in new tab
            window.open(calendlyUrl, '_blank');
        }
    });
}

function setupPopupWidget() {
    // Ensure Calendly widget script is loaded for popup functionality
    if (typeof Calendly === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.type = 'text/javascript';
        script.async = true;
        document.head.appendChild(script);
    }
}

// Track Calendly events
export function setupCalendlyEventTracking() {
    // Add event listener for Calendly events
    window.addEventListener('message', function(e) {
        if (e.data.event && e.data.event.indexOf('calendly') === 0) {
            console.log('Calendly event:', e.data.event);
            
            switch(e.data.event) {
                case 'calendly.event_scheduled':
                    // Event was scheduled successfully
                    console.log('Appointment scheduled!', e.data.payload);
                    showCalendlySuccessMessage();
                    saveCalendlyBookingToLocalStorage(e.data.payload);
                    break;
                case 'calendly.profile_show':
                    console.log('Calendly widget opened');
                    break;
                case 'calendly.event_type_selected':
                    console.log('Event type selected:', e.data.payload);
                    break;
            }
        }
    });
}

// Show success message when booking is complete
function showCalendlySuccessMessage() {
    // Check if we're on the home page
    const messageDiv = document.getElementById('form-message');
    if (messageDiv) {
        messageDiv.innerHTML = '<div class="success-message">✓ Appointment scheduled successfully! Check your email for confirmation.</div>';
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    } else {
        // If on a different page, show an alert
        alert('✓ Appointment scheduled successfully! Check your email for confirmation.');
    }
}

// Save Calendly booking to localStorage for dashboard tracking
function saveCalendlyBookingToLocalStorage(payload) {
    const booking = {
        id: Date.now(),
        type: 'calendly',
        event: payload.event || payload.event_type?.name || 'Consultation',
        scheduledTime: payload.event?.start_time || payload.time || new Date().toISOString(),
        status: 'confirmed',
        source: 'Calendly Widget',
        invitee: payload.invitee || null
    };
    
    const bookings = JSON.parse(localStorage.getItem('calendly_bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('calendly_bookings', JSON.stringify(bookings));
}

// Pre-fill Calendly widget with user data
export function prefillCalendlyWidget(userData) {
    const widgetContainer = document.querySelector('.calendly-inline-widget');
    if (!widgetContainer || typeof Calendly === 'undefined') return;
    
    const calendlyUrl = widgetContainer.getAttribute('data-url');
    if (calendlyUrl) {
        Calendly.initInlineWidget({
            url: calendlyUrl,
            parentElement: widgetContainer,
            prefill: {
                name: userData.name || '',
                email: userData.email || '',
                customAnswers: {
                    a1: userData.phone || '',
                    a2: userData.procedure || ''
                }
            }
        });
    }
}

// Fetch Calendly event types using API (requires API token)
// This is optional and requires setting up Calendly API credentials
export async function fetchCalendlyEventTypes(apiToken) {
    try {
        const response = await fetch('https://api.calendly.com/event_types', {
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.collection;
        } else {
            console.error('Failed to fetch event types:', response.status);
            return [];
        }
    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
}

// Initialize on page load (if not in dashboard)
if (!window.location.pathname.includes('dashboard.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        initCalendly();
    });
}