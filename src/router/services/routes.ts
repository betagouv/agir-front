import { RouteRecordRaw } from 'vue-router';

const PageServiceRecettes = () => import('@/components/pages/PagesService/PageServiceRecettes.vue');
const PageServiceRecetteDetail = () => import('@/components/pages/PagesService/PageServiceRecetteDetail.vue');
const PageServicePresDeChezNous = () => import('@/components/pages/PagesService/PageServicePresDeChezNous.vue');
const PageServicePresDeChezNousDetail = () =>
  import('@/components/pages/PagesService/PageServicePresDeChezNousDetail.vue');
const PageServiceFruitsEtLegumes = () => import('@/components/pages/PagesService/PageServiceFruitsEtLegumes.vue');
const PageServiceLinky = () => import('@/components/pages/PagesService/PageServiceLinky.vue');

export enum RouteServiceName {
  RECETTES = 'recettes',
  RECETTES_DETAIL = 'recettes-detail',
  PROXIMITE = 'pres-de-chez-nous',
  PROXIMITE_DETAIL = 'pres-de-chez-nous-detail',
  FRUITS_ET_LEGUMES = 'fruits-et-legumes',
  LINKY = 'linky',
}

export enum RouteServicePath {
  RECETTES = '/service/recettes',
  RECETTES_DETAIL = '/service/recettes/:id',
  PROXIMITE = '/service/pres-de-chez-nous',
  PROXIMITE_DETAIL = '/service/pres-de-chez-nous/:id',
  FRUITS_ET_LEGUMES = '/service/fruits-et-legumes',
  LINKY = '/service/linky',
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
];

export default serviceRoutes;
