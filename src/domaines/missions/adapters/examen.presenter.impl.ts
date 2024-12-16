import { DetailMission, MissionItem } from '../recupererDetailMission.usecase';
import { MissionPresenter } from '@/domaines/missions/ports/missionPresenter';
import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { TagStyle, TagThematique } from '@/domaines/thematiques/TagThematique';
import { InteractionType } from '@/shell/interactionType';

export interface ExamenBaseViewModel {
  id: string;
  aEteRealisee: boolean;
}

export interface ExamenQuizArticleViewModel extends ExamenBaseViewModel {
  idDuContenu: string;
  type: 'quiz' | 'article';
}
export interface ExamenViewModel {
  titre: string;
  urlImage: string;
  estTerminee: boolean;
  estTerminable: boolean;
  intro: string;
  articleEtQuiz: ExamenQuizArticleViewModel[];
  tag: {
    label: string;
    style: TagStyle;
  };
  nombreEtapesMission: number;
}

export class ExamenPresenterImpl implements MissionPresenter {
  constructor(private readonly viewModel: (examen: ExamenViewModel) => void) {}

  presente(examen: DetailMission): void {
    this.viewModel({
      titre: examen.titre,
      urlImage: examen.urlImage,
      estTerminee: examen.estTerminee,
      estTerminable: examen.estTerminable,
      intro: examen.intro,
      tag: {
        label: MenuThematiques.getThematiqueData(examen.clefApiThematique).labelDansLeMenu,
        style: TagThematique.getTagThematiqueUtilitaire(examen.clefApiThematique),
      },
      articleEtQuiz: examen.items
        .filter(item => item.type === InteractionType.ARTICLE || item.type === InteractionType.QUIZ)
        .map(item => this.mapToViewModel(item)),
      nombreEtapesMission:
        examen.items.length - examen.items.filter(item => item.type === InteractionType.DEFIS).length + 1,
    });
  }

  private mapToViewModel(item: MissionItem): ExamenQuizArticleViewModel {
    return {
      id: item.id,
      idDuContenu: item.contentId,
      aEteRealisee: item.aEteRealisee,
      type: item.type === InteractionType.ARTICLE ? 'article' : 'quiz',
    };
  }
}
