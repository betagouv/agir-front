import { RouteRecordRaw } from 'vue-router';

const PagePersonnalisation = () => import('@/components/pages/PagePersonnalisation.vue');
const PageMappingTagKYC = () => import('@/components/pages/PageMappingTagKYC.vue');

export enum RoutePersonnalisationName {
  PERSONNALISATION = 'personnalisation',
  MAPPING_TAG_KYC = 'mapping_tag_kyc',
}

export enum RoutePersonnalisationPath {
  PERSONNALISATION = '/personnalisation/',
  MAPPING_TAG_KYC = '/mapping_tag_kyc/',
}
const personnalisationRoutes: RouteRecordRaw[] = [];

if (import.meta.env.VITE_ENV === 'dev') {
  personnalisationRoutes.push({
    path: RoutePersonnalisationPath.MAPPING_TAG_KYC,
    name: RoutePersonnalisationName.MAPPING_TAG_KYC,
    component: PageMappingTagKYC,
    meta: {
      title: 'Mapping TAG/KYC',
    },
  });
}

if (import.meta.env.VITE_ENV === 'dev') {
  personnalisationRoutes.push({
    path: RoutePersonnalisationPath.PERSONNALISATION,
    name: RoutePersonnalisationName.PERSONNALISATION,
    component: PagePersonnalisation,
    meta: {
      title: 'Tester la personnalisation',
    },
  });
}

export default personnalisationRoutes;
