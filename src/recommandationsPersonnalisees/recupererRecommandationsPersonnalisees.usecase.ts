import { InteractionType } from '@/shell/interactionType';
import { RecommandationsPersonnaliseesRepository } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';
import { RecommandationsPersonnaliseesPresenter } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.presenter';

export interface RecommandationPersonnalisee {
  type: InteractionType;
  titre: string;
  thematique: string;
  nombreDePointsAGagner: string;
  illustrationURL: string;
  idDuContenu: string;
  joursRestants: number | null;
}

export class RecupererRecommandationsPersonnaliseesUsecase {
  constructor(private recommandationsPersonnaliseesRepository: RecommandationsPersonnaliseesRepository) {}

  async execute(idUtilisateur: string, presenter: RecommandationsPersonnaliseesPresenter): Promise<void> {
    const recommandationsPersonnalisees =
      await this.recommandationsPersonnaliseesRepository.chargerRecommandationsPersonnalisees(idUtilisateur);
    presenter.presente(recommandationsPersonnalisees);
  }
}
