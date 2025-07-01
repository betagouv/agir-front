const PageCompte = () => import('@/components/pages/PageCompte.vue');
const PageCreationCompte = () => import('@/components/pages/PageCreationCompte.vue');
const PageCreationCompteDepuisNGC = () => import('@/components/pages/PageCreationCompteDepuisNGC.vue');
const PageVerificationAdresseMail = () => import('@/components/pages/PageVerificationAdresseMail.vue');
const PageCompteOptionsAvancees = () => import('@/components/pages/PageCompteOptionsAvancees.vue');
const PageCompteMesReponses = () => import('@/components/pages/PageCompteMesReponses.vue');
const PageCompteLogement = () => import('@/components/pages/PageCompteLogement.vue');
const PagePostCreationCompteEtape1 = () =>
  import('@/components/pages/PagePostCreationCompte/PagePostCreationCompteEtape1.vue');
const PagePostCreationCompteEtape2 = () =>
  import('@/components/pages/PagePostCreationCompte/PagePostCreationCompteEtape2.vue');
const PagePostCreationCompteEtape3 = () =>
  import('@/components/pages/PagePostCreationCompte/PagePostCreationCompteEtape3.vue');
const PagePostCreationCompteFin = () =>
  import('@/components/pages/PagePostCreationCompte/PagePostCreationCompteFin.vue');
const PagePostCreationCompteDisclaimer = () =>
  import('@/components/pages/PagePostCreationCompte/PagePostCreationCompteDisclaimer.vue');
import { RouteRecordRaw } from 'vue-router';
import { RouteCompteName } from '@/router/compte/routeCompteName';

export enum RouteComptePath {
  MON_COMPTE = '/compte/',
  OPTIONS_AVANCEES = '/compte/options-avancees',
  CREATION_COMPTE = '/creation-compte',
  CREATION_COMPTE_NGC = '/creation-compte/nos-gestes-climat',
  VALIDATION_COMPTE = '/validation-compte',
  VALIDATION_AUTHENTIFICATION = '/validation-authentification',
  MES_REPONSES = '/compte/mes-reponses',
  LOGEMENT = '/compte/logement',
  POST_CREATION_COMPTE_ETAPE_1 = '/creation-compte/etape-1',
  POST_CREATION_COMPTE_ETAPE_2 = '/creation-compte/etape-2',
  POST_CREATION_COMPTE_ETAPE_3 = '/creation-compte/etape-3',
  POST_CREATION_COMPTE_FIN = '/creation-compte/fin',
  POST_CREATION_COMPTE_DISCLAIMER = '/creation-compte/experimentation',
}

const compteRoutes: RouteRecordRaw[] = [
  {
    path: RouteComptePath.MON_COMPTE,
    children: [
      {
        path: RouteComptePath.MON_COMPTE,
        name: RouteCompteName.MON_COMPTE,
        component: PageCompte,
        meta: {
          title: 'Mes informations',
        },
      },
      {
        path: RouteComptePath.OPTIONS_AVANCEES,
        name: RouteCompteName.OPTIONS_AVANCEES,
        component: PageCompteOptionsAvancees,
        meta: {
          title: 'Options avancées',
        },
      },
      {
        path: RouteComptePath.MES_REPONSES,
        name: RouteCompteName.MES_REPONSES,
        component: PageCompteMesReponses,
        meta: {
          title: 'Mes réponses',
        },
      },
      {
        path: RouteComptePath.LOGEMENT,
        name: RouteCompteName.LOGEMENT,
        component: PageCompteLogement,
        meta: {
          title: 'Logement',
        },
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
    path: RouteComptePath.CREATION_COMPTE_NGC,
    name: RouteCompteName.CREATION_COMPTE_NGC,
    component: PageCreationCompteDepuisNGC,
    meta: {
      title: 'Création du compte depuis Nos Gestes Climat',
      estPublique: true,
    },
  },
  {
    path: RouteComptePath.VALIDATION_COMPTE,
    name: RouteCompteName.VALIDATION_COMPTE,
    component: PageVerificationAdresseMail,
    meta: {
      title: 'Validation du compte',
      estPublique: true,
    },
  },
  {
    path: RouteComptePath.VALIDATION_AUTHENTIFICATION,
    name: RouteCompteName.VALIDATION_AUTHENTIFICATION,
    component: PageVerificationAdresseMail,
    meta: {
      title: "Validation de l'authentification",
      estPublique: true,
    },
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
  {
    path: RouteComptePath.POST_CREATION_COMPTE_ETAPE_3,
    name: RouteCompteName.POST_CREATION_COMPTE_ETAPE_3,
    component: PagePostCreationCompteEtape3,
    meta: {
      title: 'Création de compte - étape 3',
      estPublique: true,
    },
  },
  {
    path: RouteComptePath.POST_CREATION_COMPTE_FIN,
    name: RouteCompteName.POST_CREATION_COMPTE_FIN,
    component: PagePostCreationCompteFin,
    meta: {
      title: 'Création de compte - fin',
      estPublique: true,
    },
  },
  {
    path: RouteComptePath.POST_CREATION_COMPTE_DISCLAIMER,
    name: RouteCompteName.POST_CREATION_COMPTE_DISCLAIMER,
    component: PagePostCreationCompteDisclaimer,
    meta: {
      title: 'Création de compte - Experimentation',
      estPublique: true,
    },
  },
];

export default compteRoutes;
