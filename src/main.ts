import { createApp } from "vue";
import "./assets/theme/style.css";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import VueMatomo from "vue-matomo";

declare global {
  interface Window {
    _paq: unknown;
  }
}

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(pinia);
app.use(VueMatomo, {
  host: import.meta.env.VITE_MATOMO_URL,
  siteId: import.meta.env.VITE_MATOMO_SITE_ID,
});
app.mount("#app");

window._paq.push(["trackPageView"]);
