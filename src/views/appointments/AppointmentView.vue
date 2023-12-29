<script setup>
import { ref } from 'vue'
import VueTailwindDatepicker  from 'vue-tailwind-datepicker'
import SelectedService from '../../components/SelectedService.vue';
import { formatCurrency } from '../../helpers';
import { useAppointmentsStore } from '../../stores/appoinments.js';


const appointments = useAppointmentsStore()

const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMM'
})

// computed para definir la fechas que se pueden seleccionar en el calendario 
// en esta funcion no deja seleccionar fechas anteriores al dia de hoy, dehcas superiores a 1 mes y por ultimo no deja seleccionar sabados ni domingos siendo [0,6] 0 domingo y 6 sabado
const disableDate = (date) => {
  const today = new Date()
  return date < today || date.getMonth() > today.getMonth() + 1 || [0,6].includes( date.getDay() )
}

</script>

<template>
  
  <h2 class="text-4xl font-extrabold text-white">Detalle Cita y Resumen</h2>
  <p class="text-white text-lg">A continuacion verifique la informacion y confirma tu cita</p>

  <h3 class="text-3xl font-extrabold text-white">Servicios</h3>  

  <p v-if="appointments.noServicesSelected" class="text-white text-2xl text">No hay servicios seleccionados</p>

  <div v-else class="grid gap-5">
    <SelectedService
      v-for="service in appointments.services"
      :key="service._id"
      :service="service"
    
    />
      <p class="text-right text-white text-2xl">
        <span>total pagar: {{ formatCurrency(appointments.totalAmount) }}</span>
      </p>
    </div>

    <div class="space-y-8" v-if="!appointments.noServicesSelected">
      <h3 class="text-3xl font-extrabold text-white">Fecha y Hora</h3>

      <div class="lg:flex gap-5 items-start">
        <div class="w-full lg:w-96 bg-white fex justify-center rounded-lg">
          <VueTailwindDatepicker
          :disable-date="disableDate"
          i18n="es-mx"
          as-single 
          no-imput
          :formatter="formatter"
          v-model="appointments.date"                   
          />
        </div>
        <div v-if="appointments.isDateDelected" class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0">
          <button
            v-for="hour in appointments.hours"
            class="block text-blue-500 rounded-lg text-xl font-black p-3 disabled:opacity-10"
            :class="appointments.time === hour ?  'bg-blue-500 text-white' : 'bg-white' "
            @click="appointments.time = hour"
            :disabled="appointments.disableTime(hour) ? true : false"
          >
          {{ hour }}
          </button>
        </div>
      </div>
        <div v-if="appointments.isValidReservation" class="flex justify-end">
          <button
            class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase, font-black text-white"
            @click="appointments.saveAppointment"
          >
          Confirmar Reservacion  
            </button>
        </div>
    </div>
  
  
</template>