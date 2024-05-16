import '../assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '../router'
import {createI18n} from "vue-i18n";
// Not corresponding to FSD methodology. Translations should be located in segments where they are used.
// TODO: create some way to keep translations in segment and grab them after together. (No time for it now)
import en from "../translations/en.json";
import axios from '../plugins/axios';
import currency from '../plugins/currency';

const pinia = createPinia();
pinia.use(({store}) => {
    store.$router = markRaw(router);
});

const app = createApp(App);

app.use(pinia);
app.use(router);

const i18n = createI18n({
    locale: navigator.language,
    fallbackLocale: "en",
    messages: { en },
    legacy: false
});

app.use(i18n);

app.use(axios, {
    baseUrl: '/api/',
});

app.use(currency);

app.mount('#app')
