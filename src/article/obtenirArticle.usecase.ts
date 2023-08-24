import { Article, ArticleRepository } from "./ports/article.repository";

export class ObtenirArticleUsecase {
  private articleRepository: ArticleRepository;

  constructor(articleRepository: ArticleRepository) {
    this.articleRepository = articleRepository;
  }

  async execute(idArticle: number): Promise<Article> {
    const article = await this.articleRepository.recupererParId(idArticle);
    return article;
  }
}
