import PageAidesVelo from '@/components/pages/PageAidesVelo.vue';
import PageAides from '@/components/pages/PageAides.vue';
import PageAidesRetrofit from '@/components/pages/PageAidesRetrofit.vue';
import PageAidesRetrofitFormulaire from '@/components/pages/PageAidesRetrofitFormulaire.vue';
import PageAidesVeloFormulaire from '@/components/pages/PageAidesVeloFormulaire.vue';
import { RouteRecordRaw } from 'vue-router';
import { RouteAidesName } from '@/router/aides/routeAidesName';

enum RouteAidesPath {
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
