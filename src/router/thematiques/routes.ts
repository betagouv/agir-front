import { RouteRecordRaw } from 'vue-router';

const PageThematiqueV2 = () => import('@/components/pages/PageThematiqueV2.vue');

export enum RouteThematiquesName {
  THEMATIQUE = 'thematique',
  MISSION = 'mission',
}

export enum RouteThematiquesPath {
  THEMATIQUE = 'thematique',
}

const thematiqueRoutes: RouteRecordRaw[] = [
  {
    path: `/${RouteThematiquesPath.THEMATIQUE}/:id`,
    name: RouteThematiquesName.THEMATIQUE,
    component: PageThematiqueV2,
    meta: {
      title: 'Thématique',
    },
  },
];

export default thematiqueRoutes;
