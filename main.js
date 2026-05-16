/**
 * SaludVital - Core Application Logic
 */
import { api } from './api.js';

// --- State Management ---
const state = {
    view: 'landing',
    user: JSON.parse(localStorage.getItem('saludvital_user')) || null,
    appointments: JSON.parse(localStorage.getItem('saludvital_appointments')) || [
        { id: 1, doctor: 'Dra. Elena Ramos', specialty: 'Cardiología', date: '2026-05-20', time: '09:00 AM', status: 'confirmed' },
        { id: 2, doctor: 'Dr. Roberto Sanz', specialty: 'Pediatría', date: '2026-05-22', time: '11:30 AM', status: 'pending' }
    ],
    availableDoctors: [],
    bookingStep: 1,
    selectedSpecialty: '',
    selectedDoctor: '',
    selectedDate: '',
    selectedTime: '',
    mobileMenuOpen: false
};

const saveAppointments = () => localStorage.setItem('saludvital_appointments', JSON.stringify(state.appointments));
const saveUser = () => state.user ? localStorage.setItem('saludvital_user', JSON.stringify(state.user)) : localStorage.removeItem('saludvital_user');
const getTodayDate = () => new Date().toISOString().split('T')[0];
const formatDate = (d) => { const p = d.split('-'); return `${p[2]}/${p[1]}/${p[0]}`; };

// --- View Components ---

const LandingView = () => `
    <section class="hero container">
        <h1 class="title-lg">Tu salud, nuestra <span class="highlight">prioridad</span></h1>
        <p>Excelencia médica privada a tu alcance. Agenda tus citas de forma rápida, segura y sin esperas telefónicas.</p>
        <div class="hero-actions">
            <button class="btn btn-primary btn-lg" onclick="router.navigate('booking')">Agendar Cita Ahora</button>
            <button class="btn btn-outline btn-lg" style="margin-left: 1rem;" onclick="document.getElementById('specialties-section').scrollIntoView({behavior:'smooth'})">Conocer Especialidades</button>
        </div>
    </section>
    <section class="container" id="specialties-section">
        <h2 style="text-align:center; margin-bottom: 2rem;">Nuestras <span class="highlight">Especialidades</span></h2>
        <div class="specialties">
            <div class="glass-card specialty-card" onclick="router.bookSpecialty('Cardiología')">
                <div class="icon">❤️</div><h3>Cardiología</h3>
                <p>Cuidado integral del corazón con tecnología de última generación.</p>
            </div>
            <div class="glass-card specialty-card" onclick="router.bookSpecialty('Pediatría')">
                <div class="icon">👶</div><h3>Pediatría</h3>
                <p>Atención especializada para los más pequeños de la familia.</p>
            </div>
            <div class="glass-card specialty-card" onclick="router.bookSpecialty('Medicina General')">
                <div class="icon">🩺</div><h3>Medicina General</h3>
                <p>Tu primer paso hacia un bienestar integral y preventivo.</p>
            </div>
            <div class="glass-card specialty-card" onclick="router.bookSpecialty('Dermatología')">
                <div class="icon">🧴</div><h3>Dermatología</h3>
                <p>Salud y bienestar de tu piel con especialistas certificados.</p>
            </div>
        </div>
    </section>
`;

