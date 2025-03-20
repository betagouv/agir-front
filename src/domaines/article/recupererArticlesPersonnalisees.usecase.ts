import { ArticleRepository } from '@/domaines/article/ports/article.repository';
import { ArticlesRecommandesPresenter } from '@/domaines/article/ports/articlesRecommandes.presenter';

export class RecupererArticlesPersonnaliseesUsecase {
  constructor(private articleRepository: ArticleRepository) {}

  async execute(idUtilisateur: string, nombreMax: number, presenter: ArticlesRecommandesPresenter): Promise<void> {
    const articles = await this.articleRepository.recupererArticlesPersonnalisees(idUtilisateur, nombreMax);
    presenter.presente(articles);
  }
}
