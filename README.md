# Project-01
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
