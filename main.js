/**
 * SaludVital - Core Application Logic
 */

// --- State Management ---
const state = {
    view: 'landing', // landing, booking, dashboard
    user: null,
    appointments: JSON.parse(localStorage.getItem('saludvital_appointments')) || [
        { id: 1, doctor: 'Dra. Elena Ramos', specialty: 'Cardiología', date: '2026-05-20', time: '09:00 AM', status: 'confirmed' },
        { id: 2, doctor: 'Dr. Roberto Sanz', specialty: 'Pediatría', date: '2026-05-22', time: '11:30 AM', status: 'pending' }
    ],
    bookingStep: 1,
    selectedSpecialty: '',
    selectedDoctor: '',
    selectedDate: '',
    selectedTime: ''
};

const saveAppointments = () => {
    localStorage.setItem('saludvital_appointments', JSON.stringify(state.appointments));
};

// --- Views Components ---

const LandingView = () => `
    <section class="hero container">
        <h1 class="title-lg">Tu salud, nuestra <span class="highlight">prioridad</span></h1>
        <p>Excelencia médica privada a tu alcance. Agenda tus citas de forma rápida, segura y sin esperas telefónicas.</p>
        <div class="hero-actions">
            <button class="btn btn-primary btn-lg" onclick="router.navigate('booking')">Agendar Cita Ahora</button>
            <button class="btn btn-outline btn-lg" style="margin-left: 1rem;">Conocer Especialidades</button>
        </div>
    </section>

    <section class="container">
        <div class="specialties">
            <div class="glass-card specialty-card">
                <div class="icon">❤️</div>
                <h3>Cardiología</h3>
                <p>Cuidado integral del corazón con tecnología de última generación.</p>
            </div>
            <div class="glass-card specialty-card">
                <div class="icon">👶</div>
                <h3>Pediatría</h3>
                <p>Atención especializada para los más pequeños de la familia.</p>
            </div>
            <div class="glass-card specialty-card">
                <div class="icon">🩺</div>
                <h3>Medicina General</h3>
                <p>Tu primer paso hacia un bienestar integral y preventivo.</p>
            </div>
        </div>
    </section>
`;

const BookingView = () => {
    if (state.bookingStep === 1) {
        return `
            <div class="container" style="max-width: 600px; padding: 4rem 0;">
                <div class="glass-card">
                    <h2 style="margin-bottom: 2rem;">Paso 1: Selecciona Especialidad</h2>
                    <div class="form-group">
                        <label>Especialidad Médica</label>
                        <select id="specialty-select" onchange="router.setSpecialty(this.value)">
                            <option value="">Selecciona una opción...</option>
                            <option value="Cardiología" ${state.selectedSpecialty === 'Cardiología' ? 'selected' : ''}>Cardiología</option>
                            <option value="Pediatría" ${state.selectedSpecialty === 'Pediatría' ? 'selected' : ''}>Pediatría</option>
                            <option value="Ginecología" ${state.selectedSpecialty === 'Ginecología' ? 'selected' : ''}>Ginecología</option>
                            <option value="Dermatología" ${state.selectedSpecialty === 'Dermatología' ? 'selected' : ''}>Dermatología</option>
                        </select>
                    </div>
                    <button class="btn btn-primary" style="width: 100%;" ${!state.selectedSpecialty ? 'disabled' : ''} onclick="router.nextStep()">Continuar</button>
                </div>
            </div>
        `;
    }

    if (state.bookingStep === 2) {
        return `
            <div class="container" style="max-width: 600px; padding: 4rem 0;">
                <div class="glass-card">
                    <h2 style="margin-bottom: 2rem;">Paso 2: Selecciona Médico y Horario</h2>
                    <p style="margin-bottom: 1.5rem; color: var(--on-surface-variant)">Especialidad: <b>${state.selectedSpecialty}</b></p>
                    
                    <div class="form-group">
                        <label>Médico Disponible</label>
                        <select id="doctor-select" onchange="state.selectedDoctor = this.value; router.render()">
                            <option value="">Selecciona...</option>
                            <option value="Dr. Carlos Méndez">Dr. Carlos Méndez</option>
                            <option value="Dra. Ana Villalba">Dra. Ana Villalba</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Fecha</label>
                        <input type="date" value="${state.selectedDate}" onchange="state.selectedDate = this.value; router.render()">
                    </div>

                    <label>Horarios Disponibles</label>
                    <div class="time-grid">
                        ${['08:00 AM', '09:00 AM', '10:30 AM', '02:00 PM', '04:00 PM'].map(time => `
                            <div class="time-slot ${state.selectedTime === time ? 'selected' : ''}" onclick="state.selectedTime = '${time}'; router.render()">
                                ${time}
                            </div>
                        `).join('')}
                    </div>

                    <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                        <button class="btn btn-outline" style="flex: 1;" onclick="state.bookingStep = 1; router.render()">Volver</button>
                        <button class="btn btn-primary" style="flex: 2;" ${!state.selectedTime || !state.selectedDoctor ? 'disabled' : ''} onclick="router.confirmBooking()">Confirmar Cita</button>
                    </div>
                </div>
            </div>
        `;
    }
};

