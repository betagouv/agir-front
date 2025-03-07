import { RouteRecordRaw } from 'vue-router';

export enum RouteActionsPath {
  ACTION_INDIVIDUELLE = '/action/:type/:id/:titre',
  CATALOGUE_ACTION = '/actions',
}

export enum RouteActionsName {
  ACTION_INDIVIDUELLE = 'action-individuelle',
  CATALOGUE_ACTION = 'catalogue-action',
}

const compteRoutes: RouteRecordRaw[] = [
  {
    path: RouteActionsPath.ACTION_INDIVIDUELLE,
    name: RouteActionsName.ACTION_INDIVIDUELLE,
    component: () => import('@/components/pages/PageAction.vue'),
    meta: {
      title: 'Action',
    },
  },
  {
    path: RouteActionsPath.CATALOGUE_ACTION,
    name: RouteActionsName.CATALOGUE_ACTION,
    component: () => import('@/components/pages/PageCatalogueActions.vue'),
    meta: {
      title: "Catalogue d'actions",
    },
  },
];

export default compteRoutes;
