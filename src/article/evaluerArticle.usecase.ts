import { ArticleRepository } from '@/article/ports/article.repository';

export class EvaluerArticleUsecase {
  constructor(private articleRepository: ArticleRepository) {
    this.articleRepository = articleRepository;
  }
  execute(interactionId: string, utilisateurId: string, note: 1 | 2 | 3 | 4) {
    return this.articleRepository.noterArticle(interactionId, utilisateurId, note);
  }
}
