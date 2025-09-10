import { RouteRecordRaw } from 'vue-router';

const PagePersonnalisation = () => import('@/components/pages/PagePersonnalisation.vue');
const PageDictionnaireTags = () => import('@/components/pages/PageDictionnaireTags.vue');

export enum RoutePersonnalisationName {
  PERSONNALISATION = 'personnalisation',
  MAPPING_TAG_KYC = 'mapping_tag_kyc',
}

export enum RoutePersonnalisationPath {
  PERSONNALISATION = '/personnalisation/',
  MAPPING_TAG_KYC = '/dictionnaire_tags/',
}
const personnalisationRoutes: RouteRecordRaw[] = [];

personnalisationRoutes.push({
  path: RoutePersonnalisationPath.MAPPING_TAG_KYC,
  name: RoutePersonnalisationName.MAPPING_TAG_KYC,
  component: PageDictionnaireTags,
  meta: {
    title: 'Dictionnaire des tags',
  },
});

personnalisationRoutes.push({
  path: RoutePersonnalisationPath.PERSONNALISATION,
  name: RoutePersonnalisationName.PERSONNALISATION,
  component: PagePersonnalisation,
  meta: {
    title: 'Tester la personnalisation',
  },
});

export default personnalisationRoutes;
