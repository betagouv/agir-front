/* eslint-disable @typescript-eslint/no-explicit-any */
import { createHead } from '@unhead/vue/client';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';
import VueMatomo from 'vue-matomo';
import { createSentry } from './sentry/sentry';
import App from '@/App.vue';
import { useMatomoContentTracking } from '@/composables/useMatomoContentTracking';
import { NavigationBus } from '@/navigationBus';
import CrispPlugin from '@/plugins/crisp';
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
import '@gouvfr/dsfr/dist/component/search/search.min.css';

import './assets/theme/style.css';
import './assets/theme/markdownFromCMS.css';

declare global {
  interface Window {
    _paq: any;
  }
}

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
NavigationBus.getInstance().setRouter(router);
app.use(router);
app.use(pinia);
app.use(CrispPlugin, { siteId: import.meta.env.VITE_CRISP_WEBSITE_ID });

const head = createHead();
app.use(head);

app.use(VueMatomo, {
  host: import.meta.env.VITE_MATOMO_URL,
  siteId: import.meta.env.VITE_MATOMO_SITE_ID,
  router,
  enableLinkTracking: true,
  trackInitialView: true,
  requireConsent: false,
  enableHeartBeatTimer: true,
  heartBeatTimerInterval: 15,
});

if (import.meta.env.VITE_ENV === 'production') {
  createSentry(app, router);
}

app.mount('#app');
useMatomoContentTracking(router);
