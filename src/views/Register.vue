<script setup>
    //import {useUserStore} from '../stores/user';
    //const userStore = useUserStore();
    
    import { ref } from 'vue';
    import { useUserStore } from '../stores/user';
  //  import { useRouter } from 'vue-router';

   // const router = useRouter();


    const userStore = useUserStore();

    const email = ref('jorge.paredes@msn.com');
    const password = ref('123456');

    const hanbleSubmit = async() => {
        if(!email.value || !password.value.length > 5){
            return alert("Llena los campos")
        }
        //Esperar a que el usuario se haya registado
        await userStore.registerUser( email.value , password.value );
       // router.push('/');
        // console.log("procesando formulario");
        // console.log(email.value);
        // console.log(password.value);
    }

</script>

<template>
    <h1>
        Register
    </h1>
    <form @submit.prevent="hanbleSubmit">
        <input type="email" placeholder="Ingrese email" v-model.trim="email"/>
        <input type="password" placeholder="Ingrese contraseña" v-model.trim="password"/>
        <button type="submit" :disabled="userStore.loadingUser">Crear usuario</button>
    </form>
   <!-- <button @click="userStore.registerUser('Jorge')">Ingresar</button> -->
</template>