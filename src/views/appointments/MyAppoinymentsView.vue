<script setup>
import { useUserStore } from '../../stores/user';
import Appointment from '../../components/Appointment.vue'



const user = useUserStore()


// console.log(user.userAppointments)


</script>

<template>  
  
    <h2 class="text-4xl font-extrabold text-white mt-10">Mis Citas</h2>
    <p class="text-white text-lg mt-5">Podras administrar tus Citas</p>

    <p v-if="user.loadingCitas" class="text-white text-2xl text-center mt-5">Cargando Citas...</p>
    <div v-else>
        <p v-if="user.noAppointments" class="text-white text-2xl text-center mt-5">No tiene Proximas Citas</p>

        <div v-else class="grid grid-cols-1 gap-5 mt-10">
            
            <Appointment 
                v-for="appointment in user.userAppointments"
                :key="appointment._id"
                :appointment = "appointment"
            />

        </div>
        
    </div>

    <RouterView />
  
  
</template>