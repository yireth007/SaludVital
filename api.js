export const api = {
    getDoctors: async (specialty) => {
        console.log(`Fetching doctors for ${specialty}...`);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: 'Dr. Carlos Méndez' },
                    { id: 2, name: 'Dra. Ana Villalba' }
                ]);
            }, 500);
        });
    },
    
    saveAppointment: async (appointment) => {
        console.log('Saving appointment...', appointment);
        return { success: true };
    }
};
