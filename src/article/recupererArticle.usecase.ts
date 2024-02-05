import { ArticleRepository } from '@/article/ports/article.repository';

export interface Article {
  texte: string;
  titre: string;
  sousTitre: string;
  id: string;
  estEnFavori: boolean;
}
export class RecupererArticleUsecase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(utilisateurId: string, articleId: string): Promise<Article> {
    return this.articleRepository.recuperer(utilisateurId, articleId);
  }
}
