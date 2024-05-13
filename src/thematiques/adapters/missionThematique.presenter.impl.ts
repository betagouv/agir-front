import { MissionItem, MissionThematique } from '../recupererMissionThematiqueUsecase';
import { RouteAidesPath } from '@/router/aides/routes';
import { RouteArticlePath } from '@/router/articles/routes';
import { RouteCoachPath } from '@/router/coach/routes';
import { RouteKycPath } from '@/router/kyc/routes';
import { buildUrl } from '@/shell/buildUrl';
import { InteractionType } from '@/shell/interactionType';
import { MissionThematiquePresenter } from '@/thematiques/ports/missionThematique.presenter';

export interface MissionItemViewModel {
  idDuContenu: string;
  titre: string;
  progression: number;
  estBloquee: boolean;
  points: number;
  aEteRealisee: boolean;
  url: string;
  hash?: string;
  progession: {
    etapeCourante: number;
    etapeTotal: number;
  };
}
export interface MissionThematiqueViewModel {
  titre: string;
  urlImage: string;
  kyc: MissionItemViewModel[];
  articleEtQuiz: MissionItemViewModel[];
  defis: MissionItemViewModel[];
}

export class MissionThematiquePresenterImpl implements MissionThematiquePresenter {
  constructor(private readonly viewModel: (mission: MissionThematiqueViewModel) => void) {}
  present(missionThematique: MissionThematique): void {
    this.viewModel({
      titre: missionThematique.titre,
      urlImage: missionThematique.urlImage,
      kyc: missionThematique.items.filter(item=>item.type === InteractionType.KYC).map(item => this.mapToViewModel(item)),
      articleEtQuiz: missionThematique.items.filter(item=>item.type === InteractionType.ARTICLE || item.type === InteractionType.QUIZ).map(item => this.mapToViewModel(item)),
      defis: missionThematique.items.filter(item=>item.type === InteractionType.DEFIS).map(item => this.mapToViewModel(item)),
    });
  }

  private mapToViewModel(item: MissionItem) {
    return {
      idDuContenu: item.contentId,
      titre: item.titre,
      progression: item.progression,
      estBloquee: item.estBloquee,
      points: item.points,
      aEteRealisee: item.aEteRealisee,
      url: this.determineUrl(item),
      hash: this.determineHash(item),
      progession: {
        etapeCourante: 1,
        etapeTotal: 2,
      },
    };
  }

  private determineHash(item: MissionItem) {
    switch (item.type) {
      case InteractionType.SERVICE:
        return `#${item.contentId}`;
      default:
        return undefined;
    }
  }

  private determineUrl(item: MissionItem) {
    switch (item.type) {
      case InteractionType.AIDE:
        return RouteAidesPath.VOS_AIDES;
      case InteractionType.QUIZ:
        return `${RouteCoachPath.COACH + RouteCoachPath.QUIZ}/${item.contentId}`;
      case InteractionType.ARTICLE:
        return `${RouteArticlePath.ARTICLE}${buildUrl(item.titre)}/${item.contentId}`;
      case InteractionType.KYC:
        return `${RouteKycPath.KYC}${item.contentId}`;
      case InteractionType.SERVICE:
        return `${RouteCoachPath.COACH}${RouteCoachPath.SERVICES}`;
      default:
        return '';
    }
  }
}
