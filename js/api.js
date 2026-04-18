// API and localStorage data management

export async function fetchProcedures() {
    return new Promise((resolve) => {
        const procedures = JSON.parse(localStorage.getItem('procedures') || '[]');
        if (procedures.length === 0) {
            const defaultProcedures = [
                { id: 1, name: 'Rhinoplasty', description: 'Nose reshaping surgery for improved facial harmony', recoveryTime: '2-3 weeks', imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400', price: '$8,000 - $12,000' },
                { id: 2, name: 'Facelift', description: 'Restore youthful facial contours and reduce sagging', recoveryTime: '3-4 weeks', imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400', price: '$12,000 - $18,000' },
                { id: 3, name: 'Liposuction', description: 'Remove stubborn fat deposits from multiple areas', recoveryTime: '1-2 weeks', imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400', price: '$4,000 - $8,000' },
                { id: 4, name: 'Breast Augmentation', description: 'Enhance breast size and shape with implants', recoveryTime: '4-6 weeks', imageUrl: 'https://images.unsplash.com/photo-1578496479531-32e296d5c6e1?w=400', price: '$6,000 - $10,000' }
            ];
            localStorage.setItem('procedures', JSON.stringify(defaultProcedures));
            resolve(defaultProcedures);
        } else {
            resolve(procedures);
        }
    });
}

export async function fetchDoctors() {
    return new Promise((resolve) => {
        const doctors = [
            { id: 1, name: 'Dr. Sarah Johnson, MD, FACS', specialization: 'Facial Plastic Surgery', experience: '15+ years', imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg', bio: 'Board-certified with expertise in rhinoplasty and facelifts' },
            { id: 2, name: 'Dr. Michael Chen, MD', specialization: 'Body Contouring', experience: '12+ years', imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg', bio: 'Leading expert in liposuction and tummy tuck procedures' },
            { id: 3, name: 'Dr. Emily Rodriguez, MD', specialization: 'Breast Surgery', experience: '10+ years', imageUrl: 'https://randomuser.me/api/portraits/women/45.jpg', bio: 'Specializing in breast augmentation and reconstruction' }
        ];
        resolve(doctors);
    });
}

export async function fetchTestimonials() {
    return new Promise((resolve) => {
        const testimonials = [
            { id: 1, name: 'Jennifer M.', procedure: 'Rhinoplasty', text: 'Dr. Johnson changed my life! The results exceeded my expectations.', rating: 5 },
            { id: 2, name: 'David K.', procedure: 'Liposuction', text: 'Professional team, amazing results. Highly recommend!', rating: 5 },
            { id: 3, name: 'Lisa R.', procedure: 'Facelift', text: 'I look 10 years younger. Thank you to the entire team!', rating: 5 }
        ];
        resolve(testimonials);
    });
}

export async function fetchGallery() {
    return new Promise((resolve) => {
        const gallery = [
            { id: 1, before: 'Before', after: 'After', procedure: 'Rhinoplasty', imageUrl: 'https://images.unsplash.com/photo-1578496479531-32e296d5c6e1?w=300' },
            { id: 2, before: 'Before', after: 'After', procedure: 'Facelift', imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300' },
            { id: 3, before: 'Before', after: 'After', procedure: 'Liposuction', imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=300' }
        ];
        resolve(gallery);
    });
}

export async function fetchFAQ() {
    return new Promise((resolve) => {
        const faq = [
            { question: 'How long is the recovery period?', answer: 'Recovery time varies by procedure, ranging from 1-6 weeks. Our team provides detailed post-operative instructions.' },
            { question: 'Are consultations free?', answer: 'Yes, we offer free initial consultations to discuss your goals and determine the best treatment plan.' },
            { question: 'What financing options are available?', answer: 'We offer flexible payment plans through CareCredit and PatientFi. Ask our team for details.' },
            { question: 'How do I prepare for surgery?', answer: 'We provide comprehensive pre-operative instructions including medications to avoid, fasting requirements, and more.' }
        ];
        resolve(faq);
    });
}

export async function fetchRecoveryTips() {
    return new Promise((resolve) => {
        const tips = [
            { title: 'Follow Post-Op Instructions', tips: 'Carefully follow all medication schedules and activity restrictions provided by your surgeon.' },
            { title: 'Stay Hydrated', tips: 'Drink plenty of water to aid healing and reduce swelling.' },
            { title: 'Proper Nutrition', tips: 'Eat protein-rich foods to support tissue repair and recovery.' },
            { title: 'Rest & Sleep', tips: 'Elevate surgical areas while sleeping to minimize swelling.' }
        ];
        resolve(tips);
    });
}

export async function submitBooking(formData) {
    return new Promise((resolve) => {
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const newAppointment = {
            id: Date.now(),
            ...formData,
            status: 'pending',
            timestamp: new Date().toISOString()
        };
        appointments.push(newAppointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        resolve({ success: true, message: 'Consultation request sent! We will contact you within 24 hours.' });
    });
}

export async function submitInquiry(formData) {
    return new Promise((resolve) => {
        resolve({ success: true, message: 'We\'ll respond within 24 hours!' });
    });
}