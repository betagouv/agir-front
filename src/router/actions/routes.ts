import { RouteRecordRaw } from 'vue-router';

export enum RouteActionsPath {
  ACTION_INDIVIDUELLE = '/action/:titre/:id',
}

export enum RouteActionsName {
  ACTION_INDIVIDUELLE = 'action-individuelle',
}

const compteRoutes: RouteRecordRaw[] = [
  {
    path: RouteActionsPath.ACTION_INDIVIDUELLE,
    name: RouteActionsName.ACTION_INDIVIDUELLE,
    component: () => import('@/components/pages/PageAction.vue'),
    meta: {
      title: 'Action',
      estPublique: true,
    },
  },
];

export default compteRoutes;
