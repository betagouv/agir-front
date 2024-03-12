const PageArticle = () => import('@/components/pages/PageArticle.vue');
const PagePrevisualisationArticle = () => import('@/components/pages/PagePrevisualisationArticle.vue');
import { RouteRecordRaw } from 'vue-router';

export enum RouteArticlePath {
  ARTICLE = '/article/',
  ARTICLE_TITRE = ':titre',
  ARTICLE_ID = '::id',
  ARTICLE_PREVISUALISATION = 'previsualisation/:id',
}

enum RouteArticleName {
  ARTICLE = 'article',
}

const articlesRoutes: RouteRecordRaw[] = [
  {
    path: RouteArticlePath.ARTICLE,
    name: RouteArticleName.ARTICLE,
    children: [
      {
        path: RouteArticlePath.ARTICLE_TITRE,
        component: PageArticle,
        meta: { estPublique: false },
        children: [
          {
            path: RouteArticlePath.ARTICLE_ID,
            component: PageArticle,
            meta: { estPublique: false },
          },
        ],
      },

      {
        path: RouteArticlePath.ARTICLE_PREVISUALISATION,
        component: PagePrevisualisationArticle,
        meta: { estPublique: true },
      },
    ],
  },
];

export default articlesRoutes;
