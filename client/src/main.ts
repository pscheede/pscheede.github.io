import {createApp} from 'vue'
import App from './App.vue'
import {createI18n} from "vue-i18n";

const i18n = createI18n({
    legacy: false,
    locale: navigator.language.split('-')[0],
    fallbackLocale: 'en',
});

const app = createApp(App);
app.use(i18n);
app.mount('#app');
