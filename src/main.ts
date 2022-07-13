import '@/assets/base.css';
import '@progress/kendo-theme-default/dist/all.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router).use(createPinia());

app.mount('#app');
