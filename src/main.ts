/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import VueMatomo from 'vue-matomo';
import '@gouvfr/dsfr/dist/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/utility.min.css';
import '@gouvfr/dsfr/dist/dsfr.module.min.js';
import { createSentry } from './sentry/sentry';
import './assets/theme/style.css';
import { NavigationBus } from '@/navigationBus';
import VueHotjar from 'vue-hotjar-next';

declare global {
  interface Window {
    _paq: any;
    dsfr(element: HTMLElement | null): {
      modal: {
        conceal(): void;
        disclose(): void;
      };
    };
  }
}

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
NavigationBus.getInstance().setRouter(router);
app.use(router);
app.use(pinia);
app.use(VueMatomo, {
  host: import.meta.env.VITE_MATOMO_URL,
  siteId: import.meta.env.VITE_MATOMO_SITE_ID,
});
app.use(VueHotjar, {
  id: import.meta.env.VITE_HOTJAR_ID,
  isProduction: import.meta.env.VITE_ENV !== 'local',
  snippetVersion: import.meta.env.VITE_HOTJAR_SNIPPET_VERSION,
});
createSentry(app, router);

app.mount('#app');

window._paq.push(['trackPageView']);
