import { RouteRecordRaw } from 'vue-router';
import PageUnivers from '@/components/pages/PageUnivers.vue';

export enum RouteUniversName {
  UNIVERS = 'univers',
}

export enum RouteUniversPath {
  UNIVERS = 'univers',
}
const universRoutes: RouteRecordRaw[] = [
  {
    path: `/${RouteUniversPath.UNIVERS}/:id`,
    name: RouteUniversName.UNIVERS,
    component: PageUnivers,
    meta: {
      title: 'Univers',
    },
  },
];

export default universRoutes;
