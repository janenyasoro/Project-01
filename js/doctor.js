export let doctorAppointments = [];

export function loadDoctorDashboard() {
    loadDoctorAppointments();
    loadDoctorInquiries();
    loadDoctorChatMessages();
    setupDoctorFilters();
}

function loadDoctorAppointments() {
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    doctorAppointments = allAppointments.map((apt, index) => ({
        ...apt,
        doctorId: index % 3 === 0 ? 'dr_johnson' : index % 3 === 1 ? 'dr_chen' : 'dr_rodriguez',
        status: apt.status || 'pending'
    })).filter(apt => apt.doctorId === 'dr_johnson');
    displayDoctorAppointments('all');
}

function displayDoctorAppointments(filter) {
    const container = document.getElementById('doctor-appointments');
    if (!container) return;
    
    let filtered = filter === 'all' ? doctorAppointments : doctorAppointments.filter(apt => apt.status === filter);
    
    if (filtered.length === 0) {
        container.innerHTML = '<p>No appointments found.</p>';
        return;
    }
    
    container.innerHTML = `
        <table class="data-table">
            <thead><tr><th>Patient</th><th>Procedure</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
                ${filtered.map(apt => `
                    <tr>
                        <td>${apt.name}</td>
                        <td>${apt.procedure}</td>
                        <td>${apt.date}</td>
                        <td class="status-${apt.status}">${apt.status}</td>
                        <td>
                            ${apt.status === 'pending' ? `<button class="confirm-btn" data-id="${apt.id}">Confirm</button>` : ''}
                            ${apt.status !== 'completed' ? `<button class="complete-btn" data-id="${apt.id}">Complete</button>` : ''}
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    document.querySelectorAll('.confirm-btn').forEach(btn => {
        btn.addEventListener('click', () => updateAppointmentStatus(btn.dataset.id, 'confirmed'));
    });
    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', () => updateAppointmentStatus(btn.dataset.id, 'completed'));
    });
}

function updateAppointmentStatus(id, newStatus) {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const index = appointments.findIndex(apt => apt.id == id);
    if (index !== -1) {
        appointments[index].status = newStatus;
        localStorage.setItem('appointments', JSON.stringify(appointments));
        loadDoctorAppointments();
        alert(`Appointment ${newStatus}!`);
    }
}

function loadDoctorInquiries() {
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    const container = document.getElementById('doctor-inquiries');
    if (!container) return;
    
    if (inquiries.length === 0) {
        container.innerHTML = '<p>No inquiries yet.</p>';
        return;
    }
    
    container.innerHTML = inquiries.map(inq => `
        <div class="inquiry-card">
            <strong>${inq.name}</strong> (${inq.email})
            <p>${inq.message}</p>
            <small>${new Date(inq.timestamp).toLocaleString()}</small>
            <button class="respond-btn" data-id="${inq.id}">Respond</button>
        </div>
    `).join('');
    
    document.querySelectorAll('.respond-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const response = prompt('Enter your response:');
            if (response) alert(`Response sent to patient: "${response}"`);
        });
    });
}

function loadDoctorChatMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    const container = document.getElementById('doctor-chat-messages');
    if (!container) return;
    
    const patientMessages = messages.filter(msg => msg.type === 'user');
    if (patientMessages.length === 0) {
        container.innerHTML = '<p>No chat messages yet.</p>';
        return;
    }
    
    container.innerHTML = patientMessages.map(msg => `
        <div class="chat-message-card">
            <strong>Patient:</strong> ${msg.text}
            <br><small>${new Date(msg.timestamp).toLocaleString()}</small>
            <button class="reply-chat">Reply</button>
        </div>
    `).join('');
    
    document.querySelectorAll('.reply-chat').forEach(btn => {
        btn.addEventListener('click', () => {
            const reply = prompt('Enter your reply:');
            if (reply) alert(`Reply sent to patient: "${reply}"`);
        });
    });
}

function setupDoctorFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayDoctorAppointments(btn.dataset.filter);
        });
    });
}