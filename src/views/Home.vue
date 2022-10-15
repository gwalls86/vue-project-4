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
    import { useDatabaseStore } from '../stores/database';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const userStore = useUserStore();
    const databaseStore = useDatabaseStore();
    databaseStore.getUrls();
    

    const url = ref('');
    const handleSubmit = () => {
        //Aqui se deben hacer las validaciones de la url...
        databaseStore.addUrl(url.value);
    };

</script>


<template>
    <h1>
        Home
    </h1>
    <p>
        <!-- ? se usa para que no genere error si aún no se ha generado la variable -->
        {{userStore.userData?.email}}
    </p>
    

    <form @submit.prevent="handleSubmit">
        <div class="d-grid gap-2 col-6 mx-auto">
            <input type="text" placeholder="Ingrese URL" v-model="url">
        </div>
        
        <button type="submit" class="btn btn-danger me-md-2">Agregar</button>
    </form>
    <p v-if="databaseStore.loadingDoc"> Loading docs...</p>
    <ul v-else>
        <li v-for="item in databaseStore.documents" :key="item.id">
            {{ item.id }}
            <br>
            {{ item.name }}
            <br>
            {{ item.short }}
            <br>
            <button @click="router.push(`/editar/${item.id}`)">Editar</button>
            <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
        </li>
    </ul>

    <!-- <p>
        {{ userStore.userData }}
    </p> -->
</template>