<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { useUserStore } from './stores/user';

const userStore = useUserStore();
</script>

<template>
  <h1>App base</h1>
  <nav v-if="!userStore.loadingSession">
    <RouterLink to="/" v-if="userStore.userData">Home  | </RouterLink>
    <RouterLink to="/login" v-if="!userStore.userData">Login | </RouterLink>
    <RouterLink to="/register" v-if="!userStore.userData">Register</RouterLink>
    <button @click="userStore.logoutUser" v-if="userStore.userData">Logout</button>
  </nav>
  <div v-else>
      <!-- Mensaje mostrado mientras se realiza el requireAuth
      requireAuth ubicado en router.js se usa para autenticación de rutas protegidas  -->
      Loading user...
  </div>
  <RouterView>

  </RouterView>
</template>


<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
