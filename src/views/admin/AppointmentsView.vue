<script setup>
import AdminAppointent from '../../components/AdminAppointment.vue'
import { useUserStore } from '../../stores/user';


const user = useUserStore()


</script>

<template>
        
  
  <p class="text-white text-lg mt-5">Podras Administrar tus proxims citas</p>

  <p v-if="user.loading" class="text-white text-2xl text-center mt-5">Cargando..</p>

  <div class="v-else">
    
    <p v-if="user.noAppointments" class="text-white text-2xl text-center mt-5"> No tienes proximas Citas</p>
  
    <div v-else class="grid grd-cols-1 gap-5 mt-10">
        
        <AdminAppointent 
            v-for="appointment in user.userAppointments"
            :key="appointment._id"
            :appointment="appointment"
        />
        
     </div>
  
  
    </div>

  

  
</template>

// si quiero permitir que l administrador pueda cancelar las citas de otros usuarios tengo que modifia la logica en el controlador