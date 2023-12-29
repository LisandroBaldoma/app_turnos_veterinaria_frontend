<script setup>
import AuthAPI from '../../api/AuthAPI';
import { inject } from 'vue'
import { reset } from '@formkit/vue'

const toast = inject('toast')

const handleSubmit = async ({email}) => {
    
    try {
        const { data } = await AuthAPI.forgotPssword({email})
        toast.open({
            message: data.msg,
            type:'success'
        })
        reset('forgot-password')
        
    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type:'error'
        }) 
    }
    
}


</script>

<template>
  
     <h1 class="text-6xl font-extrabold text-white text-center mt-10">Olvide mi password</h1>
     <p class="text-2xl text-white text-center my-5 ">Recupera el acceso a tu cuenta</p>

    <RouterView />

    <FormKit 
        id="forgot-password"
        type="form" 
        :actions="false"
        incomplete-messaage="No se pudo enviar, revisa las notificaciones"
        @submit="handleSubmit"   
    >
        <FormKit 
            type="email"
            label="Email"
            name="email"
            placeholder="Email de Uusario"
            validation="required|email"
            :validation-message="{
                required:'El email es oblidatorio',
                email:'Email no valido'
            }"
        />        
        
        <FormKit type="submit">Enviar Instrucciones</FormKit>         

    </FormKit>
  
</template>
