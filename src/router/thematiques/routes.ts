import { RouteRecordRaw } from 'vue-router';

const PageMission = () => import('@/components/pages/PageMission.vue');
const PageThematique = () => import('@/components/pages/PageThematique.vue');
const PageThematiqueV2 = () => import('@/components/pages/PageThematiqueV2.vue');

export enum RouteThematiquesName {
  THEMATIQUE = 'thematique',
  THEMATIQUE_V2 = 'thematique_v2',
  MISSION = 'mission',
}

export enum RouteThematiquesPath {
  THEMATIQUE = 'thematique',
}

const thematiqueRoutes: RouteRecordRaw[] = [
  {
    path: `/v2/${RouteThematiquesPath.THEMATIQUE}/:id`,
    name: RouteThematiquesName.THEMATIQUE_V2,
    component: PageThematiqueV2,
    meta: {
      title: 'Thématique',
    },
  },
  {
    path: `/${RouteThematiquesPath.THEMATIQUE}/:id`,
    name: RouteThematiquesName.THEMATIQUE,
    component: PageThematique,
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
