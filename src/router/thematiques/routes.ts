import { RouteRecordRaw } from 'vue-router';

const PageMission = () => import('@/components/pages/PageMission.vue');
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
  {
    path: `/${RouteThematiquesPath.THEMATIQUE}/:id/mission/:missionId`,
    name: RouteThematiquesName.MISSION,
    component: PageMission,
    meta: {
      title: 'Thématique',
    },
  },
];

export default thematiqueRoutes;
