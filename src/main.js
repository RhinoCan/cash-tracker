import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'vuetify/styles';
import vuetify from './plugins/vuetify';
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import '@fontsource/roboto/100-italic.css';
import '@fontsource/roboto/300-italic.css';
import '@fontsource/roboto/400-italic.css';
import '@fontsource/roboto/500-italic.css';
import '@fontsource/roboto/700-italic.css';
import '@fontsource/roboto/900-italic.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './assets/style.css';
import App from './App.vue';

const pinia = createPinia();

const app = createApp(App);
app.use(Toast);
app.use(pinia);
app.use(vuetify);
app.mount('#app');
