const PageCompte = import('@/components/pages/PageCompte.vue');
const PageCreationCompte = import('@/components/pages/PageCreationCompte.vue');
const PageValidationCompte = import('@/components/pages/PageValidationCompte.vue');
const PageMotDePasseOublie = import('@/components/pages/PageMotDePasseOublie.vue');
const PageCompteOptionsAvancees = import('@/components/pages/PageCompteOptionsAvancees.vue');
import { onboardingStore } from '@/store/onboarding';
import { RouteRecordRaw } from 'vue-router';
import { RouteCompteName } from '@/router/compte/routeCompteName';

enum RouteComptePath {
  MON_COMPTE = '/mon-compte/',
  MODIFIER_MOT_DE_PASSE = '/mon-compte/changer-de-mot-de-passe',
  OPTIONS_AVANCEES = '/mon-compte/options-avancees',
  CREATION_COMPTE = '/creation-compte',
  VALIDATION_COMPTE = '/validation-compte',
  MOT_DE_PASSE_OUBLIE = '/mot-de-passe-oublie',
}

const compteRoutes: RouteRecordRaw[] = [
  {
    path: RouteComptePath.MON_COMPTE,
    children: [
      {
        path: RouteComptePath.MON_COMPTE,
        name: RouteCompteName.MON_COMPTE,
        component: PageCompte,
      },
      {
        path: RouteComptePath.OPTIONS_AVANCEES,
        name: RouteCompteName.OPTIONS_AVANCEES,
        component: PageCompteOptionsAvancees,
      },
    ],
  },
  {
    path: RouteComptePath.CREATION_COMPTE,
    name: RouteCompteName.CREATION_COMPTE,
    component: PageCreationCompte,
    beforeEnter: (to, from, next) => {
      if (!onboardingStore().estComplet) {
        next({ name: 'pre-onboarding' });
      } else {
        next();
      }
    },
    meta: {
      title: 'Création du compte',
      estPublique: true,
    },
  },
  {
    path: RouteComptePath.VALIDATION_COMPTE,
    name: RouteCompteName.VALIDATION_COMPTE,
    component: PageValidationCompte,
    meta: {
      title: 'Validation du compte',
      estPublique: true,
    },
  },
  {
    path: RouteComptePath.MOT_DE_PASSE_OUBLIE,
    children: [
      {
        path: RouteComptePath.MOT_DE_PASSE_OUBLIE,
        name: RouteCompteName.MOT_DE_PASSE_OUBLIE,
        component: PageMotDePasseOublie,
        meta: {
          title: 'Mot de passe oublié',
          estPublique: true,
        },
      },
    ],
  },
];

export default compteRoutes;
