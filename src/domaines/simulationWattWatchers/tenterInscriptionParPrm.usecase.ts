import { WattWatchersRepository } from '@/domaines/simulationWattWatchers/ports/WattWatchers.repository';
import { WattWatchersInscriptionPresenter } from '@/domaines/simulationWattWatchers/ports/WattWatchersInscription.presenter';

export class TenterInscriptionParPrmUsecase {
  constructor(private readonly repository: WattWatchersRepository) {}

  async execute(
    utilisateurId: string,
    prm: string,
    nom: string,
    presenter: WattWatchersInscriptionPresenter,
  ): Promise<void> {
    const resultat = await this.repository.inscriptionParPrm(utilisateurId, prm, nom);
    presenter.presente(resultat);
  }
}
