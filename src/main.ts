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
import Hotjar from '@hotjar/browser';
import Vue3DirectiveShepherd from 'vue3-directive-shepherd';
import 'shepherd.js/dist/css/shepherd.css';

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

const options = {
  router,
  tourMap: {
    serviceTour: {
      useModalOverlay: true,
    },
    aideTour: {
      useModalOverlay: true,
    },
    recommandationTour: {
      useModalOverlay: true,
    },
  },
};

app.use(Vue3DirectiveShepherd, options);
app.use(VueMatomo, {
  host: import.meta.env.VITE_MATOMO_URL,
  siteId: import.meta.env.VITE_MATOMO_SITE_ID,
});
if (import.meta.env.VITE_ENV === 'production') {
  Hotjar.init(import.meta.env.VITE_HOTJAR_ID, import.meta.env.VITE_HOTJAR_SNIPPET_VERSION, {
    debug: false,
  });
  app.provide('Hotjar', Hotjar);
} else {
  app.provide('Hotjar', null);
}

createSentry(app, router);

app.mount('#app');

window._paq.push(['trackPageView']);
