const PageCompte = () => import('@/components/pages/PageCompte.vue');
const PageCreationCompte = () => import('@/components/pages/PageCreationCompte.vue');
const PageValidationCompte = () => import('@/components/pages/PageValidationCompte.vue');
const PageMotDePasseOublie = () => import('@/components/pages/PageMotDePasseOublie.vue');
const PageCompteOptionsAvancees = () => import('@/components/pages/PageCompteOptionsAvancees.vue');
const PageCompteMieuxVousConnaitre = () => import('@/components/pages/PageCompteMieuxVousConnaitre.vue');
const PageCompteLogement = () => import('@/components/pages/PageCompteLogement.vue');
const PageCompteVosDefis = () => import('@/components/pages/PageCompteVosDefis.vue');
import { RouteRecordRaw } from 'vue-router';
import { RouteCompteName } from '@/router/compte/routeCompteName';

export enum RouteComptePath {
  MON_COMPTE = '/mon-compte/',
  MODIFIER_MOT_DE_PASSE = '/mon-compte/changer-de-mot-de-passe',
  OPTIONS_AVANCEES = '/mon-compte/options-avancees',
  CREATION_COMPTE = '/creation-compte',
  VALIDATION_COMPTE = '/validation-compte',
  MOT_DE_PASSE_OUBLIE = '/mot-de-passe-oublie',
  MIEUX_VOUS_CONNAITRE = '/mon-compte/mieux-vous-connaitre',
  LOGEMENT = '/mon-compte/logement',
  DEFIS = '/mon-compte/vos-actions',
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
];

export default compteRoutes;
