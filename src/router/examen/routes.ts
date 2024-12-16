import { RouteRecordRaw } from 'vue-router';
const PageExamen = () => import('@/components/pages/PageExamen.vue');

export enum RouteThematiquesName {
  EXAMEN = 'examen',
}

export enum RouteThematiquesPath {
  THEMATIQUE = 'thematique',
}

const examenRoutes: RouteRecordRaw[] = [
  {
    path: `/${RouteThematiquesPath.THEMATIQUE}/:id/examen/:missionId`,
    name: RouteThematiquesName.EXAMEN,
    component: PageExamen,
    meta: {
      title: 'Examen',
    },
  },
];

export default examenRoutes;
