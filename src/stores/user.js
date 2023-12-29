import { defineStore } from "pinia";
import { ref, onMounted, computed } from 'vue';
import AuthAPI from "../api/AuthAPI";
import { useRouter } from "vue-router";
import AppointmentAPI from "../api/AppointmentAPI";


export const useUserStore = defineStore('user', () =>{
    const router = useRouter()
    const user = ref({})
    const userAppointments = ref([])
    const loadingCitas = ref(true)

    onMounted(async()=>{
        try {
            const {data} = await AuthAPI.auth()
            user.value = data
            await getUserAppointments()
        } catch (error) {
            console.log(error)
        }finally{
            loadingCitas.value = false
        }
    })

    async function getUserAppointments(){
        const { data } = await AppointmentAPI.getUserApointments(user.value._id)
        userAppointments.value = data
        
    }

    function logout() {
        localStorage.removeItem('AUT_TOKEN')
        user.value = {}
        router.push( {name: 'login'} )
    }

    const getUserName =  computed( () => user.value?.name ? user.value?.name : '')

    const noAppointments =  computed( () => userAppointments.value.length === 0 )

    return {
        user,
        userAppointments,
        getUserAppointments,
        logout,
        getUserName,
        noAppointments,
        loadingCitas
        
    }
})