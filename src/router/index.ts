import Authentification from "@/components/Authentification.vue";
import Dashboard from "@/components/Dashboard.vue";
import { createRouter, createWebHistory } from "vue-router";

import PageQuiz from "@/components/pages/PageQuiz.vue";
import Article from "@/components/Article.vue";
import PageAidesRetrofit from "@/components/pages/PageAidesRetrofit.vue";
import PageAidesVelo from "@/components/pages/PageAidesVelo.vue";
import Coach from "@/components/Coach.vue";
import MesAides from "@/components/MesAides.vue";
import Page404 from "@/components/pages/Page404.vue";
import Communaute from "@/components/Communaute.vue";
import SuiviDuJour from "@/components/SuiviDuJour.vue";
import { storeIdNGC } from "@/bilan/middleware/pendingSimulation";
import FranceConnectCallBack from "@/components/FranceConnectCallBack.vue";
import PageCompte from "@/components/pages/PageCompte.vue";
import PageAccueil from "@/components/pages/PageAccueil.vue";
import PageCreationCompte from "@/components/pages/PageCreationCompte.vue";

const appName = "Agir ! -";
const routes = [
  {
    path: "/",
    name: "accueil",
    component: PageAccueil,
    meta: {
      title: `${appName} Accueil`,
      estPublique: true,
    },
    beforeEnter: storeIdNGC,
  },
  {
    path: "/authentification",
    name: "authentification",
    component: Authentification,
    meta: {
      title: `${appName} Authentification`,
      estPublique: true,
    },
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
  { path: "/mes-aides/retrofit", name: "mes-aides-retrofit", component: PageAidesRetrofit },
  { path: "/mes-aides/velo", name: "mes-aides-velo", component: PageAidesVelo },
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
    path: "/creation-compte",
    name: "creation-compte",
    component: PageCreationCompte,
    meta: {
      title: `${appName} Création du compte`,
      estPublique: true,
    },
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
