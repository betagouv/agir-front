import Authentification from "@/components/Authentification.vue";
import Dashboard from "@/components/Dashboard.vue";
import { createRouter, createWebHistory } from "vue-router";
import Quiz from "@/components/Quiz.vue";
import QuizGagne from "@/components/QuizGagne.vue";
import QuizPerdu from "@/components/QuizPerdu.vue";

const routes = [
  { path: "/", component: Authentification },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/quiz/:id", name: "quiz", component: Quiz },
  { path: "/quiz/quiz-gagne", name: "quiz-gagne", component: QuizGagne },
  { path: "/quiz/quiz-perdu", name: "quiz-perdu", component: QuizPerdu },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
