import { RecommandationsPersonnaliseesPresenter } from '@/domaines/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.presenter';
import { RecommandationPersonnalisee } from '@/domaines/recommandationsPersonnalisees/recupererRecommandationsPersonnalisees.usecase';
import { RouteArticlePath } from '@/router/articles/routes';
import { buildUrl } from '@/shell/buildUrl';

export interface ArticleRecommandeViewModel {
  titre: string;
  image: string;
  id: string;
  url: string;
}

export class RecommandationsPersonnaliseesArticlesPresenterImpl implements RecommandationsPersonnaliseesPresenter {
  constructor(private viewModel: (recommandationPersonnaliseeViewModels: ArticleRecommandeViewModel[]) => void) {}

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