const BookingView = () => {
    if (state.bookingStep === 1) {
        return `
            <div class="container" style="max-width: 600px; padding: 4rem 0;">
                <div class="glass-card">
                    <div class="stepper"><div class="step active">1</div><div class="step-line"></div><div class="step">2</div></div>
                    <h2 style="margin-bottom: 2rem;">Selecciona Especialidad</h2>
                    <div class="form-group">
                        <label>Especialidad Médica</label>
                        <select id="specialty-select" onchange="router.setSpecialty(this.value)">
                            <option value="">Selecciona una opción...</option>
                            ${['Cardiología','Pediatría','Ginecología','Dermatología','Medicina General'].map(s =>
                                `<option value="${s}" ${state.selectedSpecialty === s ? 'selected' : ''}>${s}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <button class="btn btn-primary" style="width: 100%;" ${!state.selectedSpecialty ? 'disabled' : ''} onclick="router.nextStep()">Continuar</button>
                </div>
            </div>`;
    }
    if (state.bookingStep === 2) {
        return `
            <div class="container" style="max-width: 600px; padding: 4rem 0;">
                <div class="glass-card">
                    <div class="stepper"><div class="step completed">✓</div><div class="step-line active"></div><div class="step active">2</div></div>
                    <h2 style="margin-bottom: 2rem;">Selecciona Médico y Horario</h2>
                    <p style="margin-bottom: 1.5rem; color: var(--on-surface-variant)">Especialidad: <b class="highlight">${state.selectedSpecialty}</b></p>
                    <div class="form-group">
                        <label>Médico Disponible</label>
                        <select id="doctor-select" onchange="state.selectedDoctor = this.value; router.render()">
                            <option value="">Selecciona...</option>
                            ${state.availableDoctors.map(d => `<option value="${d.name}" ${state.selectedDoctor === d.name ? 'selected' : ''}>${d.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Fecha</label>
                        <input type="date" value="${state.selectedDate}" min="${getTodayDate()}" onchange="state.selectedDate = this.value; router.render()">
                    </div>
                    <label>Horarios Disponibles</label>
                    <div class="time-grid">
                        ${['08:00 AM','09:00 AM','10:30 AM','02:00 PM','04:00 PM'].map(time => `
                            <div class="time-slot ${state.selectedTime === time ? 'selected' : ''}" onclick="state.selectedTime = '${time}'; router.render()">${time}</div>
                        `).join('')}
                    </div>
                    <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                        <button class="btn btn-outline" style="flex: 1;" onclick="state.bookingStep = 1; router.render()">Volver</button>
                        <button class="btn btn-primary" style="flex: 2;" ${!state.selectedTime || !state.selectedDoctor || !state.selectedDate ? 'disabled' : ''} onclick="router.confirmBooking()">Confirmar Cita</button>
                    </div>
                </div>
            </div>`;
    }
};

const DashboardView = () => {
    const userName = state.user ? state.user.name : 'Invitado';
    const userEmail = state.user ? state.user.email : '';
    return `
    <div class="container" style="padding: 4rem 0;">
        <div class="dashboard-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; flex-wrap: wrap; gap: 1rem;">
            <h1>Mi Panel de <span class="highlight">Control</span></h1>
            <button class="btn btn-primary" onclick="router.navigate('booking')">+ Nueva Cita</button>
        </div>
        <div class="dashboard-grid">
            <aside class="glass-card" style="height: fit-content;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">👤</div>
                    <h3>${userName}</h3>
                    ${userEmail ? `<p style="font-size: 0.8rem; color: var(--on-surface-variant)">${userEmail}</p>` : ''}
                    <p style="font-size: 0.75rem; color: var(--primary); margin-top: 0.25rem;">Paciente Premium</p>
                </div>
                <ul style="display: flex; flex-direction: column; gap: 1rem;">
                    <li style="color: var(--primary); font-weight: 600; cursor: pointer;">📋 Mis Citas</li>
                    <li style="cursor: pointer;" onclick="showNotification('Historial próximamente')">📁 Historial</li>
                    <li style="cursor: pointer;" onclick="showNotification('Perfil próximamente')">⚙️ Perfil</li>
                    <li style="cursor: pointer;" onclick="showNotification('Notificaciones próximamente')">🔔 Notificaciones</li>
                </ul>
            </aside>
            <section>
                <h3 style="margin-bottom: 1.5rem;">Citas Próximas</h3>
                ${state.appointments.length === 0 ?
                    `<div class="glass-card" style="text-align: center; padding: 3rem;">
                        <p style="font-size: 3rem; margin-bottom: 1rem;">📅</p>
                        <p style="color: var(--on-surface-variant)">No tienes citas programadas.</p>
                        <button class="btn btn-primary" style="margin-top: 1.5rem;" onclick="router.navigate('booking')">Agendar tu primera cita</button>
                    </div>` :
                    state.appointments.map(appt => `
                        <div class="glass-card appointment-item">
                            <div>
                                <h4 style="margin-bottom: 0.25rem;">${appt.specialty}</h4>
                                <p style="font-size: 0.9rem; color: var(--on-surface-variant)">${appt.doctor}</p>
                                <p style="font-size: 0.8rem; margin-top: 0.5rem;">📅 ${formatDate(appt.date)} | ⏰ ${appt.time}</p>
                            </div>
                            <div style="text-align: right;">
                                <span class="status-chip status-${appt.status}">${appt.status === 'confirmed' ? 'CONFIRMADA' : 'PENDIENTE'}</span>
                                <div style="margin-top: 1rem;">
                                    <button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;" onclick="router.cancelAppointment(${appt.id})">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
            </section>
        </div>
    </div>`;
};

// --- Login Modal ---
function renderLoginModal() {
    let modal = document.getElementById('login-modal');
    if (modal) modal.remove();
    modal = document.createElement('div');
    modal.id = 'login-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="router.closeLogin()">
            <div class="modal glass-card" onclick="event.stopPropagation()">
                <button class="modal-close" onclick="router.closeLogin()">&times;</button>
                <h2 style="margin-bottom: 0.5rem;">Bienvenido a <span class="highlight">SaludVital</span></h2>
                <p style="color: var(--on-surface-variant); margin-bottom: 2rem; font-size: 0.9rem;">Ingresa tus datos para continuar</p>
                <form id="login-form">
                    <div class="form-group">
                        <label>Nombre completo</label>
                        <input type="text" id="login-name" placeholder="Ej: María García" required>
                    </div>
                    <div class="form-group">
                        <label>Correo electrónico</label>
                        <input type="email" id="login-email" placeholder="correo@ejemplo.com" required>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Iniciar Sesión</button>
                </form>
            </div>
        </div>`;
    document.body.appendChild(modal);
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('login-name').value.trim();
        const email = document.getElementById('login-email').value.trim();
        if (name && email) {
            state.user = { name, email };
            saveUser();
            router.closeLogin();
            updateNav();
            showNotification(`¡Bienvenido/a, ${name}!`);
        }
    });
}

