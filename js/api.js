// Doctors/Surgeons Data with comprehensive information
const doctorsData = [
    {
        id: 1,
        name: 'Dr. Sarah Johnson, MD, FACS',
        specialization: 'Facial Plastic Surgery',
        yearsOfExperience: 18,
        patientsCount: 5200,
        education: ['Harvard Medical School - MD', 'Johns Hopkins Hospital - Residency'],
        bio: 'Dr. Johnson is a Harvard-trained surgeon specializing in rhinoplasty and facelifts. With over 18 years of experience, she has performed thousands of successful facial procedures.',
        imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
        rating: 4.9
    },
    {
        id: 2,
        name: 'Dr. Michael Chen, MD, FACS',
        specialization: 'Body Contouring',
        yearsOfExperience: 15,
        patientsCount: 4800,
        education: ['Stanford University School of Medicine - MD', 'UCLA Medical Center - Residency'],
        bio: 'Dr. Chen is a leading expert in liposuction and tummy tuck procedures. His innovative techniques have helped thousands of patients achieve their ideal body contours.',
        imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 4.8
    },
    {
        id: 3,
        name: 'Dr. Emily Rodriguez, MD',
        specialization: 'Breast Surgery',
        yearsOfExperience: 12,
        patientsCount: 3500,
        education: ['Johns Hopkins School of Medicine - MD', 'NYU Langone Health - Residency'],
        bio: 'Dr. Rodriguez specializes in breast augmentation, reduction, and reconstruction. She is passionate about helping women achieve natural-looking results.',
        imageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
        rating: 4.9
    },
    {
        id: 4,
        name: 'Dr. James Wilson, MD',
        specialization: 'Non-Surgical Aesthetics',
        yearsOfExperience: 10,
        patientsCount: 8200,
        education: ['University of Pennsylvania - MD', 'Cornell Medical Center - Residency'],
        bio: 'Dr. Wilson is an expert in Botox, fillers, and laser treatments. With over 8,000 satisfied patients, he is committed to delivering natural-looking results.',
        imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
        rating: 4.8
    }
];

// Export the function to fetch doctors
export async function fetchDoctors() {
    return new Promise((resolve) => {
        resolve(doctorsData);
    });
}

// Keep your existing functions
export async function fetchProcedures() {
    return new Promise((resolve) => {
        const procedures = JSON.parse(localStorage.getItem('procedures') || '[]');
        if (procedures.length === 0) {
            const defaultProcedures = [
                { id: 1, name: 'Rhinoplasty', description: 'Nose reshaping surgery', recoveryTime: '2-3 weeks', price: '$8,000 - $12,000', imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400' },
                { id: 2, name: 'Facelift', description: 'Restore youthful contours', recoveryTime: '3-4 weeks', price: '$12,000 - $18,000', imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400' },
                { id: 3, name: 'Liposuction', description: 'Remove stubborn fat', recoveryTime: '1-2 weeks', price: '$4,000 - $8,000', imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400' },
                { id: 4, name: 'Breast Augmentation', description: 'Enhance breast size', recoveryTime: '4-6 weeks', price: '$6,000 - $10,000', imageUrl: 'https://images.unsplash.com/photo-1578496479531-32e296d5c6e1?w=400' }
            ];
            localStorage.setItem('procedures', JSON.stringify(defaultProcedures));
            resolve(defaultProcedures);
        } else {
            resolve(procedures);
        }
    });
}

export async function fetchTestimonials() {
    return new Promise((resolve) => {
        resolve([
            { id: 1, name: 'Jennifer M.', procedure: 'Rhinoplasty', text: 'Dr. Johnson changed my life!', rating: 5 },
            { id: 2, name: 'David K.', procedure: 'Liposuction', text: 'Professional team, amazing results!', rating: 5 },
            { id: 3, name: 'Lisa R.', procedure: 'Facelift', text: 'I look 10 years younger!', rating: 5 }
        ]);
    });
}

export async function fetchGallery() {
    return new Promise((resolve) => {
        resolve([
            { id: 1, procedure: 'Rhinoplasty', before: 'Before', after: 'After', imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300' },
            { id: 2, procedure: 'Facelift', before: 'Before', after: 'After', imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300' },
            { id: 3, procedure: 'Liposuction', before: 'Before', after: 'After', imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=300' }
        ]);
    });
}

export async function submitBooking(formData) {
    return new Promise((resolve) => {
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments.push({ id: Date.now(), ...formData, status: 'pending', timestamp: new Date().toISOString() });
        localStorage.setItem('appointments', JSON.stringify(appointments));
        resolve({ success: true, message: 'Consultation request sent!' });
    });
}

export async function submitInquiry(formData) {
    return new Promise((resolve) => {
        const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
        inquiries.push(formData);
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
        resolve({ success: true, message: 'We\'ll respond within 24 hours!' });
    });
}