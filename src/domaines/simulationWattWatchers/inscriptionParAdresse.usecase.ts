import { Adresse } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
import { InscriptionPresenter } from '@/domaines/simulationWattWatchers/ports/inscription.presenter';
import { WattWatchersRepository } from '@/domaines/simulationWattWatchers/ports/WattWatchers.repository';

export class InscriptionParAdresseUsecase {
  constructor(private readonly repository: WattWatchersRepository) {}

  async execute(utilisateurId: string, nom: string, adresse: Adresse, presenter: InscriptionPresenter): Promise<void> {
    await this.repository
      .inscriptionParAdresse(utilisateurId, nom, adresse)
      .catch(() => presenter.presenteInscriptionErreur())
      .then(() => presenter.presenteInscriptionOk());
  }
}
