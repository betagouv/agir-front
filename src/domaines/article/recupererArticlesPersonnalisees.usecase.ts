import { ArticleRepository } from '@/domaines/article/ports/article.repository';
import { ArticlesRecommandesPresenter } from '@/domaines/article/ports/articlesRecommandes.presenter';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export class RecupererArticlesPersonnaliseesUsecase {
  constructor(private articleRepository: ArticleRepository) {}

  async execute(
    idUtilisateur: string,
    nombreMax: number,
    presenter: ArticlesRecommandesPresenter,
    thematique?: ClefThematiqueAPI,
  ): Promise<void> {
    const articles = await this.articleRepository.recupererArticlesPersonnalisees(idUtilisateur, nombreMax, thematique);
    presenter.presente(articles);
  }
}
