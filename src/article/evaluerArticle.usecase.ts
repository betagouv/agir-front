import { ArticleRepository } from '@/article/ports/article.repository';

export class EvaluerArticleUsecase {
  constructor(private articleRepository: ArticleRepository) {
    this.articleRepository = articleRepository;
  }
  execute(articleId: string, utilisateurId: string, note: 1 | 2 | 3 | 4) {
    return this.articleRepository.noterArticle(articleId, utilisateurId, note);
  }
}
