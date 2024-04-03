/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import VueMatomo from 'vue-matomo';
// ordre des css important
import 'shepherd.js/dist/css/shepherd.css';
import '@gouvfr/dsfr/dist/core/core.min.css';
import '@gouvfr/dsfr/dist/utility/utility.min.css';
import '@gouvfr/dsfr/dist/component/button/button.min.css';
import '@gouvfr/dsfr/dist/component/input/input.min.css';
import '@gouvfr/dsfr/dist/component/logo/logo.min.css';
import '@gouvfr/dsfr/dist/component/link/link.min.css';
import '@gouvfr/dsfr/dist/component/form/form.min.css';
import '@gouvfr/dsfr/dist/component/tag/tag.min.css';
import '@gouvfr/dsfr/dist/component/checkbox/checkbox.min.css';
import '@gouvfr/dsfr/dist/component/radio/radio.min.css';
import '@gouvfr/dsfr/dist/dsfr.module.min.js';
import { createSentry } from './sentry/sentry';

import './assets/theme/style.css';
import { NavigationBus } from '@/navigationBus';
import Hotjar from '@hotjar/browser';
import Vue3DirectiveShepherd from 'vue3-directive-shepherd';

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
      defaultStepOptions: {
        scrollTo: true,
        classes: 'fr-text--bold',
      },
    },
    aideTour: {
      useModalOverlay: true,
      defaultStepOptions: {
        scrollTo: true,
        classes: 'fr-text--bold',
      },
    },
    recommandationTour: {
      useModalOverlay: true,
      defaultStepOptions: {
        scrollTo: true,
        classes: 'fr-text--bold',
      },
    },
    bibliothequeTour: {
      useModalOverlay: true,
      defaultStepOptions: {
        scrollTo: true,
        classes: 'fr-text--bold',
      },
    },
  },
};

app.use(Vue3DirectiveShepherd, options);
app.use(VueMatomo, {
  host: import.meta.env.VITE_MATOMO_URL,
  siteId: import.meta.env.VITE_MATOMO_SITE_ID,
  router: router,
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
window._paq.push(['trackAllContentImpressions']);
window._paq.push(['enableLinkTracking']);
