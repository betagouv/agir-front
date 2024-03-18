import { RecommandationPersonnalisee } from '@/recommandationsPersonnalisees/recommandationsPersonnalisees.usecase';
import { InteractionType } from '@/shell/interactionType';
import { RecommandationsPersonnaliseesPresenter } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.presenter';
import { buildUrl } from '@/shell/buildUrl';
import { RouteAidesPath } from '@/router/aides/routes';
import { RouteCoachPath } from '@/router/coach/routes';
import { RouteArticlePath } from '@/router/articles/routes';
import { RouteDefiPath } from '@/router/defis/routes';

interface TagViewModel {
  libelle: string;
  style: string;
}

interface BoutonViewModel {
  libelle: string;
  style: string;
  url: string;
}

export interface RecommandationViewModel {
  titre: string;
  image: string;
  description: string;
  bouton: BoutonViewModel;
  contentId: string;
  nombreDePointsAGagner: string;
  type: TagViewModel;
  thematique: string;
}
export interface RecommandationPersonnaliseeViewModel {
  recommandationsList: RecommandationViewModel[];
}

export class RecommandationsPersonnaliseesPresenterImpl implements RecommandationsPersonnaliseesPresenter {
  constructor(
    private viewModel: (recommandationPersonnaliseeViewModels: RecommandationPersonnaliseeViewModel) => void,
  ) {}
  presente(recommandationsPersonnalisees: RecommandationPersonnalisee[]): void {
    this.viewModel({
      recommandationsList: recommandationsPersonnalisees
        .map(recommandationPersonnalisee => {
          return {
            thematique: recommandationPersonnalisee.categorie,
            titre: recommandationPersonnalisee.titre,
            image: recommandationPersonnalisee.illustrationURL,
            bouton: this.determineBouton(recommandationPersonnalisee),
            contentId: recommandationPersonnalisee.idDuContenu,
            nombreDePointsAGagner: recommandationPersonnalisee.nombreDePointsAGagner,
            type: this.determineTypeTag(recommandationPersonnalisee.type),
            description: recommandationPersonnalisee.sousTitre,
          };
        })
        .slice(0, 6),
    });
  }

  private determineBouton(recommandationPersonnalisee: RecommandationPersonnalisee): BoutonViewModel {
    switch (recommandationPersonnalisee.type) {
      case InteractionType.AIDE:
        return {
          libelle: "Simuler l'aide",
          url: RouteAidesPath.VOS_AIDES,
          style: 'fr-btn--secondary',
        };
      case InteractionType.QUIZ:
        return {
          libelle: 'Répondre au quiz',
          url: `${RouteCoachPath.COACH + RouteCoachPath.QUIZ}/${recommandationPersonnalisee.idDuContenu}`,
          style: 'fr-btn--secondary fr-btn--icon-left fr-icon-question-line',
        };
      case InteractionType.ARTICLE:
        return {
          libelle: "Lire l'article",
          url: `${RouteArticlePath.ARTICLE}${buildUrl(recommandationPersonnalisee.titre)}/${recommandationPersonnalisee.idDuContenu}`,
          style: 'fr-btn--secondary fr-btn--icon-left fr-icon-newspaper-line',
        };
      case InteractionType.DEFIS:
        return {
          libelle: 'Relever le défi',
          url: `${RouteDefiPath.DEFI + recommandationPersonnalisee.idDuContenu}`,
          style: 'fr-btn--icon-left fr-icon-check-line',
        };
      default:
        return {
          libelle: '',
          url: '',
          style: '',
        };
    }
  }

  private determineTypeTag(type: InteractionType): TagViewModel {
    switch (type) {
      case InteractionType.AIDE:
        return {
          libelle: 'Aide',
          style: 'background--yellow',
        };
      case InteractionType.QUIZ:
        return {
          libelle: 'Quiz',
          style: 'background--vert--bourgeon',
        };
      case InteractionType.ARTICLE:
        return {
          libelle: 'Article',
          style: 'background--caramel',
        };
      case InteractionType.DEFIS:
        return {
          libelle: 'Action',
          style: 'background-bleu text--white',
        };
      default:
        return {
          libelle: '',
          style: '',
        };
    }
  }
}
