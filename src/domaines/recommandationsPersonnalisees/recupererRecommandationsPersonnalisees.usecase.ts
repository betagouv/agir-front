import { RecommandationsPersonnaliseesPresenter } from '@/domaines/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.presenter';
import { RecommandationsPersonnaliseesRepository } from '@/domaines/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { InteractionType } from '@/shell/interactionType';

export interface RecommandationPersonnalisee {
  type: InteractionType;
  titre: string;
  clefThematiqueAPI: ClefThematiqueAPI;
  nombreDePointsAGagner: string;
  illustrationURL: string;
  idDuContenu: string;
  joursRestants: number | null;
  points: number;
}

export class RecupererRecommandationsPersonnaliseesUsecase {
  constructor(private recommandationsPersonnaliseesRepository: RecommandationsPersonnaliseesRepository) {}

  async execute(idUtilisateur: string, presenter: RecommandationsPersonnaliseesPresenter): Promise<void> {
    const recommandationsPersonnalisees =
      await this.recommandationsPersonnaliseesRepository.chargerRecommandationsPersonnalisees(idUtilisateur);
    presenter.presente(recommandationsPersonnalisees);
  }
}
