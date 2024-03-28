import { InformationCompteur } from '@/linky/obtenirInformationCompteur.usecase';
import { InformationCompteurViewModel, LinkyInformationPresenter } from '@/linky/ports/linky.information.presenter';

export class LinkyPresenterInformationImpl implements LinkyInformationPresenter {
  constructor(private viewModel: (informationCompteurViewModel: InformationCompteurViewModel) => void) {}

  presente(informationCompteur: InformationCompteur): void {
    const informationCompteurViewModel = {
      prm: informationCompteur.prm,
      estConfigure: informationCompteur.estConfigure,
      estActif: informationCompteur.estActif,
      estFonctionnel: informationCompteur.estFonctionnel,
      doitOuvrirLaModaleDeConfiguration: !informationCompteur.estConfigure || informationCompteur.configurationEnErreur,
    };

    this.viewModel(informationCompteurViewModel);
  }
}
