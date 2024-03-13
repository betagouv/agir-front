const PageAidesVelo = () => import('@/components/pages/PageAidesVelo.vue');
const PageAides = () => import('@/components/pages/PageAides.vue');
const PageAidesRetrofit = () => import('@/components/pages/PageAidesRetrofit.vue');
const PageAidesRetrofitFormulaire = () => import('@/components/pages/PageAidesRetrofitFormulaire.vue');
const PageAidesVeloFormulaire = () => import('@/components/pages/PageAidesVeloFormulaire.vue');
import { RouteRecordRaw } from 'vue-router';
import { RouteAidesName } from '@/router/aides/routeAidesName';

export enum RouteAidesPath {
  VOS_AIDES = '/vos-aides/',
  RETROFIT = 'retrofit',
  FORMULAIRE = 'formulaire',
  VELO = 'velo',
}

const aidesRoutes: RouteRecordRaw[] = [
  {
    path: RouteAidesPath.VOS_AIDES,
    children: [
      {
        path: RouteAidesPath.VOS_AIDES,
        name: RouteAidesName.VOS_AIDES,
        component: PageAides,
        meta: {
          title: `Vos aides`,
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
      {
        path: RouteAidesPath.RETROFIT,
        children: [
          {
            path: '',
            name: RouteAidesName.RETROFIT,
            component: PageAidesRetrofit,
          },
          {
            path: RouteAidesPath.FORMULAIRE,
            name: RouteAidesName.RETROFIT_FORMULAIRE,
            component: PageAidesRetrofitFormulaire,
          },
        ],
      },
    ],
  },
];

export default aidesRoutes;
