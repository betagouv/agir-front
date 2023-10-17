/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApp } from 'vue';
import './assets/theme/style.css';
import App from '@/App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import VueMatomo from 'vue-matomo';
import '@gouvfr/dsfr/dist/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/utility.min.css';
import '@gouvfr/dsfr/dist/dsfr.module.min.js';
import { Context } from '@/axios.factory';
declare global {
  interface Window {
    _paq: any;
  }
}

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
Context.router = router;
app.use(router);
app.use(pinia);
app.use(VueMatomo, {
  host: import.meta.env.VITE_MATOMO_URL,
  siteId: import.meta.env.VITE_MATOMO_SITE_ID,
});
app.mount('#app');

window._paq.push(['trackPageView']);
