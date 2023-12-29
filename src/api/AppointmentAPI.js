import api from '../lib/axios'

export default {

    create(data){       

        return api.post('appointments', data)
    },
    getByDate(date){       

        return api.get(`/appointments?date=${date}`)
    },
    getUserApointments(userId){
        return api.get(`/users/${userId}/appointments`)
    },
    getAppointmentsById(id){
        return api.get(`/appointments/${id}`)
    },
    updateAppointments(id, data) {
        return api.put(`/appointments/${id}`, data)
    },
    deleteAppointments(id) {
        return api.delete(`/appointments/${id}`)
    }

}

