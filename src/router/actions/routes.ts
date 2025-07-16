import { RouteRecordRaw } from 'vue-router';

export enum RouteActionsPath {
  ACTION_INDIVIDUELLE = '/action/:type/:id/:titre',
  CATALOGUE_ACTION = '/actions',
  CATALOGUE_ACTION_WINTER = '/actions/winter',
  PREVISUALISER_ACTION = '/actions/previsualisation/:type/:id/',
}

export enum RouteActionsName {
  ACTION_INDIVIDUELLE = 'action-individuelle',
  CATALOGUE_ACTION = 'catalogue-action',
  PREVISUALISER_ACTION = 'previsualiser-action',
  CATALOGUE_ACTION_WINTER = 'catalogue-action-winter',
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
  {
    path: RouteActionsPath.CATALOGUE_ACTION_WINTER,
    name: RouteActionsName.CATALOGUE_ACTION_WINTER,
    component: () => import('@/components/pages/PageCatalogueActionsWinter.vue'),
    meta: {
      title: "Catalogue d'actions pour Winter",
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
