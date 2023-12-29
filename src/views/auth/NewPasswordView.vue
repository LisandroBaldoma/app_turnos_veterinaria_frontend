<script setup>
import { onMounted, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import AuthAPI from '../../api/AuthAPI';

import { reset } from '@formkit/vue'


const toast = inject('toast')
const route = useRoute()
const router = useRouter()
const { token } = route.params
const validToken = ref(false)

onMounted(async () => {
    try {
        const { data } = await AuthAPI.verifyPasswordResetToken(token)
        validToken.value = true
    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type:'error'
        }) 
    }
})
 
const handleSubmit = async ({password}) => {
    
    try {
        const { data } = await AuthAPI.updatePassword(token, {password})
        toast.open({
            message: data.msg,
            type:'success'
        })
        reset('newPasswordForm')
        setTimeout(() => {
            router.push({name:'login'})            
        }, 3000);
        
    } catch (error) {        
        toast.open({
            message: error.response.data.msg,
            type:'error'
        }) 
    }    
}
</script>

<template>
    <div v-if="validToken">            
            
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Nvo Password</h1>
        <p class="text-2xl text-white text-center my-5 ">Coloca u nuevo password</p>

        <RouterView />

        <FormKit 
            id="newPasswordForm"
            type="form" 
            :actions="false"
            incomplete-messaage="No se pudo enviar, revisa las notificaciones"
            @submit="handleSubmit"   
        >
        <FormKit 
                type="password"
                label="Passsword"
                name="password"
                placeholder="Password de Usuario - Min 8 Caracteres"
                validation="required|length:8"
                :validation-message="{
                    required:'El Password es oblidatorio',
                    length:'El password debe contener al menos 8 caracteres'
                }"
            />     
            
            <FormKit type="submit">Guardar Password</FormKit>         

        </FormKit>        
    
    </div>

    <p v-else class="text-center text-2xl font-black">Token no valido</p>
  
</template>
