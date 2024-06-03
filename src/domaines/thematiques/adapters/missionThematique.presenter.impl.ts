import { MissionItem, MissionThematique } from '../recupererMissionThematiqueUsecase';
import { MissionThematiquePresenter } from '@/domaines/thematiques/ports/missionThematique.presenter';
import { RouteArticlePath } from '@/router/articles/routes';
import { RouteCoachPath } from '@/router/coach/routes';
import { RouteDefiPath } from '@/router/defis/routes';
import { RouteKycPath } from '@/router/kyc/routes';
import { buildUrl } from '@/shell/buildUrl';
import { InteractionType } from '@/shell/interactionType';

export interface MissionItemViewModel {
  id: string;
  idDuContenu: string;
  titre: string;
  estBloquee: boolean;
  points: number;
  aEteRealisee: boolean;
  url: string;
  hash?: string;
  picto: string;
  progression?: {
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
  bonusMission: { phrase: string; picto: string };
}

export class MissionThematiquePresenterImpl implements MissionThematiquePresenter {
  constructor(private readonly viewModel: (mission: MissionThematiqueViewModel) => void) {}
  present(missionThematique: MissionThematique): void {
    this.viewModel({
      titre: missionThematique.titre,
      urlImage: missionThematique.urlImage,
      bonusMission: missionThematique.estTerminee
        ? { phrase: 'Bravo ! Vous avez accompli l’ensemble des missions.', picto: 'fr-icon-trophy-fill' }
        : { phrase: 'Bonus de fin de mission', picto: 'fr-icon-gift-fill' },
      kyc: [
        {
          id: '',
          idDuContenu: '',
          titre: '<strong>Quelques questions</strong> pour mieux vous connaître',
          progression: {
            etapeCourante: missionThematique.progressionKyc.etapeCourante,
            etapeTotal: missionThematique.progressionKyc.etapeTotal,
          },
          estBloquee: false,
          points: 5,
          aEteRealisee: missionThematique.progressionKyc.etapeCourante === missionThematique.progressionKyc.etapeTotal,
          url: `/thematique/${missionThematique.idThematique}/mieux-vous-connaitre/`,
          hash: undefined,
          picto: '/ic_mission_kyc.svg',
        },
      ],
      articleEtQuiz: missionThematique.items
        .filter(item => item.type === InteractionType.ARTICLE || item.type === InteractionType.QUIZ)
        .map(item => this.mapToViewModel(item)),
      defis: missionThematique.items
        .filter(item => item.type === InteractionType.DEFIS)
        .map(item => this.mapToViewModel(item)),
    });
  }

  private mapToViewModel(item: MissionItem) {
    return {
      id: item.id,
      idDuContenu: item.contentId,
      titre: item.titre,
      progression: undefined,
      estBloquee: item.estBloquee,
      points: item.points,
      aEteRealisee: item.aEteRealisee,
      url: this.determineUrl(item),
      hash: this.determineHash(item),
      picto: this.determinePicto(item),
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
      case InteractionType.QUIZ:
        return `${RouteCoachPath.COACH + RouteCoachPath.QUIZ}/${item.contentId}`;
      case InteractionType.ARTICLE:
        return `${RouteArticlePath.ARTICLE}${buildUrl(item.titre)}/${item.contentId}`;
      case InteractionType.KYC:
        return `${RouteKycPath.KYC}${item.contentId}`;
      case InteractionType.DEFIS:
        return `${RouteDefiPath.DEFI}${item.contentId}`;
      default:
        return '';
    }
  }

  private determinePicto(item: MissionItem) {
    switch (item.type) {
      case InteractionType.DEFIS:
        return '/ic_mission_defi.svg';
      case InteractionType.ARTICLE:
      case InteractionType.QUIZ:
        return '/ic_mission_article.svg';
      case InteractionType.KYC:
        return '/ic_mission_kyc.svg';
      default:
        return '';
    }
  }
}
