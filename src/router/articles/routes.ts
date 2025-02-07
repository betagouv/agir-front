import { RouteRecordRaw } from 'vue-router';
import { utilisateurStore } from '@/store/utilisateur';

const PageArticle = () => import('@/components/pages/PageArticle.vue');
const PagePrevisualisationArticle = () => import('@/components/pages/PageArticleHorsConnexion.vue');

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

const resolveArticleComponent = async () => {
  const estConnecte = utilisateurStore().utilisateur.id.length > 0;
  return estConnecte ? PageArticle() : PagePrevisualisationArticle();
};

const articlesRoutes: RouteRecordRaw[] = [
  {
    path: RouteArticlePath.ARTICLE_PAR_TITRE_ET_ID,
    name: RouteArticleName.ARTICLE_PAR_TITRE_ET_ID,
    component: resolveArticleComponent,
    meta: { estPublique: true },
  },
  {
    path: RouteArticlePath.ARTICLE_PAR_ID,
    name: RouteArticleName.ARTICLE_PAR_ID,
    component: resolveArticleComponent,
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
