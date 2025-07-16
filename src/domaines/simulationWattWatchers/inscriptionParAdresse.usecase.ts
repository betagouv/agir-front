import { Adresse } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
import { InscriptionPresenter } from '@/domaines/simulationWattWatchers/ports/inscription.presenter';
import { WattWatchersRepository } from '@/domaines/simulationWattWatchers/ports/wattWatchers.repository';

export class InscriptionParAdresseUsecase {
  constructor(private readonly repository: WattWatchersRepository) {}

  async execute(utilisateurId: string, nom: string, adresse: Adresse, presenter: InscriptionPresenter): Promise<void> {
    try {
      await this.repository.inscriptionParAdresse(utilisateurId, nom, adresse);
      presenter.presenteInscriptionOk();
    } catch (error) {
      presenter.presenteInscriptionErreur();
    }
  }
}
