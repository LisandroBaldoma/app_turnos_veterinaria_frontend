import { ref, computed, onMounted, inject, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AppointmentAPI from '../api/AppointmentAPI'
import { convertToISO, convertToStr } from '../helpers/date'
import { useUserStore } from '../stores/user'

export const useAppointmentsStore = defineStore('appointments', () => {

    // Bandera para saber si toy eitando un regitro
    const appointmentId = ref('') 
    
    const services = ref([])
    // fecha reservacion
    const date = ref('')
    //definir horarios de trabajo para las citas
    const hours = ref([]);
    const time = ref('');
    const appointmentsByDate = ref([]);

    const toast = inject('toast')
    const router = useRouter()
    const user = useUserStore()
   

    onMounted(()=>{
        const startHour = 10
        const endHour = 19
        for(let hour = startHour; hour <= endHour; hour++){
            hours.value.push(hour + ':00')            
        }
    })

    watch(date, async () => {
        //obtener las citas
        time.value = ''
        if(date.value === '') return
        const { data } = await AppointmentAPI.getByDate(date.value)

        if(appointmentId.value){
            appointmentsByDate.value = data.filter(appointment => appointment._id !== appointmentId.value)
            // cita actual
            time.value = data.filter(appointment => appointment._id === appointmentId.value)[0].time
        }else{
            appointmentsByDate.value = data
        }

        
        // console.log(data)
    })

    function setSelectedAppointment(appointment){        
        
        services.value = appointment.services
        date.value = convertToStr(appointment.date)
        time.value = appointment.time
        appointmentId.value = appointment._id 

        console.log(appointmentId.value)
    }


    function onServiceSelected(service){
        
        if(services.value.some(selectedService => selectedService._id === service._id)){
            services.value = services.value.filter( selectedService => selectedService._id !== service._id )

        }else{
            if(services.value.length === 2){
                alert('Maximo de servicios por cita.')
                return
            }            
            services.value.push(service)
        }

    }
    async function saveAppointment(){
        const appointment = {
            services: services.value.map(service => service._id),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value

        }

        if(appointmentId.value){
            try {    
                const { data } = await AppointmentAPI.updateAppointments(appointmentId.value, appointment)
                toast.open({
                   message: data.msg,
                   type: 'success'
                })
                
            } catch (error) {
                console.log(error)
            }    
          
        } else{
            try {    
                const { data } = await AppointmentAPI.create(appointment)
                toast.open({
                   message: data.msg,
                   type: 'success'
                })
                
            } catch (error) {
                console.log(error)
            }            
        }           
        clearppointmentData()
        user.getUserAppointments()
        router.push({name:'my-appointments'})        
    }   

    function clearppointmentData(){
        services.value = []
        date.value = ''
        time.value = ''
        appointmentId.value = ''
    }

    async function cancelAppointment(id){
        if(confirm('Esta seguro que desea Cancelar esta cita?')){
            try {
                const { data } = await AppointmentAPI.deleteAppointments(id)            
                    toast.open({
                       message: data.msg,
                       type: 'success'
                    })
                    user.userAppointments = user.userAppointments.filter(appointment => appointment._id != id)
            } catch (error) {
                toast.open({
                    message: error.response.data.msg,
                    type: 'error'
    
                })
            }
        }
    }

    const isServiceSelected = computed(()=> {
        return(id) => services.value.some(service => service._id === id )
    })

    const noServicesSelected = computed(() => services.value.length === 0)

    const totalAmount = computed ( () => {
        return services.value.reduce((total, service) => total + service.price, 0)
    })

    const isValidReservation = computed(()=>{
        return services.value.length && date.value.length && time.value.length
    })

    const isDateDelected =   computed(()=>{
        return date.value ? true : false
    })

    const disableTime = computed(()=>{
        return (hour) => {
            return appointmentsByDate.value.find(appointment => appointment.time === hour)
        }
    })


    return {
        services,
        date,
        hours,
        time,
        setSelectedAppointment,
        onServiceSelected,
        saveAppointment,
        clearppointmentData,
        cancelAppointment,
        isServiceSelected,
        noServicesSelected,
        totalAmount,
        isValidReservation,
        isDateDelected,
        disableTime
    }
})