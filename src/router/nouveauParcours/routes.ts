import { RouteRecordRaw } from 'vue-router';

const nouveauParcoursRoutes: RouteRecordRaw[] = [
  {
    path: '/collectivites',
    name: 'collectivites',
    component: () => import('@/components/pages/nouveauParcours/PageParcoursPerso.vue'),
    meta: {
      title: 'Accueil',
      estPublique: true,
    },
  },
];

export default nouveauParcoursRoutes;
