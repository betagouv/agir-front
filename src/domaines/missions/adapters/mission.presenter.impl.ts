import { MissionItem, DetailMission } from '../recupererDetailMission.usecase';
import { MissionPresenter } from '@/domaines/missions/ports/missionPresenter';
import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { RouteArticlePath } from '@/router/articles/routes';
import { RouteDefiPath } from '@/router/defis/routes';
import { RouteKycPath } from '@/router/kyc/routes';
import { RouteQuizPath } from '@/router/quiz/routes';
import { buildUrl } from '@/shell/buildUrl';
import { InteractionType } from '@/shell/interactionType';

export interface MissionBaseViewModel {
  id: string;
  url: string;
  estBloquee: boolean;
  aEteRealisee: boolean;
  picto: string;
  titre: string;
  pointAEteRecolte: boolean;
  points: number;
}

export interface MissionDefiViewModel extends MissionBaseViewModel {
  couleurBordure: string;
  link: {
    title: string;
    style: string;
    label: string;
  };
  badge?: {
    style: string;
    label: string;
  };
}

export interface MissionKycViewModel extends MissionBaseViewModel {
  progression: {
    etapeCourante: number;
    etapeTotal: number;
  };
}

export interface MissionQuizArticleViewModel extends MissionBaseViewModel {
  idDuContenu: string;
}
export interface MissionViewModel {
  titre: string;
  urlImage: string;
  estTerminee: boolean;
  estTerminable: boolean;
  kyc: MissionKycViewModel[];
  articleEtQuiz: MissionQuizArticleViewModel[];
  defis: MissionDefiViewModel[];
}

export class MissionPresenterImpl implements MissionPresenter {
  constructor(private readonly viewModel: (mission: MissionViewModel) => void) {}

  presente(mission: DetailMission): void {
    this.viewModel({
      titre: mission.titre,
      urlImage: mission.urlImage,
      estTerminee: mission.estTerminee,
      estTerminable: mission.estTerminable,
      kyc: [
        {
          id: mission.items.filter(item => item.type === InteractionType.KYC)[0].id,
          titre: '<strong>Quelques questions</strong> pour mieux vous connaître',
          progression: {
            etapeCourante: mission.progressionKyc.etapeCourante,
            etapeTotal: mission.progressionKyc.etapeTotal,
          },
          estBloquee: false,
          points: mission.items
            .filter(item => item.type === InteractionType.KYC)
            .reduce((sum, item) => sum + item.points, 0),
          aEteRealisee: mission.progressionKyc.etapeCourante === mission.progressionKyc.etapeTotal,
          url: `/thematique/${MenuThematiques.getThematiqueData(mission.univers as ClefThematiqueAPI).url}/mission/${mission.missionId}${RouteKycPath.KYC}`,
          picto: '/ic_mission_kyc.svg',
          pointAEteRecolte: mission.items.filter(item => item.type === InteractionType.KYC)[0].pointAEteRecolte,
        },
      ],
      articleEtQuiz: mission.items
        .filter(item => item.type === InteractionType.ARTICLE || item.type === InteractionType.QUIZ)
        .map(item =>
          this.mapToViewModel(
            item,
            MenuThematiques.getThematiqueData(mission.univers as ClefThematiqueAPI).url,
            mission.missionId,
          ),
        ),
      defis: mission.items
        .filter(item => item.type === InteractionType.DEFIS)
        .map(item =>
          this.mapToDefiViewModel(
            item,
            MenuThematiques.getThematiqueData(mission.univers as ClefThematiqueAPI).url,
            mission.missionId,
          ),
        ),
    });
  }

  private mapToViewModel(item: MissionItem, univers: string, thematique: string): MissionQuizArticleViewModel {
    return {
      id: item.id,
      idDuContenu: item.contentId,
      titre: item.titre,
      estBloquee: item.estBloquee,
      points: item.points,
      aEteRealisee: item.aEteRealisee,
      url: this.determineUrl(item, univers, thematique),
      picto: this.determinePicto(item),
      pointAEteRecolte: item.pointAEteRecolte,
    };
  }

  private mapToDefiViewModel(item: MissionItem, thematiqueLabelUrl: string, missionId: string): MissionDefiViewModel {
    return {
      id: item.id,
      titre: item.titre,
      estBloquee: item.estBloquee,
      points: item.points,
      aEteRealisee: item.aEteRealisee && !item.estEnCours,
      url: `/thematique/${thematiqueLabelUrl}/mission/${missionId}${RouteDefiPath.DEFI}${item.contentId}`,
      picto: this.determinePicto(item),
      pointAEteRecolte: item.pointAEteRecolte,
      link: this.determineLienDefi(item.estEnCours, item.titre),
      badge: this.determineBadgeDefi(item.estEnCours, item.estRecommande, item.aEteRealisee),
      couleurBordure: this.determineCouleurBordureDefi(item.estEnCours, item.estRecommande, item.aEteRealisee),
    };
  }

  private determineUrl(item: MissionItem, thematiqueLabelUrl: string, missionId: string) {
    switch (item.type) {
      case InteractionType.QUIZ:
        return `/thematique/${thematiqueLabelUrl}/mission/${missionId}${RouteQuizPath.QUIZ}${item.contentId}`;
      case InteractionType.ARTICLE:
        return `/thematique/${thematiqueLabelUrl}/mission/${missionId}${RouteArticlePath.ARTICLE}${buildUrl(item.titre)}/${item.contentId}`;
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

  private determineBadgeDefi(
    estEnCours: boolean,
    estRecommande: boolean,
    aEteRealise: boolean,
  ): MissionDefiViewModel['badge'] {
    if (estEnCours) {
      return {
        label: 'En cours !',
        style: 'background--green-light text--black',
      };
    } else if (estRecommande && !aEteRealise) {
      return {
        label: 'Recommandé',
        style: 'background--bleu-info-dark text--white',
      };
    } else if (aEteRealise) {
      return {
        label: 'Terminé !',
        style: 'background--vert--success text--white',
      };
    } else {
      return undefined;
    }
  }

  private determineCouleurBordureDefi(estEnCours: boolean, estRecommande: boolean, aEteRealise: boolean): string {
    if (estEnCours) return 'border--green-light';
    else if (estRecommande && !aEteRealise) return 'border--bleu-info-dark';
    else if (aEteRealise) return 'border--vert--success';
    else return '';
  }

  private determineLienDefi(estEnCours: boolean, titre: string): MissionDefiViewModel['link'] {
    if (estEnCours) {
      return {
        style: 'fr-btn--secondary',
        title: `Reprendre l'action : ${titre}`,
        label: "Reprendre l'action",
      };
    }

    return {
      style: '',
      title: `Aller à l'action : ${titre}`,
      label: "Aller à l'action",
    };
  }
}
