import { Article } from '@/article/recupererArticle.usecase';

export interface ArticleRepository {
  recuperer(articleId: string): Promise<Article>;
  marquerCommeLu(interactionId: string, utilisateurId: string): Promise<void>;
}
