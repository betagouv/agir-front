import { ArticleRepository } from '@/domaines/article/ports/article.repository';

export class AjouterAuxFavorisUsecase {
  constructor(private articleRepository: ArticleRepository) {}

  async execute(idArticle: string, idUtilisateur: string) {
    await this.articleRepository.ajouterAuxFavoris(idArticle, idUtilisateur);
  }
}
