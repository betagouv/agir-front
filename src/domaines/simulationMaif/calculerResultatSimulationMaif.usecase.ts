import { SimulateurMaifPresenter } from '@/domaines/simulationMaif/ports/simulateurMaif.presenter';
import { SimulateurMaifRepository } from '@/domaines/simulationMaif/ports/simulateurMaif.repository';

export class CalculerResultatSimulationMaifUsecase {
  constructor(private readonly simulationMaifRepository: SimulateurMaifRepository) {}

  async execute(utilisateurId: string, simulateurMaifPresenter: SimulateurMaifPresenter): Promise<void> {
    const resultat = await this.simulationMaifRepository.recupererResultats(utilisateurId);
    simulateurMaifPresenter.presente(resultat);
  }
}
