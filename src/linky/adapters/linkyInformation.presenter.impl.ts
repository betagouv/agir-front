import { InformationCompteurViewModel, LinkyInformationPresenter } from '@/linky/ports/linky.information.presenter';
import { InformationCompteur } from '@/linky/obtenirInformationCompteur.usecase';

export class LinkyPresenterInformationImpl implements LinkyInformationPresenter {
  constructor(private viewModel: (informationCompteurViewModel: InformationCompteurViewModel) => void) {}

  presente(informationCompteur: InformationCompteur): void {
    const informationCompteurViewModel = {
      prm: informationCompteur.prm,
      estConfigure: informationCompteur.estConfigure,
      estActif: informationCompteur.estActif,
      estFonctionnel: informationCompteur.estFonctionnel,
      doitOuvrirLaModaleDeConfiguration:
        !informationCompteur.estConfigure ||
        informationCompteur.codeErreur === '032' ||
        informationCompteur.codeErreur === '039',
    };

    this.viewModel(informationCompteurViewModel);
  }
}
