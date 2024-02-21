import { ArticleRepository } from '@/article/ports/article.repository';

export class RetirerDesFavorisUsecase {
  constructor(private articleRepository: ArticleRepository) {}

  async execute(idArticle: string, idUtilisateur: string) {
    await this.articleRepository.retirerDesFavoris(idArticle, idUtilisateur);
  }
}
