import { RouteRecordRaw } from 'vue-router';

export enum RouteActionsPath {
  ACTION_INDIVIDUELLE = '/action/:type/:id/:titre',
  CATALOGUE_ACTION = '/actions',
  PREVISUALISER_ACTION = '/actions/previsualisation/:type/:id/',
}

export enum RouteActionsName {
  ACTION_INDIVIDUELLE = 'action-individuelle',
  CATALOGUE_ACTION = 'catalogue-action',
  PREVISUALISER_ACTION = 'previsualiser-action',
}

const actionsRoutes: RouteRecordRaw[] = [
  {
    path: RouteActionsPath.ACTION_INDIVIDUELLE,
    name: RouteActionsName.ACTION_INDIVIDUELLE,
    component: () => import('@/components/pages/PageAction.vue'),
    meta: {
      title: 'Action',
      estPublique: true,
    },
  },
  {
    path: RouteActionsPath.CATALOGUE_ACTION,
    name: RouteActionsName.CATALOGUE_ACTION,
    component: () => import('@/components/pages/PageCatalogueActions.vue'),
    meta: {
      title: "Catalogue d'actions",
      estPublique: true,
    },
  },
];

if (import.meta.env.VITE_ENV === 'dev') {
  actionsRoutes.push({
    path: RouteActionsPath.PREVISUALISER_ACTION,
    name: RouteActionsName.PREVISUALISER_ACTION,
    component: () => import('@/components/pages/PagePrevisualisationAction.vue'),
    meta: { estPublique: true },
  });
}

export default actionsRoutes;
