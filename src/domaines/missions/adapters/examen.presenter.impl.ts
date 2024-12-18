import { DetailMission, MissionItem } from '../recupererDetailMission.usecase';
import { MissionPresenter } from '@/domaines/missions/ports/missionPresenter';
import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { TagStyle, TagThematique } from '@/domaines/thematiques/TagThematique';
import { InteractionType } from '@/shell/interactionType';

export interface ExamenQuizViewModel {
  idDuContenu: string;
  id: string;
  aEteRealisee: boolean;
}

export interface ExamenViewModel {
  titre: string;
  urlImage: string;
  estTerminee: boolean;
  estTerminable: boolean;
  intro: string;
  quizz: ExamenQuizViewModel[];
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
      quizz: examen.items.filter(item => item.type === InteractionType.QUIZ).map(item => this.mapToViewModel(item)),
      nombreEtapesMission: examen.items.length,
    });
  }

  private mapToViewModel(item: MissionItem): ExamenQuizViewModel {
    return {
      id: item.id,
      idDuContenu: item.contentId,
      aEteRealisee: item.aEteRealisee,
    };
  }
}
