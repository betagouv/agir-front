import { RecommandationsPersonnaliseesPresenter } from '@/domaines/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.presenter';
import { RecommandationsPersonnaliseesRepository } from '@/domaines/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';

export class RecupererArticlesPersonnaliseesUsecase {
  constructor(private recommandationsPersonnaliseesRepository: RecommandationsPersonnaliseesRepository) {}

  async execute(
    idUtilisateur: string,
    nombreMax: number,
    presenter: RecommandationsPersonnaliseesPresenter,
  ): Promise<void> {
    const recommandationsPersonnalisees =
      await this.recommandationsPersonnaliseesRepository.chargerArticlesPersonnalisees(idUtilisateur, nombreMax);
    presenter.presente(recommandationsPersonnalisees);
  }
}
