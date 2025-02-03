const PageArticle = () => import('@/components/pages/PageArticle.vue');
const PagePrevisualisationArticle = () => import('@/components/pages/PagePrevisualisationArticle.vue');
import { RouteRecordRaw } from 'vue-router';

export enum RouteArticlePath {
  ARTICLE = '/article/',
  ARTICLE_PAR_TITRE_ET_ID = '/article/:titre/:id',
  ARTICLE_PAR_ID = '/article/:id',
  ARTICLE_PREVISUALISATION = '/article/previsualisation/:id',
}

export enum RouteArticleName {
  ARTICLE_PAR_TITRE_ET_ID = 'article-par-titre-id',
  ARTICLE_PAR_ID = 'article-par-id',
  ARTICLE_PREVISUALISATION = 'article-previsualisation',
}

const articlesRoutes: RouteRecordRaw[] = [
  {
    path: RouteArticlePath.ARTICLE_PAR_TITRE_ET_ID,
    name: RouteArticleName.ARTICLE_PAR_TITRE_ET_ID,
    component: PageArticle,
    meta: { estPublique: false },
  },
  {
    path: RouteArticlePath.ARTICLE_PAR_ID,
    name: RouteArticleName.ARTICLE_PAR_ID,
    component: PageArticle,
    meta: { estPublique: false },
  },
  {
    path: RouteArticlePath.ARTICLE_PREVISUALISATION,
    name: RouteArticleName.ARTICLE_PREVISUALISATION,
    component: PagePrevisualisationArticle,
    meta: { estPublique: true },
  },
];

export default articlesRoutes;
