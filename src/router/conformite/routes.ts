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
    meta: {
      title: 'Mentions légales',
    },
  },
  {
    path: '/accessibilite',
    name: RouteConformiteName.ACCESSIBILITE,
    component: () => import('@/components/PageAccessibilite.vue'),
    meta: {
      title: 'Accessibilité',
    },
  },
  {
    path: '/cgu',
    name: RouteConformiteName.CGU,
    component: () => import('@/components/PageCGU.vue'),
    meta: {
      title: "Conditions générales d'utilisation",
    },
  },
  {
    path: '/politiques-de-confidentialite',
    name: RouteConformiteName.POLITIQUES_DE_CONFIDENTIALITE,
    component: () => import('@/components/PagePolitiquesDeConfidentialite.vue'),
    meta: {
      title: 'Politiques de confidentialité',
    },
  },
];

export default conformiteRoutes;
