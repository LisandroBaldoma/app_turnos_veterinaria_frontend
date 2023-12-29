<script setup>
import { NOMBRE_NEGOCIO } from '../../config/variables.js'; 
import AuthApi from '../../api/AuthAPI.js'
import { inject } from 'vue';
import { reset } from '@formkit/vue'
 
const toast = inject('toast')

const handleSubmit = async ({password_confirm, ...formData}) => {
    try {
        const { data } = await AuthApi.register(formData)        
        toast.open({
            message: data.msg,
            type:'success'
        })        
        reset('registerForm')
    } catch (error) {
        
        toast.open({
            message: error.response.data.msg,
            type:'error'
        })        
    }
}


</script>

<template>
  
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crear una cuenta</h1>
    <p class="text-2xl text-white text-center my-5 ">Crea una cuenta en {{ NOMBRE_NEGOCIO }}</p>

    <RouterView />

    <FormKit 
        id="registerForm"
        type="form" 
        :actions="false"
        incomplete-messaage="No se pudo enviar, revisa las notificaciones"
        @submit="handleSubmit"   
    >
        <FormKit 
            type="text"
            label="nombre"
            name="name"
            placeholder="Tu Nombre"
            validation="required|length:3"
            :validation-message="{
                required:'El nombre es oblidatorio',
                length:'El nombre es muy corto'
            }"
        />  

        <FormKit 
            type="email"
            label="Email"
            name="email"
            placeholder="Email de Registro"
            validation="required|email"
            :validation-message="{
                required:'El campo es oblidatorio',
                email:'Email no valido'
            }"
        />

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

        <FormKit 
            type="password"
            label="Confirmar Passsword"
            name="password_confirm"
            placeholder="Repite el password"
            validation="required|confirm"
            :validation-message="{
                required:'El password es obligatorio',
                confirm:'Los password no son iguales'
            }"
        />
        
        <FormKit type="submit">Crear Cuenta</FormKit>         

    </FormKit>
       
  
</template>
