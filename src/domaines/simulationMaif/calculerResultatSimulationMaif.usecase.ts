import { SimulateurMaifPresenter } from '@/domaines/simulationMaif/ports/simulateurMaif.presenter';
import { SimulateurMaifRepository } from '@/domaines/simulationMaif/ports/simulateurMaif.repository';
import { Coordonnees } from '@/shell/coordonneesType';

export class CalculerResultatSimulationMaifUsecase {
  constructor(private readonly simulationMaifRepository: SimulateurMaifRepository) {}

  async execute(
    utilisateurId: string,
    coordonnees: Coordonnees,
    simulateurMaifPresenter: SimulateurMaifPresenter,
  ): Promise<void> {
    const resultat = await this.simulationMaifRepository.recupererResultats(utilisateurId, coordonnees);
    simulateurMaifPresenter.presente(resultat, coordonnees);
  }
}
