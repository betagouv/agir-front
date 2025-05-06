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
    if (!adresse.coordonnees || !adresse.rue || !adresse.numeroRue) return;

    this.barreDeRechercheViewModel({
      coordonnees: {
        latitude: adresse.coordonnees.latitude,
        longitude: adresse.coordonnees.longitude,
      },
      recherche: `${adresse.numeroRue} ${adresse.rue}, ${adresse.communeLabel} (${adresse.codePostal})`,
    });
  }
}
