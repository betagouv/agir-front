import { RouteRecordRaw } from 'vue-router';

import { RouteAidesName } from '@/router/aides/routeAidesName';

const PageAidesVelo = () => import('@/components/pages/PageAidesVelo.vue');
const PageAides = () => import('@/components/pages/PageAides.vue');
const PageAidesVeloFormulaire = () => import('@/components/pages/PageAidesVeloFormulaire.vue');
const PageDetailAide = () => import('@/components/pages/PageDetailAide.vue');
const PagePrevisualisationAide = () => import('@/components/pages/PagePrevisualisationAide.vue');

export enum RouteAidesPath {
  AIDES = '/aides',
  FORMULAIRE = 'formulaire',
  VELO = 'velo',
  AIDE_PREVISUALISATION = '/aides/previsualisation/:id',
  AIDE = '/aide/:titre/:id',
}

const aidesRoutes: RouteRecordRaw[] = [
  {
    path: RouteAidesPath.AIDES,
    children: [
      {
        path: RouteAidesPath.AIDES,
        name: RouteAidesName.AIDES,
        component: PageAides,
        meta: {
          title: 'Aides',
        },
      },
      {
        path: RouteAidesPath.AIDES,
        name: RouteAidesName.AIDES,
        component: PageAides,
        meta: {
          title: 'Aides',
        },
      },
      {
        path: RouteAidesPath.VELO,
        children: [
          {
            path: '',
            name: RouteAidesName.VELO,
            component: PageAidesVelo,
          },
          {
            path: RouteAidesPath.FORMULAIRE,
            name: RouteAidesName.VELO_FORMULAIRE,
            component: PageAidesVeloFormulaire,
          },
        ],
      },
    ],
  },
  {
    path: RouteAidesPath.AIDE,
    name: RouteAidesName.AIDE_CONSULTATION,
    component: PageDetailAide,
    meta: { estPublique: true },
  },
];

if (import.meta.env.VITE_ENV === 'dev') {
  aidesRoutes.push({
    path: RouteAidesPath.AIDE_PREVISUALISATION,
    name: RouteAidesName.AIDE_PREVISUALISATION,
    component: PagePrevisualisationAide,
    meta: { estPublique: true },
  });
}

export default aidesRoutes;
