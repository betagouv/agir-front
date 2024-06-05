import { MissionItem, MissionThematique } from '../recupererMissionThematiqueUsecase';
import { MissionThematiquePresenter } from '@/domaines/thematiques/ports/missionThematique.presenter';
import { RouteArticlePath } from '@/router/articles/routes';
import { RouteDefiPath } from '@/router/defis/routes';
import { RouteKycPath } from '@/router/kyc/routes';
import { RouteQuizPath } from '@/router/quiz/routes';
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
  pointAEteRecolte: boolean;
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
          id: missionThematique.items.filter(item => item.type === InteractionType.KYC)[0].id,
          idDuContenu: '',
          titre: '<strong>Quelques questions</strong> pour mieux vous connaître',
          progression: {
            etapeCourante: missionThematique.progressionKyc.etapeCourante,
            etapeTotal: missionThematique.progressionKyc.etapeTotal,
          },
          estBloquee: false,
          points: 5,
          aEteRealisee: missionThematique.progressionKyc.etapeCourante === missionThematique.progressionKyc.etapeTotal,
          url: `${RouteKycPath.KYC}${missionThematique.univers}/${missionThematique.idThematique}`,
          hash: undefined,
          picto: '/ic_mission_kyc.svg',
          pointAEteRecolte: missionThematique.items.filter(item => item.type === InteractionType.KYC)[0]
            .pointAEteRecolte,
        },
      ],
      articleEtQuiz: missionThematique.items
        .filter(item => item.type === InteractionType.ARTICLE || item.type === InteractionType.QUIZ)
        .map(item => this.mapToViewModel(item, missionThematique.univers, missionThematique.idThematique)),
      defis: missionThematique.items
        .filter(item => item.type === InteractionType.DEFIS)
        .map(item => this.mapToViewModel(item, missionThematique.univers, missionThematique.idThematique)),
    });
  }

  private mapToViewModel(item: MissionItem, univers: string, thematique: string) {
    return {
      id: item.id,
      idDuContenu: item.contentId,
      titre: item.titre,
      progression: undefined,
      estBloquee: item.estBloquee,
      points: item.points,
      aEteRealisee: item.aEteRealisee,
      url: this.determineUrl(item, univers, thematique),
      hash: this.determineHash(item),
      picto: this.determinePicto(item),
      pointAEteRecolte: item.pointAEteRecolte,
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

  private determineUrl(item: MissionItem, univers: string, thematique: string) {
    switch (item.type) {
      case InteractionType.QUIZ:
        return `${RouteQuizPath.QUIZ}${univers}/${thematique}/${item.contentId}`;
      case InteractionType.ARTICLE:
        return `${RouteArticlePath.ARTICLE}${univers}/${thematique}/${buildUrl(item.titre)}/${item.contentId}`;
      case InteractionType.DEFIS:
        return `${RouteDefiPath.DEFI}${univers}/${thematique}/${item.contentId}`;
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
