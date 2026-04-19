export function loadAdminDashboard() {
    loadAllAppointments();
    loadManageProcedures();
    loadAllInquiries();
    loadAllChatMessages();
    setupExportCSV();
    setupAddProcedure();
}

function loadAllAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const container = document.getElementById('admin-appointments');
    if (!container) return;
    
    if (appointments.length === 0) {
        container.innerHTML = '<p>No appointments scheduled.</p>';
        return;
    }
    
    container.innerHTML = `
        <table class="data-table">
            <thead><tr><th>Patient</th><th>Email</th><th>Phone</th><th>Procedure</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
                ${appointments.map(apt => `
                    <tr>
                        <td>${apt.name}</td><td>${apt.email}</td><td>${apt.phone}</td>
                        <td>${apt.procedure}</td><td>${apt.date}</td>
                        <td class="status-${apt.status || 'pending'}">${apt.status || 'pending'}</td>
                        <td>
                            <select class="status-update" data-id="${apt.id}">
                                <option value="pending" ${apt.status === 'pending' ? 'selected' : ''}>Pending</option>
                                <option value="confirmed" ${apt.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                                <option value="completed" ${apt.status === 'completed' ? 'selected' : ''}>Completed</option>
                                <option value="cancelled" ${apt.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                            </select>
                            <button class="delete-appointment" data-id="${apt.id}">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    document.querySelectorAll('.status-update').forEach(select => {
        select.addEventListener('change', () => updateAppointmentStatus(select.dataset.id, select.value));
    });
    document.querySelectorAll('.delete-appointment').forEach(btn => {
        btn.addEventListener('click', () => deleteAppointment(btn.dataset.id));
    });
}

function updateAppointmentStatus(id, newStatus) {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const index = appointments.findIndex(apt => apt.id == id);
    if (index !== -1) {
        appointments[index].status = newStatus;
        localStorage.setItem('appointments', JSON.stringify(appointments));
        loadAllAppointments();
        alert(`Appointment ${newStatus}!`);
    }
}

function deleteAppointment(id) {
    if (confirm('Delete this appointment?')) {
        let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments = appointments.filter(apt => apt.id != id);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        loadAllAppointments();
        alert('Appointment deleted!');
    }
}

function loadManageProcedures() {
    let procedures = JSON.parse(localStorage.getItem('procedures') || '[]');
    const container = document.getElementById('manage-procedures');
    if (!container) return;
    
    container.innerHTML = procedures.map(proc => `
        <div class="procedure-edit-card">
            <input type="text" value="${proc.name}" class="proc-name" placeholder="Name">
            <textarea class="proc-desc" placeholder="Description">${proc.description}</textarea>
            <input type="text" value="${proc.recoveryTime}" class="proc-recovery" placeholder="Recovery Time">
            <button class="update-procedure" data-id="${proc.id}">Update</button>
            <button class="delete-procedure" data-id="${proc.id}">Delete</button>
        </div>
    `).join('');
    
    document.querySelectorAll('.update-procedure').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.procedure-edit-card');
            const updatedProc = {
                id: parseInt(btn.dataset.id),
                name: card.querySelector('.proc-name').value,
                description: card.querySelector('.proc-desc').value,
                recoveryTime: card.querySelector('.proc-recovery').value,
                imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400'
            };
            updateProcedure(updatedProc);
        });
    });
    document.querySelectorAll('.delete-procedure').forEach(btn => {
        btn.addEventListener('click', () => deleteProcedure(parseInt(btn.dataset.id)));
    });
}

function updateProcedure(updated) {
    let procedures = JSON.parse(localStorage.getItem('procedures') || '[]');
    const index = procedures.findIndex(p => p.id === updated.id);
    if (index !== -1) {
        procedures[index] = updated;
        localStorage.setItem('procedures', JSON.stringify(procedures));
        loadManageProcedures();
        alert('Procedure updated!');
    }
}

function deleteProcedure(id) {
    if (confirm('Delete this procedure?')) {
        let procedures = JSON.parse(localStorage.getItem('procedures') || '[]');
        procedures = procedures.filter(p => p.id !== id);
        localStorage.setItem('procedures', JSON.stringify(procedures));
        loadManageProcedures();
        alert('Procedure deleted!');
    }
}

function setupAddProcedure() {
    document.getElementById('add-procedure-btn')?.addEventListener('click', () => {
        const procedures = JSON.parse(localStorage.getItem('procedures') || '[]');
        procedures.push({ id: Date.now(), name: 'New Procedure', description: 'Description', recoveryTime: '1-2 weeks', imageUrl: '' });
        localStorage.setItem('procedures', JSON.stringify(procedures));
        loadManageProcedures();
    });
}

function loadAllInquiries() {
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    const container = document.getElementById('admin-inquiries');
    if (!container) return;
    
    if (inquiries.length === 0) {
        container.innerHTML = '<p>No inquiries yet.</p>';
        return;
    }
    
    container.innerHTML = inquiries.map(inq => `
        <div class="inquiry-card">
            <strong>${inq.name}</strong> (${inq.email}) - ${new Date(inq.timestamp).toLocaleString()}
            <p>${inq.message}</p>
            <button class="delete-inquiry" data-id="${inq.id}">Delete</button>
        </div>
    `).join('');
    
    document.querySelectorAll('.delete-inquiry').forEach(btn => {
        btn.addEventListener('click', () => {
            let inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
            inquiries = inquiries.filter(i => i.id != btn.dataset.id);
            localStorage.setItem('inquiries', JSON.stringify(inquiries));
            loadAllInquiries();
        });
    });
}

function loadAllChatMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    const container = document.getElementById('admin-chat-messages');
    if (!container) return;
    
    if (messages.length === 0) {
        container.innerHTML = '<p>No chat messages yet.</p>';
        return;
    }
    
    container.innerHTML = messages.map(msg => `
        <div class="chat-message-card">
            <strong>${msg.type === 'user' ? 'Patient' : 'Staff'}:</strong> ${msg.text}
            <br><small>${new Date(msg.timestamp).toLocaleString()}</small>
        </div>
    `).join('');
}

function setupExportCSV() {
    document.getElementById('export-csv')?.addEventListener('click', () => {
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        let csv = "Name,Email,Phone,Procedure,Date,Status\n";
        appointments.forEach(apt => {
            csv += `"${apt.name}","${apt.email}","${apt.phone}","${apt.procedure}","${apt.date}","${apt.status || 'pending'}"\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `appointments_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        alert('Appointments exported!');
    });
}