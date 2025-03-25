import { ArticleRecommande } from '@/domaines/article/ports/article.repository';

export interface ArticlesRecommandesPresenter {
  presente(recommandationsPersonnalisees: ArticleRecommande[]): void;
}
