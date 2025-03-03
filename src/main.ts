/* eslint-disable @typescript-eslint/no-explicit-any */
import Hotjar from '@hotjar/browser';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';
import VueMatomo from 'vue-matomo';
import { createSentry } from './sentry/sentry';
import App from '@/App.vue';
import { NavigationBus } from '@/navigationBus';
import router from '@/router';
// ordre des css important
import '@gouvfr/dsfr/dist/component/modal/modal.min.css';
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
import '@gouvfr/dsfr/dist/component/badge/badge.min.css';
import '@gouvfr/dsfr/dist/dsfr.module.min.js';
import '@gouvfr/dsfr/dist/component/select/select.min.css';
import '@gouvfr/dsfr/dist/component/stepper/stepper.min.css';
import '@gouvfr/dsfr/dist/component/card/card.min.css';

import './assets/theme/style.css';
import './assets/theme/markdownFromCMS.css';

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
  interface HTMLElement {
    addEventListener(
      type: 'dsfr.conceal',
      listener: (event: Event) => void,
      options?: boolean | AddEventListenerOptions,
    ): void;
    removeEventListener(
      type: 'dsfr.conceal',
      listener: (event: Event) => void,
      options?: boolean | EventListenerOptions,
    ): void;
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
  router: router,
});

if (import.meta.env.VITE_ENV === 'production') {
  Hotjar.init(import.meta.env.VITE_HOTJAR_ID, import.meta.env.VITE_HOTJAR_SNIPPET_VERSION, {
    debug: false,
  });

  createSentry(app, router);
}

app.mount('#app');

window._paq.push(['trackPageView']);
window._paq.push(['trackAllContentImpressions']);
window._paq.push(['enableLinkTracking']);
