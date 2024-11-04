import { RouteRecordRaw } from 'vue-router';
const PageMission = () => import('@/components/pages/PageMission.vue');
const PageUnivers = () => import('@/components/pages/PageUnivers.vue');

export enum RouteUniversName {
  UNIVERS = 'univers',
  MISSION = 'mission',
}

export enum RouteUniversPath {
  UNIVERS = 'univers',
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
    path: `/${RouteUniversPath.UNIVERS}/:id/:missionId`,
    name: RouteUniversName.MISSION,
    component: PageMission,
    meta: {
      title: 'Thematique',
    },
  },
];

export default universRoutes;
