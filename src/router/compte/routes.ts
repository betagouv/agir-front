const PageCompte = () => import('@/components/pages/PageCompte.vue');
const PageCreationCompte = () => import('@/components/pages/PageCreationCompte.vue');
const PageValidationCompte = () => import('@/components/pages/PageValidationCompte.vue');
const PageMotDePasseOublie = () => import('@/components/pages/PageMotDePasseOublie.vue');
const PageCompteOptionsAvancees = () => import('@/components/pages/PageCompteOptionsAvancees.vue');
const PageCompteMieuxVousConnaitre = () => import('@/components/pages/PageCompteMieuxVousConnaitre.vue');
const PageCompteLogement = () => import('@/components/pages/PageCompteLogement.vue');
const PageCompteVosDefis = () => import('@/components/pages/PageCompteVosDefis.vue');
const PagePostCreationCompteEtape1 = () =>
  import('@/components/pages/PagePostCreationCompte/PagePostCreationCompteEtape1.vue');
const PagePostCreationCompteEtape2 = () =>
  import('@/components/pages/PagePostCreationCompte/PagePostCreationCompteEtape2.vue');
import { RouteRecordRaw } from 'vue-router';
import { RouteCompteName } from '@/router/compte/routeCompteName';

export enum RouteComptePath {
  MON_COMPTE = '/mon-compte/',
  OPTIONS_AVANCEES = '/mon-compte/options-avancees',
  CREATION_COMPTE = '/creation-compte',
  VALIDATION_COMPTE = '/validation-compte',
  MOT_DE_PASSE_OUBLIE = '/mot-de-passe-oublie',
  MIEUX_VOUS_CONNAITRE = '/mon-compte/mieux-vous-connaitre',
  LOGEMENT = '/mon-compte/logement',
  DEFIS = '/mon-compte/vos-actions',
  POST_CREATION_COMPTE_ETAPE_1 = '/creation-compte/etape-1',
  POST_CREATION_COMPTE_ETAPE_2 = '/creation-compte/etape-2',
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
      {
        path: RouteComptePath.MIEUX_VOUS_CONNAITRE,
        name: RouteCompteName.MIEUX_VOUS_CONNAITRE,
        component: PageCompteMieuxVousConnaitre,
      },
      {
        path: RouteComptePath.LOGEMENT,
        name: RouteCompteName.LOGEMENT,
        component: PageCompteLogement,
      },
      {
        path: RouteComptePath.DEFIS,
        name: RouteCompteName.DEFIS,
        component: PageCompteVosDefis,
      },
    ],
  },
  {
    path: RouteComptePath.CREATION_COMPTE,
    name: RouteCompteName.CREATION_COMPTE,
    component: PageCreationCompte,
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
  {
    path: RouteComptePath.POST_CREATION_COMPTE_ETAPE_1,
    name: RouteCompteName.POST_CREATION_COMPTE_ETAPE_1,
    component: PagePostCreationCompteEtape1,
    meta: {
      title: 'Création de compte - étape 1',
      estPublique: true,
    },
  },
  {
    path: RouteComptePath.POST_CREATION_COMPTE_ETAPE_2,
    name: RouteCompteName.POST_CREATION_COMPTE_ETAPE_2,
    component: PagePostCreationCompteEtape2,
    meta: {
      title: 'Création de compte - étape 2',
      estPublique: true,
    },
  },
];

export default compteRoutes;
