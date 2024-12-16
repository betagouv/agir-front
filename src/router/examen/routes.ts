import { RouteRecordRaw } from 'vue-router';
const PageExamen = () => import('@/components/pages/PageExamen.vue');

export enum RouteExamenName {
  EXAMEN = 'examen',
}

export enum RouteThematiquesPath {
  THEMATIQUE = 'thematique',
}

const examenRoutes: RouteRecordRaw[] = [
  {
    path: `/${RouteThematiquesPath.THEMATIQUE}/:id/quiz/:missionId`,
    name: RouteExamenName.EXAMEN,
    component: PageExamen,
    meta: {
      title: 'Examen',
    },
  },
];

export default examenRoutes;
