import { ArticleRepository } from '@/article/ports/article.repository';

export interface Article {
  texte: string;
  titre: string;
  sousTitre: string;
}
export class RecupererArticleUsecase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(articleId: string): Promise<Article> {
    return this.articleRepository.recuperer(articleId);
  }
}
