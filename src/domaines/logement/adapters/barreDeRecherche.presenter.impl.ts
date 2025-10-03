import { BarreDeRecherchePresenter } from '@/domaines/logement/ports/barreDeRecherche.presenter';
import { Adresse } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
import formaterAdresse from '@/shell/formatting/formaterAdresseBarreDeRecherche';

export type BarreDeRechercheViewModel = {
  recherche: string;
  coordonnees: {
    latitude: number;
    longitude: number;
  };
  adresse: {
    codePostal: string;
    numeroRue: string;
    rue: string;
    communeLabel: string;
    codeEpci: string;
  };
};

export class BarreDeRecherchePresenterImpl implements BarreDeRecherchePresenter {
  constructor(private barreDeRechercheViewModel: (viewModel: BarreDeRechercheViewModel) => void) {}

  presente(adresse: Adresse): void {
    this.barreDeRechercheViewModel({
      coordonnees: {
        latitude: adresse.coordonnees.latitude,
        longitude: adresse.coordonnees.longitude,
      },
      recherche: adresse.numeroRue ? formaterAdresse(adresse) : '',
      adresse: {
        codePostal: adresse.codePostal,
        numeroRue: adresse.numeroRue,
        rue: adresse.rue,
        communeLabel: adresse.commune_label,
        codeEpci: adresse.codeEpci,
      },
    });
  }
}
