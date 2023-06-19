import Authentification from "@/components/Authentification.vue";
import Dashboard from "@/components/Dashboard.vue";
import { createRouter, createWebHistory } from "vue-router";
import Quizz from "@/components/Quizz.vue";
import QuizzGagne from "@/components/QuizzGagne.vue";
import QuizzPerdu from "@/components/QuizzPerdu.vue";

const routes = [
  { path: "/", component: Authentification },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/quiz/:id", name: "quiz", component: Quizz },
  { path: "/quiz/quizz-gagne", name: "quizz-gagne", component: QuizzGagne },
  { path: "/quiz/quizz-perdu", name: "quizz-perdu", component: QuizzPerdu },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
