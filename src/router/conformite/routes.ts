import { RouteRecordRaw } from 'vue-router';

export enum RouteConformiteName {
  MENTIONS_LEGALES = 'mentions-legales',
  ACCESSIBILITE = 'accessibilite',
  CGU = 'cgu',
  POLITIQUES_DE_CONFIDENTIALITE = 'politiques-de-confidentialite',
}

const conformiteRoutes: RouteRecordRaw[] = [
  {
    path: '/mentions-legales',
    name: RouteConformiteName.MENTIONS_LEGALES,
    component: () => import('@/components/PageMentionsLegales.vue'),
  },
  {
    path: '/accessibilite',
    name: RouteConformiteName.ACCESSIBILITE,
    component: () => import('@/components/PageAccessibilite.vue'),
  },
  {
    path: '/cgu',
    name: RouteConformiteName.CGU,
    component: () => import('@/components/PageCGU.vue'),
  },
  {
    path: '/politiques-de-confidentialite',
    name: RouteConformiteName.POLITIQUES_DE_CONFIDENTIALITE,
    component: () => import('@/components/PagePolitiquesDeConfidentialite.vue'),
  },
];

export default conformiteRoutes;
