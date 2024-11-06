import { RecommandationsPersonnaliseesPresenter } from '@/domaines/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.presenter';
import { RecommandationsPersonnaliseesRepository } from '@/domaines/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';

export class RecupererRecommandationsPersonnaliseesThematiqueUsecase {
  constructor(private recommandationsPersonnaliseesRepository: RecommandationsPersonnaliseesRepository) {}

  async execute(
    thematiqueId: string,
    idUtilisateur: string,
    presenter: RecommandationsPersonnaliseesPresenter,
  ): Promise<void> {
    const recommandationsPersonnalisees =
      await this.recommandationsPersonnaliseesRepository.chargerRecommandationsPersonnaliseesThematique(
        thematiqueId,
        idUtilisateur,
      );
    presenter.presente(recommandationsPersonnalisees);
  }
}
