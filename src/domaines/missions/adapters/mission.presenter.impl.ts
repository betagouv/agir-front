import { DetailMission, MissionItem } from '../recupererDetailMission.usecase';
import { MissionPresenter } from '@/domaines/missions/ports/missionPresenter';
import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { TagStyle, TagThematique } from '@/domaines/thematiques/TagThematique';
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

export interface MissionKycViewModel {
  kycs: MissionBaseViewModel[];
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
  kyc: MissionKycViewModel;
  articleEtQuiz: MissionQuizArticleViewModel[];
  tag: {
    label: string;
    style: TagStyle;
  };
  nombreEtapesMission: number;
}

export class MissionPresenterImpl implements MissionPresenter {
  constructor(private readonly viewModel: (mission: MissionViewModel) => void) {}

  presente(mission: DetailMission): void {
    const kycs = mission.items.filter(mission => mission.type === InteractionType.KYC);
    const foundKycIndex = kycs.findIndex(mission => !mission.aEteRealisee);

    this.viewModel({
      titre: mission.titre,
      urlImage: mission.urlImage,
      estTerminee: mission.estTerminee,
      estTerminable: mission.estTerminable,
      intro:
        mission.intro ??
        'Découvrez de courtes ressources pour vous aider à <span class="text--bold">agir</span> directement !',
      tag: {
        label: MenuThematiques.getThematiqueData(mission.clefApiThematique).labelDansLeMenu,
        style: TagThematique.getTagThematiqueUtilitaire(mission.clefApiThematique),
      },
      kyc: {
        progression: {
          etapeCourante: foundKycIndex === -1 ? kycs.length : foundKycIndex,
          etapeTotal: kycs.length,
        },
        kycs: kycs.map((kyc): MissionBaseViewModel => {
          return {
            id: kyc.contentId,
            aEteRealisee: kyc.aEteRealisee,
          };
        }),
      },
      articleEtQuiz: mission.items
        .filter(item => item.type === InteractionType.ARTICLE || item.type === InteractionType.QUIZ)
        .map(item => this.mapToViewModel(item)),
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
}
