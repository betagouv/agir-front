import { RouteRecordRaw } from 'vue-router';

export enum RouteConformiteName {
  MENTIONS_LEGALES = 'mentions-legales',
  ACCESSIBILITE = 'accessibilite',
  CGU = 'cgu',
  POLITIQUES_DE_CONFIDENTIALITE = 'politiques-de-confidentialite',
  CHARTE = 'charte',
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
    path: '/politiques-de-confidentialite',
    name: RouteConformiteName.POLITIQUES_DE_CONFIDENTIALITE,
    component: () => import('@/components/pages/PagePolitiquesDeConfidentialite.vue'),
    meta: {
      title: 'Politiques de confidentialité',
      estPublique: true,
    },
  },
  {
    path: '/charte',
    name: RouteConformiteName.CHARTE,
    component: () => import('@/components/pages/PageCharte.vue'),
    meta: {
      title: 'Charte',
      estPublique: true,
    },
  },
];

export default conformiteRoutes;
