import { Article } from '@/article/recupererArticle.usecase';

export interface ArticleRepository {
  recuperer(utilisateurId: string, articleId: string): Promise<Article>;
  previsualiser(articleId: string): Promise<Article>;
  marquerCommeLu(articleId: string, utilisateurId: string): Promise<void>;
  noterArticle(articleId: string, utilisateurId: string, note: 1 | 2 | 3 | 4): Promise<void>;
  ajouterAuxFavoris(articleId: string, utilisateurId: string): Promise<void>;
  retirerDesFavoris(articleId: string, utilisateurId: string): Promise<void>;
}
