import { ArticlesRecommandesPresenter } from '@/domaines/article/ports/articlesRecommandes.presenter';
import { RecommandationPersonnalisee } from '@/domaines/recommandationsPersonnalisees/recupererRecommandationsPersonnalisees.usecase';
import { RouteArticlePath } from '@/router/articles/routes';
import { buildUrl } from '@/shell/buildUrl';

export interface ArticleRecommandeViewModel {
  titre: string;
  image: string;
  id: string;
  url: string;
}

export class ArticlesRecommandesPresenterImpl implements ArticlesRecommandesPresenter {
  constructor(private viewModel: (articleRecommandeViewModels: ArticleRecommandeViewModel[]) => void) {}

  presente(recommandationsPersonnalisees: RecommandationPersonnalisee[]): void {
    this.viewModel(
      recommandationsPersonnalisees.map(recommandationPersonnalisee => {
        return {
          titre: recommandationPersonnalisee.titre,
          image: recommandationPersonnalisee.illustrationURL,
          id: recommandationPersonnalisee.idDuContenu,
          url: `${RouteArticlePath.ARTICLE}${buildUrl(recommandationPersonnalisee.titre)}/${recommandationPersonnalisee.idDuContenu}`,
        };
      }),
    );
  }
}
