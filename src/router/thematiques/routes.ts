import { RouteRecordRaw } from 'vue-router';
const PageMission = () => import('@/components/pages/PageMission.vue');
const PageUnivers = () => import('@/components/pages/PageUnivers.vue');

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
    component: PageUnivers,
    meta: {
      title: 'Univers',
    },
  },
  {
    path: `/${RouteThematiquesPath.THEMATIQUE}/:id/mission/:missionId`,
    name: RouteThematiquesName.MISSION,
    component: PageMission,
    meta: {
      title: 'Thematique',
    },
  },
];

export default thematiqueRoutes;
