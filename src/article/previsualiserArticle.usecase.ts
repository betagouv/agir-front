import { Article } from '@/article/recupererArticle.usecase';
import { ArticleRepository } from '@/article/ports/article.repository';

export class PrevisualiserArticleUsecase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(articleId: string): Promise<Article> {
    return this.articleRepository.previsualiser(articleId);
  }
}
