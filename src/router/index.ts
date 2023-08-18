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
import SuiviDuJour from "@/components/SuiviDuJour.vue";
import storeNgcID from "@/bilan/middleware/storeNgcID";
import sendNgcID from "@/bilan/middleware/sendNgcID";
import FranceConnectCallBack from "@/components/FranceConnectCallBack.vue";

const appName = "Agir ! -";
const routes = [
  {
    path: "/",
    name: "authentification",
    component: Authentification,
    meta: {
      title: `${appName} Authentification`,
      estPublique: true,
    },
    beforeEnter: storeNgcID,
  },
  { path: "/mon-tableau-de-bord", name: "dashboard", component: Dashboard },
  {
    path: "/coach/quiz/:id",
    name: "quiz",
    component: Quiz,
    meta: {
      title: `${appName} Quiz`,
    },
  },
  {
    path: "/coach/quiz/quiz-gagne",
    name: "quiz-gagne",
    component: QuizGagne,
    meta: {
      title: `${appName} Quiz`,
    },
  },
  {
    path: "/coach/quiz/quiz-perdu",
    name: "quiz-perdu",
    component: QuizPerdu,
    meta: {
      title: `${appName} Quiz`,
    },
  },
  {
    path: "/coach",
    name: "coach",
    component: Coach,
    meta: {
      title: `${appName} Coach`,
    },
    beforeEnter: sendNgcID,
  },
  {
    path: "/coach/suivi-du-jour",
    name: "suivi-du-jour",
    component: SuiviDuJour,
    meta: {
      title: `${appName} Suivi du jour`,
    },
  },
  { path: "/mes-aides", name: "mes-aides", component: MesAides },
  { path: "/mes-aides/retrofit", name: "mes-aides-retrofit", component: MesAidesRetrofit },
  { path: "/communaute", name: "communaute", component: Communaute },
  {
    path: "/login-callback",
    name: "retour-auth-france-connect",
    component: FranceConnectCallBack,
    meta: {
      estPublique: true,
    },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
