import { RecommandationsPersonnaliseesPresenter } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.presenter';
import { RecommandationsPersonnaliseesRepository } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';

export class RecupererRecommandationsPersonnaliseesUniversUsecase {
  constructor(private recommandationsPersonnaliseesRepository: RecommandationsPersonnaliseesRepository) {}

  async execute(
    universId: string,
    idUtilisateur: string,
    presenter: RecommandationsPersonnaliseesPresenter,
  ): Promise<void> {
    const recommandationsPersonnalisees =
      await this.recommandationsPersonnaliseesRepository.chargerRecommandationsPersonnaliseesUnivers(
        universId,
        idUtilisateur,
      );
    presenter.presente(recommandationsPersonnalisees);
  }
}
