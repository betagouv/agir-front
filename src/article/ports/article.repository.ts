import { Article } from '@/article/recupererArticle.usecase';

export interface ArticleRepository {
  recuperer(articleId: string): Promise<Article>;
  marquerCommeLu(interactionId: string, utilisateurId: string): Promise<void>;
  noterArticle(articleId: string, utilisateurId: string, note: 1 | 2 | 3 | 4): Promise<void>;
}
