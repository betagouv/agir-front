import { RouteRecordRaw } from 'vue-router';

const PageServiceLongueVieAuxObjets = () => import('@/components/pages/PagesService/PageServiceLongueVieAuxObjets.vue');
const PageServiceLongueVieAuxObjetsDetail = () =>
  import('@/components/pages/PagesService/PageServiceLongueVieAuxObjetsDetail.vue');

const PageServiceRecettes = () => import('@/components/pages/PagesService/PageServiceRecettes.vue');
const PageServiceRecetteDetail = () => import('@/components/pages/PagesService/PageServiceRecetteDetail.vue');
const PageServicePresDeChezNous = () => import('@/components/pages/PagesService/PageServicePresDeChezNous.vue');
const PageServicePresDeChezNousDetail = () =>
  import('@/components/pages/PagesService/PageServicePresDeChezNousDetail.vue');
const PageServiceFruitsEtLegumes = () => import('@/components/pages/PagesService/PageServiceFruitsEtLegumes.vue');
const PageServiceLinky = () => import('@/components/pages/PagesService/PageServiceLinky.vue');
const PageServiceMesAideReno = () => import('@/components/pages/PagesService/PageServiceMesAidesReno.vue');

export enum RouteServiceName {
  RECETTES = 'recettes',
  RECETTES_DETAIL = 'recettes-detail',
  PROXIMITE = 'pres-de-chez-nous',
  PROXIMITE_DETAIL = 'pres-de-chez-nous-detail',
  FRUITS_ET_LEGUMES = 'fruits-et-legumes',
  LINKY = 'linky',
  MES_AIDES_RENO = 'mes-aides-reno',
  LONGUE_VIE_AUX_OBJETS = 'longue-vie-aux-objets',
  LONGUE_VIE_AUX_OBJETS_DETAIL = 'longue-vie-aux-objets-detail',
}

export enum RouteServicePath {
  RECETTES = '/thematique/:thematiqueId/service/recettes',
  RECETTES_DETAIL = '/recettes/:id',
  LONGUE_VIE_AUX_OBJETS = '/thematique/:thematiqueId/service/longue-vie-aux-objets',
  LONGUE_VIE_AUX_OBJETS_DETAIL = '/service/longue-vie-aux-objets/:id',
  PROXIMITE = '/thematique/:thematiqueId/service/pres-de-chez-nous',
  PROXIMITE_DETAIL = '/thematique/:thematiqueId/service/pres-de-chez-nous/:id',
  FRUITS_ET_LEGUMES = '/thematique/:thematiqueId/service/fruits-et-legumes',
  LINKY = '/thematique/:thematiqueId/service/linky',
  MES_AIDES_RENO = '/thematique/:thematiqueId/service/mes-aides-reno',
}

const serviceRoutes: RouteRecordRaw[] = [
  {
    path: RouteServicePath.RECETTES,
    name: RouteServiceName.RECETTES,
    component: PageServiceRecettes,
    meta: {
      title: 'Service : Recettes',
    },
  },
  {
    path: RouteServicePath.RECETTES_DETAIL,
    name: RouteServiceName.RECETTES_DETAIL,
    component: PageServiceRecetteDetail,
    meta: {
      title: 'Detail de la recette',
    },
  },
  {
    path: RouteServicePath.PROXIMITE,
    name: RouteServiceName.PROXIMITE,
    component: PageServicePresDeChezNous,
    meta: {
      title: 'Service : Près de chez nous',
    },
  },
  {
    path: RouteServicePath.PROXIMITE_DETAIL,
    name: RouteServiceName.PROXIMITE_DETAIL,
    component: PageServicePresDeChezNousDetail,
    meta: {
      title: 'Service : Près de chez nous - Page de détail',
    },
  },
  {
    path: RouteServicePath.FRUITS_ET_LEGUMES,
    name: RouteServiceName.FRUITS_ET_LEGUMES,
    component: PageServiceFruitsEtLegumes,
    meta: {
      title: 'Service : Fruits et légumes',
    },
  },
  {
    path: RouteServicePath.LINKY,
    name: RouteServiceName.LINKY,
    component: PageServiceLinky,
    meta: {
      title: 'Service : Linky',
    },
  },
  {
    path: RouteServicePath.MES_AIDES_RENO,
    name: RouteServiceName.MES_AIDES_RENO,
    component: PageServiceMesAideReno,
    meta: {
      title: 'Service : Mes Aides Reno',
    },
  },
  {
    path: RouteServicePath.LONGUE_VIE_AUX_OBJETS,
    name: RouteServiceName.LONGUE_VIE_AUX_OBJETS,
    component: PageServiceLongueVieAuxObjets,
    meta: {
      title: 'Service : Longue vie aux objets',
    },
  },
  {
    path: RouteServicePath.LONGUE_VIE_AUX_OBJETS_DETAIL,
    name: RouteServiceName.LONGUE_VIE_AUX_OBJETS_DETAIL,
    component: PageServiceLongueVieAuxObjetsDetail,
    meta: {
      title: 'Service : Longue vie aux objets - Page de détail',
    },
  },
];

export default serviceRoutes;
