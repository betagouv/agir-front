import { ServiceRechercheViewModelBase } from '@/domaines/serviceRecherche/catalogue/adapters/serviceRechercheViewModel';
import { InformationCompteur } from '@/domaines/serviceRecherche/linky/obtenirInformationCompteur.usecase';
import { ServiceRechercheLinkyPresenter } from '@/domaines/serviceRecherche/linky/ports/serviceRechercheLinky.presenter';

export interface ServiceLinkyViewModel extends ServiceRechercheViewModelBase {
  informationCompteur: {
    prm: string;
    estConfigure: boolean;
    estActif: boolean;
    estFonctionnel: boolean;
    configurationEnErreur: boolean;
  };
}

export class ServiceRechercheLinkyPresenterImpl implements ServiceRechercheLinkyPresenter {
  constructor(private serviceLinkyViewModel: (viewModel: ServiceLinkyViewModel) => void) {}

  presente(informationCompteur: InformationCompteur): void {
    this.serviceLinkyViewModel({
      informationCompteur: {
        prm: informationCompteur.prm,
        estConfigure: informationCompteur.estConfigure,
        estActif: informationCompteur.estActif,
        estFonctionnel: informationCompteur.estFonctionnel,
        configurationEnErreur: informationCompteur.configurationEnErreur,
      },
      categories: [],
      aside: {
        nom: 'Winter énergies',
        url: 'https://www.winter-energies.fr/',
        urlLabel: 'https://www.winter-energies.fr/',
        logo: '/service-winter-logo.webp',
        screenshot: '/service-winter.webp',
        description:
          'Comprenez comment vous consommez et surtout, comment réduire votre consommation pour réaliser des économies.',
      },
    });
  }
}
