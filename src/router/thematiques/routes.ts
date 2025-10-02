import { RouteRecordRaw } from 'vue-router';

const PageThematique = () => import('@/components/pages/PageThematique.vue');

export enum RouteThematiquesName {
  THEMATIQUE = 'thematique',
}

export enum RouteThematiquesPath {
  THEMATIQUE = 'thematique',
}

const thematiqueRoutes: RouteRecordRaw[] = [
  {
    path: `/${RouteThematiquesPath.THEMATIQUE}/:id`,
    name: RouteThematiquesName.THEMATIQUE,
    component: PageThematique,
    meta: {
      title: 'Thématique',
    },
  },
];

export default thematiqueRoutes;
