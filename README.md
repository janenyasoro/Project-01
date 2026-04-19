# Project-01

# Elite Cosmetic Surgery Website

A fully responsive, comprehensive website for a cosmetic surgery practice with patient education, appointment booking, live chat, and password-protected staff dashboards.

## Features

### Public Features
- View surgical procedures with images, descriptions, and recovery times
- Read patient testimonials and doctor credentials
- View before/after gallery
- Access FAQ accordion and recovery tips
- Submit appointment booking form
- Submit general inquiries
- Live chatbox for instant questions

### Doctor Features (Password: doctor123)
- View assigned appointment requests
- Mark appointments as confirmed or completed
- Respond to patient inquiries
- View patient chat messages

### Admin Features (Password: admin123)
- View all appointment requests
- Update appointment status
- Delete appointments
- Edit procedure details
- Add or remove procedures
- View all inquiries and chat messages
- Export appointment data to CSV

## Tech Stack
- HTML5
- CSS3 (Vanilla CSS)
- JavaScript (ES6+)
- LocalStorage for data persistence
- GitHub Actions for deployment
- Public API (JSONPlaceholder)

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/janenyasoro/Project-01.git
cd Project-01
Open index.html in your browser or use a local server:

bash
python -m http.server 8000
Access the staff portal at dashboard.html

Doctor login: doctor123

Admin login: admin123

Color Scheme
Navy Blue: #1a2a4f

Rose Gold: #d4af7a

White: #ffffff

Font Families
Georgia (serif) - Headings

Arial (sans-serif) - Body text

Segoe UI (sans-serif) - Buttons and forms



Cosmetic Surgery Practice Website

Problem Statement

Cosmetic surgery practices lack a professional online presence to showcase procedures, educate patients, facilitate appointment booking, and establish trust. Potential patients cannot find clear information about surgeries, recovery times, or costs, and have no easy way to request consultations or verify surgeon credentials. This results in missed opportunities and frustrated potential clients.

Proposed Solution

A fully responsive, three-page website designed for a cosmetic surgery practice. Page 1 (Home) will feature a hero section with a call-to-action button, a showcase of surgical procedures using image cards with descriptions and recovery times, doctor credentials, patient testimonials, and a before-and-after gallery. Page 2 (Patient Education & Booking) will include an expandable FAQ accordion, recovery tips section, and a validated appointment booking form capturing the name, email, phone, preferred procedure, and desired date. Page 3 (Inquiries & Chat) will feature a general inquiries form that stores questions using localStorage and displays recent inquiries, plus a floating live chatbox for instant questions. The entire website will be mobile-responsive, include a consistent header and footer across all pages, deploy automatically via GitHub Actions, and require no backend database.

Minimum Viable Product (MVP)
The MVP includes three user roles with specific features.

1. Customer Features (Public)
View procedure cards with images, descriptions, and recovery times
Read patient testimonials and doctor credentials
View before/after gallery
Access the FAQ accordion and recovery tips
Submit appointment booking form (name, email, phone, procedure, date)
Submit general inquiries
Use a live chatbox for instant questions

2. Doctor Features (Password Protected)
Log in to the doctor dashboard (simple password: doctor123)
View all appointment requests assigned to them
Mark appointments as confirmed or completed
Respond to patient inquiries
View patient messages from the chatbox

3. Admin Features (Password Protected)
Log in to the admin dashboard (simple password: admin123)
View all appointment requests from all patients
Confirm, reschedule, or cancel appointments
View and delete general inquiries
Edit procedure details (title, description, recovery time)
Add or remove procedures from the showcase
View all chat messages
Export appointment data to CSV

Tech Stack
Frontend: HTML, CSS, JAVASCRIPT
Deployment: GitHub Actions