const DashboardView = () => `
    <div class="container" style="padding: 4rem 0;">
        <div class="dashboard-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
            <h1>Mi Panel de <span class="highlight">Control</span></h1>
            <button class="btn btn-primary" onclick="router.navigate('booking')">+ Nueva Cita</button>
        </div>

        <div class="dashboard-grid">
            <aside class="glass-card" style="height: fit-content;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary); margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">👤</div>
                    <h3>Saray guzmán</h3>
                    <p style="font-size: 0.8rem; color: var(--on-surface-variant)">Paciente Premium</p>
                </div>
                <ul style="display: flex; flex-direction: column; gap: 1rem;">
                    <li style="color: var(--primary); font-weight: 600;">Mis Citas</li>
                    <li>Historial</li>
                    <li>Perfil</li>
                    <li>Notificaciones</li>
                </ul>
            </aside>

            <section>
                <h3 style="margin-bottom: 1.5rem;">Citas Próximas</h3>
                ${state.appointments.length === 0 ? '<p>No tienes citas programadas.</p>' : 
                    state.appointments.map(appt => `
                        <div class="glass-card appointment-item">
                            <div>
                                <h4 style="margin-bottom: 0.25rem;">${appt.specialty}</h4>
                                <p style="font-size: 0.9rem; color: var(--on-surface-variant)">${appt.doctor}</p>
                                <p style="font-size: 0.8rem; margin-top: 0.5rem;">📅 ${appt.date} | ⏰ ${appt.time}</p>
                            </div>
                            <div style="text-align: right;">
                                <span class="status-chip status-${appt.status}">${appt.status.toUpperCase()}</span>
                                <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                                    <button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;" onclick="router.cancelAppointment(${appt.id})">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    `).join('')
                }
            </section>
        </div>
    </div>
`;

// --- Router ---
const router = {
    navigate: (view) => {
        state.view = view;
        if (view === 'booking') state.bookingStep = 1;
        router.render();
        window.scrollTo(0, 0);
    },
    
    setSpecialty: (val) => {
        state.selectedSpecialty = val;
        router.render();
    },

    nextStep: () => {
        state.bookingStep = 2;
        router.render();
    },

    confirmBooking: () => {
        const newAppt = {
            id: Date.now(),
            doctor: state.selectedDoctor,
            specialty: state.selectedSpecialty,
            date: state.selectedDate,
            time: state.selectedTime,
            status: 'confirmed'
        };
        state.appointments.push(newAppt);
        saveAppointments();
        alert('¡Cita confirmada con éxito! Recibirás un recordatorio automático.');
        router.navigate('dashboard');
    },

    cancelAppointment: (id) => {
        const appt = state.appointments.find(a => a.id === id);
        if (appt && confirm(`¿Estás seguro de que deseas cancelar tu cita de ${appt.specialty}?`)) {
            state.appointments = state.appointments.filter(a => a.id !== id);
            saveAppointments();
            router.render();
            showNotification('Cita cancelada correctamente');
        }
    },

    render: () => {
        const main = document.getElementById('main-content');
        if (state.view === 'landing') main.innerHTML = LandingView();
        if (state.view === 'booking') main.innerHTML = BookingView();
        if (state.view === 'dashboard') main.innerHTML = DashboardView();
    }
};

// --- Helper UI Functions ---
function showNotification(message) {
    const toast = document.createElement('div');
    toast.className = 'glass-card toast';
    toast.innerHTML = `<p>🔔 ${message}</p>`;
    document.body.appendChild(toast);
    
    // Simple toast animation logic
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// --- Initial Events ---
document.addEventListener('DOMContentLoaded', () => {
    router.render();

    // Nav Links
    document.getElementById('home-link').addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate('landing');
    });

    document.getElementById('nav-booking').addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate('booking');
    });

    document.getElementById('nav-dashboard').addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate('dashboard');
    });

    document.getElementById('nav-login').addEventListener('click', () => {
        alert('Funcionalidad de inicio de sesión próximamente.');
    });
});

// Attach to window for onclick handlers in template strings
window.router = router;
window.state = state;
