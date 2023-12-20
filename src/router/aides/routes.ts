import PageAidesVelo from '@/components/pages/PageAidesVelo.vue';
import PageAides from '@/components/pages/PageAides.vue';
import PageAidesRetrofit from '@/components/pages/PageAidesRetrofit.vue';
import PageAidesRetrofitFormulaire from '@/components/pages/PageAidesRetrofitFormulaire.vue';
import PageAidesVeloFormulaire from '@/components/pages/PageAidesVeloFormulaire.vue';

enum RouteAidesPath {
  VOS_AIDES = '/vos-aides/',
  RETROFIT = 'retrofit',
  FORMULAIRE = 'formulaire',
  VELO = 'velo',
}

export enum RouteAidesName {
  VOS_AIDES = 'vos-aides',
  RETROFIT = 'vos-aides-retrofit',
  RETROFIT_FORMULAIRE = 'vos-aides-retrofit-formulaire',
  VELO = 'vos-aides-velo',
  VELO_FORMULAIRE = 'vos-aides-velo-formulaire',
}

const aidesRoutes = [
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
