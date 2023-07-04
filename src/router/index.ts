import Authentification from "@/components/Authentification.vue";
import Dashboard from "@/components/Dashboard.vue";
import { createRouter, createWebHistory } from "vue-router";

import Quiz from "@/components/Quiz.vue";
import QuizGagne from "@/components/QuizGagne.vue";
import QuizPerdu from "@/components/QuizPerdu.vue";
import MesAidesRetrofit from "@/components/MesAidesRetrofit.vue";
import Coach from "@/components/Coach.vue";
import MesAides from "@/components/MesAides.vue";
import Communaute from "@/components/Communaute.vue";
import Empreinte from "@/components/Empreinte.vue";
import SuiviDuJour from "@/components/SuiviDuJour.vue";

const routes = [
  { path: "/", component: Authentification },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/quiz/:id", name: "quiz", component: Quiz },
  { path: "/quiz/quiz-gagne", name: "quiz-gagne", component: QuizGagne },
  { path: "/quiz/quiz-perdu", name: "quiz-perdu", component: QuizPerdu },
  { path: "/coach", name: "coach", component: Coach },
  { path: "/coach/suivi-du-jour", name: "suivi-du-jour", component: SuiviDuJour },
  { path: "/mes-aides", name: "mes-aides", component: MesAides },
  { path: "/mes-aides/retrofit", name: "mes-aides-retrofit", component: MesAidesRetrofit },
  { path: "/communaute", name: "communaute", component: Communaute },
  { path: "/empreinte", name: "empreinte", component: Empreinte },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
