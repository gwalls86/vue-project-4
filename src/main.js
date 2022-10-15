import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import storeReset from './plugins/storeReset'
 
const app = createApp(App);
const pinia = createPinia();

pinia.use(storeReset);

app.use(router);
app.use(pinia);

app.mount('#app');

//createApp(App).use(router).mount('#app');
//createApp(App).mount('#app');