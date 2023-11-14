import Authentification from '@/components/Authentification.vue';
import Dashboard from '@/components/Dashboard.vue';
import { createRouter, createWebHistory } from 'vue-router';

import PageQuiz from '@/components/pages/PageQuiz.vue';
import PageAidesRetrofit from '@/components/pages/PageAidesRetrofit.vue';
import PageAidesVelo from '@/components/pages/PageAidesVelo.vue';
import Coach from '@/components/Coach.vue';
import PageAides from '@/components/pages/PageAides.vue';
import Page404 from '@/components/pages/Page404.vue';
import SuiviDuJour from '@/components/SuiviDuJour.vue';
import { storeIdNGC } from '@/bilan/middleware/pendingSimulation';
import FranceConnectCallBack from '@/components/FranceConnectCallBack.vue';
import PageCompte from '@/components/pages/PageCompte.vue';
import PageAccueil from '@/components/pages/PageAccueil.vue';
import PageCreationCompte from '@/components/pages/PageCreationCompte.vue';
import PageArticle from '@/components/pages/PageArticle.vue';
import PagePrevisualisationArticle from '@/components/pages/PagePrevisualisationArticle.vue';
import PagePrevisualisationQuiz from '@/components/pages/PagePrevisualisationQuiz.vue';
import PageBilanOnboarding from '@/components/pages/PageBilanOnboarding.vue';
import PageOnboarding from '@/components/pages/PageOnboarding.vue';
import PagePreOnboarding from '@/components/pages/PagePreOnboarding.vue';
import { onboardingStore } from '@/store/onboarding';
import PageModificationMotDePasse from '@/components/pages/PageModificationMotDePasse.vue';
import PageSessionExpiree from '@/components/pages/PageSessionExpiree.vue';
import PageValidationCompte from '@/components/pages/PageValidationCompte.vue';
import PageMotDePasseOublie from '@/components/pages/PageMotDePasseOublie.vue';
import PageMotDePasseOublieRedefinirMotDePasse from '@/components/pages/PageMotDePasseOublieRedefinirMotDePasse.vue';
import PageCatalogueServices from '@/components/pages/PageCatalogueServices.vue';

const appName = 'Agir ! -';
const routes = [
  {
    path: '/',
    name: 'accueil',
    component: PageAccueil,
    meta: {
      title: `${appName} Accueil`,
      estPublique: true,
    },
    beforeEnter: storeIdNGC,
  },
  {
    path: '/pre-onboarding',
    name: 'pre-onboarding',
    component: PagePreOnboarding,
    meta: {
      estPublique: true,
    },
  },
  {
    path: '/onboarding',
    name: 'onboarding',
    component: PageOnboarding,
    meta: {
      estPublique: true,
    },
  },
  {
    path: '/onboarding/bilan',
    name: 'bilan-onboarding',
    component: PageBilanOnboarding,
    meta: {
      estPublique: true,
    },
  },
  {
    path: '/authentification',
    name: 'authentification',
    component: Authentification,
    meta: {
      title: `${appName} Authentification`,
      estPublique: true,
    },
  },
  {
    path: '/session-expiree',
    name: 'session-expiree',
    component: PageSessionExpiree,
    meta: {
      title: `${appName} Session expirée`,
      estPublique: true,
    },
  },
  { path: '/mon-tableau-de-bord', name: 'dashboard', component: Dashboard },
  {
    path: '/coach',
    children: [
      {
        path: '/coach',
        name: 'coach',
        component: Coach,
        meta: {
          title: `${appName} Coach`,
        },
      },
      {
        path: 'services',
        name: 'services',
        component: PageCatalogueServices,
        meta: {
          title: `${appName} Catalogue de services`,
        },
      },
      {
        path: 'suivi-du-jour',
        name: 'suivi-du-jour',
        component: SuiviDuJour,
        meta: {
          title: `${appName} Suivi du jour`,
        },
      },
      {
        path: 'quiz',
        children: [
          {
            path: ':id',
            name: 'quiz',
            component: PageQuiz,
            meta: {
              title: `${appName} Quiz`,
            },
          },
          {
            path: 'previsualisation/:id',
            name: 'quiz-previsualisation',
            component: PagePrevisualisationQuiz,
            meta: {
              title: `${appName} Quiz`,
              estPublique: true,
            },
          },
        ],
      },
    ],
  },
  {
    path: '/vos-aides',
    children: [
      {
        path: '/vos-aides',
        name: 'mes-aides',
        component: PageAides,
        meta: {
          title: `${appName} Vos aides`,
        },
      },
      {
        path: '/mes-aides/retrofit',
        name: 'mes-aides-retrofit',
        component: PageAidesRetrofit,
      },
      {
        path: '/mes-aides/velo',
        name: 'mes-aides-velo',
        component: PageAidesVelo,
      },
    ],
  },
  {
    path: '/login-callback',
    name: 'retour-auth-france-connect',
    component: FranceConnectCallBack,
    meta: {
      estPublique: true,
    },
  },
  {
    path: '/article/',
    name: 'article',
    children: [
      {
        path: ':titre',
        component: PageArticle,
        meta: { estPublique: false },
      },
      {
        path: 'previsualisation/:id',
        component: PagePrevisualisationArticle,
        meta: { estPublique: true },
      },
    ],
  },
  {
    path: '/mon-compte',
    name: 'mon-compte',
    component: PageCompte,
  },
  {
    path: '/mon-compte/changer-de-mot-de-passe',
    name: 'modifier-mot-de-passe',
    component: PageModificationMotDePasse,
  },
  {
    path: '/creation-compte',
    name: 'creation-compte',
    component: PageCreationCompte,
    beforeEnter: (to, from, next) => {
      if (!onboardingStore().estComplet) {
        router.replace({ name: 'pre-onboarding' });
      } else {
        next();
      }
    },
    meta: {
      title: `${appName} Création du compte`,
      estPublique: true,
    },
  },
  {
    path: '/validation-compte',
    name: 'validation-compte',
    component: PageValidationCompte,
    meta: {
      title: `${appName} Validation du compte`,
      estPublique: true,
    },
  },
  {
    path: '/mot-de-passe-oublie',
    children: [
      {
        path: '/mot-de-passe-oublie',
        name: 'mot-de-passe-oublie',
        component: PageMotDePasseOublie,
        meta: {
          title: `${appName} Mot de passe oublié`,
          estPublique: true,
        },
      },
      {
        path: 'redefinir-mot-de-passe',
        name: 'redefinir-mot-de-passe',
        component: PageMotDePasseOublieRedefinirMotDePasse,
        meta: {
          title: `${appName} Redéfinir mot de passe`,
          estPublique: true,
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: Page404,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
