import Authentification from "@/components/Authentification.vue";
import Dashboard from "@/components/Dashboard.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Authentification },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
