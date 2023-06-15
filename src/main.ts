import { createApp } from "vue";
import "./style.css";
import App from "@/App.vue";
import router from "@/router";
import utilisateurStore from "@/store/modules/utilisateur.store.ts";
//import store from "./store";

const app = createApp(App);
app.use(router);
//app.use(store);
app.use(utilisateurStore);
app.mount("#app");