// --- Router ---
const router = {
    navigate: (view) => {
        state.view = view;
        if (view === 'booking') { state.bookingStep = 1; state.selectedSpecialty = ''; state.selectedDoctor = ''; state.selectedDate = ''; state.selectedTime = ''; }
        state.mobileMenuOpen = false;
        document.querySelector('.nav-links')?.classList.remove('open');
        router.render();
        window.scrollTo(0, 0);
    },

    setSpecialty: (val) => { state.selectedSpecialty = val; router.render(); },

    nextStep: async () => {
        state.availableDoctors = await api.getDoctors(state.selectedSpecialty);
        state.bookingStep = 2;
        state.selectedDoctor = '';
        state.selectedDate = '';
        state.selectedTime = '';
        router.render();
    },

    bookSpecialty: async (specialty) => {
        state.view = 'booking';
        state.selectedSpecialty = specialty;
        state.availableDoctors = await api.getDoctors(specialty);
        state.bookingStep = 2;
        state.selectedDoctor = '';
        state.selectedDate = '';
        state.selectedTime = '';
        router.render();
        window.scrollTo(0, 0);
    },

    confirmBooking: async () => {
        const newAppt = {
            id: Date.now(),
            doctor: state.selectedDoctor,
            specialty: state.selectedSpecialty,
            date: state.selectedDate,
            time: state.selectedTime,
            status: 'confirmed'
        };
        await api.saveAppointment(newAppt);
        state.appointments.push(newAppt);
        saveAppointments();
        showNotification('¡Cita confirmada con éxito!');
        router.navigate('dashboard');
    },

    cancelAppointment: (id) => {
        const appt = state.appointments.find(a => a.id === id);
        if (appt && confirm(`¿Cancelar tu cita de ${appt.specialty} el ${formatDate(appt.date)}?`)) {
            state.appointments = state.appointments.filter(a => a.id !== id);
            saveAppointments();
            router.render();
            showNotification('Cita cancelada correctamente');
        }
    },

    closeLogin: () => { const m = document.getElementById('login-modal'); if (m) m.remove(); },

    logout: () => {
        state.user = null;
        saveUser();
        updateNav();
        showNotification('Sesión cerrada');
        router.navigate('landing');
    },

    render: () => {
        const main = document.getElementById('main-content');
        if (state.view === 'landing') main.innerHTML = LandingView();
        if (state.view === 'booking') main.innerHTML = BookingView();
        if (state.view === 'dashboard') main.innerHTML = DashboardView();
    }
};

// --- Nav Management ---
function updateNav() {
    const loginBtn = document.getElementById('nav-login');
    if (state.user) {
        loginBtn.textContent = 'Salir';
        loginBtn.className = 'btn btn-outline';
    } else {
        loginBtn.textContent = 'Entrar';
        loginBtn.className = 'btn btn-primary';
    }
}

// --- Toast Notifications ---
function showNotification(message) {
    const toast = document.createElement('div');
    toast.className = 'glass-card toast';
    toast.innerHTML = `<p>🔔 ${message}</p>`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    router.render();
    updateNav();

    document.getElementById('home-link').addEventListener('click', (e) => { e.preventDefault(); router.navigate('landing'); });
    document.getElementById('nav-booking').addEventListener('click', (e) => { e.preventDefault(); router.navigate('booking'); });
    document.getElementById('nav-dashboard').addEventListener('click', (e) => { e.preventDefault(); router.navigate('dashboard'); });
    document.getElementById('nav-login').addEventListener('click', () => {
        if (state.user) { router.logout(); } else { renderLoginModal(); }
    });

    // Hamburger menu toggle
    document.getElementById('hamburger-btn')?.addEventListener('click', () => {
        state.mobileMenuOpen = !state.mobileMenuOpen;
        document.querySelector('.nav-links').classList.toggle('open', state.mobileMenuOpen);
        document.getElementById('hamburger-btn').classList.toggle('active', state.mobileMenuOpen);
    });
});

window.router = router;
window.state = state;
window.showNotification = showNotification;
