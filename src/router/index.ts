import Authentification from "@/components/Authentification.vue";
import Dashboard from "@/components/Dashboard.vue";
import { createRouter, createWebHistory } from "vue-router";

import PageQuiz from "@/components/pages/PageQuiz.vue";
import Article from "@/components/Article.vue";
import MesAidesRetrofit from "@/components/MesAidesRetrofit.vue";
import PageAidesResultat from "@/components/pages/PageAidesResultat.vue";
import Coach from "@/components/Coach.vue";
import MesAides from "@/components/MesAides.vue";
import Page404 from "@/components/pages/Page404.vue";
import Communaute from "@/components/Communaute.vue";
import SuiviDuJour from "@/components/SuiviDuJour.vue";
import { storeIdNGC } from "@/bilan/middleware/pendingSimulation";
import FranceConnectCallBack from "@/components/FranceConnectCallBack.vue";
import PageCompte from "@/components/pages/PageCompte.vue";

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
    beforeEnter: storeIdNGC,
  },
  { path: "/mon-tableau-de-bord", name: "dashboard", component: Dashboard },
  {
    path: "/coach/quiz/:id",
    name: "quiz",
    component: PageQuiz,
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
  { path: "/mes-aides/velo", name: "mes-aides-velo", component: PageAidesResultat },
  { path: "/communaute", name: "communaute", component: Communaute },
  {
    path: "/login-callback",
    name: "retour-auth-france-connect",
    component: FranceConnectCallBack,
    meta: {
      estPublique: true,
    },
  },
  {
    path: "/article/:titre",
    name: "article",
    component: Article,
  },
  {
    path: "/mon-compte",
    name: "mon-compte",
    component: PageCompte,
  },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: Page404,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
