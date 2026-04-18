import { 
    fetchProcedures, 
    fetchDoctors, 
    fetchTestimonials, 
    fetchGallery, 
    submitBooking 
} from './api.js';

import {
    validateEmail,
    validatePhone,
    validateName,
    showMessage,
    showError,
    clearError,
    createElementWithClass,
    initMobileMenu
} from './utils.js';

// Import Calendly module
import { initCalendly, createCalendlyPopupButton, prefillCalendlyWidget } from './calendly.js';

let procedureGrid, doctorGrid, testimonialGrid, galleryGrid;
let bookingForm, nameInput, emailInput, phoneInput, procedureSelect, dateInput;

document.addEventListener('DOMContentLoaded', async () => {
    procedureGrid = document.getElementById('procedure-grid');
    doctorGrid = document.getElementById('doctor-grid');
    testimonialGrid = document.getElementById('testimonial-grid');
    galleryGrid = document.getElementById('gallery-grid');
    bookingForm = document.getElementById('booking-form');
    nameInput = document.getElementById('name');
    emailInput = document.getElementById('email');
    phoneInput = document.getElementById('phone');
    procedureSelect = document.getElementById('procedure');
    dateInput = document.getElementById('date');

    await loadProcedures();
    await loadDoctors();
    await loadTestimonials();
    await loadGallery();
    await populateProcedureDropdown();
    
    setupEventListeners();
    initMobileMenu();
    
    // Initialize Calendly
    initCalendly();
    createCalendlyPopupButton();
    setupCalendlyPrefill();
    
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
});

async function loadProcedures() {
    if (!procedureGrid) return;
    procedureGrid.innerHTML = '<div class="loading">Loading procedures...</div>';
    const procedures = await fetchProcedures();
    procedureGrid.innerHTML = '';
    procedures.forEach(procedure => {
        const card = createElementWithClass('div', 'procedure-card');
        const img = document.createElement('img');
        img.src = procedure.imageUrl;
        img.alt = procedure.name;
        const title = document.createElement('h3');
        title.textContent = procedure.name;
        const description = document.createElement('p');
        description.textContent = procedure.description;
        const recoverySpan = createElementWithClass('span', 'recovery-time');
        recoverySpan.textContent = `Recovery: ${procedure.recoveryTime}`;
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(recoverySpan);
        procedureGrid.appendChild(card);
    });
}

async function loadDoctors() {
    if (!doctorGrid) return;
    doctorGrid.innerHTML = '<div class="loading">Loading doctors...</div>';
    const doctors = await fetchDoctors();
    doctorGrid.innerHTML = '';
    doctors.forEach(doctor => {
        const card = createElementWithClass('div', 'doctor-card');
        const img = document.createElement('img');
        img.src = doctor.imageUrl;
        img.alt = doctor.name;
        const name = document.createElement('h3');
        name.textContent = doctor.name;
        const specialty = document.createElement('p');
        specialty.textContent = doctor.specialization;
        const exp = document.createElement('p');
        exp.textContent = `Experience: ${doctor.experience}`;
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(specialty);
        card.appendChild(exp);
        doctorGrid.appendChild(card);
    });
}

async function loadTestimonials() {
    if (!testimonialGrid) return;
    const testimonials = await fetchTestimonials();
    testimonialGrid.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
            <p class="testimonial-text">"${t.text}"</p>
            <p class="testimonial-author">- ${t.name} (${t.procedure})</p>
            <p>⭐️⭐️⭐️⭐️⭐️</p>
        </div>
    `).join('');
}

async function loadGallery() {
    if (!galleryGrid) return;
    const gallery = await fetchGallery();
    galleryGrid.innerHTML = gallery.map(g => `
        <div class="gallery-item">
            <img src="${g.imageUrl}" alt="${g.procedure}">
            <div class="gallery-overlay">
                <p>${g.procedure}</p>
                <small>${g.before} → ${g.after}</small>
            </div>
        </div>
    `).join('');
}

async function populateProcedureDropdown() {
    if (!procedureSelect) return;
    const procedures = await fetchProcedures();
    procedureSelect.innerHTML = '<option value="">Select a procedure</option>' +
        procedures.map(p => `<option value="${p.name.toLowerCase()}">${p.name}</option>`).join('');
}

function setupEventListeners() {
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
    
    const bookingNav = document.getElementById('booking-nav');
    const heroCta = document.getElementById('hero-cta');
    
    if (bookingNav) {
        bookingNav.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (heroCta) {
        heroCta.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

async function handleBookingSubmit(e) {
    e.preventDefault();
    let isValid = true;
    
    if (!validateName(nameInput.value)) {
        showError('name', 'name-error', 'Please enter your full name');
        isValid = false;
    } else {
        clearError('name', 'name-error');
    }
    
    if (!validateEmail(emailInput.value)) {
        showError('email', 'email-error', 'Please enter a valid email');
        isValid = false;
    } else {
        clearError('email', 'email-error');
    }
    
    if (!validatePhone(phoneInput.value)) {
        showError('phone', 'phone-error', 'Please enter a valid phone number');
        isValid = false;
    } else {
        clearError('phone', 'phone-error');
    }
    
    if (!procedureSelect.value) {
        showError('procedure', 'procedure-error', 'Please select a procedure');
        isValid = false;
    } else {
        clearError('procedure', 'procedure-error');
    }
    
    if (!dateInput.value) {
        showError('date', 'date-error', 'Please select a preferred date');
        isValid = false;
    } else {
        clearError('date', 'date-error');
    }
    
    if (isValid) {
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            procedure: procedureSelect.options[procedureSelect.selectedIndex].text,
            date: dateInput.value
        };
        
        const result = await submitBooking(formData);
        const messageDiv = document.getElementById('form-message');
        showMessage(messageDiv, result.message, 'success');
        bookingForm.reset();
    }
}

function setupCalendlyPrefill() {
    // Check if user data exists in localStorage
    const savedUser = localStorage.getItem('calendly_user_data');
    if (savedUser) {
        const userData = JSON.parse(savedUser);
        prefillCalendlyWidget(userData);
    }
    
    // Save user data when they fill the form
    if (nameInput && emailInput) {
        const saveUserData = () => {
            const userData = {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput ? phoneInput.value : '',
                procedure: procedureSelect?.options[procedureSelect.selectedIndex]?.text || ''
            };
            localStorage.setItem('calendly_user_data', JSON.stringify(userData));
        };
        
        nameInput.addEventListener('blur', saveUserData);
        emailInput.addEventListener('blur', saveUserData);
        if (phoneInput) phoneInput.addEventListener('blur', saveUserData);
        if (procedureSelect) procedureSelect.addEventListener('change', saveUserData);
    }
}