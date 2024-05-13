import '../assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '../router'
import {createI18n} from "vue-i18n";
// Not corresponding to FSD methodology. Translations should be located in segments where they are used.
// TODO: create some way to keep translations in segment and grab them after together. (No time for it now)
import en from "../translations/en.json";
import axios from '../plugins/axios';

const app = createApp(App)

app.use(createPinia())
app.use(router)

// console.log()
const i18n = createI18n({
    locale: navigator.language,
    fallbackLocale: "en",
    messages: { en },
    legacy: false
});

app.use(i18n);

app.use(axios, {
    baseUrl: '',
});

app.mount('#app')
