<script setup>
    // import {useUserStore} from '../stores/user.js';
    // const userStore = useUserStore();
    //import 
   
    // import { onAuthStateChanged } from '@firebase/auth';
    // import { auth } from '../firebaseConfig';
    // onAuthStateChanged(auth, (user) => {
    //     console.log(user); 
    // });
    //No funciona con el código comentado. Se debe crear la promesa.
    //La promesa se crea en user.js (../stores)
    import { useUserStore } from '../stores/user';
    const userStore = useUserStore();
    

</script>

<template>
    <h1>
        Home
    </h1>
    <p>
        <!-- ? se usa para que no genere error si aún no se ha generado la variable -->
        {{userStore.userData?.email}}
    </p>

    <!-- <p>
        {{ userStore.userData }}
    </p> -->
</template>