import { MissionItem, MissionThematique } from '../recupererMissionThematiqueUsecase';
import { MissionThematiquePresenter } from '@/domaines/thematiques/ports/missionThematique.presenter';
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
  link?: {
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
export interface MissionThematiqueViewModel {
  titre: string;
  urlImage: string;
  estTerminee: boolean;
  estTerminable: boolean;
  kyc: MissionKycViewModel[];
  articleEtQuiz: MissionQuizArticleViewModel[];
  defis: MissionDefiViewModel[];
}

export class MissionThematiquePresenterImpl implements MissionThematiquePresenter {
  constructor(private readonly viewModel: (mission: MissionThematiqueViewModel) => void) {}

  present(missionThematique: MissionThematique): void {
    this.viewModel({
      titre: missionThematique.titre,
      urlImage: missionThematique.urlImage,
      estTerminee: missionThematique.estTerminee,
      estTerminable: missionThematique.estTerminable,
      kyc: [
        {
          id: missionThematique.items.filter(item => item.type === InteractionType.KYC)[0].id,
          titre: '<strong>Quelques questions</strong> pour mieux vous connaître',
          progression: {
            etapeCourante: missionThematique.progressionKyc.etapeCourante,
            etapeTotal: missionThematique.progressionKyc.etapeTotal,
          },
          estBloquee: false,
          points: missionThematique.items
            .filter(item => item.type === InteractionType.KYC)
            .reduce((sum, item) => sum + item.points, 0),
          aEteRealisee: missionThematique.progressionKyc.etapeCourante === missionThematique.progressionKyc.etapeTotal,
          url: `${RouteKycPath.KYC}${missionThematique.univers}/${missionThematique.idThematique}`,
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
        .map(item => this.mapToDefiViewModel(item, missionThematique.univers, missionThematique.idThematique)),
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

  private mapToDefiViewModel(item: MissionItem, univers: string, thematique: string): MissionDefiViewModel {
    return {
      id: item.id,
      titre: item.titre,
      estBloquee: item.estBloquee,
      points: item.points,
      aEteRealisee: item.aEteRealisee,
      url: `${RouteDefiPath.DEFI}${univers}/${thematique}/${item.contentId}`,
      picto: this.determinePicto(item),
      pointAEteRecolte: item.pointAEteRecolte,
      link: !item.aEteRealisee ? this.determineLienDefi(item.estEnCours, item.titre) : undefined,
      badge: this.determineBadgeDefi(item.estEnCours, item.estRecommande, item.aEteRealisee),
      couleurBordure: this.determineCouleurBordureDefi(item.estEnCours, item.estRecommande, item.aEteRealisee),
    };
  }

  private determineUrl(item: MissionItem, univers: string, thematique: string) {
    switch (item.type) {
      case InteractionType.QUIZ:
        return `${RouteQuizPath.QUIZ}${univers}/${thematique}/${item.contentId}`;
      case InteractionType.ARTICLE:
        return `${RouteArticlePath.ARTICLE}${univers}/${thematique}/${buildUrl(item.titre)}/${item.contentId}`;
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
    }

    if (estRecommande && !aEteRealise) {
      return {
        label: 'Recommandé',
        style: 'background--bleu-info-dark text--white',
      };
    }
  }

  private determineCouleurBordureDefi(estEnCours: boolean, estRecommande: boolean, aEteRealise: boolean): string {
    if (estEnCours) return 'border--green-light';
    if (estRecommande && !aEteRealise) return 'border--bleu-info-dark';
    return '';
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
