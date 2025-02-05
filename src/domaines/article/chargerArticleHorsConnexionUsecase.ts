import { ArticleRepository } from '@/domaines/article/ports/article.repository';
import { Article } from '@/domaines/article/recupererArticle.usecase';

export class ChargerArticleHorsConnexionUsecase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(articleId: string): Promise<Article> {
    return this.articleRepository.recupererHorsConnexion(articleId);
  }
}
