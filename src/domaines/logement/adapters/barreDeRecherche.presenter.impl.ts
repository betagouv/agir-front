import { BarreDeRecherchePresenter } from '@/domaines/logement/ports/barreDeRecherche.presenter';
import { AdresseDansLeCompte } from '@/domaines/simulationMaif/recupererStatistiquesCommuneMaifDepuisProfil.usecase';

export type BarreDeRechercheViewModel = {
  recherche: string;
  coordonnees: {
    latitude: number;
    longitude: number;
  };
};

export class BarreDeRecherchePresenterImpl implements BarreDeRecherchePresenter {
  constructor(private barreDeRechercheViewModel: (viewModel: BarreDeRechercheViewModel) => void) {}

  presente(adresse: AdresseDansLeCompte): void {
    if (!adresse.estAdresseComplete()) return;

    this.barreDeRechercheViewModel({
      coordonnees: {
        latitude: adresse.latitude,
        longitude: adresse.longitude,
      },
      recherche: `${adresse.numeroRue} ${adresse.rue}, ${adresse.communeLabel} (${adresse.codePostal})`,
    });
  }
}
