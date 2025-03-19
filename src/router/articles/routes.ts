import { RouteRecordRaw } from 'vue-router';

const PageArticle = () => import('@/components/pages/PageArticle.vue');
const PagePrevisualisationArticle = () => import('@/components/pages/PagePrevisualisationArticle.vue');

export enum RouteArticlePath {
  ARTICLE = '/article/',
  ARTICLE_CONSULTATION = '/article/:titre/:id',
  ARTICLE_PREVISUALISATION = '/articles/previsualisation/:id',
}

export enum RouteArticleName {
  ARTICLE_CONSULTATION = 'article-consultation',
  ARTICLE_PREVISUALISATION = 'article-previsualisation',
}

const articlesRoutes: RouteRecordRaw[] = [
  {
    path: RouteArticlePath.ARTICLE_CONSULTATION,
    name: RouteArticleName.ARTICLE_CONSULTATION,
    component: PageArticle,
    meta: { estPublique: true },
  },
  {
    path: RouteArticlePath.ARTICLE_PREVISUALISATION,
    name: RouteArticleName.ARTICLE_PREVISUALISATION,
    component: PagePrevisualisationArticle,
    meta: { estPublique: true },
  },
];

export default articlesRoutes;
