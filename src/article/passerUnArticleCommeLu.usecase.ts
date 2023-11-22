import { ArticleRepository } from '@/article/ports/article.repository';

export class PasserUnArticleCommeLuUsecase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(interactionId: string, utilisateurId: string): Promise<void> {
    await this.articleRepository.marquerCommeLu(interactionId, utilisateurId);
  }
}
