import { RouteRecordRaw } from 'vue-router';

export enum RouteConformiteName {
  MENTIONS_LEGALES = 'mentions-legales',
  ACCESSIBILITE = 'accessibilite',
  CGU = 'cgu',
  POLITIQUE_DE_CONFIDENTIALITE = 'politique-de-confidentialite',
  STATISTIQUES = 'statistiques',
  PLAN_DU_SITE = 'plan-du-site',
}

const conformiteRoutes: RouteRecordRaw[] = [
  {
    path: '/mentions-legales',
    name: RouteConformiteName.MENTIONS_LEGALES,
    component: () => import('@/components/pages/PageMentionsLegales.vue'),
    meta: {
      title: 'Mentions légales',
      estPublique: true,
    },
  },
  {
    path: '/accessibilite',
    name: RouteConformiteName.ACCESSIBILITE,
    component: () => import('@/components/pages/PageAccessibilite.vue'),
    meta: {
      title: 'Accessibilité',
      estPublique: true,
    },
  },
  {
    path: '/cgu',
    name: RouteConformiteName.CGU,
    component: () => import('@/components/pages/PageCGU.vue'),
    meta: {
      title: "Conditions générales d'utilisation",
      estPublique: true,
    },
  },
  {
    path: '/politique-de-confidentialite',
    name: RouteConformiteName.POLITIQUE_DE_CONFIDENTIALITE,
    component: () => import('@/components/pages/PagePolitiqueDeConfidentialite.vue'),
    meta: {
      title: 'Politique de confidentialité',
      estPublique: true,
    },
  },
  {
    path: '/statistiques',
    name: RouteConformiteName.STATISTIQUES,
    component: () => import('@/components/pages/PageStatistiques.vue'),
    meta: {
      title: 'Statistiques',
      estPublique: true,
    },
  },
  {
    path: '/plan-du-site',
    name: RouteConformiteName.PLAN_DU_SITE,
    component: () => import('@/components/pages/PagePlanDuSite.vue'),
    meta: {
      title: 'Plan du site',
      estPublique: true,
    },
  },
];

export default conformiteRoutes;
