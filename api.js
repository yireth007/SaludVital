export const api = {
    getDoctors: async (specialty) => {
        const doctorsBySpecialty = {
            'Cardiología': [{ id: 1, name: 'Dra. Elena Ramos' }, { id: 2, name: 'Dr. Carlos Méndez' }],
            'Pediatría': [{ id: 3, name: 'Dr. Roberto Sanz' }, { id: 4, name: 'Dra. María López' }],
            'Ginecología': [{ id: 5, name: 'Dra. Ana Villalba' }, { id: 6, name: 'Dra. Patricia Ruiz' }],
            'Dermatología': [{ id: 7, name: 'Dr. Andrés Torres' }, { id: 8, name: 'Dra. Laura Gómez' }],
            'Medicina General': [{ id: 9, name: 'Dr. Fernando Díaz' }, { id: 10, name: 'Dra. Claudia Herrera' }]
        };
        return new Promise(resolve => {
            setTimeout(() => resolve(doctorsBySpecialty[specialty] || []), 300);
        });
    },

    saveAppointment: async (appointment) => {
        console.log('Saving appointment...', appointment);
        return new Promise(resolve => {
            setTimeout(() => resolve({ success: true, id: Date.now() }), 200);
        });
    }
};
