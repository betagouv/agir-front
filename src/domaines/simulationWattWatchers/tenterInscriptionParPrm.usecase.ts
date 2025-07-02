import { InscriptionPresenter } from '@/domaines/simulationWattWatchers/ports/inscription.presenter';
import { WattWatchersRepository } from '@/domaines/simulationWattWatchers/ports/WattWatchers.repository';

export class TenterInscriptionParPrmUsecase {
  constructor(private readonly repository: WattWatchersRepository) {}

  async execute(utilisateurId: string, prm: string, nom: string, presenter: InscriptionPresenter): Promise<void> {
    await this.repository
      .inscriptionParPrm(utilisateurId, prm, nom)
      .then(() => presenter.presenteInscriptionOk())
      .catch(() => presenter.presenteInscriptionErreur());
  }
}
