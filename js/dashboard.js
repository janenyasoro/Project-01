import { loadDoctorDashboard } from './doctor.js';
import { loadAdminDashboard } from './admin.js';
import { initMobileMenu } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    
    const loginScreen = document.getElementById('login-screen');
    const doctorDashboard = document.getElementById('doctor-dashboard');
    const adminDashboard = document.getElementById('admin-dashboard');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    
    const savedRole = sessionStorage.getItem('dashboardRole');
    if (savedRole === 'doctor') showDoctorDashboard();
    else if (savedRole === 'admin') showAdminDashboard();
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const role = document.getElementById('role').value;
        const password = document.getElementById('password').value;
        
        if (role === 'doctor' && password === 'doctor123') {
            sessionStorage.setItem('dashboardRole', 'doctor');
            showDoctorDashboard();
        } else if (role === 'admin' && password === 'admin123') {
            sessionStorage.setItem('dashboardRole', 'admin');
            showAdminDashboard();
        } else {
            document.getElementById('login-error').textContent = 'Invalid credentials!';
        }
    });
    
    function showDoctorDashboard() {
        loginScreen.style.display = 'none';
        doctorDashboard.style.display = 'block';
        adminDashboard.style.display = 'none';
        loadDoctorDashboard();
    }
    
    function showAdminDashboard() {
        loginScreen.style.display = 'none';
        doctorDashboard.style.display = 'none';
        adminDashboard.style.display = 'block';
        loadAdminDashboard();
    }
    
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('dashboardRole');
        loginScreen.style.display = 'flex';
        doctorDashboard.style.display = 'none';
        adminDashboard.style.display = 'none';
        document.getElementById('login-form').reset();
    });
});