import Authentification from "@/components/Authentification.vue";
import Dashboard from "@/components/Dashboard.vue";
import { createRouter, createWebHistory } from "vue-router";
import Quizz from "@/components/Quizz.vue";

const routes = [
  { path: "/", component: Authentification },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/quiz'", name: "quiz", component: Quizz },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
