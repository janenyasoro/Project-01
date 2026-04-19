// Non-module version - add this directly to index.html
(async function() {
    // Doctors data
    const doctorsData = [
        {
            name: 'Dr. Sarah Johnson, MD',
            specialization: 'Facial Plastic Surgery',
            yearsOfExperience: 18,
            patientsCount: 5200,
            education: 'Harvard Medical School',
            bio: 'Harvard-trained surgeon specializing in rhinoplasty.',
            imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
            rating: 4.9
        },
        {
            name: 'Dr. Michael Chen, MD',
            specialization: 'Body Contouring',
            yearsOfExperience: 15,
            patientsCount: 4800,
            education: 'Stanford University',
            bio: 'Expert in liposuction and tummy tuck procedures.',
            imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
            rating: 4.8
        },
        {
            name: 'Dr. Emily Rodriguez, MD',
            specialization: 'Breast Surgery',
            yearsOfExperience: 12,
            patientsCount: 3500,
            education: 'Johns Hopkins University',
            bio: 'Specializes in breast augmentation and reconstruction.',
            imageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
            rating: 4.9
        },
        {
            name: 'Dr. James Wilson, MD',
            specialization: 'Non-Surgical Aesthetics',
            yearsOfExperience: 10,
            patientsCount: 8200,
            education: 'University of Pennsylvania',
            bio: 'Expert in Botox, fillers, and laser treatments.',
            imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
            rating: 4.8
        }
    ];

    function loadDoctors() {
        const grid = document.getElementById('doctor-grid');
        if (!grid) return;
        
        grid.innerHTML = doctorsData.map(doc => `
            <div class="doctor-card">
                <img src="${doc.imageUrl}" alt="${doc.name}" class="doctor-image">
                <div class="doctor-content">
                    <h3 class="doctor-name">${doc.name}</h3>
                    <p class="doctor-specialty">🔬 ${doc.specialization}</p>
                    
                    <div class="doctor-stats">
                        <div class="stat">
                            <span class="stat-value">${doc.yearsOfExperience}+</span>
                            <span class="stat-label">Years Experience</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${(doc.patientsCount/1000).toFixed(1)}k+</span>
                            <span class="stat-label">Happy Patients</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">⭐ ${doc.rating}</span>
                            <span class="stat-label">Rating</span>
                        </div>
                    </div>
                    
                    <div class="doctor-education">
                        <strong>🎓 Education:</strong>
                        <p>${doc.education}</p>
                    </div>
                    
                    <p class="doctor-bio">${doc.bio}</p>
                    
                    <button class="btn-primary book-doctor" data-doctor="${doc.name}">Book Consultation →</button>
                </div>
            </div>
        `).join('');
    }

    // Load when page is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadDoctors);
    } else {
        loadDoctors();
    }
})();