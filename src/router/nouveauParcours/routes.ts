import { RouteRecordRaw } from 'vue-router';

const nouveauParcoursRoutes: RouteRecordRaw[] = [
  {
    path: '/nouveau-parcours',
    name: 'nouveau-parcours',
    component: () => import('@/components/pages/nouveauParcours/PageParcoursPerso.vue'),
    meta: {
      title: 'Accueil',
      estPublique: true,
    },
  },
];

export default nouveauParcoursRoutes;
