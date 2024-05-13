import { RouteRecordRaw } from 'vue-router';
const PageThematique = () => import('@/components/pages/PageThematique.vue');
const PageUnivers = () => import('@/components/pages/PageUnivers.vue');

export enum RouteUniversName {
  UNIVERS = 'univers',
  THEMATIQUE = 'thematique',
}

export enum RouteUniversPath {
  UNIVERS = 'univers',
  THEMATIQUE = 'thematique',
}

const universRoutes: RouteRecordRaw[] = [
  {
    path: `/${RouteUniversPath.UNIVERS}/:id`,
    name: RouteUniversName.UNIVERS,
    component: PageUnivers,
    meta: {
      title: 'Univers',
    },
  },
  {
    path: `/${RouteUniversPath.UNIVERS}/:id/:thematique`,
    name: RouteUniversName.THEMATIQUE,
    component: PageThematique,
    meta: {
      title: 'Thematique',
    },
  },
];

export default universRoutes;
