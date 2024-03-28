import { ArticleRepository } from '@/article/ports/article.repository';
import { Article } from '@/article/recupererArticle.usecase';

export class PrevisualiserArticleUsecase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(articleId: string): Promise<Article> {
    return this.articleRepository.previsualiser(articleId);
  }
}
