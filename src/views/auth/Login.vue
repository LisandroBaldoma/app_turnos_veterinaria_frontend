<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import AuthAPI from '../../api/AuthAPI';

const toast = inject('toast')
const router = useRouter();

const handleSubmit = async (formData) =>{
    try {
        const { data:{token} } = await AuthAPI.login(formData)
        localStorage.setItem('AUT_TOKEN', token)
        router.push({name:'appointments'})
        
    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type:'error'
        }) 
    }    
}

</script>

<template>
  
     <h1 class="text-6xl font-extrabold text-white text-center mt-10">Iniciar Sesion</h1>
    <p class="text-2xl text-white text-center my-5 ">Si tienes una cuenta, puede iniciar sesion</p>

    <RouterView />

    <FormKit 
        id="registerForm"
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

        <FormKit 
            type="password"
            label="Passsword"
            name="password"
            placeholder="Password de Usuario"
            validation="required"
            :validation-message="{
                required:'El Password es oblidatorio',                
            }"
        />        
        
        <FormKit type="submit">Iniciar Sesion</FormKit>         

    </FormKit>
  
</template>
