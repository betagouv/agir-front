import { MissionItem, DetailMission } from '../recupererDetailMission.usecase';
import { MissionPresenter } from '@/domaines/missions/ports/missionPresenter';
import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { TagStyle, TagThematique } from '@/domaines/thematiques/TagThematique';
import { RouteArticlePath } from '@/router/articles/routes';
import { RouteDefiPath } from '@/router/defis/routes';
import { RouteQuizPath } from '@/router/quiz/routes';
import { buildUrl } from '@/shell/buildUrl';
import { InteractionType } from '@/shell/interactionType';

export interface MissionBaseViewModel {
  id: string;
  aEteRealisee: boolean;
}

export interface MissionDefiViewModel extends MissionBaseViewModel {
  titre: string;
  couleurBordure: string;
  url: string;
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
  type: 'quiz' | 'article';
}
export interface MissionViewModel {
  titre: string;
  urlImage: string;
  estTerminee: boolean;
  estTerminable: boolean;
  intro: string;
  kyc: MissionKycViewModel[];
  articleEtQuiz: MissionQuizArticleViewModel[];
  defis: MissionDefiViewModel[];
  tag: {
    label: string;
    style: TagStyle;
  };
  nombreEtapesMission: number;
}

export class MissionPresenterImpl implements MissionPresenter {
  constructor(private readonly viewModel: (mission: MissionViewModel) => void) {}

  presente(mission: DetailMission): void {
    this.viewModel({
      titre: mission.titre,
      urlImage: mission.urlImage,
      estTerminee: mission.estTerminee,
      estTerminable: mission.estTerminable,
      intro: mission.intro,
      tag: {
        label: MenuThematiques.getThematiqueData(mission.clefApiThematique).labelDansLeMenu,
        style: TagThematique.getTagThematiqueUtilitaire(mission.clefApiThematique),
      },
      kyc: mission.items
        .filter(item => item.type === InteractionType.KYC)
        .map((item): MissionKycViewModel => {
          return {
            id: item.contentId,
            progression: {
              etapeCourante: mission.progressionKyc.etapeCourante,
              etapeTotal: mission.progressionKyc.etapeTotal,
            },
            aEteRealisee: item.aEteRealisee,
          };
        }),
      articleEtQuiz: mission.items
        .filter(item => item.type === InteractionType.ARTICLE || item.type === InteractionType.QUIZ)
        .map(item => this.mapToViewModel(item)),
      defis: mission.items
        .filter(item => item.type === InteractionType.DEFIS)
        .map(item =>
          this.mapToDefiViewModel(
            item,
            MenuThematiques.getThematiqueData(mission.clefApiThematique).url,
            mission.missionId,
          ),
        ),
      nombreEtapesMission:
        mission.items.length - mission.items.filter(item => item.type === InteractionType.DEFIS).length + 1,
    });
  }

  private mapToViewModel(item: MissionItem): MissionQuizArticleViewModel {
    return {
      id: item.id,
      idDuContenu: item.contentId,
      aEteRealisee: item.aEteRealisee,
      type: item.type === InteractionType.ARTICLE ? 'article' : 'quiz',
    };
  }

  private mapToDefiViewModel(item: MissionItem, thematiqueLabelUrl: string, missionId: string): MissionDefiViewModel {
    return {
      id: item.id,
      titre: item.titre,
      aEteRealisee: item.aEteRealisee && !item.estEnCours,
      url: `/thematique/${thematiqueLabelUrl}/mission/${missionId}${RouteDefiPath.DEFI}${item.contentId}`,
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
        title: `Reprendre le défi : ${titre}`,
        label: 'Reprendre le défi',
      };
    }

    return {
      style: '',
      title: `Aller au défi : ${titre}`,
      label: 'Aller au défi',
    };
  }
}
