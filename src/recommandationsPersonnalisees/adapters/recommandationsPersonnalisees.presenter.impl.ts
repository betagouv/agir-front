import { RecommandationPersonnalisee } from '@/recommandationsPersonnalisees/recommandationsPersonnalisees.usecase';
import { InteractionType } from '@/shell/interactionType';
import { RecommandationsPersonnaliseesPresenter } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.presenter';
import { buildUrl } from '@/shell/buildUrl';
import { pascalCase } from '@/shell/pascalCase';
import { RouteAidesPath } from '@/router/aides/routes';
import { RouteCoachPath } from '@/router/coach/routes';
import { RouteArticlePath } from '@/router/articles/routes';
import { RouteDefiPath } from '@/router/defis/routes';

export interface RecommandationViewModel {
  titre: string;
  image: string;
  description: string;
  url: string;
  contentId: string;
  nombreDePointsAGagner: string;
  type: string;
  thematique: string;
}
export interface RecommandationPersonnaliseeViewModel {
  recommandationHighlight: RecommandationViewModel;
  recommandationsList: RecommandationViewModel[];
}

export class RecommandationsPersonnaliseesPresenterImpl implements RecommandationsPersonnaliseesPresenter {
  constructor(
    private viewModel: (recommandationPersonnaliseeViewModels: RecommandationPersonnaliseeViewModel) => void,
  ) {}
  presente(recommandationsPersonnalisees: RecommandationPersonnalisee[]): void {
    const recommandationHighlight = recommandationsPersonnalisees.find(
      recommandationPersonnalisee => recommandationPersonnalisee.type === InteractionType.ARTICLE,
    );

    if (recommandationHighlight) {
      this.viewModel({
        recommandationHighlight: {
          titre: recommandationHighlight.titre,
          image: recommandationHighlight.illustrationURL,
          description: recommandationHighlight.sousTitre,
          url: this.determineUrl(recommandationHighlight),
          contentId: recommandationHighlight.idDuContenu,
          nombreDePointsAGagner: recommandationHighlight.nombreDePointsAGagner,
          type: recommandationHighlight.type,
          thematique: recommandationHighlight.categorie,
        },
        recommandationsList: recommandationsPersonnalisees
          .filter(reco => reco !== recommandationHighlight)
          .map(recommandationPersonnalisee => {
            return {
              thematique: recommandationPersonnalisee.categorie,
              titre: recommandationPersonnalisee.titre,
              image: recommandationPersonnalisee.illustrationURL,
              url: this.determineUrl(recommandationPersonnalisee),
              contentId: recommandationPersonnalisee.idDuContenu,
              nombreDePointsAGagner: recommandationPersonnalisee.nombreDePointsAGagner,
              type:
                recommandationPersonnalisee.type === InteractionType.DEFIS
                  ? 'Défi'
                  : pascalCase(recommandationPersonnalisee.type),
              description: recommandationPersonnalisee.sousTitre,
            };
          })
          .slice(0, 3),
      });
    }
  }

  private determineUrl(recommandationPersonnalisee: RecommandationPersonnalisee) {
    switch (recommandationPersonnalisee.type) {
      case InteractionType.AIDE:
        return RouteAidesPath.VOS_AIDES;
      case InteractionType.QUIZ:
        return `${RouteCoachPath.COACH + RouteCoachPath.QUIZ}/${recommandationPersonnalisee.idDuContenu}`;
      case InteractionType.ARTICLE:
        return `${RouteArticlePath.ARTICLE}${buildUrl(recommandationPersonnalisee.titre)}/${recommandationPersonnalisee.idDuContenu}`;
      case InteractionType.KYC:
        return '';
      case InteractionType.SUIVIDUJOUR:
        return '/agir/suivi-du-jour';
      case InteractionType.DEFIS:
        return `${RouteDefiPath.DEFI + recommandationPersonnalisee.idDuContenu}`;
      default:
        return '';
    }
  }
}
