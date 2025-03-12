import { ResultatSimulationVoiturePresenter } from '@/domaines/simulationVoiture/ports/resultatSimulationVoiture.presenter';
import { SimulationVoitureRepository } from '@/domaines/simulationVoiture/ports/simulateurVoiture.repository';

export class CalculerResultatSimulationVoitureUsecase {
  constructor(private readonly repository: SimulationVoitureRepository) {}
  async execute(utilisateurId: string, presenter: ResultatSimulationVoiturePresenter): Promise<void> {
    const resultat = await this.repository.recupererResultats(utilisateurId);
    presenter.presente(resultat);
  }
}
