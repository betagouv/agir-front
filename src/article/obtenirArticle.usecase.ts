import { Article, ArticleRepository } from "./ports/article.repository";

export class ObtenirArticleUsecase {
  private articleRepository: ArticleRepository;

  constructor(articleRepository: ArticleRepository) {
    this.articleRepository = articleRepository;
  }

  async execute(idArticle: string): Promise<Article | null> {
    const article = await this.articleRepository.recupererParId(idArticle);

    return article;
  }
}
