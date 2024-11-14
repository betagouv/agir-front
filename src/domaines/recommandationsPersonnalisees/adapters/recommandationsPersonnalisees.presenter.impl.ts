import { RecommandationsPersonnaliseesPresenter } from '@/domaines/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.presenter';
import { RecommandationPersonnalisee } from '@/domaines/recommandationsPersonnalisees/recupererRecommandationsPersonnalisees.usecase';
import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { TagStyle, TagThematique } from '@/domaines/thematiques/TagThematique';
import { RouteAidesPath } from '@/router/aides/routes';
import { RouteArticlePath } from '@/router/articles/routes';
import { RouteDefiPath } from '@/router/defis/routes';
import { RouteKycPath } from '@/router/kyc/routes';
import { RouteQuizPath } from '@/router/quiz/routes';
import { buildUrl } from '@/shell/buildUrl';
import { InteractionType } from '@/shell/interactionType';

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
  bouton: BoutonViewModel;
  idDuContenu: string;
  nombreDePointsAGagner: string;
  type: TagViewModel;
  thematiqueTag: { label: string; style: TagStyle };
  points: number;
}
export interface RecommandationPersonnaliseeViewModel {
  defis: RecommandationViewModel[];
  autresRecommandations: RecommandationViewModel[];
}

export class RecommandationsPersonnaliseesPresenterImpl implements RecommandationsPersonnaliseesPresenter {
  constructor(
    private viewModel: (recommandationPersonnaliseeViewModels: RecommandationPersonnaliseeViewModel) => void,
  ) {}
  presente(recommandationsPersonnalisees: RecommandationPersonnalisee[]): void {
    const mapRecommandation = (recommandationPersonnalisee: RecommandationPersonnalisee) => {
      return {
        thematiqueTag: {
          label: MenuThematiques.getThematiqueData(recommandationPersonnalisee.clefThematiqueAPI).labelDansLeMenu,
          style: TagThematique.getTagThematiqueUtilitaire(recommandationPersonnalisee.clefThematiqueAPI),
        },
        titre: recommandationPersonnalisee.titre,
        image: this.determineImage(recommandationPersonnalisee),
        bouton: this.determineBouton(recommandationPersonnalisee),
        idDuContenu: recommandationPersonnalisee.idDuContenu,
        nombreDePointsAGagner: recommandationPersonnalisee.nombreDePointsAGagner,
        type: this.determineTypeTag(recommandationPersonnalisee.type),
        points: recommandationPersonnalisee.points,
      };
    };

    this.viewModel({
      autresRecommandations: recommandationsPersonnalisees
        .filter(recommandationPersonnalisee => recommandationPersonnalisee.type !== 'defi')
        .map(mapRecommandation),
      defis: recommandationsPersonnalisees
        .filter(recommandationPersonnalisee => recommandationPersonnalisee.type === 'defi')
        .map(mapRecommandation),
    });
  }

  private determineBouton(recommandationPersonnalisee: RecommandationPersonnalisee): BoutonViewModel {
    switch (recommandationPersonnalisee.type) {
      case InteractionType.AIDE:
        return {
          libelle: "Simuler l'aide",
          url: RouteAidesPath.AIDES,
          style: 'fr-btn--secondary',
        };
      case InteractionType.QUIZ:
        return {
          libelle: 'Répondre au quiz',
          url: `${RouteQuizPath.QUIZ}${recommandationPersonnalisee.idDuContenu}`,
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
          libelle: recommandationPersonnalisee.joursRestants ? 'Faire le suivi' : 'Relever le défi',
          url: `${RouteDefiPath.DEFI + recommandationPersonnalisee.idDuContenu}`,
          style: 'fr-btn--icon-left fr-icon-check-line',
        };
      case InteractionType.KYC: {
        return {
          libelle: 'Répondre à la question',
          url: `${RouteKycPath.KYC + recommandationPersonnalisee.idDuContenu}`,
          style: 'fr-btn--icon-left fr-icon-arrow-right-line',
        };
      }
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
          style: 'background--vert-bourgeon',
        };
      case InteractionType.ARTICLE:
        return {
          libelle: 'Article',
          style: 'background--caramel',
        };
      case InteractionType.DEFIS:
        return {
          libelle: 'Action',
          style: 'background--bleu-ecume-hover',
        };
      case InteractionType.KYC:
        return {
          libelle: 'Mieux vous connaître',
          style: 'background--pink',
        };
      default:
        return {
          libelle: '',
          style: '',
        };
    }
  }

  private determineImage(recommandationPersonnalisee: RecommandationPersonnalisee) {
    switch (recommandationPersonnalisee.type) {
      case InteractionType.DEFIS:
        return '/reco_defi.webp';
      case InteractionType.KYC:
        return '/ic_kyc.svg';
      default:
        return recommandationPersonnalisee.illustrationURL;
    }
  }
}
